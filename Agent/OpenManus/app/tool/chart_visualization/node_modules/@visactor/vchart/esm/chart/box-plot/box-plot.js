import { SeriesTypeEnum } from "../../series/interface/type";

import { registerBoxplotSeries } from "../../series/box-plot/box-plot";

import { Factory } from "../../core/factory";

import { BoxPlotChartSpecTransformer } from "./box-plot-transformer";

import { BaseChart } from "../base";

export class BoxPlotChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = BoxPlotChartSpecTransformer, 
        this.type = "boxPlot", this.seriesType = SeriesTypeEnum.boxPlot;
    }
}

BoxPlotChart.type = "boxPlot", BoxPlotChart.seriesType = SeriesTypeEnum.boxPlot, 
BoxPlotChart.transformerConstructor = BoxPlotChartSpecTransformer;

export const registerBoxplotChart = () => {
    registerBoxplotSeries(), Factory.registerChart(BoxPlotChart.type, BoxPlotChart);
};
//# sourceMappingURL=box-plot.js.map
