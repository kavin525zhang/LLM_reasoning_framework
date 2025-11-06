import { BaseSeriesSpecTransformer } from "../base";

export class LineLikeSeriesSpecTransformer extends BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        var _a, _b, _c;
        !1 !== (null === (_a = spec.point) || void 0 === _a ? void 0 : _a.visible) && !1 !== (null === (_c = null === (_b = spec.point) || void 0 === _b ? void 0 : _b.style) || void 0 === _c ? void 0 : _c.visible) ? this._addMarkLabelSpec(spec, "point") : this._addMarkLabelSpec(spec, "line"), 
        this._addMarkLabelSpec(spec, "line", "lineLabel", "initLineLabelMarkStyle", void 0, !0);
    }
}
//# sourceMappingURL=line-mixin-transformer.js.map
