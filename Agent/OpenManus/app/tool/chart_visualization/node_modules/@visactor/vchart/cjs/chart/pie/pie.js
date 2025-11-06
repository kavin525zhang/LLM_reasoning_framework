"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerPieChart = exports.PieChart = void 0;

const pie_1 = require("../../series/pie/pie"), type_1 = require("../../series/interface/type"), base_1 = require("./base/base"), factory_1 = require("../../core/factory"), base_2 = require("./base");

class PieChart extends base_1.BasePieChart {
    constructor() {
        super(...arguments), this.transformerConstructor = base_2.BasePieChartSpecTransformer, 
        this.type = "pie", this.seriesType = type_1.SeriesTypeEnum.pie;
    }
}

exports.PieChart = PieChart, PieChart.type = "pie", PieChart.seriesType = type_1.SeriesTypeEnum.pie, 
PieChart.transformerConstructor = base_2.BasePieChartSpecTransformer;

const registerPieChart = () => {
    (0, pie_1.registerPieSeries)(), factory_1.Factory.registerChart(PieChart.type, PieChart);
};

exports.registerPieChart = registerPieChart;
//# sourceMappingURL=pie.js.map
