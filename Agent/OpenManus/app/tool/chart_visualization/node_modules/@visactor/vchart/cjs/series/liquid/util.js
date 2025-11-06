"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getShapes = void 0;

const getShapes = (shapesType, size) => "drop" === shapesType ? pin(0, 0, size) : shapesType;

function pin(x, y, radius) {
    const w = 4 * radius / 3, h = Math.max(w, 2 * radius), r = w / 2, cx = x, cy = r + y - h / 2, theta = Math.asin(r / (.85 * (h - r))), dy = Math.sin(theta) * r, dx = Math.cos(theta) * r, x0 = cx - dx, y0 = cy + dy, cpX = x, cpY = cy + r / Math.sin(theta);
    return `\n      M ${x0} ${y0}\n      A ${r} ${r} 0 1 1 ${x0 + 2 * dx} ${y0}\n      Q ${cpX} ${cpY} ${x} ${y + h / 2}\n      Q ${cpX} ${cpY} ${x0} ${y0}\n      Z \n    `;
}

exports.getShapes = getShapes;
//# sourceMappingURL=util.js.map
