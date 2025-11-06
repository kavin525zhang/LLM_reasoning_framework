"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CirclePackingChartSpecTransformer = void 0;

const base_1 = require("../base");

class CirclePackingChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "layoutPadding", "circlePacking", "drill", "drillField" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}

exports.CirclePackingChartSpecTransformer = CirclePackingChartSpecTransformer;
//# sourceMappingURL=circle-packing-transformer.js.map
