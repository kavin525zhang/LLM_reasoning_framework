import { registerCorrelationSeries } from "../../series/correlation/correlation";

import { BaseChart } from "../base/base-chart";

import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { CorrelationChartSpecTransformer } from "./correlation-transformer";

export class CorrelationChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = CorrelationChartSpecTransformer, 
        this.type = "correlation", this.seriesType = SeriesTypeEnum.correlation;
    }
}

CorrelationChart.type = "correlation", CorrelationChart.seriesType = SeriesTypeEnum.correlation, 
CorrelationChart.transformerConstructor = CorrelationChartSpecTransformer;

export const registerCorrelationChart = () => {
    registerCorrelationSeries(), Factory.registerChart(CorrelationChart.type, CorrelationChart);
};
//# sourceMappingURL=correlation.js.map
