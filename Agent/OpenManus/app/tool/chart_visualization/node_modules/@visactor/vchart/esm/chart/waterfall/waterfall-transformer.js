import { array } from "@visactor/vutils";

import { BarChartSpecTransformer } from "../bar";

import { setDefaultCrosshairForCartesianChart } from "../util";

export class WaterfallChartSpecTransformer extends BarChartSpecTransformer {
    transformSpec(spec) {
        super.transformSpec(spec), spec.legends && array(spec.legends).forEach((l => {
            l.select = !1, l.hover = !1, l.filter = !1;
        })), setDefaultCrosshairForCartesianChart(spec);
    }
    _getDefaultSeriesSpec(spec) {
        const series = super._getDefaultSeriesSpec(spec);
        return series.bar = spec.bar, series.stackLabel = spec.stackLabel, series.leaderLine = spec.leaderLine, 
        series.total = spec.total, series;
    }
}
//# sourceMappingURL=waterfall-transformer.js.map
