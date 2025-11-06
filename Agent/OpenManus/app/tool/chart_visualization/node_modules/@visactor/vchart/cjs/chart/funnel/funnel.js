"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerFunnelChart = exports.FunnelChart = void 0;

const funnel_1 = require("./../../series/funnel/funnel"), type_1 = require("../../series/interface/type"), factory_1 = require("../../core/factory"), funnel_transformer_1 = require("./funnel-transformer"), base_1 = require("../base");

class FunnelChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = funnel_transformer_1.FunnelChartSpecTransformer, 
        this.type = "funnel", this.seriesType = type_1.SeriesTypeEnum.funnel;
    }
}

exports.FunnelChart = FunnelChart, FunnelChart.type = "funnel", FunnelChart.seriesType = type_1.SeriesTypeEnum.funnel, 
FunnelChart.transformerConstructor = funnel_transformer_1.FunnelChartSpecTransformer;

const registerFunnelChart = () => {
    (0, funnel_1.registerFunnelSeries)(), factory_1.Factory.registerChart(FunnelChart.type, FunnelChart);
};

exports.registerFunnelChart = registerFunnelChart;
//# sourceMappingURL=funnel.js.map
