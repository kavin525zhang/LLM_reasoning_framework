import { BaseSeriesSpecTransformer } from "../base";

export class ScatterSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "point");
    }
}
//# sourceMappingURL=scatter-transformer.js.map
