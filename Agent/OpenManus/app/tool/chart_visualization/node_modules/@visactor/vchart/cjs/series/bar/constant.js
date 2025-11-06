"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.bar3dSeriesMark = exports.barSeriesMark = void 0;

const constant_1 = require("../base/constant");

exports.barSeriesMark = Object.assign(Object.assign({}, constant_1.baseSeriesMark), {
    bar: {
        name: "bar",
        type: "rect"
    },
    barBackground: {
        name: "barBackground",
        type: "rect"
    }
}), exports.bar3dSeriesMark = Object.assign(Object.assign({}, constant_1.baseSeriesMark), {
    bar3d: {
        name: "bar3d",
        type: "rect3d"
    }
});
//# sourceMappingURL=constant.js.map
