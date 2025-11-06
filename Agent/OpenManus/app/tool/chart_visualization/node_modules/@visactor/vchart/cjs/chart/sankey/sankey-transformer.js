"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SankeyChartSpecTransformer = void 0;

const base_1 = require("../base");

class SankeyChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "sourceField", "targetField", "direction", "nodeAlign", "crossNodeAlign", "nodeGap", "nodeWidth", "linkWidth", "minStepWidth", "minNodeHeight", "maxNodeHeight", "minLinkHeight", "maxLinkHeight", "dropIsolatedNode", "nodeHeight", "linkHeight", "equalNodeHeight", "linkOverlap", "iterations", "nodeKey", "linkSortBy", "nodeSortBy", "setNodeLayer", "node", "link", "emphasis", "inverse", "overflow" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}

exports.SankeyChartSpecTransformer = SankeyChartSpecTransformer;
//# sourceMappingURL=sankey-transformer.js.map
