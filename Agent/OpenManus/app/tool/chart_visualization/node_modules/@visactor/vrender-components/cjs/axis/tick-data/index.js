"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.polarAngleAxisDiscreteTicks = exports.linearDiscreteTicks = exports.continuousTicks = exports.polarTicks = exports.cartesianTicks = exports.ticks = exports.convertDomainToTickData = void 0;

const util_1 = require("./util");

Object.defineProperty(exports, "convertDomainToTickData", {
    enumerable: !0,
    get: function() {
        return util_1.convertDomainToTickData;
    }
});

var ticks_1 = require("./ticks");

Object.defineProperty(exports, "ticks", {
    enumerable: !0,
    get: function() {
        return ticks_1.ticks;
    }
});

var cartesian_ticks_1 = require("./cartesian-ticks");

Object.defineProperty(exports, "cartesianTicks", {
    enumerable: !0,
    get: function() {
        return cartesian_ticks_1.cartesianTicks;
    }
});

var polar_ticks_1 = require("./polar-ticks");

Object.defineProperty(exports, "polarTicks", {
    enumerable: !0,
    get: function() {
        return polar_ticks_1.polarTicks;
    }
});

var continuous_1 = require("./continuous");

Object.defineProperty(exports, "continuousTicks", {
    enumerable: !0,
    get: function() {
        return continuous_1.continuousTicks;
    }
});

var linear_1 = require("./discrete/linear");

Object.defineProperty(exports, "linearDiscreteTicks", {
    enumerable: !0,
    get: function() {
        return linear_1.linearDiscreteTicks;
    }
});

var polar_angle_1 = require("./discrete/polar-angle");

Object.defineProperty(exports, "polarAngleAxisDiscreteTicks", {
    enumerable: !0,
    get: function() {
        return polar_angle_1.polarAngleAxisDiscreteTicks;
    }
});
//# sourceMappingURL=index.js.map
