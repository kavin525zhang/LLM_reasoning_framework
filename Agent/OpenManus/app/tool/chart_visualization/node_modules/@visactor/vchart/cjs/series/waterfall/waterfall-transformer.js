"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.WaterfallSeriesSpecTransformer = void 0;

const bar_transformer_1 = require("../bar/bar-transformer");

class WaterfallSeriesSpecTransformer extends bar_transformer_1.BarSeriesSpecTransformer {
    constructor() {
        super(...arguments), this._supportStack = !1;
    }
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "bar"), this._addMarkLabelSpec(spec, "bar", "stackLabel", "initStackLabelMarkStyle");
    }
}

exports.WaterfallSeriesSpecTransformer = WaterfallSeriesSpecTransformer;
//# sourceMappingURL=waterfall-transformer.js.map
