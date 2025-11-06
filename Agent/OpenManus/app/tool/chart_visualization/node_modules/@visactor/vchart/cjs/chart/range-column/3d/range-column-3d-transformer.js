"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RangeColumn3dChartSpecTransformer = void 0;

const cartesian_1 = require("../../cartesian");

class RangeColumn3dChartSpecTransformer extends cartesian_1.CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a, _b;
        const series = super._getDefaultSeriesSpec(spec, [ "bar3d", "barGapInGroup" ]);
        return "horizontal" === spec.direction ? series.xField = null !== (_a = spec.xField) && void 0 !== _a ? _a : [ spec.minField, spec.maxField ] : series.yField = null !== (_b = spec.yField) && void 0 !== _b ? _b : [ spec.minField, spec.maxField ], 
        series;
    }
}

exports.RangeColumn3dChartSpecTransformer = RangeColumn3dChartSpecTransformer;
//# sourceMappingURL=range-column-3d-transformer.js.map
