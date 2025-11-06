"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ScatterChartSpecTransformer = void 0;

const cartesian_1 = require("../cartesian");

class ScatterChartSpecTransformer extends cartesian_1.CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "point", "size", "shape", "shapeField", "sizeField" ]);
    }
}

exports.ScatterChartSpecTransformer = ScatterChartSpecTransformer;
//# sourceMappingURL=scatter-transformer.js.map
