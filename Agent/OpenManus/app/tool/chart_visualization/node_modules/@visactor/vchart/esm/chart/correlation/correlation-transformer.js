import { BaseChartSpecTransformer } from "../base";

export class CorrelationChartSpecTransformer extends BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "sizeField", "sizeRange", "centerX", "centerY", "innerRadius", "outerRadius", "startAngle", "endAngle", "ripplePoint", "centerPoint", "centerLabel", "nodePoint" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}
//# sourceMappingURL=correlation-transformer.js.map
