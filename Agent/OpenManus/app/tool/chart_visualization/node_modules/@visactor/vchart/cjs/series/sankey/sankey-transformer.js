"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SankeySeriesSpecTransformer = void 0;

const base_1 = require("../base");

class SankeySeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "node");
    }
}

exports.SankeySeriesSpecTransformer = SankeySeriesSpecTransformer;
//# sourceMappingURL=sankey-transformer.js.map
