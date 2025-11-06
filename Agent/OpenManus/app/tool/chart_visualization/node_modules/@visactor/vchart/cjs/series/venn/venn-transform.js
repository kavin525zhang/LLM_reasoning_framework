"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.VennSeriesSpecTransformer = void 0;

const base_1 = require("../base");

class VennSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "circle"), this._addMarkLabelSpec(spec, "overlap", "overlapLabel", "initOverlapLabelMarkStyle");
    }
}

exports.VennSeriesSpecTransformer = VennSeriesSpecTransformer;
//# sourceMappingURL=venn-transform.js.map
