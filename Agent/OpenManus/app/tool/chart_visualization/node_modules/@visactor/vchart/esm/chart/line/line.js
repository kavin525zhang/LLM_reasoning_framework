import { SeriesTypeEnum } from "../../series/interface/type";

import { registerLineSeries } from "../../series/line/line";

import { Factory } from "../../core/factory";

import { LineChartSpecTransformer } from "./line-transformer";

import { BaseChart } from "../base";

import { StackChartMixin } from "../stack";

import { mixin } from "@visactor/vutils";

export class LineChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = LineChartSpecTransformer, this.type = "line", 
        this.seriesType = SeriesTypeEnum.line;
    }
}

LineChart.type = "line", LineChart.seriesType = SeriesTypeEnum.line, LineChart.transformerConstructor = LineChartSpecTransformer, 
mixin(LineChart, StackChartMixin);

export const registerLineChart = () => {
    registerLineSeries(), Factory.registerChart(LineChart.type, LineChart);
};
//# sourceMappingURL=line.js.map
