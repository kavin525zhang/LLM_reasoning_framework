"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerHistogram3dChart = exports.Histogram3dChart = void 0;

const bar_3d_1 = require("../../../series/bar/bar-3d"), type_1 = require("../../../series/interface/type"), base_1 = require("../base/base"), factory_1 = require("../../../core/factory"), histogram_transformer_1 = require("../histogram-transformer"), other_1 = require("../../../plugin/other");

class Histogram3dChart extends base_1.BaseHistogramChart {
    constructor() {
        super(...arguments), this.transformerConstructor = histogram_transformer_1.HistogramChartSpecTransformer, 
        this.type = "histogram3d", this.seriesType = type_1.SeriesTypeEnum.bar3d;
    }
}

exports.Histogram3dChart = Histogram3dChart, Histogram3dChart.type = "histogram3d", 
Histogram3dChart.seriesType = type_1.SeriesTypeEnum.bar3d, Histogram3dChart.transformerConstructor = histogram_transformer_1.HistogramChartSpecTransformer;

const registerHistogram3dChart = () => {
    (0, other_1.register3DPlugin)(), (0, bar_3d_1.registerBar3dSeries)(), factory_1.Factory.registerChart(Histogram3dChart.type, Histogram3dChart);
};

exports.registerHistogram3dChart = registerHistogram3dChart;
//# sourceMappingURL=histogram-3d.js.map
