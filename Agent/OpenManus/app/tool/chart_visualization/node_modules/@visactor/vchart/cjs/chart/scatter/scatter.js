"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerScatterChart = exports.ScatterChart = void 0;

const scatter_1 = require("../../series/scatter/scatter"), type_1 = require("../../series/interface/type"), factory_1 = require("../../core/factory"), scatter_transformer_1 = require("./scatter-transformer"), base_1 = require("../base"), stack_1 = require("../stack"), vutils_1 = require("@visactor/vutils");

class ScatterChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = scatter_transformer_1.ScatterChartSpecTransformer, 
        this.type = "scatter", this.seriesType = type_1.SeriesTypeEnum.scatter;
    }
}

exports.ScatterChart = ScatterChart, ScatterChart.type = "scatter", ScatterChart.seriesType = type_1.SeriesTypeEnum.scatter, 
ScatterChart.transformerConstructor = scatter_transformer_1.ScatterChartSpecTransformer, 
(0, vutils_1.mixin)(ScatterChart, stack_1.StackChartMixin);

const registerScatterChart = () => {
    (0, scatter_1.registerScatterSeries)(), factory_1.Factory.registerChart(ScatterChart.type, ScatterChart);
};

exports.registerScatterChart = registerScatterChart;
//# sourceMappingURL=scatter.js.map
