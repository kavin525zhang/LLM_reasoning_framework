"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.HeatmapSeriesSpecTransformer = void 0;

const base_1 = require("../base");

class HeatmapSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "cell");
    }
}

exports.HeatmapSeriesSpecTransformer = HeatmapSeriesSpecTransformer;
//# sourceMappingURL=heatmap-transformer.js.map
