import { BaseChartSpecTransformer } from "../base";

export class CirclePackingChartSpecTransformer extends BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "layoutPadding", "circlePacking", "drill", "drillField" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}
//# sourceMappingURL=circle-packing-transformer.js.map
