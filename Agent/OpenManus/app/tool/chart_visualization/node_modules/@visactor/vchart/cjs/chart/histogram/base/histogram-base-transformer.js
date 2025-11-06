"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseHistogramChartSpecTransformer = void 0;

const cartesian_1 = require("../../cartesian");

class BaseHistogramChartSpecTransformer extends cartesian_1.CartesianChartSpecTransformer {
    transformSpec(spec) {
        super.transformSpec(spec), spec.axes.forEach((axis => axis.type = "linear"));
    }
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "x2Field", "y2Field", "barMinHeight", "barBackground" ]);
    }
}

exports.BaseHistogramChartSpecTransformer = BaseHistogramChartSpecTransformer;
//# sourceMappingURL=histogram-base-transformer.js.map
