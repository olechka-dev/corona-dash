import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { City } from '../../shared/types/city.types';
import { Observable } from 'rxjs';
import { ChartHistoryData, HistoryItem } from '../../shared/types/history.types';
import { map } from 'rxjs/operators';
import { Label } from 'ng2-charts';

@Injectable({
    providedIn: 'root'
})
export class CoronaChartService {

    constructor(private api: ApiService) {
    }



    static transformDatesToLabels(freq: number) {

        return (value, index, values) => {
            const date = new Date(value);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            if (index === 0 || date.getDate() === 1) {
                return date.toLocaleDateString('en-GB', options);
            }
            const dateStr = date.getDate().toString();
            if (index % freq === 0 && !['2', '30', '31'].includes(dateStr) || /\d+\s\S+\s\d{4}/.test(dateStr)) {
                return dateStr;
            } else {
                return ' ';
            }
        };
    }

    getChartData(cities: City[]): Observable<ChartHistoryData> {
        const cityIds = cities.map(city => city._id).join(',');
        return this.api.getHistory(cityIds)
            .pipe(
                map(res => this.convertApiData(res.cities_history, cities))
            );
    }

    private convertApiData(rawData: HistoryItem[], cities: City[]): ChartHistoryData {
        const dataSets = cities.map((city) => ({
            data: rawData.filter(item => item.city_id === city._id).map(item => item.patientDiffPopulationForTenThousands),
            label: city.city_name
        }));

        const labels = rawData.filter(item => item.city_id === cities[0]._id).map(item => item.created_at);
        return { dataSets, labels };
    }

}
