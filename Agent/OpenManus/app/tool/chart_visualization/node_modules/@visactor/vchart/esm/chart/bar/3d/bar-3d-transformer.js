import { BarChartSpecTransformer } from "../bar-transformer";

export class Bar3dChartSpecTransformer extends BarChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        const seriesSpec = super._getDefaultSeriesSpec(spec);
        return seriesSpec.barWidth = spec.barWidth, seriesSpec.barMaxWidth = spec.barMaxWidth, 
        seriesSpec.barMinWidth = spec.barMinWidth, seriesSpec.barGapInGroup = spec.barGapInGroup, 
        seriesSpec;
    }
}
//# sourceMappingURL=bar-3d-transformer.js.map
