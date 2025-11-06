"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LiquidChartSpecTransformer = void 0;

const base_1 = require("../base");

class LiquidChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "valueField", "maskShape", "reverse", "outlineMargin", "outlinePadding", "indicatorSmartInvert", "liquidBackground", "liquidOutline" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}

exports.LiquidChartSpecTransformer = LiquidChartSpecTransformer;
//# sourceMappingURL=liquid-transformer.js.map
