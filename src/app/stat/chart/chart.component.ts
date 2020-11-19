import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { CITY_COLORS } from '../../shared/constants/colors';
import { ChartHistoryData } from '../../shared/types/history.types';


@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges, OnInit {

    constructor() {
    }

    @Input() chartData: ChartHistoryData = {
        dataSets: [],
        labels: []
    };

    lineChartOptions: (ChartOptions & { annotation?: any }) = {
        responsive: true,
    };
    lineChartColors: Color[] = [];
    lineChartType = 'line';


    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.chartData.currentValue && changes.chartData.currentValue !== changes.chartData.previousValue) {
            this.lineChartColors = [...CITY_COLORS].slice(0, this.chartData.dataSets.length).map(color => ({
                borderColor: color,
                backgroundColor: 'rgba(255,0,0,0)'
            }));
        }

    }

    ngOnInit(): void {

    }

}
