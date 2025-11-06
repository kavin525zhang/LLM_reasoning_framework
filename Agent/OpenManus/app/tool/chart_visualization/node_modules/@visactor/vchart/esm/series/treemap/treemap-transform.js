import { BaseSeriesSpecTransformer } from "../base";

export class TreemapSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "nonLeaf", "nonLeafLabel", "initNonLeafLabelMarkStyle"), 
        this._addMarkLabelSpec(spec, "leaf");
    }
}
//# sourceMappingURL=treemap-transform.js.map
