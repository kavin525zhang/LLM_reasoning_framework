"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.cartesianTicks = void 0;

const vscale_1 = require("@visactor/vscale"), continuous_1 = require("./continuous"), linear_1 = require("./discrete/linear"), util_1 = require("./util"), cartesianTicks = (scale, op) => (0, 
vscale_1.isContinuous)(scale.type) ? (0, continuous_1.continuousTicks)(scale, op) : (0, 
vscale_1.isDiscrete)(scale.type) && "cartesian" === op.coordinateType ? (0, linear_1.linearDiscreteTicks)(scale, op) : (0, 
util_1.convertDomainToTickData)(scale.domain());

exports.cartesianTicks = cartesianTicks;
//# sourceMappingURL=cartesian-ticks.js.map
