import { SeriesTypeEnum } from "../../../series/interface/type";

import { Factory } from "../../../core/factory";

import { registerRangeColumn3dSeries } from "../../../series/range-column/3d/range-column-3d";

import { RangeColumn3dChartSpecTransformer } from "./range-column-3d-transformer";

import { BaseChart } from "../../base";

import { register3DPlugin } from "../../../plugin/other";

export class RangeColumn3dChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = RangeColumn3dChartSpecTransformer, 
        this.type = "rangeColumn3d", this.seriesType = SeriesTypeEnum.rangeColumn3d;
    }
}

RangeColumn3dChart.type = "rangeColumn3d", RangeColumn3dChart.seriesType = SeriesTypeEnum.rangeColumn3d, 
RangeColumn3dChart.transformerConstructor = RangeColumn3dChartSpecTransformer;

export const registerRangeColumn3dChart = () => {
    register3DPlugin(), registerRangeColumn3dSeries(), Factory.registerChart(RangeColumn3dChart.type, RangeColumn3dChart);
};
//# sourceMappingURL=range-column-3d.js.map
