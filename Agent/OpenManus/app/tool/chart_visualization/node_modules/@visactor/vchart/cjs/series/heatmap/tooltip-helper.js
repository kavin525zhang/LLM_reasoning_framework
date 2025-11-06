"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.HeatmapSeriesTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper");

class HeatmapSeriesTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    enableByType(activeType) {
        return "dimension" !== activeType;
    }
}

exports.HeatmapSeriesTooltipHelper = HeatmapSeriesTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
