import { isFunction, isValid } from "@visactor/vutils";

import { boundToRange, clampRangeByBitmap } from "./scaler";

export function canPlace($, bitmap, bound, checkBound = !0, pad = 0) {
    let range = bound;
    pad > 0 && (range = {
        x1: bound.x1 - pad,
        x2: bound.x2 + pad,
        y1: bound.y1 - pad,
        y2: bound.y2 + pad
    }), range = boundToRange($, range);
    const outOfBounds = bitmap.outOfBounds(range);
    return (!checkBound || !outOfBounds) && (outOfBounds && (range = clampRangeByBitmap($, range)), 
    !bitmap.getRange(range));
}

export function canPlaceInside(textBound, shapeBound) {
    return !(!textBound || !shapeBound) && shapeBound.encloses(textBound);
}

export function placeToCandidates($, bitmap, text, candidates = [], clampForce = !0, pad = 0, changePosition = !1) {
    const validCandidates = candidates.filter((candidate => isValid(candidate)));
    for (let i = 0; i < validCandidates.length; i++) {
        let measureText;
        if (measureText = changePosition ? text : text.clone(), measureText.setAttributes(validCandidates[i]), 
        canPlace($, bitmap, measureText.AABBBounds, clampForce, pad)) return bitmap.setRange(boundToRange($, measureText.AABBBounds, !0)), 
        validCandidates[i];
    }
    return !1;
}

export function place($, bitmap, s, attrs, text, bounds, labeling) {
    var _a, _b;
    const clampForce = null === (_a = attrs.overlap) || void 0 === _a ? void 0 : _a.clampForce, overlapPadding = null === (_b = attrs.overlap) || void 0 === _b ? void 0 : _b.overlapPadding;
    if ("bound" === s.type || "position" === s.type) {
        if (isFunction(labeling)) {
            const candidates = ((isFunction(s.position) ? s.position(text.attribute) : s.position) || defaultLabelPosition(attrs.type)).map((p => labeling(text.AABBBounds, bounds, p, attrs.offset))), shouldClone = !1 === s.restorePosition;
            return placeToCandidates($, bitmap, text, candidates, clampForce, overlapPadding, shouldClone);
        }
        return !1;
    }
    if ("moveY" === s.type) {
        const candidates = (s.offset ? isFunction(s.offset) ? s.offset(text.attribute) : s.offset : []).map((dy => ({
            x: text.attribute.x,
            y: text.attribute.y + dy
        })));
        return placeToCandidates($, bitmap, text, candidates, clampForce, overlapPadding);
    }
    if ("moveX" === s.type) {
        const candidates = (s.offset ? isFunction(s.offset) ? s.offset(text.attribute) : s.offset : []).map((dx => ({
            x: text.attribute.x + dx,
            y: text.attribute.y
        })));
        return placeToCandidates($, bitmap, text, candidates, clampForce, overlapPadding);
    }
    return !1;
}

export const DefaultPositions = [ "top", "bottom", "right", "left", "top-right", "bottom-right", "top-left", "bottom-left" ];

export const DefaultRectPositions = [ "top", "inside-top", "inside" ];

export function defaultLabelPosition(type) {
    return "rect" === type ? DefaultRectPositions : DefaultPositions;
}

export function clampText(text, width, height, padding = {}) {
    const {x1: x1, x2: x2, y1: y1, y2: y2} = text.AABBBounds, {top: top = 0, left: left = 0, right: right = 0, bottom: bottom = 0} = padding, minX = Math.min(x1, x2), maxX = Math.max(x1, x2), minY = Math.min(y1, y2), maxY = Math.max(y1, y2), maxXWithPadding = width + right, maxYWithPadding = height + bottom;
    let dx = 0, dy = 0;
    return minX < 0 - left ? dx = -minX : maxX > maxXWithPadding && (dx = maxXWithPadding - maxX), 
    minY < 0 - top ? dy = -minY : maxY > maxYWithPadding && (dy = maxYWithPadding - maxY), 
    {
        dx: dx,
        dy: dy
    };
}
//# sourceMappingURL=place.js.map
