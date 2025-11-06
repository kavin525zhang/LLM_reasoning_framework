"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RangeColumnSeriesSpecTransformer = void 0;

const bar_transformer_1 = require("../bar/bar-transformer");

class RangeColumnSeriesSpecTransformer extends bar_transformer_1.BarSeriesSpecTransformer {
    constructor() {
        super(...arguments), this._supportStack = !1;
    }
    _transformLabelSpec(spec) {
        var _a;
        "bothEnd" !== (null === (_a = spec.label) || void 0 === _a ? void 0 : _a.position) && this._addMarkLabelSpec(spec, "bar");
    }
}

exports.RangeColumnSeriesSpecTransformer = RangeColumnSeriesSpecTransformer;
//# sourceMappingURL=range-column-transformer.js.map
