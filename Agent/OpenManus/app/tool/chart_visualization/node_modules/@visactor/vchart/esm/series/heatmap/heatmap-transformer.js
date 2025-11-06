import { BaseSeriesSpecTransformer } from "../base";

export class HeatmapSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "cell");
    }
}
//# sourceMappingURL=heatmap-transformer.js.map
