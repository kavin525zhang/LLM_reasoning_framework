"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.HeatmapChartSpecTransformer = void 0;

const cartesian_1 = require("../cartesian");

class HeatmapChartSpecTransformer extends cartesian_1.CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "valueField", "cell" ]);
    }
}

exports.HeatmapChartSpecTransformer = HeatmapChartSpecTransformer;
//# sourceMappingURL=heatmap-transformer.js.map
