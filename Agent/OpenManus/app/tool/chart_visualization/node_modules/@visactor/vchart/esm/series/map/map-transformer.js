import { BaseSeriesSpecTransformer } from "../base";

export class MapSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "area", void 0, void 0, !1);
    }
}
//# sourceMappingURL=map-transformer.js.map
