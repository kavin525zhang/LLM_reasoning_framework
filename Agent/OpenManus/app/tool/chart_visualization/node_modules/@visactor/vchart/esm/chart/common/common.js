import { BaseChart } from "../base/base-chart";

import { Factory } from "../../core/factory";

import { CommonChartSpecTransformer } from "./common-transformer";

import { StackChartMixin } from "../stack";

import { mixin } from "@visactor/vutils";

export class CommonChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = CommonChartSpecTransformer, this.type = "common";
    }
}

CommonChart.type = "common", CommonChart.transformerConstructor = CommonChartSpecTransformer, 
mixin(CommonChart, StackChartMixin);

export const registerCommonChart = () => {
    Factory.registerChart(CommonChart.type, CommonChart);
};
//# sourceMappingURL=common.js.map
