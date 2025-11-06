import { BaseSeriesSpecTransformer } from "../base";

export class SankeySeriesSpecTransformer extends BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "node");
    }
}
//# sourceMappingURL=sankey-transformer.js.map
