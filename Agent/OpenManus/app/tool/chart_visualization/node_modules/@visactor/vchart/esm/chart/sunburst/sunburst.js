import { registerSunBurstSeries } from "./../../series/sunburst/sunburst";

import { SeriesTypeEnum } from "../../series/interface/type";

import { BaseChart } from "../base/base-chart";

import { Factory } from "../../core/factory";

import { SunburstChartSpecTransformer } from "./sunburst-transformer";

export class SunburstChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = SunburstChartSpecTransformer, 
        this.type = "sunburst", this.seriesType = SeriesTypeEnum.sunburst;
    }
}

SunburstChart.type = "sunburst", SunburstChart.seriesType = SeriesTypeEnum.sunburst, 
SunburstChart.transformerConstructor = SunburstChartSpecTransformer;

export const registerSunburstChart = () => {
    registerSunBurstSeries(), Factory.registerChart(SunburstChart.type, SunburstChart);
};
//# sourceMappingURL=sunburst.js.map
