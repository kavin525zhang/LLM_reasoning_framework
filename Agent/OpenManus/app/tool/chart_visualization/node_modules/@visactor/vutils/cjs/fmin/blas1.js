"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.gemv = exports.weightedSum = exports.scale = exports.norm2 = exports.zerosM = exports.zeros = void 0;

const math_1 = require("../math");

function zeros(x) {
    const r = new Array(x);
    for (let i = 0; i < x; ++i) r[i] = 0;
    return r;
}

function zerosM(x, y) {
    return zeros(x).map((function() {
        return zeros(y);
    }));
}

function norm2(a) {
    return Math.sqrt((0, math_1.dotProduct)(a, a));
}

function scale(ret, value, c) {
    for (let i = 0; i < value.length; ++i) ret[i] = value[i] * c;
}

function weightedSum(ret, w1, v1, w2, v2) {
    for (let j = 0; j < ret.length; ++j) ret[j] = w1 * v1[j] + w2 * v2[j];
}

function gemv(output, A, x) {
    for (let i = 0; i < output.length; ++i) output[i] = (0, math_1.dotProduct)(A[i], x);
}

exports.zeros = zeros, exports.zerosM = zerosM, exports.norm2 = norm2, exports.scale = scale, 
exports.weightedSum = weightedSum, exports.gemv = gemv;
//# sourceMappingURL=blas1.js.map
