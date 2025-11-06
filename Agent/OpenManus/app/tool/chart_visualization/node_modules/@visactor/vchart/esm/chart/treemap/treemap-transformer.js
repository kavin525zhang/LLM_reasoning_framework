import { BaseChartSpecTransformer } from "../base";

export class TreemapChartSpecTransformer extends BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "aspectRatio", "splitType", "maxDepth", "gapWidth", "nodePadding", "minVisibleArea", "minChildrenVisibleArea", "minChildrenVisibleSize", "roam", "drill", "drillField", "leaf", "nonLeaf", "nonLeafLabel" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}
//# sourceMappingURL=treemap-transformer.js.map
