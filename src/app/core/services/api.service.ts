import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { City } from '../../shared/types/city.types';
import { take } from 'rxjs/operators';
import { CityHistory } from '../../shared/types/history.types';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    getCities(): Observable<City[]> {
        return this.http.get<City[]>(`${environment.apiBase}/cities`)
            .pipe(take(1));
    }

    getHistory(cities: string): Observable<CityHistory> {
        return this.http.get<CityHistory>(`${environment.apiBase}/history`, {
            params: {
                cities
            }
        })
            .pipe(take(1));
    }
}
