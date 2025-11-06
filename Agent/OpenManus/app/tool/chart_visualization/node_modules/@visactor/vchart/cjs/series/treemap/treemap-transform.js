"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.TreemapSeriesSpecTransformer = void 0;

const base_1 = require("../base");

class TreemapSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "nonLeaf", "nonLeafLabel", "initNonLeafLabelMarkStyle"), 
        this._addMarkLabelSpec(spec, "leaf");
    }
}

exports.TreemapSeriesSpecTransformer = TreemapSeriesSpecTransformer;
//# sourceMappingURL=treemap-transform.js.map
