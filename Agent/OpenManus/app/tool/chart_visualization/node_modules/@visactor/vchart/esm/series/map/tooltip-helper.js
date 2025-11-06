import { BaseSeriesTooltipHelper } from "../base/tooltip-helper";

export class MapSeriesTooltipHelper extends BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.dimensionTooltipTitleCallback = datum => {
            var _a;
            const series = this.series;
            return null !== (_a = this._getDimensionData(datum)) && void 0 !== _a ? _a : series.getDatumName(datum);
        };
    }
}
//# sourceMappingURL=tooltip-helper.js.map
