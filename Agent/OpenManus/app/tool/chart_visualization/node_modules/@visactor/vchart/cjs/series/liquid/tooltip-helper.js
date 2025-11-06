"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LiquidSeriesTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper");

class LiquidSeriesTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.markTooltipKeyCallback = datum => this.series.getValueField(), 
        this.markTooltipValueCallback = datum => datum[this.series.getValueField()], this.shapeStrokeCallback = datum => this.series.getMarkInName("liquid").getAttribute("fill", datum);
    }
}

exports.LiquidSeriesTooltipHelper = LiquidSeriesTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
