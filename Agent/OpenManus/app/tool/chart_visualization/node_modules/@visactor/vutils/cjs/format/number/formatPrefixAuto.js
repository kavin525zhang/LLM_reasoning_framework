"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatPrefixAuto = exports.prefixExponent = void 0;

const formatDecimal_1 = require("./formatDecimal");

function formatPrefixAuto(x, p) {
    const d = (0, formatDecimal_1.formatDecimalParts)(x, p);
    if (!d) return x + "";
    const coefficient = d[0], exponent = d[1], i = exponent - (exports.prefixExponent = 3 * Math.max(-8, Math.min(8, Math.floor(exponent / 3)))) + 1, n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + (0, 
    formatDecimal_1.formatDecimalParts)(x, Math.max(0, p + i - 1))[0];
}

exports.formatPrefixAuto = formatPrefixAuto;
//# sourceMappingURL=formatPrefixAuto.js.map
