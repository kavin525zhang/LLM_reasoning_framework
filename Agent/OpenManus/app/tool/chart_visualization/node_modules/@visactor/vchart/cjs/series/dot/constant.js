"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.dotSeriesMark = void 0;

const constant_1 = require("../base/constant");

exports.dotSeriesMark = Object.assign(Object.assign({}, constant_1.baseSeriesMark), {
    group: {
        name: "group",
        type: "group"
    },
    grid: {
        name: "grid",
        type: "rule"
    },
    gridBackground: {
        name: "gridBackground",
        type: "rect"
    },
    dot: {
        name: "dot",
        type: "symbol"
    },
    title: {
        name: "title",
        type: "text"
    },
    subTitle: {
        name: "subTitle",
        type: "text"
    },
    symbol: {
        name: "symbol",
        type: "symbol"
    }
});
//# sourceMappingURL=constant.js.map
