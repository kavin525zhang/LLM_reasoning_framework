"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerCommonChart = exports.CommonChart = void 0;

const base_chart_1 = require("../base/base-chart"), factory_1 = require("../../core/factory"), common_transformer_1 = require("./common-transformer"), stack_1 = require("../stack"), vutils_1 = require("@visactor/vutils");

class CommonChart extends base_chart_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = common_transformer_1.CommonChartSpecTransformer, 
        this.type = "common";
    }
}

exports.CommonChart = CommonChart, CommonChart.type = "common", CommonChart.transformerConstructor = common_transformer_1.CommonChartSpecTransformer, 
(0, vutils_1.mixin)(CommonChart, stack_1.StackChartMixin);

const registerCommonChart = () => {
    factory_1.Factory.registerChart(CommonChart.type, CommonChart);
};

exports.registerCommonChart = registerCommonChart;
//# sourceMappingURL=common.js.map
