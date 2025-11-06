"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.clampText = exports.defaultLabelPosition = exports.DefaultRectPositions = exports.DefaultPositions = exports.place = exports.placeToCandidates = exports.canPlaceInside = exports.canPlace = void 0;

const vutils_1 = require("@visactor/vutils"), scaler_1 = require("./scaler");

function canPlace($, bitmap, bound, checkBound = !0, pad = 0) {
    let range = bound;
    pad > 0 && (range = {
        x1: bound.x1 - pad,
        x2: bound.x2 + pad,
        y1: bound.y1 - pad,
        y2: bound.y2 + pad
    }), range = (0, scaler_1.boundToRange)($, range);
    const outOfBounds = bitmap.outOfBounds(range);
    return (!checkBound || !outOfBounds) && (outOfBounds && (range = (0, scaler_1.clampRangeByBitmap)($, range)), 
    !bitmap.getRange(range));
}

function canPlaceInside(textBound, shapeBound) {
    return !(!textBound || !shapeBound) && shapeBound.encloses(textBound);
}

function placeToCandidates($, bitmap, text, candidates = [], clampForce = !0, pad = 0, changePosition = !1) {
    const validCandidates = candidates.filter((candidate => (0, vutils_1.isValid)(candidate)));
    for (let i = 0; i < validCandidates.length; i++) {
        let measureText;
        if (measureText = changePosition ? text : text.clone(), measureText.setAttributes(validCandidates[i]), 
        canPlace($, bitmap, measureText.AABBBounds, clampForce, pad)) return bitmap.setRange((0, 
        scaler_1.boundToRange)($, measureText.AABBBounds, !0)), validCandidates[i];
    }
    return !1;
}

function place($, bitmap, s, attrs, text, bounds, labeling) {
    var _a, _b;
    const clampForce = null === (_a = attrs.overlap) || void 0 === _a ? void 0 : _a.clampForce, overlapPadding = null === (_b = attrs.overlap) || void 0 === _b ? void 0 : _b.overlapPadding;
    if ("bound" === s.type || "position" === s.type) {
        if ((0, vutils_1.isFunction)(labeling)) {
            const candidates = (((0, vutils_1.isFunction)(s.position) ? s.position(text.attribute) : s.position) || defaultLabelPosition(attrs.type)).map((p => labeling(text.AABBBounds, bounds, p, attrs.offset))), shouldClone = !1 === s.restorePosition;
            return placeToCandidates($, bitmap, text, candidates, clampForce, overlapPadding, shouldClone);
        }
        return !1;
    }
    if ("moveY" === s.type) {
        const candidates = (s.offset ? (0, vutils_1.isFunction)(s.offset) ? s.offset(text.attribute) : s.offset : []).map((dy => ({
            x: text.attribute.x,
            y: text.attribute.y + dy
        })));
        return placeToCandidates($, bitmap, text, candidates, clampForce, overlapPadding);
    }
    if ("moveX" === s.type) {
        const candidates = (s.offset ? (0, vutils_1.isFunction)(s.offset) ? s.offset(text.attribute) : s.offset : []).map((dx => ({
            x: text.attribute.x + dx,
            y: text.attribute.y
        })));
        return placeToCandidates($, bitmap, text, candidates, clampForce, overlapPadding);
    }
    return !1;
}

function defaultLabelPosition(type) {
    return "rect" === type ? exports.DefaultRectPositions : exports.DefaultPositions;
}

function clampText(text, width, height, padding = {}) {
    const {x1: x1, x2: x2, y1: y1, y2: y2} = text.AABBBounds, {top: top = 0, left: left = 0, right: right = 0, bottom: bottom = 0} = padding, minX = Math.min(x1, x2), maxX = Math.max(x1, x2), minY = Math.min(y1, y2), maxY = Math.max(y1, y2), maxXWithPadding = width + right, maxYWithPadding = height + bottom;
    let dx = 0, dy = 0;
    return minX < 0 - left ? dx = -minX : maxX > maxXWithPadding && (dx = maxXWithPadding - maxX), 
    minY < 0 - top ? dy = -minY : maxY > maxYWithPadding && (dy = maxYWithPadding - maxY), 
    {
        dx: dx,
        dy: dy
    };
}

exports.canPlace = canPlace, exports.canPlaceInside = canPlaceInside, exports.placeToCandidates = placeToCandidates, 
exports.place = place, exports.DefaultPositions = [ "top", "bottom", "right", "left", "top-right", "bottom-right", "top-left", "bottom-left" ], 
exports.DefaultRectPositions = [ "top", "inside-top", "inside" ], exports.defaultLabelPosition = defaultLabelPosition, 
exports.clampText = clampText;
//# sourceMappingURL=place.js.map
