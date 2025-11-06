"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BasePieChartSpecTransformer = void 0;

const polar_1 = require("../../polar");

class BasePieChartSpecTransformer extends polar_1.PolarChartSpecTransformer {
    needAxes() {
        return !1;
    }
    _getDefaultSeriesSpec(spec) {
        var _a;
        const seriesSpec = super._getDefaultSeriesSpec(spec, [ "center", "centerOffset", "cornerRadius", "padAngle", "minAngle", "emptyPlaceholder", "showAllZero", "supportNegative", "layoutRadius" ]);
        return seriesSpec.categoryField = spec.categoryField || spec.seriesField, seriesSpec.valueField = spec.valueField || spec.angleField, 
        seriesSpec.emptyCircle = null === (_a = spec.emptyPlaceholder) || void 0 === _a ? void 0 : _a.emptyCircle, 
        seriesSpec;
    }
}

exports.BasePieChartSpecTransformer = BasePieChartSpecTransformer;
//# sourceMappingURL=pie-transformer.js.map
