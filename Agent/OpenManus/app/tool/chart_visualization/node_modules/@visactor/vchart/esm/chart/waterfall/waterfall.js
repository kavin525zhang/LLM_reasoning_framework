import { SeriesTypeEnum } from "../../series/interface/type";

import { BarChart } from "../bar";

import { registerWaterfallSeries } from "../../series/waterfall/waterfall";

import { Factory } from "../../core/factory";

import { WaterfallChartSpecTransformer } from "./waterfall-transformer";

export class WaterfallChart extends BarChart {
    constructor() {
        super(...arguments), this.transformerConstructor = WaterfallChartSpecTransformer, 
        this.type = "waterfall", this.seriesType = SeriesTypeEnum.waterfall;
    }
}

WaterfallChart.type = "waterfall", WaterfallChart.seriesType = SeriesTypeEnum.waterfall, 
WaterfallChart.transformerConstructor = WaterfallChartSpecTransformer;

export const registerWaterfallChart = () => {
    registerWaterfallSeries(), Factory.registerChart(WaterfallChart.type, WaterfallChart);
};
//# sourceMappingURL=waterfall.js.map
