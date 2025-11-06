import { registerFunnelSeries } from "./../../series/funnel/funnel";

import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { FunnelChartSpecTransformer } from "./funnel-transformer";

import { BaseChart } from "../base";

export class FunnelChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = FunnelChartSpecTransformer, this.type = "funnel", 
        this.seriesType = SeriesTypeEnum.funnel;
    }
}

FunnelChart.type = "funnel", FunnelChart.seriesType = SeriesTypeEnum.funnel, FunnelChart.transformerConstructor = FunnelChartSpecTransformer;

export const registerFunnelChart = () => {
    registerFunnelSeries(), Factory.registerChart(FunnelChart.type, FunnelChart);
};
//# sourceMappingURL=funnel.js.map
