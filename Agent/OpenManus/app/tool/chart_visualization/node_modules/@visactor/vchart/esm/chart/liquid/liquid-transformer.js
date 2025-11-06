import { BaseChartSpecTransformer } from "../base";

export class LiquidChartSpecTransformer extends BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "valueField", "maskShape", "reverse", "outlineMargin", "outlinePadding", "indicatorSmartInvert", "liquidBackground", "liquidOutline" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}
//# sourceMappingURL=liquid-transformer.js.map
