"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.GlyphPickerBase = void 0;

const vrender_core_1 = require("@visactor/vrender-core");

class GlyphPickerBase {
    constructor() {
        this.type = "glyph", this.numberType = vrender_core_1.GLYPH_NUMBER_TYPE;
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

exports.GlyphPickerBase = GlyphPickerBase;
//# sourceMappingURL=glyph-picker-base.js.map
