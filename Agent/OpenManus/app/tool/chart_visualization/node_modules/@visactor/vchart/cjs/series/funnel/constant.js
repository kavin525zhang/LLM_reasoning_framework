"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.funnel3dSeriesMark = exports.funnelSeriesMark = void 0;

const constant_1 = require("../base/constant");

exports.funnelSeriesMark = Object.assign(Object.assign({}, constant_1.baseSeriesMark), {
    funnel: {
        name: "funnel",
        type: "polygon"
    },
    transform: {
        name: "transform",
        type: "polygon"
    },
    transformLabel: {
        name: "transformLabel",
        type: "text"
    },
    outerLabel: {
        name: "outerLabel",
        type: "text"
    },
    outerLabelLine: {
        name: "outerLabelLine",
        type: "rule"
    }
}), exports.funnel3dSeriesMark = Object.assign(Object.assign({}, constant_1.baseSeriesMark), {
    funnel3d: {
        name: "funnel3d",
        type: "pyramid3d"
    },
    transform3d: {
        name: "transform3d",
        type: "pyramid3d"
    },
    transformLabel: {
        name: "transformLabel",
        type: "text"
    },
    outerLabel: {
        name: "outerLabel",
        type: "text"
    },
    outerLabelLine: {
        name: "outerLabelLine",
        type: "rule"
    }
});
//# sourceMappingURL=constant.js.map
