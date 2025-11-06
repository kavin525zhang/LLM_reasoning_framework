import { BaseSeriesSpecTransformer } from "../base";

export class RoseSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    constructor() {
        super(...arguments), this._supportStack = !0;
    }
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "rose");
    }
}
//# sourceMappingURL=rose-transformer.js.map
