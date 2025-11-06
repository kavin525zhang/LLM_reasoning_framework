"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BarChartSpecTransformer = void 0;

const vutils_1 = require("@visactor/vutils"), cartesian_1 = require("../cartesian"), util_1 = require("../util");

class BarChartSpecTransformer extends cartesian_1.CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "barWidth", "barMaxWidth", "barMinWidth", "barGapInGroup", "barMinHeight", "sampling", "samplingFactor", "barBackground", "stackCornerRadius" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), (0, util_1.setDefaultCrosshairForCartesianChart)(spec);
    }
    _transformAxisSpec(spec) {
        var _a, _b;
        if (super._transformAxisSpec(spec), !spec.axes) return;
        const isHorizontal = spec.series.some((series => "horizontal" === series.direction)), bandAxis = null !== (_a = spec.axes.find((axis => "band" === axis.type))) && void 0 !== _a ? _a : spec.axes.find((axis => (isHorizontal ? [ "left", "right" ] : [ "top", "bottom" ]).includes(axis.orient)));
        if (bandAxis && !bandAxis.bandSize && !bandAxis.maxBandSize && !bandAxis.minBandSize && spec.autoBandSize) {
            const extend = (0, vutils_1.isObject)(spec.autoBandSize) && null !== (_b = spec.autoBandSize.extend) && void 0 !== _b ? _b : 0, {barMaxWidth: barMaxWidth, barMinWidth: barMinWidth, barWidth: barWidth, barGapInGroup: barGapInGroup} = spec.series.find((series => "bar" === series.type));
            this._applyAxisBandSize(bandAxis, extend, {
                barMaxWidth: barMaxWidth,
                barMinWidth: barMinWidth,
                barWidth: barWidth,
                barGapInGroup: barGapInGroup
            });
        }
    }
}

exports.BarChartSpecTransformer = BarChartSpecTransformer;
//# sourceMappingURL=bar-transformer.js.map
