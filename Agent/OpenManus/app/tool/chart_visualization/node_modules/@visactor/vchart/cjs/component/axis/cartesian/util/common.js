"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCartesianAxisInfo = exports.transformInverse = exports.isOrientInSameDirection = exports.getDirectionByOrient = exports.getOrient = exports.autoAxisType = exports.isZAxis = exports.isYAxis = exports.isXAxis = void 0;

const vutils_1 = require("@visactor/vutils"), space_1 = require("../../../../util/space"), interface_1 = require("../../../interface");

function isXAxis(orient) {
    return "bottom" === orient || "top" === orient;
}

function isYAxis(orient) {
    return "left" === orient || "right" === orient;
}

function isZAxis(orient) {
    return "z" === orient;
}

function autoAxisType(orient, isHorizontal) {
    return isHorizontal ? isXAxis(orient) ? "linear" : "band" : isXAxis(orient) ? "band" : "linear";
}

function getOrient(spec, whiteList) {
    return (0, space_1.isValidOrient)(spec.orient) || whiteList && whiteList.includes(spec.orient) ? spec.orient : "left";
}

function getDirectionByOrient(orient) {
    return "top" === orient || "bottom" === orient ? "horizontal" : "vertical";
}

function isOrientInSameDirection(orient1, orient2) {
    return getDirectionByOrient(orient1) === getDirectionByOrient(orient2);
}

function transformInverse(spec, isHorizontal) {
    let inverse = spec.inverse;
    return isHorizontal && !isXAxis(spec.orient) && (inverse = !(0, vutils_1.isValid)(spec.inverse) || !spec.inverse), 
    inverse;
}

function getCartesianAxisInfo(spec, isHorizontal) {
    var _a;
    const axisType = null !== (_a = spec.type) && void 0 !== _a ? _a : autoAxisType(spec.orient, isHorizontal);
    return {
        axisType: axisType,
        componentName: `${interface_1.ComponentTypeEnum.cartesianAxis}-${axisType}`
    };
}

exports.isXAxis = isXAxis, exports.isYAxis = isYAxis, exports.isZAxis = isZAxis, 
exports.autoAxisType = autoAxisType, exports.getOrient = getOrient, exports.getDirectionByOrient = getDirectionByOrient, 
exports.isOrientInSameDirection = isOrientInSameDirection, exports.transformInverse = transformInverse, 
exports.getCartesianAxisInfo = getCartesianAxisInfo;
//# sourceMappingURL=common.js.map
