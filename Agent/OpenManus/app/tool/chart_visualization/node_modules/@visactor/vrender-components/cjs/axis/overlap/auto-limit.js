"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.autoLimit = void 0;

const util_1 = require("./util"), vutils_1 = require("@visactor/vutils");

function normalizeOverflowLimitLength(overflowLimitLength) {
    return (0, vutils_1.isValidNumber)(overflowLimitLength) ? {
        left: overflowLimitLength,
        right: overflowLimitLength
    } : (0, vutils_1.isObject)(overflowLimitLength) ? {
        left: overflowLimitLength.left || 0,
        right: overflowLimitLength.right || 0
    } : {
        left: 0,
        right: 0
    };
}

function autoLimit(labels, config) {
    const {limitLength: limitLength, verticalLimitLength: verticalLimitLength, ellipsis: ellipsis = "...", orient: orient, axisLength: axisLength} = config;
    if ((0, vutils_1.isEmpty)(labels) || !(0, vutils_1.isValidNumber)(limitLength)) return;
    const overflowLimitLength = normalizeOverflowLimitLength(config.overflowLimitLength), firstLabel = labels[0], angle = firstLabel.attribute.angle, hasAngle = !(0, 
    vutils_1.isNil)(angle), cos = hasAngle ? Math.cos(angle) : 1, sin = hasAngle ? Math.sin(angle) : 0, isHorizontal = (0, 
    util_1.isAngleHorizontal)(angle), isVertical = (0, util_1.isAngleVertical)(angle), isX = "top" === orient || "bottom" === orient, direction = firstLabel.attribute.direction, checkBox = !isHorizontal && !isVertical && isX && (labels.length < 2 || labels.some((label => Math.abs(label.AABBBounds.width() - firstLabel.AABBBounds.width()) >= 2))) && firstLabel.AABBBounds.width() > Math.abs(limitLength / sin);
    labels.forEach((label => {
        var _a;
        if (isX) {
            if (isVertical && Math.floor(label.AABBBounds.height()) <= limitLength) return;
            if (isHorizontal && Math.floor(label.AABBBounds.width()) <= verticalLimitLength) return;
        }
        if (!isX) {
            if ("vertical" === direction && Math.floor(label.AABBBounds.height()) <= verticalLimitLength) return;
            if ("vertical" !== direction) {
                if (isHorizontal && Math.floor(label.AABBBounds.width()) <= limitLength) return;
                if (isVertical && Math.floor(label.AABBBounds.height()) <= verticalLimitLength) return;
            }
        }
        let limitLabelLength = null;
        if (isHorizontal || isVertical) limitLabelLength = isX ? isHorizontal ? verticalLimitLength : limitLength : "vertical" === direction || isVertical ? verticalLimitLength : limitLength; else if (isX) {
            const {x1: x1, x2: x2} = label.AABBBounds, tan = sin / cos, verticalSizeLimit = Math.abs(limitLength / sin);
            if (checkBox && tan > 0 && x1 <= axisLength + overflowLimitLength.right && limitLength / tan + x1 > axisLength + overflowLimitLength.right) {
                const lengthLimit = (axisLength - x1 + overflowLimitLength.right) / Math.abs(cos);
                limitLabelLength = Math.min(lengthLimit, verticalSizeLimit);
            } else if (checkBox && tan < 0 && x2 >= -overflowLimitLength.left && limitLength / tan + x2 < -overflowLimitLength.left) {
                const lengthLimit = (x2 + overflowLimitLength.left) / Math.abs(cos);
                limitLabelLength = Math.min(lengthLimit, verticalSizeLimit);
            } else limitLabelLength = verticalSizeLimit;
        } else limitLabelLength = Math.abs(limitLength / cos);
        (0, vutils_1.isValidNumber)(label.attribute.maxLineWidth) && (limitLabelLength = (0, 
        vutils_1.isValidNumber)(limitLabelLength) ? Math.min(label.attribute.maxLineWidth, limitLabelLength) : label.attribute.maxLineWidth), 
        label.setAttributes({
            maxLineWidth: limitLabelLength,
            ellipsis: null !== (_a = label.attribute.ellipsis) && void 0 !== _a ? _a : ellipsis
        });
    }));
}

exports.autoLimit = autoLimit;
//# sourceMappingURL=auto-limit.js.map
