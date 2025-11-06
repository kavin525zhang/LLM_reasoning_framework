import { CartesianChartSpecTransformer } from "../../cartesian";

export class RangeColumn3dChartSpecTransformer extends CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a, _b;
        const series = super._getDefaultSeriesSpec(spec, [ "bar3d", "barGapInGroup" ]);
        return "horizontal" === spec.direction ? series.xField = null !== (_a = spec.xField) && void 0 !== _a ? _a : [ spec.minField, spec.maxField ] : series.yField = null !== (_b = spec.yField) && void 0 !== _b ? _b : [ spec.minField, spec.maxField ], 
        series;
    }
}
//# sourceMappingURL=range-column-3d-transformer.js.map
