import { BaseSeriesTooltipHelper } from "../base/tooltip-helper";

export class RangeAreaSeriesTooltipHelper extends BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this._getMeasureData = datum => "horizontal" === this.series.getSpec().direction ? datum[this.series.getSpec().xField[0]] + "-" + datum[this.series.getSpec().xField[1]] : datum[this.series.getSpec().yField[0]] + "-" + datum[this.series.getSpec().yField[1]];
    }
}
//# sourceMappingURL=tooltip-helper.js.map
