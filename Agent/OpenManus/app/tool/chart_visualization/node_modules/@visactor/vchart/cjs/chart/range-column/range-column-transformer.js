"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RangeColumnChartSpecTransformer = void 0;

const cartesian_1 = require("../cartesian"), util_1 = require("../util");

class RangeColumnChartSpecTransformer extends cartesian_1.CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a, _b;
        const series = super._getDefaultSeriesSpec(spec, [ "barWidth", "barMaxWidth", "barMinWidth", "barGapInGroup", "barBackground", "barMinHeight", "stackCornerRadius", "bar" ]);
        return "horizontal" === spec.direction ? series.xField = null !== (_a = spec.xField) && void 0 !== _a ? _a : [ spec.minField, spec.maxField ] : series.yField = null !== (_b = spec.yField) && void 0 !== _b ? _b : [ spec.minField, spec.maxField ], 
        series;
    }
    transformSpec(spec) {
        super.transformSpec(spec), (0, util_1.setDefaultCrosshairForCartesianChart)(spec);
    }
}

exports.RangeColumnChartSpecTransformer = RangeColumnChartSpecTransformer;
//# sourceMappingURL=range-column-transformer.js.map
