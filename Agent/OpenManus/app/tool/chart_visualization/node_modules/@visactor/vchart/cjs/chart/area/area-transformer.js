"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.AreaChartSpecTransformer = void 0;

const cartesian_1 = require("../cartesian"), util_1 = require("../util");

class AreaChartSpecTransformer extends cartesian_1.CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "point", "line", "area", "seriesMark", "activePoint", "sampling", "samplingFactor", "pointDis", "pointDisMul", "markOverlap", "areaLabel" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), (0, util_1.setDefaultCrosshairForCartesianChart)(spec);
    }
}

exports.AreaChartSpecTransformer = AreaChartSpecTransformer;
//# sourceMappingURL=area-transformer.js.map
