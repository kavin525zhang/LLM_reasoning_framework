"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.pie3dSeriesMark = exports.pieSeriesMark = void 0;

const constant_1 = require("../base/constant");

exports.pieSeriesMark = Object.assign(Object.assign({}, constant_1.baseSeriesMark), {
    pie: {
        name: "pie",
        type: "arc"
    },
    labelLine: {
        name: "labelLine",
        type: "path"
    }
}), exports.pie3dSeriesMark = Object.assign(Object.assign({}, constant_1.baseSeriesMark), {
    pie3d: {
        name: "pie3d",
        type: "arc3d"
    },
    labelLine: {
        name: "labelLine",
        type: "path"
    }
});
//# sourceMappingURL=constant.js.map
