import { registerBar3dSeries } from "../../../series/bar/bar-3d";

import { SeriesTypeEnum } from "../../../series/interface/type";

import { BaseHistogramChart } from "../base/base";

import { Factory } from "../../../core/factory";

import { HistogramChartSpecTransformer } from "../histogram-transformer";

import { register3DPlugin } from "../../../plugin/other";

export class Histogram3dChart extends BaseHistogramChart {
    constructor() {
        super(...arguments), this.transformerConstructor = HistogramChartSpecTransformer, 
        this.type = "histogram3d", this.seriesType = SeriesTypeEnum.bar3d;
    }
}

Histogram3dChart.type = "histogram3d", Histogram3dChart.seriesType = SeriesTypeEnum.bar3d, 
Histogram3dChart.transformerConstructor = HistogramChartSpecTransformer;

export const registerHistogram3dChart = () => {
    register3DPlugin(), registerBar3dSeries(), Factory.registerChart(Histogram3dChart.type, Histogram3dChart);
};
//# sourceMappingURL=histogram-3d.js.map
