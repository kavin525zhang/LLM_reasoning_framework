"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.gaugePointerSeriesMark = exports.gaugeSeriesMark = void 0;

const constant_1 = require("../base/constant"), constant_2 = require("../polar/progress-like/constant");

exports.gaugeSeriesMark = Object.assign(Object.assign({}, constant_2.progressLikeSeriesMark), {
    segment: {
        name: "segment",
        type: "arc"
    },
    track: {
        name: "track",
        type: "arc"
    }
}), exports.gaugePointerSeriesMark = Object.assign(Object.assign({}, constant_1.baseSeriesMark), {
    pin: {
        name: "pin",
        type: "path"
    },
    pinBackground: {
        name: "pinBackground",
        type: "path"
    },
    pointer: {
        name: "pointer",
        type: [ "path", "rect" ]
    }
});
//# sourceMappingURL=constant.js.map
