"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BarSeriesSpecTransformer = void 0;

const base_1 = require("../base");

class BarSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    constructor() {
        super(...arguments), this._supportStack = !0;
    }
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "bar");
    }
}

exports.BarSeriesSpecTransformer = BarSeriesSpecTransformer;
//# sourceMappingURL=bar-transformer.js.map
