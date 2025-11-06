"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Bar3dSeriesSpecTransformer = void 0;

const bar_transformer_1 = require("./bar-transformer");

class Bar3dSeriesSpecTransformer extends bar_transformer_1.BarSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "bar3d");
    }
}

exports.Bar3dSeriesSpecTransformer = Bar3dSeriesSpecTransformer;
//# sourceMappingURL=bar-3d-transformer.js.map
