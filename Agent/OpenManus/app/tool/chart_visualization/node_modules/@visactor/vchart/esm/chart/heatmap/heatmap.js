import { SeriesTypeEnum } from "../../series/interface/type";

import { registerHeatmapSeries } from "../../series/heatmap/heatmap";

import { Factory } from "../../core/factory";

import { HeatmapChartSpecTransformer } from "./heatmap-transformer";

import { BaseChart } from "../base";

export class HeatmapChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = HeatmapChartSpecTransformer, 
        this.type = "heatmap", this.seriesType = SeriesTypeEnum.heatmap;
    }
}

HeatmapChart.type = "heatmap", HeatmapChart.seriesType = SeriesTypeEnum.heatmap, 
HeatmapChart.transformerConstructor = HeatmapChartSpecTransformer;

export const registerHeatmapChart = () => {
    registerHeatmapSeries(), Factory.registerChart(HeatmapChart.type, HeatmapChart);
};
//# sourceMappingURL=heatmap.js.map
