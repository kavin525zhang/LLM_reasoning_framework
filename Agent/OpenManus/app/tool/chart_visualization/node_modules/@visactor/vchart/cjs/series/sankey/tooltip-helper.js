"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SankeySeriesTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper"), vutils_1 = require("@visactor/vutils");

class SankeySeriesTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this._getDimensionData = datum => {
            if (datum.source) {
                if ((0, vutils_1.isNumber)(datum.source)) {
                    const seriesKeys = this.series.getSeriesKeys();
                    return seriesKeys[datum.source] + " => " + seriesKeys[datum.target];
                }
                return datum.source + " => " + datum.target;
            }
            return datum.datum ? datum.datum[this.series.getSpec().categoryField] : datum.key;
        }, this.markTooltipValueCallback = datum => datum.value;
    }
}

exports.SankeySeriesTooltipHelper = SankeySeriesTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
