import { SeriesTypeEnum } from "../../series/interface/type";

import { BaseChart } from "../base/base-chart";

import { registerVennSeries } from "../../series/venn/venn";

import { Factory } from "../../core/factory";

import { VennChartSpecTransformer } from "./venn-transformer";

export class VennChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = VennChartSpecTransformer, this.type = "venn", 
        this.seriesType = SeriesTypeEnum.venn;
    }
}

VennChart.type = "venn", VennChart.seriesType = SeriesTypeEnum.venn, VennChart.transformerConstructor = VennChartSpecTransformer;

export const registerVennChart = () => {
    registerVennSeries(), Factory.registerChart(VennChart.type, VennChart);
};
//# sourceMappingURL=venn.js.map
