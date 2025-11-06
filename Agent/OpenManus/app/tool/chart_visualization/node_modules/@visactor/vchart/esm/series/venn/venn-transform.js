import { BaseSeriesSpecTransformer } from "../base";

export class VennSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "circle"), this._addMarkLabelSpec(spec, "overlap", "overlapLabel", "initOverlapLabelMarkStyle");
    }
}
//# sourceMappingURL=venn-transform.js.map
