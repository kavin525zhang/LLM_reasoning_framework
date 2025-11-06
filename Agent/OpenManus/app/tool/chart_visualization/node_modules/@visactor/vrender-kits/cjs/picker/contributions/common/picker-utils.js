"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.commonStrokeCb = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), commonStrokeCb = (context, pickContext, symbolAttribute, themeAttribute, pickPoint) => {
    const lineWidth = symbolAttribute.lineWidth || themeAttribute.lineWidth, pickStrokeBuffer = symbolAttribute.pickStrokeBuffer || themeAttribute.pickStrokeBuffer, keepStrokeScale = symbolAttribute.keepStrokeScale || themeAttribute.keepStrokeScale;
    return pickContext.lineWidth = keepStrokeScale ? lineWidth + pickStrokeBuffer : (0, 
    vrender_core_1.getScaledStroke)(pickContext, lineWidth + pickStrokeBuffer, pickContext.dpr), 
    context.isPointInStroke(pickPoint.x, pickPoint.y);
};

exports.commonStrokeCb = commonStrokeCb;
//# sourceMappingURL=picker-utils.js.map
