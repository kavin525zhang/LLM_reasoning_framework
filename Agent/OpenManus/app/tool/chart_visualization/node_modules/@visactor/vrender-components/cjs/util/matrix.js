"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.angleTo = exports.angle = exports.normalize = exports.length = exports.scale = void 0;

const vutils_1 = require("@visactor/vutils");

function scale(vector, scale) {
    return [ vector[0] * scale, vector[1] * scale ];
}

function length(vector) {
    const [x, y] = vector;
    return Math.sqrt(x * x + y * y);
}

function normalize(vector) {
    let len = length(vector);
    return len > 0 && (len = 1 / len), [ vector[0] * len, vector[1] * len ];
}

function angle(vector1, vector2) {
    const [x1, y1] = vector1, [x2, y2] = vector2, mag = Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2)), cosine = mag && (x1 * x2 + y1 * y2) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
}

function angleTo(v1, v2, direct) {
    const ang = angle(v1, v2), angleLargeThanPI = (0, vutils_1.crossProduct)(v1, v2) >= 0;
    return direct ? angleLargeThanPI ? 2 * Math.PI - ang : ang : angleLargeThanPI ? ang : 2 * Math.PI - ang;
}

exports.scale = scale, exports.length = length, exports.normalize = normalize, exports.angle = angle, 
exports.angleTo = angleTo;
//# sourceMappingURL=matrix.js.map
