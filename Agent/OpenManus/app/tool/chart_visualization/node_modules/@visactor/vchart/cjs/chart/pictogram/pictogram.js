"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerPictogramChart = exports.PictogramChart = void 0;

const base_chart_1 = require("../base/base-chart"), type_1 = require("../../series/interface/type"), factory_1 = require("../../core/factory"), pictogram_transformer_1 = require("./pictogram-transformer"), pictogram_1 = require("../../series/pictogram/pictogram");

class PictogramChart extends base_chart_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = pictogram_transformer_1.PictogramChartSpecTransformer, 
        this.type = "pictogram", this.seriesType = type_1.SeriesTypeEnum.pictogram;
    }
}

exports.PictogramChart = PictogramChart, PictogramChart.type = "pictogram", PictogramChart.seriesType = type_1.SeriesTypeEnum.pictogram, 
PictogramChart.transformerConstructor = pictogram_transformer_1.PictogramChartSpecTransformer;

const registerPictogramChart = () => {
    (0, pictogram_1.registerPictogramSeries)(), factory_1.Factory.registerChart(PictogramChart.type, PictogramChart);
};

exports.registerPictogramChart = registerPictogramChart;
//# sourceMappingURL=pictogram.js.map
