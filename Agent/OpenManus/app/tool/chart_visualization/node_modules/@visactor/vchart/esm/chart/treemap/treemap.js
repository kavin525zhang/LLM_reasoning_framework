import { SeriesTypeEnum } from "../../series/interface/type";

import { BaseChart } from "../base/base-chart";

import { registerTreemapSeries } from "../../series/treemap/treemap";

import { Factory } from "../../core/factory";

import { TreemapChartSpecTransformer } from "./treemap-transformer";

export class TreemapChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = TreemapChartSpecTransformer, 
        this.type = "treemap", this.seriesType = SeriesTypeEnum.treemap;
    }
}

TreemapChart.type = "treemap", TreemapChart.seriesType = SeriesTypeEnum.treemap, 
TreemapChart.transformerConstructor = TreemapChartSpecTransformer;

export const registerTreemapChart = () => {
    registerTreemapSeries(), Factory.registerChart(TreemapChart.type, TreemapChart);
};
//# sourceMappingURL=treemap.js.map
