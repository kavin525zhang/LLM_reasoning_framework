import { GLYPH_NUMBER_TYPE } from "@visactor/vrender-core";

export class GlyphPickerBase {
    constructor() {
        this.type = "glyph", this.numberType = GLYPH_NUMBER_TYPE;
    }
    contains(glyph, point, params) {
        if (!glyph.AABBBounds.containsPoint(point)) return !1;
        if ("imprecise" === glyph.attribute.pickMode) return !0;
        const {pickContext: pickContext} = null != params ? params : {};
        if (!pickContext) return !1;
        const pickerService = null == params ? void 0 : params.pickerService;
        if (pickerService) {
            let picked = !1;
            return glyph.getSubGraphic().forEach((g => {
                if (picked) return;
                const data = pickerService.pickItem(g, point, null, params);
                picked = !(!data || !data.graphic);
            })), picked;
        }
        return !1;
    }
}
//# sourceMappingURL=glyph-picker-base.js.map
