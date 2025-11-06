"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.tan2AngleToAngle = exports.deltaXYToAngle = void 0;

const deltaXYToAngle = (y, x) => {
    const angle = Math.atan2(y, x);
    return angle < 0 ? angle + 2 * Math.PI : angle;
};

exports.deltaXYToAngle = deltaXYToAngle;

const tan2AngleToAngle = angle => angle < 0 ? angle + 2 * Math.PI : angle;

exports.tan2AngleToAngle = tan2AngleToAngle;
//# sourceMappingURL=polar.js.map
