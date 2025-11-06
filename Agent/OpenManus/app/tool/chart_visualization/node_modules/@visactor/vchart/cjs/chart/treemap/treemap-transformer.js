"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.TreemapChartSpecTransformer = void 0;

const base_1 = require("../base");

class TreemapChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "aspectRatio", "splitType", "maxDepth", "gapWidth", "nodePadding", "minVisibleArea", "minChildrenVisibleArea", "minChildrenVisibleSize", "roam", "drill", "drillField", "leaf", "nonLeaf", "nonLeafLabel" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}

exports.TreemapChartSpecTransformer = TreemapChartSpecTransformer;
//# sourceMappingURL=treemap-transformer.js.map
