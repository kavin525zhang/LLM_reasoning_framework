"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CorrelationSeriesSpecTransformer = void 0;

const base_1 = require("../base");

class CorrelationSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "nodePoint"), this._addMarkLabelSpec(spec, "centerPoint", "centerLabel");
    }
}

exports.CorrelationSeriesSpecTransformer = CorrelationSeriesSpecTransformer;
//# sourceMappingURL=correlation-transformer.js.map
