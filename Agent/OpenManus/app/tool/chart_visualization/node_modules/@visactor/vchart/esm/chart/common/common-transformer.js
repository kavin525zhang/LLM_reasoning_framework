import { get, isObject } from "../../util";

import { BaseChartSpecTransformer } from "../base";

import { getTrimPaddingConfig } from "../util";

import { mergeSpec } from "@visactor/vutils-extension";

export class CommonChartSpecTransformer extends BaseChartSpecTransformer {
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
                    const extend = isObject(series.autoBandSize) && null !== (_a = series.autoBandSize.extend) && void 0 !== _a ? _a : 0, {barMaxWidth: barMaxWidth, barMinWidth: barMinWidth, barWidth: barWidth, barGapInGroup: barGapInGroup} = series;
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
            get(axis, "trimPadding") && mergeSpec(axis, getTrimPaddingConfig(this.type, spec));
        })), this._transformAxisSpec(spec);
    }
}
//# sourceMappingURL=common-transformer.js.map
