import { SeriesTypeEnum } from "../../series/interface/type";

import { registerRangeAreaSeries } from "../../series/range-area/range-area";

import { Factory } from "../../core/factory";

import { RangeAreaChartSpecTransformer } from "./range-area-transformer";

import { BaseChart } from "../base";

export class RangeAreaChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = RangeAreaChartSpecTransformer, 
        this.type = "rangeArea", this.seriesType = SeriesTypeEnum.rangeArea;
    }
}

RangeAreaChart.type = "rangeArea", RangeAreaChart.seriesType = SeriesTypeEnum.rangeArea, 
RangeAreaChart.transformerConstructor = RangeAreaChartSpecTransformer;

export const registerRangeAreaChart = () => {
    registerRangeAreaSeries(), Factory.registerChart(RangeAreaChart.type, RangeAreaChart);
};
//# sourceMappingURL=range-area.js.map
