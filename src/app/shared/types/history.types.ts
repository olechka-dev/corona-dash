import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

export interface CityHistory {
    cities_history: HistoryItem[];
}

export interface HistoryItem {
    city: string;
    patientDiffPopulationForTenThousands: number;
    created_at: string;
    city_id: string;
}

export interface ChartHistoryData {
    dataSets: ChartDataSets[];
    labels: Label[];
}
