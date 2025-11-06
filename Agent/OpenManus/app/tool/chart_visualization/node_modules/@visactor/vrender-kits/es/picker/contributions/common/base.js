import { getScaledStroke } from "@visactor/vrender-core";

export class PickerBase {
    contains(graphic, point, params) {
        if (!graphic.AABBBounds.containsPoint(point)) return !1;
        if ("imprecise" === graphic.attribute.pickMode) return !0;
        if (!this.canvasRenderer) return !0;
        const {pickContext: pickContext} = null != params ? params : {};
        if (!pickContext) return !1;
        const attribute = graphic.getGraphicTheme();
        pickContext.highPerformanceSave();
        let {x: x = attribute.x, y: y = attribute.y} = graphic.attribute;
        if (graphic.transMatrix.onlyTranslate()) {
            const point = graphic.getOffsetXY(attribute);
            x += point.x, y += point.y, pickContext.setTransformForCurrent();
        } else x = 0, y = 0, pickContext.transformFromMatrix(graphic.transMatrix, !0);
        let picked = !1, _final = !1;
        return this.canvasRenderer.drawShape(graphic, pickContext, x, y, {}, null, ((context, arcAttribute, themeAttribute, final) => !(!picked && !_final) || (picked = context.isPointInPath(point.x, point.y), 
        _final = final || _final, picked)), ((context, arcAttribute, themeAttribute, final) => {
            if (picked || _final) return !0;
            const lineWidth = arcAttribute.lineWidth || themeAttribute.lineWidth, pickStrokeBuffer = arcAttribute.pickStrokeBuffer || themeAttribute.pickStrokeBuffer, keepStrokeScale = arcAttribute.keepStrokeScale || themeAttribute.keepStrokeScale;
            return pickContext.lineWidth = keepStrokeScale ? lineWidth + pickStrokeBuffer : getScaledStroke(pickContext, lineWidth + pickStrokeBuffer, pickContext.dpr), 
            picked = context.isPointInStroke(point.x, point.y), _final = final || _final, picked;
        })), pickContext.highPerformanceRestore(), picked;
    }
}
//# sourceMappingURL=base.js.map
