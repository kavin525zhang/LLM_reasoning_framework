import { registerMapSeries } from "../../series/map/map";

import { BaseChart } from "../base/base-chart";

import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { MapChartSpecTransformer } from "./map-transformer";

export class MapChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = MapChartSpecTransformer, this.type = "map", 
        this.seriesType = SeriesTypeEnum.map;
    }
}

MapChart.type = "map", MapChart.seriesType = SeriesTypeEnum.map, MapChart.transformerConstructor = MapChartSpecTransformer;

export const registerMapChart = () => {
    registerMapSeries(), Factory.registerChart(MapChart.type, MapChart);
};
//# sourceMappingURL=map.js.map
