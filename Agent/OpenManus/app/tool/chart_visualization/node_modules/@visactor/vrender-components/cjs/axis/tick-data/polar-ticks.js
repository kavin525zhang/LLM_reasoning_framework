"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.polarTicks = void 0;

const vscale_1 = require("@visactor/vscale"), continuous_1 = require("./continuous"), util_1 = require("./util"), polar_angle_1 = require("./discrete/polar-angle"), polarTicks = (scale, op) => (0, 
vscale_1.isContinuous)(scale.type) ? (0, continuous_1.continuousTicks)(scale, op) : (0, 
vscale_1.isDiscrete)(scale.type) && "polar" === op.coordinateType && "angle" === op.axisOrientType ? (0, 
polar_angle_1.polarAngleAxisDiscreteTicks)(scale, op) : (0, util_1.convertDomainToTickData)(scale.domain());

exports.polarTicks = polarTicks;
//# sourceMappingURL=polar-ticks.js.map
