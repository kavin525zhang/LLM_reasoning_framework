import { SeriesTypeEnum } from "../../../series/interface/type";

import { registerLinearProgressSeries } from "../../../series/progress/linear";

import { Factory } from "../../../core/factory";

import { LinearProgressChartSpecTransformer } from "./linear-progress-transformer";

import { BaseChart } from "../../base";

import { StackChartMixin } from "../../stack";

import { mixin } from "@visactor/vutils";

export class LinearProgressChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = LinearProgressChartSpecTransformer, 
        this.type = "linearProgress", this.seriesType = SeriesTypeEnum.linearProgress;
    }
}

LinearProgressChart.type = "linearProgress", LinearProgressChart.seriesType = SeriesTypeEnum.linearProgress, 
LinearProgressChart.transformerConstructor = LinearProgressChartSpecTransformer, 
mixin(LinearProgressChart, StackChartMixin);

export const registerLinearProgressChart = () => {
    registerLinearProgressSeries(), Factory.registerChart(LinearProgressChart.type, LinearProgressChart);
};
//# sourceMappingURL=linear.js.map
