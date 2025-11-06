import { FunnelSeriesSpecTransformer } from "../funnel-transformer";

export class Funnel3dSeriesSpecTransformer extends FunnelSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "funnel3d"), spec.isTransform && this._addMarkLabelSpec(spec, "transform3d", "transformLabel");
    }
}
//# sourceMappingURL=funnel-3d-transformer.js.map
