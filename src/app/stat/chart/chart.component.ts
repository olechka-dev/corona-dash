import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { CITY_COLORS } from '../../shared/constants/colors';
import { ChartHistoryData } from '../../shared/types/history.types';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BREAKPOINTS_MIN_WIDTH } from '../../shared/constants/breakpoints';
import { CHART_RESPONSIVE_OPTIONS } from '../../shared/constants/chart-options';


@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnChanges, OnInit {

    cwidth = 1000;
    cheight = 400;

    constructor(private breakpointObserver: BreakpointObserver, private cdf: ChangeDetectorRef) {
    }

    @Input() chartData: ChartHistoryData = {
        dataSets: [],
        labels: []
    };
    @Input() isLoading: boolean;

    lineChartOptions: (ChartOptions & { annotation?: any });
    lineChartColors: Color[] = [];
    lineChartType = 'line';


    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.chartData?.currentValue && changes.chartData?.currentValue !== changes.chartData?.previousValue) {
            this.lineChartColors = [...CITY_COLORS].slice(0, this.chartData.dataSets.length).map(color => ({
                borderColor: color,
                backgroundColor: 'rgba(255,0,0,0)'
            }));

        }

    }

    ngOnInit(): void {
        this.breakpointObserver.observe([
            BREAKPOINTS_MIN_WIDTH.M,
            BREAKPOINTS_MIN_WIDTH.L
        ]).subscribe(({ breakpoints }) => {
            this.lineChartOptions = CHART_RESPONSIVE_OPTIONS[breakpoints[BREAKPOINTS_MIN_WIDTH.M] ? BREAKPOINTS_MIN_WIDTH.M : BREAKPOINTS_MIN_WIDTH.XS];

            switch (true) {
                case breakpoints[BREAKPOINTS_MIN_WIDTH.L]:
                    this.lineChartOptions = CHART_RESPONSIVE_OPTIONS[BREAKPOINTS_MIN_WIDTH.L];
                    break;
                case breakpoints[BREAKPOINTS_MIN_WIDTH.M]:
                    this.lineChartOptions = CHART_RESPONSIVE_OPTIONS[BREAKPOINTS_MIN_WIDTH.M];
                    break;
                default:
                    this.lineChartOptions = CHART_RESPONSIVE_OPTIONS[BREAKPOINTS_MIN_WIDTH.XS];

            }
            this.cdf.markForCheck();
        });
    }

}
