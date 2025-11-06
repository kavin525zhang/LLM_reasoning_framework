import { BaseSeriesTooltipHelper } from "../base/tooltip-helper";

import { getVennSeriesDataKey } from "./util";

export class VennTooltipHelper extends BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.dimensionTooltipTitleCallback = datum => getVennSeriesDataKey(null == datum ? void 0 : datum[this.series.getDimensionField()[0]]), 
        this.markTooltipKeyCallback = datum => getVennSeriesDataKey(null == datum ? void 0 : datum[this.series.getDimensionField()[0]]);
    }
}
//# sourceMappingURL=tooltip-helper.js.map
