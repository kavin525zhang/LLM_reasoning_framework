"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Bar3dChartSpecTransformer = void 0;

const bar_transformer_1 = require("../bar-transformer");

class Bar3dChartSpecTransformer extends bar_transformer_1.BarChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        const seriesSpec = super._getDefaultSeriesSpec(spec);
        return seriesSpec.barWidth = spec.barWidth, seriesSpec.barMaxWidth = spec.barMaxWidth, 
        seriesSpec.barMinWidth = spec.barMinWidth, seriesSpec.barGapInGroup = spec.barGapInGroup, 
        seriesSpec;
    }
}

exports.Bar3dChartSpecTransformer = Bar3dChartSpecTransformer;
//# sourceMappingURL=bar-3d-transformer.js.map
