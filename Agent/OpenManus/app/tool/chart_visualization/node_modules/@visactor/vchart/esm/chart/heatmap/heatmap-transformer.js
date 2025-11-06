import { CartesianChartSpecTransformer } from "../cartesian";

export class HeatmapChartSpecTransformer extends CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "valueField", "cell" ]);
    }
}
//# sourceMappingURL=heatmap-transformer.js.map
