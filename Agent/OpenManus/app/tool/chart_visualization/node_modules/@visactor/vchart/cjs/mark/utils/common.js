"use strict";

function isMultiDatumMark(type) {
    return exports.MultiDatumMark.includes(type);
}

function curveTypeTransform(type, direction) {
    return "monotone" === type ? "horizontal" === direction ? "monotoneY" : "monotoneX" : type;
}

function is3DMark(type) {
    return [ "arc3d", "rect3d", "pyramid3d" ].includes(type);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.is3DMark = exports.curveTypeTransform = exports.isMultiDatumMark = exports.MultiDatumMark = void 0, 
exports.MultiDatumMark = [ "line", "area", "trail" ], exports.isMultiDatumMark = isMultiDatumMark, 
exports.curveTypeTransform = curveTypeTransform, exports.is3DMark = is3DMark;
//# sourceMappingURL=common.js.map
