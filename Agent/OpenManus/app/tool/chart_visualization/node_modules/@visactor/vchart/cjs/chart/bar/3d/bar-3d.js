"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerBar3dChart = exports.Bar3dChart = void 0;

const bar_3d_1 = require("../../../series/bar/bar-3d"), type_1 = require("../../../series/interface/type"), factory_1 = require("../../../core/factory"), bar_1 = require("../bar"), bar_3d_transformer_1 = require("./bar-3d-transformer"), other_1 = require("../../../plugin/other");

class Bar3dChart extends bar_1.BarChart {
    constructor() {
        super(...arguments), this.transformerConstructor = bar_3d_transformer_1.Bar3dChartSpecTransformer, 
        this.type = "bar3d", this.seriesType = type_1.SeriesTypeEnum.bar3d;
    }
}

exports.Bar3dChart = Bar3dChart, Bar3dChart.type = "bar3d", Bar3dChart.seriesType = type_1.SeriesTypeEnum.bar3d, 
Bar3dChart.transformerConstructor = bar_3d_transformer_1.Bar3dChartSpecTransformer;

const registerBar3dChart = () => {
    (0, other_1.register3DPlugin)(), (0, bar_3d_1.registerBar3dSeries)(), factory_1.Factory.registerChart(Bar3dChart.type, Bar3dChart);
};

exports.registerBar3dChart = registerBar3dChart;
//# sourceMappingURL=bar-3d.js.map
