import { BarSeriesSpecTransformer } from "../bar/bar-transformer";

export class RangeColumnSeriesSpecTransformer extends BarSeriesSpecTransformer {
    constructor() {
        super(...arguments), this._supportStack = !1;
    }
    _transformLabelSpec(spec) {
        var _a;
        "bothEnd" !== (null === (_a = spec.label) || void 0 === _a ? void 0 : _a.position) && this._addMarkLabelSpec(spec, "bar");
    }
}
//# sourceMappingURL=range-column-transformer.js.map
