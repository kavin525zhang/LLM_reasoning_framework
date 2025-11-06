import { BarSeriesSpecTransformer } from "./bar-transformer";

export class Bar3dSeriesSpecTransformer extends BarSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "bar3d");
    }
}
//# sourceMappingURL=bar-3d-transformer.js.map
