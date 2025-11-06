import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { BaseChart } from "../base";

import { LiquidChartSpecTransformer } from "./liquid-transformer";

import { registerLiquidSeries } from "../../series/liquid/liquid";

export class LiquidChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = LiquidChartSpecTransformer, this.type = "liquid", 
        this.seriesType = SeriesTypeEnum.liquid;
    }
}

LiquidChart.type = "liquid", LiquidChart.seriesType = SeriesTypeEnum.liquid, LiquidChart.transformerConstructor = LiquidChartSpecTransformer;

export const registerLiquidChart = () => {
    registerLiquidSeries(), Factory.registerChart(LiquidChart.type, LiquidChart);
};
//# sourceMappingURL=liquid.js.map
