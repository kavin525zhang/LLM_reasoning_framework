"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PictogramSeriesTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper");

class PictogramSeriesTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.dimensionTooltipTitleCallback = datum => {
            var _a;
            const series = this.series;
            return null !== (_a = this._getDimensionData(datum)) && void 0 !== _a ? _a : series.getDatumName(datum);
        }, this.markTooltipValueCallback = (datum, params) => {
            const {measureFields: measureFields} = this._seriesCacheInfo;
            if (measureFields[0] && datum.data) return datum.data[measureFields[0]];
        }, this.markTooltipKeyCallback = datum => {
            var _a;
            return null === (_a = datum.data) || void 0 === _a ? void 0 : _a[this.series.getDimensionField()[0]];
        };
    }
}

exports.PictogramSeriesTooltipHelper = PictogramSeriesTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
