import { CartesianChartSpecTransformer } from "../cartesian";

import { setDefaultCrosshairForCartesianChart } from "../util";

export class LineChartSpecTransformer extends CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a;
        const seriesSpec = super._getDefaultSeriesSpec(spec, [ "point", "line", "activePoint", "sampling", "samplingFactor", "pointDis", "pointDisMul", "markOverlap", "lineLabel" ]);
        return seriesSpec.seriesMark = null !== (_a = spec.seriesMark) && void 0 !== _a ? _a : "line", 
        seriesSpec;
    }
    transformSpec(spec) {
        super.transformSpec(spec), setDefaultCrosshairForCartesianChart(spec);
    }
}
//# sourceMappingURL=line-transformer.js.map
