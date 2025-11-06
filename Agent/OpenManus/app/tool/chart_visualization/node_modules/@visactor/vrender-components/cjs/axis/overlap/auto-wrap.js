"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.autoWrap = void 0;

const vutils_1 = require("@visactor/vutils"), util_1 = require("./util");

function autoWrap(labels, config) {
    const {limitLength: limitLength, axisLength: axisLength, ellipsis: ellipsis = "...", orient: orient} = config;
    if ((0, vutils_1.isEmpty)(labels) || !(0, vutils_1.isValidNumber)(limitLength)) return;
    const angle = labels[0].attribute.angle, isHorizontal = (0, util_1.isAngleHorizontal)(angle), isVertical = (0, 
    util_1.isAngleVertical)(angle), isX = "top" === orient || "bottom" === orient;
    let verticalLimitLength = axisLength / labels.length;
    labels.forEach(((label, index) => {
        var _a, _b, _c, _d, _e;
        if (isX) {
            if (isVertical && Math.floor(label.AABBBounds.height()) <= limitLength) return;
            if (isHorizontal) {
                const minGap = getLabelMinGap(label.attribute.x, null === (_a = labels[index + 1]) || void 0 === _a ? void 0 : _a.attribute.x, null === (_b = labels[index - 1]) || void 0 === _b ? void 0 : _b.attribute.x);
                (0, vutils_1.isValidNumber)(minGap) && (verticalLimitLength = (0, vutils_1.min)(verticalLimitLength, minGap));
            }
        } else {
            if (isVertical) {
                const minGap = getLabelMinGap(label.attribute.y, null === (_c = labels[index + 1]) || void 0 === _c ? void 0 : _c.attribute.y, null === (_d = labels[index - 1]) || void 0 === _d ? void 0 : _d.attribute.y);
                (0, vutils_1.isValidNumber)(minGap) && (verticalLimitLength = (0, vutils_1.min)(verticalLimitLength, minGap));
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
    return (0, vutils_1.isValidNumber)(next) && (minGap = Math.abs(next - current)), 
    (0, vutils_1.isValidNumber)(prev) && (minGap = (0, vutils_1.isValidNumber)(minGap) ? Math.min(Math.abs(current - prev), minGap) : Math.abs(current - prev)), 
    minGap;
}

exports.autoWrap = autoWrap;
//# sourceMappingURL=auto-wrap.js.map
