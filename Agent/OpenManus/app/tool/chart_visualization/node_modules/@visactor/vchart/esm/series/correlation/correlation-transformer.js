import { BaseSeriesSpecTransformer } from "../base";

export class CorrelationSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "nodePoint"), this._addMarkLabelSpec(spec, "centerPoint", "centerLabel");
    }
}
//# sourceMappingURL=correlation-transformer.js.map
