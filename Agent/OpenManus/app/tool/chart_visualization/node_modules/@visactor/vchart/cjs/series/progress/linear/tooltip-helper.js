"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LinearProgressSeriesTooltipHelper = void 0;

const tooltip_helper_1 = require("../../base/tooltip-helper");

class LinearProgressSeriesTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    enableByType(activeType) {
        return "dimension" !== activeType;
    }
}

exports.LinearProgressSeriesTooltipHelper = LinearProgressSeriesTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
