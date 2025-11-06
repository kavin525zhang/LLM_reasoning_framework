"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.boundToRange = exports.clampRangeByBitmap = exports.bitmapTool = void 0;

const vutils_1 = require("@visactor/vutils"), bitmap_1 = require("./bitmap");

function bitmapTool(width, height, padding = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
}) {
    const {top: top = 0, left: left = 0, right: right = 0, bottom: bottom = 0} = padding, ratio = Math.max(1, Math.sqrt(width * height / 1e6)), w = ~~((width + left + right + ratio) / ratio), h = ~~((height + top + bottom + ratio) / ratio), scale = _ => ~~(_ / ratio);
    return scale.bitmap = () => (0, bitmap_1.bitmap)(w, h), scale.x = _ => ~~((_ + left) / ratio), 
    scale.y = _ => ~~((_ + top) / ratio), scale.ratio = ratio, scale.padding = padding, 
    scale.width = width, scale.height = height, scale;
}

function clampRangeByBitmap($, range) {
    const {x1: x1, x2: x2, y1: y1, y2: y2} = range, {top: top = 0, left: left = 0, right: right = 0, bottom: bottom = 0} = $.padding, _x1 = (0, 
    vutils_1.clamp)(x1, -left, $.width + right), _x2 = (0, vutils_1.clamp)(x2, -left, $.width + right), _y1 = (0, 
    vutils_1.clamp)(y1, -top, $.height + bottom), _y2 = (0, vutils_1.clamp)(y2, -top, $.height + bottom);
    return {
        x1: $.x(_x1),
        x2: $.x(_x2),
        y1: $.y(_y1),
        y2: $.y(_y2)
    };
}

function boundToRange($, bound, clamp = !1) {
    return clamp ? clampRangeByBitmap($, bound) : {
        x1: $.x(bound.x1),
        x2: $.x(bound.x2),
        y1: $.y(bound.y1),
        y2: $.y(bound.y2)
    };
}

exports.bitmapTool = bitmapTool, exports.clampRangeByBitmap = clampRangeByBitmap, 
exports.boundToRange = boundToRange;
//# sourceMappingURL=scaler.js.map
