"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LineChartSpecTransformer = void 0;

const cartesian_1 = require("../cartesian"), util_1 = require("../util");

class LineChartSpecTransformer extends cartesian_1.CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a;
        const seriesSpec = super._getDefaultSeriesSpec(spec, [ "point", "line", "activePoint", "sampling", "samplingFactor", "pointDis", "pointDisMul", "markOverlap", "lineLabel" ]);
        return seriesSpec.seriesMark = null !== (_a = spec.seriesMark) && void 0 !== _a ? _a : "line", 
        seriesSpec;
    }
    transformSpec(spec) {
        super.transformSpec(spec), (0, util_1.setDefaultCrosshairForCartesianChart)(spec);
    }
}

exports.LineChartSpecTransformer = LineChartSpecTransformer;
//# sourceMappingURL=line-transformer.js.map
