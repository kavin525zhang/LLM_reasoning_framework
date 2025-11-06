import { registerScatterSeries } from "../../series/scatter/scatter";

import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { ScatterChartSpecTransformer } from "./scatter-transformer";

import { BaseChart } from "../base";

import { StackChartMixin } from "../stack";

import { mixin } from "@visactor/vutils";

export class ScatterChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = ScatterChartSpecTransformer, 
        this.type = "scatter", this.seriesType = SeriesTypeEnum.scatter;
    }
}

ScatterChart.type = "scatter", ScatterChart.seriesType = SeriesTypeEnum.scatter, 
ScatterChart.transformerConstructor = ScatterChartSpecTransformer, mixin(ScatterChart, StackChartMixin);

export const registerScatterChart = () => {
    registerScatterSeries(), Factory.registerChart(ScatterChart.type, ScatterChart);
};
//# sourceMappingURL=scatter.js.map
