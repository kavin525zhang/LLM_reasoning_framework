import { BaseWordCloudChartSpecTransformer } from "../base/word-cloud-base-transformer";

export class WordCloud3dChartSpecTransformer extends BaseWordCloudChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        const series = super._getDefaultSeriesSpec(spec);
        return series.depth_3d = spec.depth_3d, series;
    }
}
//# sourceMappingURL=word-cloud-3d-transformer.js.map
