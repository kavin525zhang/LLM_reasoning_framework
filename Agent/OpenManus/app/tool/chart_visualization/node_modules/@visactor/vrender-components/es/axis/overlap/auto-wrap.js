import { isEmpty, isValidNumber, min } from "@visactor/vutils";

import { isAngleHorizontal, isAngleVertical } from "./util";

export function autoWrap(labels, config) {
    const {limitLength: limitLength, axisLength: axisLength, ellipsis: ellipsis = "...", orient: orient} = config;
    if (isEmpty(labels) || !isValidNumber(limitLength)) return;
    const angle = labels[0].attribute.angle, isHorizontal = isAngleHorizontal(angle), isVertical = isAngleVertical(angle), isX = "top" === orient || "bottom" === orient;
    let verticalLimitLength = axisLength / labels.length;
    labels.forEach(((label, index) => {
        var _a, _b, _c, _d, _e;
        if (isX) {
            if (isVertical && Math.floor(label.AABBBounds.height()) <= limitLength) return;
            if (isHorizontal) {
                const minGap = getLabelMinGap(label.attribute.x, null === (_a = labels[index + 1]) || void 0 === _a ? void 0 : _a.attribute.x, null === (_b = labels[index - 1]) || void 0 === _b ? void 0 : _b.attribute.x);
                isValidNumber(minGap) && (verticalLimitLength = min(verticalLimitLength, minGap));
            }
        } else {
            if (isVertical) {
                const minGap = getLabelMinGap(label.attribute.y, null === (_c = labels[index + 1]) || void 0 === _c ? void 0 : _c.attribute.y, null === (_d = labels[index - 1]) || void 0 === _d ? void 0 : _d.attribute.y);
                isValidNumber(minGap) && (verticalLimitLength = min(verticalLimitLength, minGap));
            }
            if (isHorizontal && Math.floor(label.AABBBounds.width()) <= limitLength) return;
        }
        let limitLabelLength = null, heightLimit = null;
        isX ? isVertical ? (limitLabelLength = limitLength, heightLimit = verticalLimitLength) : (limitLabelLength = verticalLimitLength, 
        heightLimit = limitLength) : isVertical ? (limitLabelLength = verticalLimitLength, 
        heightLimit = limitLength) : (limitLabelLength = limitLength, heightLimit = verticalLimitLength), 
        label.setAttributes({
            maxLineWidth: limitLabelLength,
            ellipsis: null !== (_e = label.attribute.ellipsis) && void 0 !== _e ? _e : ellipsis,
            whiteSpace: "normal",
            heightLimit: heightLimit
        });
    }));
}

function getLabelMinGap(current, next, prev) {
    let minGap;
    return isValidNumber(next) && (minGap = Math.abs(next - current)), isValidNumber(prev) && (minGap = isValidNumber(minGap) ? Math.min(Math.abs(current - prev), minGap) : Math.abs(current - prev)), 
    minGap;
}
//# sourceMappingURL=auto-wrap.js.map
