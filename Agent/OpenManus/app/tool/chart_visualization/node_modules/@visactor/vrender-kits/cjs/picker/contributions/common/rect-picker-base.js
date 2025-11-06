"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RectPickerBase = void 0;

const vutils_1 = require("@visactor/vutils"), vrender_core_1 = require("@visactor/vrender-core"), _bounds = new vutils_1.AABBBounds;

class RectPickerBase {
    constructor() {
        this.type = "rect", this.numberType = vrender_core_1.RECT_NUMBER_TYPE;
    }
    contains(rect, point, params) {
        if (!rect.AABBBounds.containsPoint(point)) return !1;
        if ("imprecise" === rect.attribute.pickMode) return !0;
        const {pickContext: pickContext} = null != params ? params : {};
        if (!pickContext) return !1;
        const rectAttribute = rect.getGraphicTheme(), {cornerRadius: cornerRadius = rectAttribute.cornerRadius} = rect.attribute;
        let {x: x = rectAttribute.x, y: y = rectAttribute.y} = rect.attribute;
        pickContext.highPerformanceSave();
        let onlyTranslate = !0;
        if (rect.transMatrix.onlyTranslate()) {
            const point = rect.getOffsetXY(rectAttribute);
            x += point.x, y += point.y, pickContext.setTransformForCurrent();
        } else x = 0, y = 0, onlyTranslate = !1, pickContext.transformFromMatrix(rect.transMatrix, !0);
        let picked = !0;
        if (!onlyTranslate || rect.shadowRoot || (0, vutils_1.isNumber)(cornerRadius, !0) && 0 !== cornerRadius || (0, 
        vutils_1.isArray)(cornerRadius) && cornerRadius.some((num => 0 !== num))) picked = !1, 
        this.canvasRenderer.drawShape(rect, pickContext, x, y, {}, null, ((context, rectAttribute, themeAttribute) => !!picked || (picked = context.isPointInPath(point.x, point.y), 
        picked)), ((context, rectAttribute, themeAttribute) => {
            if (picked) return !0;
            const lineWidth = rectAttribute.lineWidth || themeAttribute.lineWidth, pickStrokeBuffer = rectAttribute.pickStrokeBuffer || themeAttribute.pickStrokeBuffer, keepStrokeScale = rectAttribute.keepStrokeScale || themeAttribute.keepStrokeScale;
            return pickContext.lineWidth = keepStrokeScale ? lineWidth + pickStrokeBuffer : (0, 
            vrender_core_1.getScaledStroke)(pickContext, lineWidth + pickStrokeBuffer, pickContext.dpr), 
            picked = context.isPointInStroke(point.x, point.y), picked;
        })); else {
            const {fill: fill = rectAttribute.fill, stroke: stroke = rectAttribute.stroke, lineWidth: lineWidth = rectAttribute.lineWidth} = rect.attribute;
            if (fill) picked = !0; else if (stroke) {
                const bounds = rect.AABBBounds;
                _bounds.setValue(bounds.x1, bounds.y1, bounds.x2, bounds.y2), _bounds.expand(-lineWidth / 2), 
                picked = !_bounds.containsPoint(point);
            }
        }
        return pickContext.highPerformanceRestore(), picked;
    }
}

exports.RectPickerBase = RectPickerBase;
//# sourceMappingURL=rect-picker-base.js.map
