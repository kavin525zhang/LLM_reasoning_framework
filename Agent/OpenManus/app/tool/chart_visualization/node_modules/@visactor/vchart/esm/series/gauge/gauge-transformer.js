import { BaseSeriesSpecTransformer } from "../base";

export class GaugeSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    constructor() {
        super(...arguments), this._supportStack = !1;
    }
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "segment");
    }
}
//# sourceMappingURL=gauge-transformer.js.map
