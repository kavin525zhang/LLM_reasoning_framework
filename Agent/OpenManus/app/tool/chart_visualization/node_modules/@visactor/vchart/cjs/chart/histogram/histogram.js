"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerHistogramChart = exports.HistogramChart = void 0;

const bar_1 = require("../../series/bar/bar"), type_1 = require("../../series/interface/type"), base_1 = require("./base/base"), factory_1 = require("../../core/factory"), histogram_transformer_1 = require("./histogram-transformer");

class HistogramChart extends base_1.BaseHistogramChart {
    constructor() {
        super(...arguments), this.transformerConstructor = histogram_transformer_1.HistogramChartSpecTransformer, 
        this.type = "histogram", this.seriesType = type_1.SeriesTypeEnum.bar;
    }
}

exports.HistogramChart = HistogramChart, HistogramChart.type = "histogram", HistogramChart.seriesType = type_1.SeriesTypeEnum.bar, 
HistogramChart.transformerConstructor = histogram_transformer_1.HistogramChartSpecTransformer;

const registerHistogramChart = () => {
    (0, bar_1.registerBarSeries)(), factory_1.Factory.registerChart(HistogramChart.type, HistogramChart);
};

exports.registerHistogramChart = registerHistogramChart;
//# sourceMappingURL=histogram.js.map
