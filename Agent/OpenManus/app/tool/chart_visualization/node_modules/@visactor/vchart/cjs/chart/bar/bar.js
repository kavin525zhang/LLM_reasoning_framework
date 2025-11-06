"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerBarChart = exports.BarChart = void 0;

const bar_1 = require("../../series/bar/bar"), type_1 = require("../../series/interface/type"), factory_1 = require("../../core/factory"), bar_transformer_1 = require("./bar-transformer"), base_1 = require("../base"), vutils_1 = require("@visactor/vutils"), stack_1 = require("../stack");

class BarChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = bar_transformer_1.BarChartSpecTransformer, 
        this.type = "bar", this.seriesType = type_1.SeriesTypeEnum.bar;
    }
}

exports.BarChart = BarChart, BarChart.type = "bar", BarChart.seriesType = type_1.SeriesTypeEnum.bar, 
BarChart.transformerConstructor = bar_transformer_1.BarChartSpecTransformer, (0, 
vutils_1.mixin)(BarChart, stack_1.StackChartMixin);

const registerBarChart = () => {
    (0, bar_1.registerBarSeries)(), factory_1.Factory.registerChart(BarChart.type, BarChart);
};

exports.registerBarChart = registerBarChart;
//# sourceMappingURL=bar.js.map
