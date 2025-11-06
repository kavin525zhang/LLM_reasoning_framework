"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerAreaChart = exports.AreaChart = void 0;

const area_1 = require("../../series/area/area"), type_1 = require("../../series/interface/type"), factory_1 = require("../../core/factory"), area_transformer_1 = require("./area-transformer"), base_1 = require("../base"), vutils_1 = require("@visactor/vutils"), stack_1 = require("../stack");

class AreaChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = area_transformer_1.AreaChartSpecTransformer, 
        this.type = "area", this.seriesType = type_1.SeriesTypeEnum.area;
    }
}

exports.AreaChart = AreaChart, AreaChart.type = "area", AreaChart.seriesType = type_1.SeriesTypeEnum.area, 
AreaChart.transformerConstructor = area_transformer_1.AreaChartSpecTransformer, 
(0, vutils_1.mixin)(AreaChart, stack_1.StackChartMixin);

const registerAreaChart = () => {
    (0, area_1.registerAreaSeries)(), factory_1.Factory.registerChart(AreaChart.type, AreaChart);
};

exports.registerAreaChart = registerAreaChart;
//# sourceMappingURL=area.js.map
