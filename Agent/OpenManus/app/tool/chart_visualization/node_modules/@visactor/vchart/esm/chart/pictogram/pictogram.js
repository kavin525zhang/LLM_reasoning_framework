import { BaseChart } from "../base/base-chart";

import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { PictogramChartSpecTransformer } from "./pictogram-transformer";

import { registerPictogramSeries } from "../../series/pictogram/pictogram";

export class PictogramChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = PictogramChartSpecTransformer, 
        this.type = "pictogram", this.seriesType = SeriesTypeEnum.pictogram;
    }
}

PictogramChart.type = "pictogram", PictogramChart.seriesType = SeriesTypeEnum.pictogram, 
PictogramChart.transformerConstructor = PictogramChartSpecTransformer;

export const registerPictogramChart = () => {
    registerPictogramSeries(), Factory.registerChart(PictogramChart.type, PictogramChart);
};
//# sourceMappingURL=pictogram.js.map
