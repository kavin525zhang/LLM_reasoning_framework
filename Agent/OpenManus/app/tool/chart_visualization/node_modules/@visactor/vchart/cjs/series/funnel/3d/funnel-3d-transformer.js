"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Funnel3dSeriesSpecTransformer = void 0;

const funnel_transformer_1 = require("../funnel-transformer");

class Funnel3dSeriesSpecTransformer extends funnel_transformer_1.FunnelSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "funnel3d"), spec.isTransform && this._addMarkLabelSpec(spec, "transform3d", "transformLabel");
    }
}

exports.Funnel3dSeriesSpecTransformer = Funnel3dSeriesSpecTransformer;
//# sourceMappingURL=funnel-3d-transformer.js.map
