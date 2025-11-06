"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerWordCloudShape3dChart = exports.registerWordCloud3dChart = exports.WordCloud3dChart = void 0;

const type_1 = require("../../../series/interface/type"), base_1 = require("../base/base"), word_cloud_3d_1 = require("../../../series/word-cloud/word-cloud-3d"), factory_1 = require("../../../core/factory"), word_cloud_3d_transformer_1 = require("./word-cloud-3d-transformer"), other_1 = require("../../../plugin/other");

class WordCloud3dChart extends base_1.BaseWordCloudChart {
    constructor() {
        super(...arguments), this.transformerConstructor = word_cloud_3d_transformer_1.WordCloud3dChartSpecTransformer, 
        this.type = "wordCloud3d", this.seriesType = type_1.SeriesTypeEnum.wordCloud3d;
    }
}

exports.WordCloud3dChart = WordCloud3dChart, WordCloud3dChart.type = "wordCloud3d", 
WordCloud3dChart.seriesType = type_1.SeriesTypeEnum.wordCloud3d, WordCloud3dChart.transformerConstructor = word_cloud_3d_transformer_1.WordCloud3dChartSpecTransformer;

const registerWordCloud3dChart = () => {
    (0, other_1.register3DPlugin)(), (0, word_cloud_3d_1.registerWordCloud3dSeries)(), 
    factory_1.Factory.registerChart(WordCloud3dChart.type, WordCloud3dChart);
};

exports.registerWordCloud3dChart = registerWordCloud3dChart;

const registerWordCloudShape3dChart = () => {
    (0, other_1.register3DPlugin)(), (0, word_cloud_3d_1.registerWordCloudShape3dSeries)(), 
    (0, exports.registerWordCloud3dChart)();
};

exports.registerWordCloudShape3dChart = registerWordCloudShape3dChart;
//# sourceMappingURL=word-cloud-3d.js.map
