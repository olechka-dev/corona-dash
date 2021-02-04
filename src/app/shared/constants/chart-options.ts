import { BREAKPOINTS_MIN_WIDTH } from './breakpoints';
import { CoronaChartService } from '../../core/services/corona-chart.service';

export const CHART_RESPONSIVE_OPTIONS = {
    [BREAKPOINTS_MIN_WIDTH.L]: {
        responsive: true,
        aspectRatio: 3,
        maintainAspectRatio: true,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    callback: CoronaChartService.transformDatesToLabels(3)
                }
            }]

        }
    },
    [BREAKPOINTS_MIN_WIDTH.M]: {
        responsive: true,
        aspectRatio: 3,
        maintainAspectRatio: true,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    callback: CoronaChartService.transformDatesToLabels(5)
                }
            }]

        }
    },
    [BREAKPOINTS_MIN_WIDTH.XS]: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    callback: CoronaChartService.transformDatesToLabels(4)
                }
            }]

        }
    }

}
