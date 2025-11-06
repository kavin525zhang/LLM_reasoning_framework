import { isValid } from "@visactor/vutils";

import { LineLikeSeriesSpecTransformer } from "../mixin/line-mixin-transformer";

import { mergeSpec } from "@visactor/vutils-extension";

export class AreaSeriesSpecTransformer extends LineLikeSeriesSpecTransformer {
    constructor() {
        super(...arguments), this._supportStack = !0;
    }
    _transformLabelSpec(spec) {
        var _a, _b, _c;
        const isPointVisible = !1 !== (null === (_a = spec.point) || void 0 === _a ? void 0 : _a.visible) && !1 !== (null === (_c = null === (_b = spec.point) || void 0 === _b ? void 0 : _b.style) || void 0 === _c ? void 0 : _c.visible);
        this._addMarkLabelSpec(spec, (spec => {
            const isAreaMiddle = "inside-middle" === spec.position;
            return !isPointVisible || isAreaMiddle ? "area" : "point";
        })), this._addMarkLabelSpec(spec, "area", "areaLabel", "initLineLabelMarkStyle", void 0, !0);
    }
    _transformSpecAfterMergingTheme(spec, chartSpec, chartSpecInfo) {
        var _a, _b, _c, _d, _e;
        super._transformSpecAfterMergingTheme(spec, chartSpec, chartSpecInfo);
        const {area: area = {}, line: line = {}, seriesMark: seriesMark} = spec, isAreaVisible = !1 !== area.visible && !1 !== (null === (_a = area.style) || void 0 === _a ? void 0 : _a.visible), isLineVisible = !1 !== line.visible && !1 !== (null === (_b = line.style) || void 0 === _b ? void 0 : _b.visible);
        area.support3d = !(!area.support3d && !line.support3d), area.zIndex = isValid(area.zIndex) || isValid(line.zIndex) ? Math.max(null !== (_c = area.zIndex) && void 0 !== _c ? _c : 0, null !== (_d = line.zIndex) && void 0 !== _d ? _d : 0) : void 0, 
        area.style && delete area.style.stroke, area.state && Object.keys(area.state).forEach((state => {
            "style" in area.state[state] ? delete area.state[state].style.stroke : delete area.state[state].stroke;
        }));
        let mainSpec = area, subSpec = line;
        ("line" === seriesMark || isLineVisible && !isAreaVisible) && (mainSpec = line, 
        subSpec = area), area.style = mergeSpec({}, subSpec.style, mainSpec.style), area.state = mergeSpec({}, subSpec.state, mainSpec.state), 
        !1 === area.interactive && (area.style.fillPickable = !1), !1 === line.interactive && (line.style.strokePickable = !1), 
        area.interactive = !(!area.interactive && null !== (_e = line.interactive) && void 0 !== _e && !_e), 
        spec.area = area, spec.line = line;
    }
}
//# sourceMappingURL=area-transformer.js.map
