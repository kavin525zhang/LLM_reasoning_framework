import { SeriesTypeEnum } from "../../../series/interface/type";

import { BaseWordCloudChart } from "../base/base";

import { registerWordCloud3dSeries, registerWordCloudShape3dSeries } from "../../../series/word-cloud/word-cloud-3d";

import { Factory } from "../../../core/factory";

import { WordCloud3dChartSpecTransformer } from "./word-cloud-3d-transformer";

import { register3DPlugin } from "../../../plugin/other";

export class WordCloud3dChart extends BaseWordCloudChart {
    constructor() {
        super(...arguments), this.transformerConstructor = WordCloud3dChartSpecTransformer, 
        this.type = "wordCloud3d", this.seriesType = SeriesTypeEnum.wordCloud3d;
    }
}

WordCloud3dChart.type = "wordCloud3d", WordCloud3dChart.seriesType = SeriesTypeEnum.wordCloud3d, 
WordCloud3dChart.transformerConstructor = WordCloud3dChartSpecTransformer;

export const registerWordCloud3dChart = () => {
    register3DPlugin(), registerWordCloud3dSeries(), Factory.registerChart(WordCloud3dChart.type, WordCloud3dChart);
};

export const registerWordCloudShape3dChart = () => {
    register3DPlugin(), registerWordCloudShape3dSeries(), register3DPlugin(), registerWordCloud3dSeries(), 
    Factory.registerChart(WordCloud3dChart.type, WordCloud3dChart);
};
//# sourceMappingURL=word-cloud-3d.js.map
