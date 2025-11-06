import { CartesianChartSpecTransformer } from "../cartesian";

import { setDefaultCrosshairForCartesianChart } from "../util";

export class AreaChartSpecTransformer extends CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "point", "line", "area", "seriesMark", "activePoint", "sampling", "samplingFactor", "pointDis", "pointDisMul", "markOverlap", "areaLabel" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), setDefaultCrosshairForCartesianChart(spec);
    }
}
//# sourceMappingURL=area-transformer.js.map
