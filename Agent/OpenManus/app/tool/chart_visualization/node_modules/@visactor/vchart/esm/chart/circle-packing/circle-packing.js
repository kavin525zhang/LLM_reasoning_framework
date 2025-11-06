import { SeriesTypeEnum } from "../../series/interface/type";

import { BaseChart } from "../base/base-chart";

import { registerCirclePackingSeries } from "../../series/circle-packing/circle-packing";

import { Factory } from "../../core/factory";

import { CirclePackingChartSpecTransformer } from "./circle-packing-transformer";

export class CirclePackingChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = CirclePackingChartSpecTransformer, 
        this.type = "circlePacking", this.seriesType = SeriesTypeEnum.circlePacking;
    }
}

CirclePackingChart.type = "circlePacking", CirclePackingChart.seriesType = SeriesTypeEnum.circlePacking, 
CirclePackingChart.transformerConstructor = CirclePackingChartSpecTransformer;

export const registerCirclePackingChart = () => {
    registerCirclePackingSeries(), Factory.registerChart(CirclePackingChart.type, CirclePackingChart);
};
//# sourceMappingURL=circle-packing.js.map
