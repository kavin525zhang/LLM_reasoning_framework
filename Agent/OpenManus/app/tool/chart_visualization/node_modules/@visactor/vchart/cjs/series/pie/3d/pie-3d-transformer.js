"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Pie3dSeriesSpecTransformer = void 0;

const pie_transformer_1 = require("../pie-transformer");

class Pie3dSeriesSpecTransformer extends pie_transformer_1.PieSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "pie3d");
    }
}

exports.Pie3dSeriesSpecTransformer = Pie3dSeriesSpecTransformer;
//# sourceMappingURL=pie-3d-transformer.js.map
