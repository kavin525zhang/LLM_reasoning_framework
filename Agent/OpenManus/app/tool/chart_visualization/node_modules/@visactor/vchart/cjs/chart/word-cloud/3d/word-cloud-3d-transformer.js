"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.WordCloud3dChartSpecTransformer = void 0;

const word_cloud_base_transformer_1 = require("../base/word-cloud-base-transformer");

class WordCloud3dChartSpecTransformer extends word_cloud_base_transformer_1.BaseWordCloudChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        const series = super._getDefaultSeriesSpec(spec);
        return series.depth_3d = spec.depth_3d, series;
    }
}

exports.WordCloud3dChartSpecTransformer = WordCloud3dChartSpecTransformer;
//# sourceMappingURL=word-cloud-3d-transformer.js.map
