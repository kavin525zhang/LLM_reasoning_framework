import { registerAreaSeries } from "../../series/area/area";

import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { AreaChartSpecTransformer } from "./area-transformer";

import { BaseChart } from "../base";

import { mixin } from "@visactor/vutils";

import { StackChartMixin } from "../stack";

export class AreaChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = AreaChartSpecTransformer, this.type = "area", 
        this.seriesType = SeriesTypeEnum.area;
    }
}

AreaChart.type = "area", AreaChart.seriesType = SeriesTypeEnum.area, AreaChart.transformerConstructor = AreaChartSpecTransformer, 
mixin(AreaChart, StackChartMixin);

export const registerAreaChart = () => {
    registerAreaSeries(), Factory.registerChart(AreaChart.type, AreaChart);
};
//# sourceMappingURL=area.js.map
