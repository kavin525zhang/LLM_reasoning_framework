"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.GaugePointerTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper");

class GaugePointerTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    enableByType(activeType) {
        return "dimension" !== activeType;
    }
}

exports.GaugePointerTooltipHelper = GaugePointerTooltipHelper;
//# sourceMappingURL=pointer-tooltip-helper.js.map
