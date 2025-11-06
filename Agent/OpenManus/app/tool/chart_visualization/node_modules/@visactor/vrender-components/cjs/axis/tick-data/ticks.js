"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ticks = void 0;

const vscale_1 = require("@visactor/vscale"), continuous_1 = require("./continuous"), linear_1 = require("./discrete/linear"), polar_angle_1 = require("./discrete/polar-angle"), util_1 = require("./util"), ticks = (scale, op) => {
    if ((0, vscale_1.isContinuous)(scale.type)) return (0, continuous_1.continuousTicks)(scale, op);
    if ((0, vscale_1.isDiscrete)(scale.type)) {
        if ("cartesian" === op.coordinateType) return (0, linear_1.linearDiscreteTicks)(scale, op);
        if ("polar" === op.coordinateType && "angle" === op.axisOrientType) return (0, polar_angle_1.polarAngleAxisDiscreteTicks)(scale, op);
    }
    return (0, util_1.convertDomainToTickData)(scale.domain());
};

exports.ticks = ticks;
//# sourceMappingURL=ticks.js.map
