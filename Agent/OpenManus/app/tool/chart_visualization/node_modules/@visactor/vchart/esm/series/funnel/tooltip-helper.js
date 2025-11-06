import { BaseSeriesTooltipHelper } from "../base/tooltip-helper";

import { FUNNEL_REACH_RATIO } from "../../constant/funnel";

import { isValid } from "@visactor/vutils";

export class FunnelSeriesTooltipHelper extends BaseSeriesTooltipHelper {
    constructor(series) {
        var _a, _b;
        super(series), this.dimensionTooltipTitleCallback = (datum, params) => {
            var _a, _b, _c;
            const series = this.series;
            return "transform" === (null === (_a = null == params ? void 0 : params.mark) || void 0 === _a ? void 0 : _a.name) ? this._transformRatioText : null !== (_b = this._getDimensionData(datum)) && void 0 !== _b ? _b : null === (_c = datum.properties) || void 0 === _c ? void 0 : _c[`${series.getCategoryField()}`];
        }, this.markTooltipValueCallback = (datum, params) => {
            var _a;
            if ("transform" === (null === (_a = null == params ? void 0 : params.mark) || void 0 === _a ? void 0 : _a.name)) {
                return `${(100 * (null == datum ? void 0 : datum[FUNNEL_REACH_RATIO])).toFixed(1)}%`;
            }
            return this._getMeasureData(datum);
        }, this.markTooltipKeyCallback = (datum, params) => {
            var _a;
            if ("transform" === (null === (_a = null == params ? void 0 : params.mark) || void 0 === _a ? void 0 : _a.name)) return this._transformRatioText;
            const {dimensionFields: dimensionFields, seriesFields: seriesFields} = this._seriesCacheInfo, subDimensionField = dimensionFields[dimensionFields.length - 1];
            return isValid(seriesFields[0]) ? null == datum ? void 0 : datum[seriesFields[0]] : null == datum ? void 0 : datum[subDimensionField];
        }, this._transformRatioText = null !== (_b = null === (_a = series.getSpec()) || void 0 === _a ? void 0 : _a.transformRatioText) && void 0 !== _b ? _b : "转化率";
    }
}
//# sourceMappingURL=tooltip-helper.js.map
