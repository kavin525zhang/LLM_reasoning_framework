"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.GaugeSeriesSpecTransformer = void 0;

const base_1 = require("../base");

class GaugeSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    constructor() {
        super(...arguments), this._supportStack = !1;
    }
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "segment");
    }
}

exports.GaugeSeriesSpecTransformer = GaugeSeriesSpecTransformer;
//# sourceMappingURL=gauge-transformer.js.map
