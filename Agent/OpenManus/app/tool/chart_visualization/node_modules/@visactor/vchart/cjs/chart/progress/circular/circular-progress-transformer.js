"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CircularProgressChartSpecTransformer = void 0;

const polar_1 = require("../../polar");

class CircularProgressChartSpecTransformer extends polar_1.ProgressLikeChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        var _a, _b;
        const series = super._getDefaultSeriesSpec(spec);
        return series.progress = spec.progress, series.track = spec.track, series.tickMask = spec.tickMask, 
        series.cornerRadius = null !== (_a = spec.cornerRadius) && void 0 !== _a ? _a : 0, 
        series.roundCap = null !== (_b = spec.roundCap) && void 0 !== _b && _b, series;
    }
    transformSpec(spec) {
        super.transformSpec(spec), this._transformProgressAxisSpec(spec, {
            orient: "angle",
            visible: !1
        }, {
            orient: "radius",
            visible: !1
        }, {
            forceInitTick: spec.tickMask && !1 !== spec.tickMask.visible
        });
    }
}

exports.CircularProgressChartSpecTransformer = CircularProgressChartSpecTransformer;
//# sourceMappingURL=circular-progress-transformer.js.map
