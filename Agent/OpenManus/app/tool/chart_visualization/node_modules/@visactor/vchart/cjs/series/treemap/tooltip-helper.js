"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.TreemapTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper");

class TreemapTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.markTooltipKeyCallback = datum => {
            var _a, _b;
            return null === (_b = null === (_a = this.series) || void 0 === _a ? void 0 : _a.getMarkData(datum)) || void 0 === _b ? void 0 : _b[this.series.getDimensionField()[0]];
        }, this.markTooltipValueCallback = datum => {
            var _a, _b;
            const {measureFields: measureFields} = this._seriesCacheInfo, data = null === (_a = this.series) || void 0 === _a ? void 0 : _a.getMarkData(datum);
            if (measureFields[0] && data) return null !== (_b = data[measureFields[0]]) && void 0 !== _b ? _b : datum.value;
        }, this.dimensionTooltipTitleCallback = datum => {
            var _a;
            const {dimensionFields: dimensionFields} = this._seriesCacheInfo, data = null === (_a = this.series) || void 0 === _a ? void 0 : _a.getMarkData(datum);
            if (dimensionFields[0] && data) return data[dimensionFields[0]];
        };
    }
    get defaultShapeType() {
        return "square";
    }
}

exports.TreemapTooltipHelper = TreemapTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
