import { BaseSeriesTooltipHelper } from "../base/tooltip-helper";

import { isNumber } from "@visactor/vutils";

export class SankeySeriesTooltipHelper extends BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this._getDimensionData = datum => {
            if (datum.source) {
                if (isNumber(datum.source)) {
                    const seriesKeys = this.series.getSeriesKeys();
                    return seriesKeys[datum.source] + " => " + seriesKeys[datum.target];
                }
                return datum.source + " => " + datum.target;
            }
            return datum.datum ? datum.datum[this.series.getSpec().categoryField] : datum.key;
        }, this.markTooltipValueCallback = datum => datum.value;
    }
}
//# sourceMappingURL=tooltip-helper.js.map
