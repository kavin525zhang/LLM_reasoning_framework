import { BaseRender, mat4Allocate } from "@visactor/vrender-core";

export class Base3dPicker extends BaseRender {
    contains(graphic, point, params) {
        const {pickContext: pickContext} = null != params ? params : {};
        if (!pickContext) return !1;
        const attribute = graphic.getGraphicTheme();
        pickContext.highPerformanceSave();
        const data = this.transform(graphic, attribute, pickContext), {x: x, y: y, z: z, lastModelMatrix: lastModelMatrix} = data;
        let pickPoint = point;
        if (pickContext.camera) {
            pickPoint = point.clone();
            const globalMatrix = graphic.parent.globalTransMatrix;
            pickPoint.x = globalMatrix.a * point.x + globalMatrix.c * point.y + globalMatrix.e, 
            pickPoint.y = globalMatrix.b * point.x + globalMatrix.d * point.y + globalMatrix.f;
        }
        this.canvasRenderer.z = z;
        let picked = !1;
        return this.canvasRenderer.drawShape(graphic, pickContext, x, y, params, null, ((context, arc3dAttribute, themeAttribute) => !!picked || (picked = context.isPointInPath(pickPoint.x, pickPoint.y), 
        picked))), this.canvasRenderer.z = 0, pickContext.modelMatrix !== lastModelMatrix && mat4Allocate.free(pickContext.modelMatrix), 
        pickContext.modelMatrix = lastModelMatrix, pickContext.highPerformanceRestore(), 
        picked;
    }
}
//# sourceMappingURL=base-3d-picker.js.map
