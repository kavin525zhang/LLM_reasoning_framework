"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.updateBoundsOfSymbolOuterBorder = void 0;

const tools_1 = require("../tools"), updateBoundsOfSymbolOuterBorder = (attribute, symbolTheme, aabbBounds) => {
    const {outerBorder: outerBorder, shadowBlur: shadowBlur = symbolTheme.shadowBlur, strokeBoundsBuffer: strokeBoundsBuffer = symbolTheme.strokeBoundsBuffer} = attribute;
    if (outerBorder) {
        const defaultOuterBorder = symbolTheme.outerBorder, {distance: distance = defaultOuterBorder.distance, lineWidth: lineWidth = defaultOuterBorder.lineWidth} = outerBorder;
        (0, tools_1.boundStroke)(aabbBounds, distance + (shadowBlur + lineWidth) / 2, !0, strokeBoundsBuffer);
    }
    return aabbBounds;
};

exports.updateBoundsOfSymbolOuterBorder = updateBoundsOfSymbolOuterBorder;
//# sourceMappingURL=symbol-outer-border-bounds.js.map
