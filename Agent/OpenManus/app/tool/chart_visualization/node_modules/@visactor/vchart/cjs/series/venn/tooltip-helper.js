"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.VennTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper"), util_1 = require("./util");

class VennTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.dimensionTooltipTitleCallback = datum => (0, util_1.getVennSeriesDataKey)(null == datum ? void 0 : datum[this.series.getDimensionField()[0]]), 
        this.markTooltipKeyCallback = datum => (0, util_1.getVennSeriesDataKey)(null == datum ? void 0 : datum[this.series.getDimensionField()[0]]);
    }
}

exports.VennTooltipHelper = VennTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
