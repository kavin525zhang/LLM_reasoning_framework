import { clamp as clampRange } from "@visactor/vutils";

import { bitmap } from "./bitmap";

export function bitmapTool(width, height, padding = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
}) {
    const {top: top = 0, left: left = 0, right: right = 0, bottom: bottom = 0} = padding, ratio = Math.max(1, Math.sqrt(width * height / 1e6)), w = ~~((width + left + right + ratio) / ratio), h = ~~((height + top + bottom + ratio) / ratio), scale = _ => ~~(_ / ratio);
    return scale.bitmap = () => bitmap(w, h), scale.x = _ => ~~((_ + left) / ratio), 
    scale.y = _ => ~~((_ + top) / ratio), scale.ratio = ratio, scale.padding = padding, 
    scale.width = width, scale.height = height, scale;
}

export function clampRangeByBitmap($, range) {
    const {x1: x1, x2: x2, y1: y1, y2: y2} = range, {top: top = 0, left: left = 0, right: right = 0, bottom: bottom = 0} = $.padding, _x1 = clampRange(x1, -left, $.width + right), _x2 = clampRange(x2, -left, $.width + right), _y1 = clampRange(y1, -top, $.height + bottom), _y2 = clampRange(y2, -top, $.height + bottom);
    return {
        x1: $.x(_x1),
        x2: $.x(_x2),
        y1: $.y(_y1),
        y2: $.y(_y2)
    };
}

export function boundToRange($, bound, clamp = !1) {
    return clamp ? clampRangeByBitmap($, bound) : {
        x1: $.x(bound.x1),
        x2: $.x(bound.x2),
        y1: $.y(bound.y1),
        y2: $.y(bound.y2)
    };
}
//# sourceMappingURL=scaler.js.map
