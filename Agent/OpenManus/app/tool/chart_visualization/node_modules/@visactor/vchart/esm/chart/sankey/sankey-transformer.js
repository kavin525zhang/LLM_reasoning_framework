import { BaseChartSpecTransformer } from "../base";

export class SankeyChartSpecTransformer extends BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "sourceField", "targetField", "direction", "nodeAlign", "crossNodeAlign", "nodeGap", "nodeWidth", "linkWidth", "minStepWidth", "minNodeHeight", "maxNodeHeight", "minLinkHeight", "maxLinkHeight", "dropIsolatedNode", "nodeHeight", "linkHeight", "equalNodeHeight", "linkOverlap", "iterations", "nodeKey", "linkSortBy", "nodeSortBy", "setNodeLayer", "node", "link", "emphasis", "inverse", "overflow" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}
//# sourceMappingURL=sankey-transformer.js.map
