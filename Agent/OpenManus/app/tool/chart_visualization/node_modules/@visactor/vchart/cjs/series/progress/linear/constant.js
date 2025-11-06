"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.linearProgressSeriesMark = void 0;

const constant_1 = require("../../base/constant");

exports.linearProgressSeriesMark = Object.assign(Object.assign({}, constant_1.baseSeriesMark), {
    track: {
        name: "track",
        type: "rect"
    },
    progress: {
        name: "progress",
        type: "rect"
    },
    group: {
        name: "group",
        type: "group"
    }
});
//# sourceMappingURL=constant.js.map
