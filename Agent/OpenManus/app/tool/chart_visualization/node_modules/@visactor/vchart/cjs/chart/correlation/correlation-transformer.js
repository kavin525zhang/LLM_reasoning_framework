"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CorrelationChartSpecTransformer = void 0;

const base_1 = require("../base");

class CorrelationChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "sizeField", "sizeRange", "centerX", "centerY", "innerRadius", "outerRadius", "startAngle", "endAngle", "ripplePoint", "centerPoint", "centerLabel", "nodePoint" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}

exports.CorrelationChartSpecTransformer = CorrelationChartSpecTransformer;
//# sourceMappingURL=correlation-transformer.js.map
