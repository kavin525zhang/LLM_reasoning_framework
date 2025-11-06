import { array, isArray, isNil, isValid } from "@visactor/vutils";

import { BaseChartSpecTransformer } from "../base";

export class PolarChartSpecTransformer extends BaseChartSpecTransformer {
    _isValidSeries(type) {
        return !this.seriesType || type === this.seriesType;
    }
    getIndicatorSpec(spec) {
        var _a, _b, _c;
        const indicatorSpec = array(spec.indicator), limitRatio = null !== (_a = spec.innerRadius) && void 0 !== _a ? _a : null === (_c = null === (_b = spec.series) || void 0 === _b ? void 0 : _b[0]) || void 0 === _c ? void 0 : _c.innerRadius;
        return isValid(limitRatio) && indicatorSpec.forEach((indicator => {
            isNil(indicator.limitRatio) && (indicator.limitRatio = limitRatio);
        })), indicatorSpec;
    }
    _getDefaultSeriesSpec(spec, pickKeys) {
        return super._getDefaultSeriesSpec(spec, [ "radius", "outerRadius", "innerRadius", "startAngle", "endAngle", "sortDataByAxis" ], pickKeys);
    }
    transformSpec(spec) {
        super.transformSpec(spec), isArray(spec.dataZoom) && spec.dataZoom.length > 0 && spec.dataZoom.forEach((zoom => {
            "axis" === zoom.filterMode && (zoom.filterMode = "filter");
        })), this.transformSeriesSpec(spec), isValid(spec.indicator) && (spec.indicator = this.getIndicatorSpec(spec));
    }
}
//# sourceMappingURL=polar-transformer.js.map
