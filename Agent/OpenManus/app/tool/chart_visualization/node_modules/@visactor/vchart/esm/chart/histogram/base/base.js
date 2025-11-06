import { mixin } from "@visactor/vutils";

import { BaseChart } from "../../base";

import { StackChartMixin } from "../../stack";

import { BaseHistogramChartSpecTransformer } from "./histogram-base-transformer";

export class BaseHistogramChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = BaseHistogramChartSpecTransformer;
    }
}

BaseHistogramChart.transformerConstructor = BaseHistogramChartSpecTransformer, mixin(BaseHistogramChart, StackChartMixin);
//# sourceMappingURL=base.js.map
