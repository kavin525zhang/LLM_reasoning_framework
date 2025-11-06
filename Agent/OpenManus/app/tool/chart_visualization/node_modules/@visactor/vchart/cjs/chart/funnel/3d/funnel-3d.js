"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerFunnel3dChart = exports.Funnel3dChart = void 0;

const type_1 = require("../../../series/interface/type"), funnel_3d_1 = require("../../../series/funnel/3d/funnel-3d"), factory_1 = require("../../../core/factory"), funnel_transformer_1 = require("../funnel-transformer"), base_1 = require("../../base"), other_1 = require("../../../plugin/other");

class Funnel3dChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = funnel_transformer_1.FunnelChartSpecTransformer, 
        this.type = "funnel3d", this.seriesType = type_1.SeriesTypeEnum.funnel3d;
    }
}

exports.Funnel3dChart = Funnel3dChart, Funnel3dChart.type = "funnel3d", Funnel3dChart.seriesType = type_1.SeriesTypeEnum.funnel3d, 
Funnel3dChart.transformerConstructor = funnel_transformer_1.FunnelChartSpecTransformer;

const registerFunnel3dChart = () => {
    (0, other_1.register3DPlugin)(), (0, funnel_3d_1.registerFunnel3dSeries)(), factory_1.Factory.registerChart(Funnel3dChart.type, Funnel3dChart);
};

exports.registerFunnel3dChart = registerFunnel3dChart;
//# sourceMappingURL=funnel-3d.js.map
