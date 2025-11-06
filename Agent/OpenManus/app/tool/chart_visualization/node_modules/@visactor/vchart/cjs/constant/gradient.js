"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DEFAULT_GRADIENT_CONFIG = exports.DEFAULT_CONICAL_GRADIENT_CONFIG = exports.DEFAULT_RADIAL_GRADIENT_CONFIG = exports.DEFAULT_LINEAR_GRADIENT_CONFIG = exports.GradientType = void 0, 
exports.GradientType = [ "linear", "radial", "conical" ], exports.DEFAULT_LINEAR_GRADIENT_CONFIG = {
    x0: 0,
    y0: 0,
    x1: 1,
    y1: 1
}, exports.DEFAULT_RADIAL_GRADIENT_CONFIG = {
    x0: 0,
    y0: 0,
    x1: 1,
    y1: 1,
    r0: 0,
    r1: 1
}, exports.DEFAULT_CONICAL_GRADIENT_CONFIG = {
    x: .5,
    y: .5,
    startAngle: 0,
    endAngle: 2 * Math.PI
}, exports.DEFAULT_GRADIENT_CONFIG = {
    linear: exports.DEFAULT_LINEAR_GRADIENT_CONFIG,
    radial: exports.DEFAULT_RADIAL_GRADIENT_CONFIG,
    conical: exports.DEFAULT_CONICAL_GRADIENT_CONFIG
};
//# sourceMappingURL=gradient.js.map