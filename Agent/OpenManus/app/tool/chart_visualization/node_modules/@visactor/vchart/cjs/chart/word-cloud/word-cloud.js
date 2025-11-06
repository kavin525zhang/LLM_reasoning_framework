"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerWordCloudShapeChart = exports.registerWordCloudChart = exports.WordCloudChart = void 0;

const type_1 = require("../../series/interface/type"), base_1 = require("./base/base"), word_cloud_1 = require("../../series/word-cloud/word-cloud"), factory_1 = require("../../core/factory"), word_cloud_base_transformer_1 = require("./base/word-cloud-base-transformer");

class WordCloudChart extends base_1.BaseWordCloudChart {
    constructor() {
        super(...arguments), this.transformerConstructor = word_cloud_base_transformer_1.BaseWordCloudChartSpecTransformer, 
        this.type = "wordCloud", this.seriesType = type_1.SeriesTypeEnum.wordCloud;
    }
}

exports.WordCloudChart = WordCloudChart, WordCloudChart.type = "wordCloud", WordCloudChart.seriesType = type_1.SeriesTypeEnum.wordCloud, 
WordCloudChart.transformerConstructor = word_cloud_base_transformer_1.BaseWordCloudChartSpecTransformer;

const registerWordCloudChart = () => {
    (0, word_cloud_1.registerWordCloudSeries)(), factory_1.Factory.registerChart(WordCloudChart.type, WordCloudChart);
};

exports.registerWordCloudChart = registerWordCloudChart;

const registerWordCloudShapeChart = () => {
    (0, word_cloud_1.registerWordCloudShapeSeries)(), (0, exports.registerWordCloudChart)();
};

exports.registerWordCloudShapeChart = registerWordCloudShapeChart;
//# sourceMappingURL=word-cloud.js.map
