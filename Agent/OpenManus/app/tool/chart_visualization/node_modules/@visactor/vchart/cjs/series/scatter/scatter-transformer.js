"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ScatterSeriesSpecTransformer = void 0;

const base_1 = require("../base");

class ScatterSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "point");
    }
}

exports.ScatterSeriesSpecTransformer = ScatterSeriesSpecTransformer;
//# sourceMappingURL=scatter-transformer.js.map
