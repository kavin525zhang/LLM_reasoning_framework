"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.vennSeriesMark = void 0;

const constant_1 = require("../base/constant");

exports.vennSeriesMark = Object.assign(Object.assign({}, constant_1.baseSeriesMark), {
    circle: {
        name: "circle",
        type: "arc"
    },
    overlap: {
        name: "overlap",
        type: "path"
    },
    overlapLabel: {
        name: "overlapLabel",
        type: "text"
    }
});
//# sourceMappingURL=constant.js.map
