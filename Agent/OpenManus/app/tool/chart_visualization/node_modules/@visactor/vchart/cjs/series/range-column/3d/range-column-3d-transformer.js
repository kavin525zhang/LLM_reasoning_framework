"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RangeColumn3dSeriesSpecTransformer = void 0;

const range_column_transformer_1 = require("../range-column-transformer");

class RangeColumn3dSeriesSpecTransformer extends range_column_transformer_1.RangeColumnSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        var _a;
        "bothEnd" !== (null === (_a = spec.label) || void 0 === _a ? void 0 : _a.position) && this._addMarkLabelSpec(spec, "bar3d");
    }
}

exports.RangeColumn3dSeriesSpecTransformer = RangeColumn3dSeriesSpecTransformer;
//# sourceMappingURL=range-column-3d-transformer.js.map
