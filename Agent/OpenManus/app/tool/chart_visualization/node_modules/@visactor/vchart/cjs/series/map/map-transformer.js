"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MapSeriesSpecTransformer = void 0;

const base_1 = require("../base");

class MapSeriesSpecTransformer extends base_1.BaseSeriesSpecTransformer {
    _transformLabelSpec(spec) {
        this._addMarkLabelSpec(spec, "area", void 0, void 0, !1);
    }
}

exports.MapSeriesSpecTransformer = MapSeriesSpecTransformer;
//# sourceMappingURL=map-transformer.js.map
