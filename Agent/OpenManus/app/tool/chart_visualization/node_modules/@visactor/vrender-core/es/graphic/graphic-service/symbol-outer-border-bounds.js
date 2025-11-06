import { boundStroke } from "../tools";

export const updateBoundsOfSymbolOuterBorder = (attribute, symbolTheme, aabbBounds) => {
    const {outerBorder: outerBorder, shadowBlur: shadowBlur = symbolTheme.shadowBlur, strokeBoundsBuffer: strokeBoundsBuffer = symbolTheme.strokeBoundsBuffer} = attribute;
    if (outerBorder) {
        const defaultOuterBorder = symbolTheme.outerBorder, {distance: distance = defaultOuterBorder.distance, lineWidth: lineWidth = defaultOuterBorder.lineWidth} = outerBorder;
        boundStroke(aabbBounds, distance + (shadowBlur + lineWidth) / 2, !0, strokeBoundsBuffer);
    }
    return aabbBounds;
};
//# sourceMappingURL=symbol-outer-border-bounds.js.map
