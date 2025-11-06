import { registerBarSeries } from "../../series/bar/bar";

import { SeriesTypeEnum } from "../../series/interface/type";

import { BaseHistogramChart } from "./base/base";

import { Factory } from "../../core/factory";

import { HistogramChartSpecTransformer } from "./histogram-transformer";

export class HistogramChart extends BaseHistogramChart {
    constructor() {
        super(...arguments), this.transformerConstructor = HistogramChartSpecTransformer, 
        this.type = "histogram", this.seriesType = SeriesTypeEnum.bar;
    }
}

HistogramChart.type = "histogram", HistogramChart.seriesType = SeriesTypeEnum.bar, 
HistogramChart.transformerConstructor = HistogramChartSpecTransformer;

export const registerHistogramChart = () => {
    registerBarSeries(), Factory.registerChart(HistogramChart.type, HistogramChart);
};
//# sourceMappingURL=histogram.js.map
