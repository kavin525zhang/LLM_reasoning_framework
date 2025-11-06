import { SeriesTypeEnum } from "../../series/interface/type";

import { BaseWordCloudChart } from "./base/base";

import { registerWordCloudSeries, registerWordCloudShapeSeries } from "../../series/word-cloud/word-cloud";

import { Factory } from "../../core/factory";

import { BaseWordCloudChartSpecTransformer } from "./base/word-cloud-base-transformer";

export class WordCloudChart extends BaseWordCloudChart {
    constructor() {
        super(...arguments), this.transformerConstructor = BaseWordCloudChartSpecTransformer, 
        this.type = "wordCloud", this.seriesType = SeriesTypeEnum.wordCloud;
    }
}

WordCloudChart.type = "wordCloud", WordCloudChart.seriesType = SeriesTypeEnum.wordCloud, 
WordCloudChart.transformerConstructor = BaseWordCloudChartSpecTransformer;

export const registerWordCloudChart = () => {
    registerWordCloudSeries(), Factory.registerChart(WordCloudChart.type, WordCloudChart);
};

export const registerWordCloudShapeChart = () => {
    registerWordCloudShapeSeries(), registerWordCloudSeries(), Factory.registerChart(WordCloudChart.type, WordCloudChart);
};
//# sourceMappingURL=word-cloud.js.map
