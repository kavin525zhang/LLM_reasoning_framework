"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RoseSeriesSpecTransformer = void 0;

const base_1 = require("../base");

class RoseSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    constructor() {
        super(...arguments), this._supportStack = !0;
    }
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "rose");
    }
}

exports.RoseSeriesSpecTransformer = RoseSeriesSpecTransformer;
//# sourceMappingURL=rose-transformer.js.map
