"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.FunnelChartSpecTransformer = void 0;

const base_1 = require("../base");

class FunnelChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    needAxes() {
        return !1;
    }
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "funnelAlign", "funnelOrient", "heightRatio", "shape", "funnel", "transform", "outerLabel", "transformLabel", "isTransform", "maxSize", "minSize", "gap", "isCone", "range", "transformRatioText" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), super.transformSeriesSpec(spec);
    }
}

exports.FunnelChartSpecTransformer = FunnelChartSpecTransformer;
//# sourceMappingURL=funnel-transformer.js.map
