"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DEFAULT_SHOW_DELAY = exports.TOOLTIP_TYPES = exports.TOOLTIP_OTHERS_LINE = exports.TOOLTIP_MAX_LINE_COUNT = exports.TOOLTIP_EL_CLASS_NAME = exports.TooltipHandlerType = void 0;

const base_1 = require("../../constant/base");

exports.TooltipHandlerType = {
    dom: `${base_1.PREFIX}_TOOLTIP_HANDLER_DOM`,
    canvas: `${base_1.PREFIX}_TOOLTIP_HANDLER_CANVAS`
}, exports.TOOLTIP_EL_CLASS_NAME = "vchart-tooltip-element", exports.TOOLTIP_MAX_LINE_COUNT = 20, 
exports.TOOLTIP_OTHERS_LINE = {
    key: "其他",
    value: "..."
}, exports.TOOLTIP_TYPES = [ "group", "mark", "dimension" ], exports.DEFAULT_SHOW_DELAY = 50;
//# sourceMappingURL=constant.js.map
