import { BaseSeriesSpecTransformer } from "../base";

export class BarSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    constructor() {
        super(...arguments), this._supportStack = !0;
    }
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "bar");
    }
}
//# sourceMappingURL=bar-transformer.js.map
