import { BarSeriesSpecTransformer } from "../bar/bar-transformer";

export class WaterfallSeriesSpecTransformer extends BarSeriesSpecTransformer {
    constructor() {
        super(...arguments), this._supportStack = !1;
    }
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "bar"), this._addMarkLabelSpec(spec, "bar", "stackLabel", "initStackLabelMarkStyle");
    }
}
//# sourceMappingURL=waterfall-transformer.js.map
