"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerLiquidChart = exports.LiquidChart = void 0;

const type_1 = require("../../series/interface/type"), factory_1 = require("../../core/factory"), base_1 = require("../base"), liquid_transformer_1 = require("./liquid-transformer"), liquid_1 = require("../../series/liquid/liquid");

class LiquidChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = liquid_transformer_1.LiquidChartSpecTransformer, 
        this.type = "liquid", this.seriesType = type_1.SeriesTypeEnum.liquid;
    }
}

exports.LiquidChart = LiquidChart, LiquidChart.type = "liquid", LiquidChart.seriesType = type_1.SeriesTypeEnum.liquid, 
LiquidChart.transformerConstructor = liquid_transformer_1.LiquidChartSpecTransformer;

const registerLiquidChart = () => {
    (0, liquid_1.registerLiquidSeries)(), factory_1.Factory.registerChart(LiquidChart.type, LiquidChart);
};

exports.registerLiquidChart = registerLiquidChart;
//# sourceMappingURL=liquid.js.map
