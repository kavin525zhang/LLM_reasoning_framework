import { registerRoseSeries } from "../../series/rose/rose";

import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { RoseChartSpecTransformer } from "./rose-transformer";

import { BaseChart } from "../base";

import { StackChartMixin } from "../stack";

import { mixin } from "@visactor/vutils";

export class RoseChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = RoseChartSpecTransformer, this.type = "rose", 
        this.seriesType = SeriesTypeEnum.rose;
    }
}

RoseChart.type = "rose", RoseChart.seriesType = SeriesTypeEnum.rose, RoseChart.transformerConstructor = RoseChartSpecTransformer, 
mixin(RoseChart, StackChartMixin);

export const registerRoseChart = () => {
    registerRoseSeries(), Factory.registerChart(RoseChart.type, RoseChart);
};
//# sourceMappingURL=rose.js.map
