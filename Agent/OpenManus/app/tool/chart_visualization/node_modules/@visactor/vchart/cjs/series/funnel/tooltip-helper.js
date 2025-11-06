"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.FunnelSeriesTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper"), funnel_1 = require("../../constant/funnel"), vutils_1 = require("@visactor/vutils");

class FunnelSeriesTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    constructor(series) {
        var _a, _b;
        super(series), this.dimensionTooltipTitleCallback = (datum, params) => {
            var _a, _b, _c;
            const series = this.series;
            return "transform" === (null === (_a = null == params ? void 0 : params.mark) || void 0 === _a ? void 0 : _a.name) ? this._transformRatioText : null !== (_b = this._getDimensionData(datum)) && void 0 !== _b ? _b : null === (_c = datum.properties) || void 0 === _c ? void 0 : _c[`${series.getCategoryField()}`];
        }, this.markTooltipValueCallback = (datum, params) => {
            var _a;
            if ("transform" === (null === (_a = null == params ? void 0 : params.mark) || void 0 === _a ? void 0 : _a.name)) {
                return `${(100 * (null == datum ? void 0 : datum[funnel_1.FUNNEL_REACH_RATIO])).toFixed(1)}%`;
            }
            return this._getMeasureData(datum);
        }, this.markTooltipKeyCallback = (datum, params) => {
            var _a;
            if ("transform" === (null === (_a = null == params ? void 0 : params.mark) || void 0 === _a ? void 0 : _a.name)) return this._transformRatioText;
            const {dimensionFields: dimensionFields, seriesFields: seriesFields} = this._seriesCacheInfo, subDimensionField = dimensionFields[dimensionFields.length - 1];
            return (0, vutils_1.isValid)(seriesFields[0]) ? null == datum ? void 0 : datum[seriesFields[0]] : null == datum ? void 0 : datum[subDimensionField];
        }, this._transformRatioText = null !== (_b = null === (_a = series.getSpec()) || void 0 === _a ? void 0 : _a.transformRatioText) && void 0 !== _b ? _b : "转化率";
    }
}

exports.FunnelSeriesTooltipHelper = FunnelSeriesTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
