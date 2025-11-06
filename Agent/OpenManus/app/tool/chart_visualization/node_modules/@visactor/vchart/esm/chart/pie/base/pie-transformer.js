import { PolarChartSpecTransformer } from "../../polar";

export class BasePieChartSpecTransformer extends PolarChartSpecTransformer {
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
//# sourceMappingURL=pie-transformer.js.map
