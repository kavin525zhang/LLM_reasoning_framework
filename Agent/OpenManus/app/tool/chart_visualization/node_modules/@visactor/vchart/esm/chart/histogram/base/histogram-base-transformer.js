import { CartesianChartSpecTransformer } from "../../cartesian";

export class BaseHistogramChartSpecTransformer extends CartesianChartSpecTransformer {
    transformSpec(spec) {
        super.transformSpec(spec), spec.axes.forEach((axis => axis.type = "linear"));
    }
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "x2Field", "y2Field", "barMinHeight", "barBackground" ]);
    }
}
//# sourceMappingURL=histogram-base-transformer.js.map
