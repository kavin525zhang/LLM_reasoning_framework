"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PolarChartSpecTransformer = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("../base");

class PolarChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    _isValidSeries(type) {
        return !this.seriesType || type === this.seriesType;
    }
    getIndicatorSpec(spec) {
        var _a, _b, _c;
        const indicatorSpec = (0, vutils_1.array)(spec.indicator), limitRatio = null !== (_a = spec.innerRadius) && void 0 !== _a ? _a : null === (_c = null === (_b = spec.series) || void 0 === _b ? void 0 : _b[0]) || void 0 === _c ? void 0 : _c.innerRadius;
        return (0, vutils_1.isValid)(limitRatio) && indicatorSpec.forEach((indicator => {
            (0, vutils_1.isNil)(indicator.limitRatio) && (indicator.limitRatio = limitRatio);
        })), indicatorSpec;
    }
    _getDefaultSeriesSpec(spec, pickKeys) {
        return super._getDefaultSeriesSpec(spec, [ "radius", "outerRadius", "innerRadius", "startAngle", "endAngle", "sortDataByAxis" ], pickKeys);
    }
    transformSpec(spec) {
        super.transformSpec(spec), (0, vutils_1.isArray)(spec.dataZoom) && spec.dataZoom.length > 0 && spec.dataZoom.forEach((zoom => {
            "axis" === zoom.filterMode && (zoom.filterMode = "filter");
        })), this.transformSeriesSpec(spec), (0, vutils_1.isValid)(spec.indicator) && (spec.indicator = this.getIndicatorSpec(spec));
    }
}

exports.PolarChartSpecTransformer = PolarChartSpecTransformer;
//# sourceMappingURL=polar-transformer.js.map
