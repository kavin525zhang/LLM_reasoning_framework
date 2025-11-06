"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseLinePicker = void 0;

const vrender_core_1 = require("@visactor/vrender-core");

class BaseLinePicker extends vrender_core_1.BaseRender {
    contains(graphic, point, params) {
        if (!graphic.AABBBounds.containsPoint(point)) return !1;
        if ("imprecise" === graphic.attribute.pickMode) return !0;
        const {pickContext: pickContext} = null != params ? params : {};
        if (!pickContext) return !1;
        pickContext.highPerformanceSave();
        const lineAttribute = graphic.getGraphicTheme(), data = this.transform(graphic, lineAttribute, pickContext), {x: x, y: y, z: z, lastModelMatrix: lastModelMatrix} = data;
        let pickPoint = point;
        if (pickContext.camera) {
            pickPoint = point.clone();
            const globalMatrix = graphic.parent.globalTransMatrix;
            pickPoint.x = globalMatrix.a * point.x + globalMatrix.c * point.y + globalMatrix.e, 
            pickPoint.y = globalMatrix.b * point.x + globalMatrix.d * point.y + globalMatrix.f;
        }
        this.canvasRenderer.z = z;
        let picked = !1;
        return this.canvasRenderer.drawShape(graphic, pickContext, x, y, {}, null, (context => !!picked || (picked = context.isPointInPath(pickPoint.x, pickPoint.y), 
        picked)), ((context, lineAttribute, themeAttribute) => {
            if (picked) return !0;
            const lineWidth = lineAttribute.lineWidth || themeAttribute.lineWidth, pickStrokeBuffer = lineAttribute.pickStrokeBuffer || themeAttribute.pickStrokeBuffer, keepStrokeScale = lineAttribute.keepStrokeScale || themeAttribute.keepStrokeScale;
            return pickContext.lineWidth = keepStrokeScale ? lineWidth + pickStrokeBuffer : (0, 
            vrender_core_1.getScaledStroke)(pickContext, lineWidth + pickStrokeBuffer, pickContext.dpr), 
            picked = context.isPointInStroke(pickPoint.x, pickPoint.y), picked;
        })), this.canvasRenderer.z = 0, pickContext.modelMatrix !== lastModelMatrix && vrender_core_1.mat4Allocate.free(pickContext.modelMatrix), 
        pickContext.modelMatrix = lastModelMatrix, pickContext.highPerformanceRestore(), 
        picked;
    }
}

exports.BaseLinePicker = BaseLinePicker;
//# sourceMappingURL=base-line-picker.js.map
