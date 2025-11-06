import { registerGaugePointerSeries, registerGaugeSeries } from "../../series/gauge";

import { registerCircularProgressSeries } from "../../series/progress/circular/circular";

import { SeriesTypeEnum } from "../../series/interface/type";

import { Factory } from "../../core/factory";

import { GaugeChartSpecTransformer } from "./gauge-transformer";

import { BaseChart } from "../base";

export class GaugeChart extends BaseChart {
    constructor() {
        super(...arguments), this.transformerConstructor = GaugeChartSpecTransformer, this.type = "gauge", 
        this.seriesType = SeriesTypeEnum.gaugePointer;
    }
}

GaugeChart.type = "gauge", GaugeChart.seriesType = SeriesTypeEnum.gaugePointer, 
GaugeChart.transformerConstructor = GaugeChartSpecTransformer;

export const registerGaugeChart = () => {
    registerGaugePointerSeries(), registerGaugeSeries(), registerCircularProgressSeries(), 
    Factory.registerChart(GaugeChart.type, GaugeChart);
};
//# sourceMappingURL=gauge.js.map
