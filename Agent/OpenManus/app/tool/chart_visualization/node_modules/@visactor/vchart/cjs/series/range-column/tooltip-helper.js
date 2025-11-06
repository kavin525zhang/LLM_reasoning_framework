"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RangeColumnSeriesTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper");

class RangeColumnSeriesTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this._getMeasureData = datum => "horizontal" === this.series.getSpec().direction ? datum[this.series.getSpec().xField[0]] + "-" + datum[this.series.getSpec().xField[1]] : datum[this.series.getSpec().yField[0]] + "-" + datum[this.series.getSpec().yField[1]];
    }
}

exports.RangeColumnSeriesTooltipHelper = RangeColumnSeriesTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
