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

        const labels = this.transformDatesToLabels(rawData.filter(item => item.city_id === cities[0]._id).map(item => item.created_at));
        return { dataSets, labels };
    }

    private transformDatesToLabels(datesStr: string[]): Label[] {
        const dates = datesStr.map((datesItem) => new Date(datesItem));
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const labels: Label[] = [dates[0].toLocaleDateString('en-GB', options)];
        for (let i = 1; i < dates.length; i++) {
            labels.push(dates[i].getDate() === 1 ? dates[i].toLocaleDateString('en-GB', options) : dates[i].getDate().toString());
        }
        return labels;
    }
}
