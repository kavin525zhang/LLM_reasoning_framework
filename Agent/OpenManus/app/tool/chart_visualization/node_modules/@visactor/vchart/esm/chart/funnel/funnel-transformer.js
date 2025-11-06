import { BaseChartSpecTransformer } from "../base";

export class FunnelChartSpecTransformer extends BaseChartSpecTransformer {
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
//# sourceMappingURL=funnel-transformer.js.map
