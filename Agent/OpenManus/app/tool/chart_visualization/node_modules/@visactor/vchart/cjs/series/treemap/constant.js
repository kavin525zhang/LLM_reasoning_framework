"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.treemapSeriesMark = void 0;

const constant_1 = require("../base/constant");

exports.treemapSeriesMark = Object.assign(Object.assign({}, constant_1.baseSeriesMark), {
    nonLeaf: {
        name: "nonLeaf",
        type: "rect"
    },
    leaf: {
        name: "leaf",
        type: "rect"
    },
    nonLeafLabel: {
        name: "nonLeafLabel",
        type: "text"
    }
});
//# sourceMappingURL=constant.js.map
