"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CommonChartSpecTransformer = void 0;

const util_1 = require("../../util"), base_1 = require("../base"), util_2 = require("../util"), vutils_extension_1 = require("@visactor/vutils-extension");

class CommonChartSpecTransformer extends base_1.BaseChartSpecTransformer {
    _getDefaultSeriesSpec(spec) {
        const defaultSpec = super._getDefaultSeriesSpec(spec);
        return delete defaultSpec.data, defaultSpec;
    }
    _transformAxisSpec(spec) {
        spec.axes && spec.autoBandSize && spec.series.forEach(((series, seriesIndex) => {
            var _a;
            if ("bar" === series.type) {
                const relatedAxis = this._findBandAxisBySeries(series, seriesIndex, spec.axes);
                if (relatedAxis && !relatedAxis.bandSize && !relatedAxis.maxBandSize && !relatedAxis.minBandSize) {
                    const extend = (0, util_1.isObject)(series.autoBandSize) && null !== (_a = series.autoBandSize.extend) && void 0 !== _a ? _a : 0, {barMaxWidth: barMaxWidth, barMinWidth: barMinWidth, barWidth: barWidth, barGapInGroup: barGapInGroup} = series;
                    this._applyAxisBandSize(relatedAxis, extend, {
                        barMaxWidth: barMaxWidth,
                        barMinWidth: barMinWidth,
                        barWidth: barWidth,
                        barGapInGroup: barGapInGroup
                    });
                }
            }
        }));
    }
    transformSpec(spec) {
        if (super.transformSpec(spec), spec.series && spec.series.length) {
            const defaultSeriesSpec = this._getDefaultSeriesSpec(spec);
            spec.series.forEach((s => {
                this._isValidSeries(s.type) && Object.keys(defaultSeriesSpec).forEach((k => {
                    k in s || (s[k] = defaultSeriesSpec[k]);
                }));
            }));
        }
        spec.axes && spec.axes.length && spec.axes.forEach((axis => {
            (0, util_1.get)(axis, "trimPadding") && (0, vutils_extension_1.mergeSpec)(axis, (0, 
            util_2.getTrimPaddingConfig)(this.type, spec));
        })), this._transformAxisSpec(spec);
    }
}

exports.CommonChartSpecTransformer = CommonChartSpecTransformer;
//# sourceMappingURL=common-transformer.js.map
