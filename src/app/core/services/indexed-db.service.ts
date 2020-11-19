import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { City } from '../../shared/types/city.types';
import { Observable } from 'rxjs';

const DB = 'CITIES_DB';
const CITY_STORE = 'cities';
const UPDATED_AT_STORE = 'lastUpdateTime';
const CITY_STORE_ID = 'city_id_index';
const CITY_STORE_NAME = 'city_name_index';
const UPDATED_AT_KEY = 'updatedAt';
const CITIES_SHELF_LIFE = 3 * 24 * 60 * 60 * 1000; // life time of cities data in ms


@Injectable({
    providedIn: 'root'
})
export class IndexedDBService {

    private request;

    constructor(private api: ApiService) {
        this.init();
    }

    init(): void {
        this.request = window.indexedDB.open(DB, 1);
        this.request.onsuccess = this.successHandlerExistingDB; // if DB exists, onsuccess will fire after
                                                                // opening, so we assign the existing db handler by default.
                                                                // If db doesn't exist onupgradeneeded will fire first and there we reassign
                                                                // handler for unexisting db (populate data from api)
        this.request.onerror = this.errorHandler;
        this.request.onupgradeneeded = this.createStores;
    }

    successHandlerExistingDB = () => { // event will be passed to this handler, but omitted from args since it's not in use currently
        console.log('onsuccess existing db');
        const db = this.request.result;   // db can be received also from event.target.result;


        const updateTimeStore = db.transaction(UPDATED_AT_STORE, 'readonly').objectStore(UPDATED_AT_STORE);

        const req = updateTimeStore.get(UPDATED_AT_KEY);
        req.onsuccess = this.validateUpdateTime;
        req.onerror = this.populateDBFromApi.bind(undefined, false);
    };

    errorHandler = (event) => {
        console.log('[onerror]', event);
    };

    createStores = () => {
        console.log('upgrade');
        const db = this.request.result;
        const cityStore = db.createObjectStore(CITY_STORE, { keyPath: '_id' });

        cityStore.createIndex(CITY_STORE_ID, '_id', { unique: true });
        cityStore.createIndex(CITY_STORE_NAME, 'city_name', { unique: false });

        const updateTimeStore = db.createObjectStore(UPDATED_AT_STORE);

        this.request.onsuccess = this.populateDBFromApi.bind(undefined, true);

        updateTimeStore.transaction.onerror = this.errorHandler;
    };

    setUpdatedAt = (isCreate) => {
        const db = this.request.result;
        const updateTimeStore = db.transaction(UPDATED_AT_STORE, 'readwrite').objectStore(UPDATED_AT_STORE);
        const req = (isCreate ? updateTimeStore.add(+(new Date()), UPDATED_AT_KEY) : updateTimeStore.put(+(new Date()), UPDATED_AT_KEY));
        req.onsuccess = () => {
            console.log('timestamp written to DB');
        };
    };

    populateDBFromApi = (isCreate) => {
        this.api.getCities()
            .subscribe((data) => {
                this.insertCitiesToDB(data, isCreate);
            });
    };

    insertCitiesToDB = (data: City[], isCreate) => {
        const db = this.request.result;
        const trans = db.transaction(CITY_STORE, 'readwrite');

        trans.oncomplete = this.setUpdatedAt.bind(undefined, isCreate);

        trans.onerror = this.errorHandler;
        const cityStore = trans.objectStore(CITY_STORE);
        const writeCities = () => {
            data.forEach((item) => {
                cityStore.add(item);
            });
        };

        if (isCreate) {
            writeCities();
        } else {
            const clearReq = cityStore.clear();
            clearReq.onsuccess = writeCities;
        }
    };

    validateUpdateTime = (event) => {
        const updatedAt = event.target.result;
        if (updatedAt + CITIES_SHELF_LIFE <= +(new Date())) {
            this.populateDBFromApi(false);
        }
    };

    searchCities = (str): Observable<City[]> => {
        const db = this.request.result;
        const trans = db.transaction(CITY_STORE, 'readonly');
        const cityStore = trans.objectStore(CITY_STORE);
        const index = cityStore.index(CITY_STORE_NAME);
        const res: City[] = [];
        const range = window.IDBKeyRange.bound(str, str + '\uffff');
        index.openCursor(range).onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                res.push(cursor.value);
                cursor.continue();
            }
        };

        return new Observable((subscriber) => {
            trans.oncomplete = (event) => {
                subscriber.next(res);
                subscriber.complete();
            };
        });

    };
}
