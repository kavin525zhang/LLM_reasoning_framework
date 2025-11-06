"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerRadarChart = exports.RadarChart = void 0;

const radar_1 = require("../../series/radar/radar"), type_1 = require("../../series/interface/type"), factory_1 = require("../../core/factory"), radar_transformer_1 = require("./radar-transformer"), base_1 = require("../base"), stack_1 = require("../stack"), vutils_1 = require("@visactor/vutils");

class RadarChart extends base_1.BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = radar_transformer_1.RadarChartSpecTransformer, 
        this.type = "radar", this.seriesType = type_1.SeriesTypeEnum.radar;
    }
}

exports.RadarChart = RadarChart, RadarChart.type = "radar", RadarChart.seriesType = type_1.SeriesTypeEnum.radar, 
RadarChart.transformerConstructor = radar_transformer_1.RadarChartSpecTransformer, 
(0, vutils_1.mixin)(RadarChart, stack_1.StackChartMixin);

const registerRadarChart = () => {
    (0, radar_1.registerRadarSeries)(), factory_1.Factory.registerChart(RadarChart.type, RadarChart);
};

exports.registerRadarChart = registerRadarChart;
//# sourceMappingURL=radar.js.map
