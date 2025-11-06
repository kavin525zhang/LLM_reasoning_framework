import { registerRadarSeries } from "../../series/radar/radar";

import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { RadarChartSpecTransformer } from "./radar-transformer";

import { BaseChart } from "../base";

import { StackChartMixin } from "../stack";

import { mixin } from "@visactor/vutils";

export class RadarChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = RadarChartSpecTransformer, this.type = "radar", 
        this.seriesType = SeriesTypeEnum.radar;
    }
}

RadarChart.type = "radar", RadarChart.seriesType = SeriesTypeEnum.radar, RadarChart.transformerConstructor = RadarChartSpecTransformer, 
mixin(RadarChart, StackChartMixin);

export const registerRadarChart = () => {
    registerRadarSeries(), Factory.registerChart(RadarChart.type, RadarChart);
};
//# sourceMappingURL=radar.js.map
