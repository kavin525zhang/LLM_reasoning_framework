"use strict";

function formatDecimal(x) {
    return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}

function formatDecimalParts(x, p) {
    const _x = p ? x.toExponential(p - 1) : x.toExponential(), i = _x.indexOf("e");
    if (i < 0) return null;
    const coefficient = _x.slice(0, i);
    return [ coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +_x.slice(i + 1) ];
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatDecimalParts = exports.formatDecimal = void 0, exports.formatDecimal = formatDecimal, 
exports.formatDecimalParts = formatDecimalParts;
//# sourceMappingURL=formatDecimal.js.map
