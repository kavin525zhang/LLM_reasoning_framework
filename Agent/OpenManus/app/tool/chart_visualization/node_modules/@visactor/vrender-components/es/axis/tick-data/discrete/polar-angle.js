import { isFunction, isValid, maxInArray, minInArray, isNumberClose } from "@visactor/vutils";

import { MIN_TICK_GAP, convertDomainToTickData, labelOverlap } from "../util";

import { AABBBounds } from "@visactor/vutils";

import { initTextMeasure } from "../../../util/text";

import { getPolarAngleLabelPosition } from "../../util";

export const getPolarAngleLabelBounds = (scale, domain, op) => {
    var _a;
    const {labelStyle: labelStyle, getRadius: getRadius, labelOffset: labelOffset, labelFormatter: labelFormatter, inside: inside} = op, radius = null == getRadius ? void 0 : getRadius(), labelAngle = null !== (_a = labelStyle.angle) && void 0 !== _a ? _a : 0, textMeasure = initTextMeasure(labelStyle);
    return domain.map((v => {
        const str = labelFormatter ? labelFormatter(v) : `${v}`, {width: width, height: height} = textMeasure.quickMeasure(str), textWidth = Math.max(width, MIN_TICK_GAP), textHeight = Math.max(height, MIN_TICK_GAP), angle = scale.scale(v), center = {
            x: 0,
            y: 0
        };
        let textX = 0, textY = 0;
        const orient = {
            align: labelStyle.textAlign,
            baseline: labelStyle.textBaseline
        }, {x: x, y: y} = getPolarAngleLabelPosition(angle, center, radius, labelOffset, inside);
        orient.align || (isNumberClose(x, center.x) ? orient.baseline || (orient.baseline = y > center.y ? "top" : "bottom") : x > center.x ? orient.align = "left" : x < center.x && (orient.align = "right")), 
        textX = x + ("right" === orient.align ? -textWidth : "left" === orient.align ? 0 : -textWidth / 2), 
        textY = y + ("bottom" === orient.baseline ? -textHeight : "top" === orient.baseline ? 0 : -textHeight / 2);
        return (new AABBBounds).set(textX, textY, textX + textWidth, textY + textHeight).rotate(labelAngle, textX + textWidth / 2, textY + textHeight / 2);
    }));
};

export const polarAngleAxisDiscreteTicks = (scale, op) => {
    const {tickCount: tickCount, forceTickCount: forceTickCount, tickStep: tickStep, getRadius: getRadius, labelOffset: labelOffset, labelGap: labelGap = 0, labelStyle: labelStyle} = op, radius = null == getRadius ? void 0 : getRadius();
    if (!radius) return convertDomainToTickData(scale.domain());
    let scaleTicks;
    if (isValid(tickStep)) scaleTicks = scale.stepTicks(tickStep); else if (isValid(forceTickCount)) scaleTicks = scale.forceTicks(forceTickCount); else if (isValid(tickCount)) {
        const range = scale.range(), rangeSize = Math.abs(range[range.length - 1] - range[0]), count = isFunction(tickCount) ? tickCount({
            axisLength: rangeSize,
            labelStyle: labelStyle
        }) : tickCount;
        scaleTicks = scale.ticks(count);
    } else if (op.sampling) {
        const domain = scale.domain(), range = scale.range(), labelBoundsList = getPolarAngleLabelBounds(scale, domain, op), rangeStart = minInArray(range), rangeEnd = maxInArray(range), incrementUnit = Math.abs(rangeEnd - rangeStart) * (radius + labelOffset) / domain.length, {step: step, delCount: delCount} = getStep(domain, labelBoundsList, labelGap, Math.floor(labelBoundsList.reduce(((min, curBounds) => Math.min(min, curBounds.width(), curBounds.height())), Number.MAX_VALUE) / incrementUnit));
        scaleTicks = scale.stepTicks(step), scaleTicks = scaleTicks.slice(0, scaleTicks.length - delCount);
    } else scaleTicks = scale.domain();
    return convertDomainToTickData(scaleTicks);
};

const getStep = (domain, labelBoundsList, labelGap, defaultStep) => {
    let step = defaultStep;
    do {
        let success = !0;
        step++;
        let ptr = 0;
        do {
            ptr + step < domain.length && labelOverlap(labelBoundsList[ptr], labelBoundsList[ptr + step], labelGap) && (success = !1), 
            ptr += step;
        } while (success && ptr < domain.length);
        if (success) break;
    } while (step <= domain.length);
    let delCount = 0;
    if (domain.length > 2) {
        let ptr = domain.length - domain.length % step;
        for (ptr >= domain.length && (ptr -= step); ptr > 0 && labelOverlap(labelBoundsList[0], labelBoundsList[ptr]); ) delCount++, 
        ptr -= step;
    }
    return {
        step: step,
        delCount: delCount
    };
};
//# sourceMappingURL=polar-angle.js.map
