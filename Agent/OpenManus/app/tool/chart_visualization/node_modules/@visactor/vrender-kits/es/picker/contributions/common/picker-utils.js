import { getScaledStroke } from "@visactor/vrender-core";

export const commonStrokeCb = (context, pickContext, symbolAttribute, themeAttribute, pickPoint) => {
    const lineWidth = symbolAttribute.lineWidth || themeAttribute.lineWidth, pickStrokeBuffer = symbolAttribute.pickStrokeBuffer || themeAttribute.pickStrokeBuffer, keepStrokeScale = symbolAttribute.keepStrokeScale || themeAttribute.keepStrokeScale;
    return pickContext.lineWidth = keepStrokeScale ? lineWidth + pickStrokeBuffer : getScaledStroke(pickContext, lineWidth + pickStrokeBuffer, pickContext.dpr), 
    context.isPointInStroke(pickPoint.x, pickPoint.y);
};
//# sourceMappingURL=picker-utils.js.map
