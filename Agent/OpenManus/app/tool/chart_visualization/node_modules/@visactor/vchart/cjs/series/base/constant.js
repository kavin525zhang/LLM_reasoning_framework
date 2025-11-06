"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.defaultSeriesCompileCheckKeys = exports.defaultSeriesIgnoreCheckKeys = exports.RECT_Y1 = exports.RECT_Y = exports.RECT_X1 = exports.RECT_X = exports.baseSeriesMark = void 0;

const base_1 = require("../../constant/base");

exports.baseSeriesMark = {
    label: {
        name: "label",
        type: "text"
    }
}, exports.RECT_X = `${base_1.PREFIX}_rect_x`, exports.RECT_X1 = `${base_1.PREFIX}_rect_x1`, 
exports.RECT_Y = `${base_1.PREFIX}_rect_y`, exports.RECT_Y1 = `${base_1.PREFIX}_rect_y1`, 
exports.defaultSeriesIgnoreCheckKeys = {
    data: !0
}, exports.defaultSeriesCompileCheckKeys = {
    invalidType: !0,
    animation: !0,
    animationAppear: !0,
    animationEnter: !0,
    animationUpdate: !0,
    animationExit: !0,
    animationNormal: !0
};
//# sourceMappingURL=constant.js.map
