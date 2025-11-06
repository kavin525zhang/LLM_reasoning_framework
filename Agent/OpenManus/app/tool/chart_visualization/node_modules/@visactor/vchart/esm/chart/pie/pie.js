import { registerPieSeries } from "../../series/pie/pie";

import { SeriesTypeEnum } from "../../series/interface/type";

import { BasePieChart } from "./base/base";

import { Factory } from "../../core/factory";

import { BasePieChartSpecTransformer } from "./base";

export class PieChart extends BasePieChart {
    constructor() {
        super(...arguments), this.transformerConstructor = BasePieChartSpecTransformer, 
        this.type = "pie", this.seriesType = SeriesTypeEnum.pie;
    }
}

PieChart.type = "pie", PieChart.seriesType = SeriesTypeEnum.pie, PieChart.transformerConstructor = BasePieChartSpecTransformer;

export const registerPieChart = () => {
    registerPieSeries(), Factory.registerChart(PieChart.type, PieChart);
};
//# sourceMappingURL=pie.js.map
