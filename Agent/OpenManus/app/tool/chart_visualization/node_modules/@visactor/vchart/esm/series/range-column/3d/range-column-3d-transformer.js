import { RangeColumnSeriesSpecTransformer } from "../range-column-transformer";

export class RangeColumn3dSeriesSpecTransformer extends RangeColumnSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        var _a;
        "bothEnd" !== (null === (_a = spec.label) || void 0 === _a ? void 0 : _a.position) && this._addMarkLabelSpec(spec, "bar3d");
    }
}
//# sourceMappingURL=range-column-3d-transformer.js.map
