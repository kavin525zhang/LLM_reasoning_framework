import { registerBarSeries } from "../../series/bar/bar";

import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { BarChartSpecTransformer } from "./bar-transformer";

import { BaseChart } from "../base";

import { mixin } from "@visactor/vutils";

import { StackChartMixin } from "../stack";

export class BarChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = BarChartSpecTransformer, this.type = "bar", 
        this.seriesType = SeriesTypeEnum.bar;
    }
}

BarChart.type = "bar", BarChart.seriesType = SeriesTypeEnum.bar, BarChart.transformerConstructor = BarChartSpecTransformer, 
mixin(BarChart, StackChartMixin);

export const registerBarChart = () => {
    registerBarSeries(), Factory.registerChart(BarChart.type, BarChart);
};
//# sourceMappingURL=bar.js.map
