import { isObject } from "@visactor/vutils";

import { CartesianChartSpecTransformer } from "../cartesian";

import { setDefaultCrosshairForCartesianChart } from "../util";

export class BarChartSpecTransformer extends CartesianChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        return super._getDefaultSeriesSpec(spec, [ "barWidth", "barMaxWidth", "barMinWidth", "barGapInGroup", "barMinHeight", "sampling", "samplingFactor", "barBackground", "stackCornerRadius" ]);
    }
    transformSpec(spec) {
        super.transformSpec(spec), setDefaultCrosshairForCartesianChart(spec);
    }
    _transformAxisSpec(spec) {
        var _a, _b;
        if (super._transformAxisSpec(spec), !spec.axes) return;
        const isHorizontal = spec.series.some((series => "horizontal" === series.direction)), bandAxis = null !== (_a = spec.axes.find((axis => "band" === axis.type))) && void 0 !== _a ? _a : spec.axes.find((axis => (isHorizontal ? [ "left", "right" ] : [ "top", "bottom" ]).includes(axis.orient)));
        if (bandAxis && !bandAxis.bandSize && !bandAxis.maxBandSize && !bandAxis.minBandSize && spec.autoBandSize) {
            const extend = isObject(spec.autoBandSize) && null !== (_b = spec.autoBandSize.extend) && void 0 !== _b ? _b : 0, {barMaxWidth: barMaxWidth, barMinWidth: barMinWidth, barWidth: barWidth, barGapInGroup: barGapInGroup} = spec.series.find((series => "bar" === series.type));
            this._applyAxisBandSize(bandAxis, extend, {
                barMaxWidth: barMaxWidth,
                barMinWidth: barMinWidth,
                barWidth: barWidth,
                barGapInGroup: barGapInGroup
            });
        }
    }
}
//# sourceMappingURL=bar-transformer.js.map
