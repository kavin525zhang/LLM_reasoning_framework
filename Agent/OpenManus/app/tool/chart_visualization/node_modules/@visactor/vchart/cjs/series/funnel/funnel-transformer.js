"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.FunnelSeriesSpecTransformer = void 0;

const base_1 = require("../base");

class FunnelSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "funnel"), spec.isTransform && this._addMarkLabelSpec(spec, "transform", "transformLabel");
    }
}

exports.FunnelSeriesSpecTransformer = FunnelSeriesSpecTransformer;
//# sourceMappingURL=funnel-transformer.js.map
