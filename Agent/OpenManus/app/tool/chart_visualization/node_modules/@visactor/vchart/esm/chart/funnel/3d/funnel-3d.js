import { SeriesTypeEnum } from "../../../series/interface/type";

import { registerFunnel3dSeries } from "../../../series/funnel/3d/funnel-3d";

import { Factory } from "../../../core/factory";

import { FunnelChartSpecTransformer } from "../funnel-transformer";

import { BaseChart } from "../../base";

import { register3DPlugin } from "../../../plugin/other";

export class Funnel3dChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = FunnelChartSpecTransformer, this.type = "funnel3d", 
        this.seriesType = SeriesTypeEnum.funnel3d;
    }
}

Funnel3dChart.type = "funnel3d", Funnel3dChart.seriesType = SeriesTypeEnum.funnel3d, 
Funnel3dChart.transformerConstructor = FunnelChartSpecTransformer;

export const registerFunnel3dChart = () => {
    register3DPlugin(), registerFunnel3dSeries(), Factory.registerChart(Funnel3dChart.type, Funnel3dChart);
};
//# sourceMappingURL=funnel-3d.js.map
