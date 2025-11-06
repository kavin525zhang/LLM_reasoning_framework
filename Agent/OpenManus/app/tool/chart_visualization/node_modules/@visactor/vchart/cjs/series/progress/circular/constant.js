"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.circularProgressSeriesMark = void 0;

const constant_1 = require("../../polar/progress-like/constant");

exports.circularProgressSeriesMark = Object.assign(Object.assign({}, constant_1.progressLikeSeriesMark), {
    track: {
        name: "track",
        type: "arc"
    },
    progress: {
        name: "progress",
        type: "arc"
    }
});
//# sourceMappingURL=constant.js.map
