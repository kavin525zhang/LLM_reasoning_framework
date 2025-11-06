"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SunburstChartSpecTransformer = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("../base"), polar_1 = require("../../constant/polar");

class SunburstChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        const startAngle = (0, vutils_1.isValid)(spec.startAngle) ? spec.startAngle : polar_1.POLAR_START_ANGLE, endAngle = (0, 
        vutils_1.isValid)(spec.endAngle) ? spec.endAngle : startAngle + (0, vutils_1.radianToDegree)(2 * Math.PI), series = super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "centerX", "centerY", "offsetX", "offsetY", "innerRadius", "outerRadius", "gap", "labelLayout", "label", "labelAutoVisible", "drill", "drillField" ]);
        return series.startAngle = startAngle, series.endAngle = endAngle, series;
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}

exports.SunburstChartSpecTransformer = SunburstChartSpecTransformer;
//# sourceMappingURL=sunburst-transformer.js.map
