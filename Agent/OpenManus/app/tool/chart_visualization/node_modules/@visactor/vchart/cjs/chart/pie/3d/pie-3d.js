"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerPie3dChart = exports.Pie3dChart = exports.Pie3dChartSpecTransformer = void 0;

const pie_3d_1 = require("../../../series/pie/3d/pie-3d"), type_1 = require("../../../series/interface/type"), base_1 = require("../base/base"), factory_1 = require("../../../core/factory"), base_2 = require("../base"), other_1 = require("../../../plugin/other");

class Pie3dChartSpecTransformer extends base_2.BasePieChartSpecTransformer {
    transformSpec(spec) {
        super.transformSpec(spec), spec.series.forEach((s => {
            "pie3d" === s.type && (s.angle3d = spec.angle3d);
        }));
    }
}

exports.Pie3dChartSpecTransformer = Pie3dChartSpecTransformer;

class Pie3dChart extends base_1.BasePieChart {
    constructor() {
        super(...arguments), this.transformerConstructor = Pie3dChartSpecTransformer, this.type = "pie3d", 
        this.seriesType = type_1.SeriesTypeEnum.pie3d;
    }
}

exports.Pie3dChart = Pie3dChart, Pie3dChart.type = "pie3d", Pie3dChart.seriesType = type_1.SeriesTypeEnum.pie3d, 
Pie3dChart.transformerConstructor = Pie3dChartSpecTransformer;

const registerPie3dChart = () => {
    (0, other_1.register3DPlugin)(), (0, pie_3d_1.registerPie3dSeries)(), factory_1.Factory.registerChart(Pie3dChart.type, Pie3dChart);
};

exports.registerPie3dChart = registerPie3dChart;
//# sourceMappingURL=pie-3d.js.map
