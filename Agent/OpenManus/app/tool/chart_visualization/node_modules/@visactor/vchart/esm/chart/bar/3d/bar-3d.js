import { registerBar3dSeries } from "../../../series/bar/bar-3d";

import { SeriesTypeEnum } from "../../../series/interface/type";

import { Factory } from "../../../core/factory";

import { BarChart } from "../bar";

import { Bar3dChartSpecTransformer } from "./bar-3d-transformer";

import { register3DPlugin } from "../../../plugin/other";

export class Bar3dChart extends BarChart {
    constructor() {
        super(...arguments), this.transformerConstructor = Bar3dChartSpecTransformer, this.type = "bar3d", 
        this.seriesType = SeriesTypeEnum.bar3d;
    }
}

Bar3dChart.type = "bar3d", Bar3dChart.seriesType = SeriesTypeEnum.bar3d, Bar3dChart.transformerConstructor = Bar3dChartSpecTransformer;

export const registerBar3dChart = () => {
    register3DPlugin(), registerBar3dSeries(), Factory.registerChart(Bar3dChart.type, Bar3dChart);
};
//# sourceMappingURL=bar-3d.js.map
