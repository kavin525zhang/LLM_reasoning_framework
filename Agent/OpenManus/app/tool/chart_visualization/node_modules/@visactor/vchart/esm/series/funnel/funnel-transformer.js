import { BaseSeriesSpecTransformer } from "../base";

export class FunnelSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "funnel"), spec.isTransform && this._addMarkLabelSpec(spec, "transform", "transformLabel");
    }
}
//# sourceMappingURL=funnel-transformer.js.map
