"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.VennChartSpecTransformer = void 0;

const base_1 = require("../base");

class VennChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "categoryField", "valueField", "circle", "overlap", "overlapLabel" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), this.transformSeriesSpec(spec);
    }
}

exports.VennChartSpecTransformer = VennChartSpecTransformer;
//# sourceMappingURL=venn-transformer.js.map
