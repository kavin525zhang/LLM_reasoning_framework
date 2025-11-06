import { SeriesTypeEnum } from "../../../series/interface/type";

import { registerCircularProgressSeries } from "../../../series/progress/circular";

import { Factory } from "../../../core/factory";

import { CircularProgressChartSpecTransformer } from "./circular-progress-transformer";

import { BaseChart } from "../../base";

import { StackChartMixin } from "../../stack";

import { mixin } from "@visactor/vutils";

export class CircularProgressChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = CircularProgressChartSpecTransformer, 
        this.type = "circularProgress", this.seriesType = SeriesTypeEnum.circularProgress;
    }
}

CircularProgressChart.type = "circularProgress", CircularProgressChart.seriesType = SeriesTypeEnum.circularProgress, 
CircularProgressChart.transformerConstructor = CircularProgressChartSpecTransformer, 
mixin(CircularProgressChart, StackChartMixin);

export const registerCircularProgressChart = () => {
    registerCircularProgressSeries(), Factory.registerChart(CircularProgressChart.type, CircularProgressChart);
};
//# sourceMappingURL=circular.js.map
