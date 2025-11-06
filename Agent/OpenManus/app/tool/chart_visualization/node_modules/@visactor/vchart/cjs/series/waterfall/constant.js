"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.waterfallSeriesMark = void 0;

const constant_1 = require("../bar/constant");

exports.waterfallSeriesMark = Object.assign(Object.assign({}, constant_1.barSeriesMark), {
    leaderLine: {
        name: "leaderLine",
        type: "rule"
    },
    stackLabel: {
        name: "stackLabel",
        type: "text"
    }
});
//# sourceMappingURL=constant.js.map
