import { BaseSeriesTooltipHelper } from "../base/tooltip-helper";

export class PictogramSeriesTooltipHelper extends BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.dimensionTooltipTitleCallback = datum => {
            var _a;
            const series = this.series;
            return null !== (_a = this._getDimensionData(datum)) && void 0 !== _a ? _a : series.getDatumName(datum);
        }, this.markTooltipValueCallback = (datum, params) => {
            const {measureFields: measureFields} = this._seriesCacheInfo;
            if (measureFields[0] && datum.data) return datum.data[measureFields[0]];
        }, this.markTooltipKeyCallback = datum => {
            var _a;
            return null === (_a = datum.data) || void 0 === _a ? void 0 : _a[this.series.getDimensionField()[0]];
        };
    }
}
//# sourceMappingURL=tooltip-helper.js.map
