"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.updateBoundsOfCommonOuterBorder = void 0;

const updateBoundsOfCommonOuterBorder = (attribute, theme, aabbBounds) => {
    const {outerBorder: outerBorder, shadowBlur: shadowBlur = theme.shadowBlur} = attribute;
    if (outerBorder) {
        const defaultOuterBorder = theme.outerBorder, {distance: distance = defaultOuterBorder.distance, lineWidth: lineWidth = defaultOuterBorder.lineWidth} = outerBorder;
        aabbBounds.expand(distance + (shadowBlur + lineWidth) / 2);
    }
    return aabbBounds;
};

exports.updateBoundsOfCommonOuterBorder = updateBoundsOfCommonOuterBorder;
//# sourceMappingURL=common-outer-boder-bounds.js.map
