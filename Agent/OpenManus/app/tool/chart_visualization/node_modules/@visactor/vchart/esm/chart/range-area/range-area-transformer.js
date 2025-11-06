import { CartesianChartSpecTransformer } from "../cartesian";

import { setDefaultCrosshairForCartesianChart } from "../util";

export class RangeAreaChartSpecTransformer extends CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a, _b;
        const series = super._getDefaultSeriesSpec(spec);
        return series.area = spec.area, "horizontal" === spec.direction ? series.xField = null !== (_a = spec.xField) && void 0 !== _a ? _a : [ spec.minField, spec.maxField ] : series.yField = null !== (_b = spec.yField) && void 0 !== _b ? _b : [ spec.minField, spec.maxField ], 
        series.stack = !1, series;
    }
    transformSpec(spec) {
        super.transformSpec(spec), setDefaultCrosshairForCartesianChart(spec);
    }
}
//# sourceMappingURL=range-area-transformer.js.map
