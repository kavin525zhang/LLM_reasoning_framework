"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerWaterfallChart = exports.WaterfallChart = void 0;

const type_1 = require("../../series/interface/type"), bar_1 = require("../bar"), waterfall_1 = require("../../series/waterfall/waterfall"), factory_1 = require("../../core/factory"), waterfall_transformer_1 = require("./waterfall-transformer");

class WaterfallChart extends bar_1.BarChart {
    constructor() {
        super(...arguments), this.transformerConstructor = waterfall_transformer_1.WaterfallChartSpecTransformer, 
        this.type = "waterfall", this.seriesType = type_1.SeriesTypeEnum.waterfall;
    }
}

exports.WaterfallChart = WaterfallChart, WaterfallChart.type = "waterfall", WaterfallChart.seriesType = type_1.SeriesTypeEnum.waterfall, 
WaterfallChart.transformerConstructor = waterfall_transformer_1.WaterfallChartSpecTransformer;

const registerWaterfallChart = () => {
    (0, waterfall_1.registerWaterfallSeries)(), factory_1.Factory.registerChart(WaterfallChart.type, WaterfallChart);
};

exports.registerWaterfallChart = registerWaterfallChart;
//# sourceMappingURL=waterfall.js.map
