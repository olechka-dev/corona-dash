import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { City } from '../../shared/types/city.types';
import { IndexedDBService } from '../../core/services/indexed-db.service';
import { ChartHistoryData } from '../../shared/types/history.types';
import { CoronaChartService } from '../../core/services/corona-chart.service';


@Component({
    selector: 'app-stat-container',
    templateUrl: './stat-container.component.html',
    styleUrls: ['./stat-container.component.scss']
})
export class StatContainerComponent implements OnInit {

    cityControl = new FormControl('');
    filteredOptions$: Observable<City[]>;
    chartData: ChartHistoryData = {
        dataSets: [],
        labels: []
    };
    showNotSupportedBrowserMsg = false;
    isLoading = false;


    constructor(private idb: IndexedDBService,
                private chartsService: CoronaChartService) {
    }

    ngOnInit(): void {
        this.showNotSupportedBrowserMsg = !window.indexedDB;
        this.filteredOptions$ = this.cityControl.valueChanges
            .pipe(
                filter((val) => {
                    return typeof val === 'string';
                }),
                switchMap((val) => {
                    return !!val.trim() ? this.idb.searchCities(val.trim()) : of([]);
                })
            );


    }

    updateCities(cities: City[]): void {
        if (cities.length) {
            this.isLoading = true;
            this.chartsService.getChartData(JSON.parse(JSON.stringify(cities)))
                .pipe(take(1))
                .subscribe((data: ChartHistoryData) => {
                    this.chartData = JSON.parse(JSON.stringify(data));
                    this.isLoading = false;
                });
        } else {
            this.chartData = {
                dataSets: [],
                labels: []
            };
        }

    }

}
