"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.rangeColumn3dSeriesMark = exports.rangeColumnSeriesMark = void 0;

const constant_1 = require("../bar/constant");

exports.rangeColumnSeriesMark = Object.assign(Object.assign({}, constant_1.barSeriesMark), {
    minLabel: {
        name: "minLabel",
        type: "text"
    },
    maxLabel: {
        name: "maxLabel",
        type: "text"
    }
}), exports.rangeColumn3dSeriesMark = Object.assign(Object.assign({}, constant_1.bar3dSeriesMark), {
    minLabel: {
        name: "minLabel",
        type: "text"
    },
    maxLabel: {
        name: "maxLabel",
        type: "text"
    }
});
//# sourceMappingURL=constant.js.map
