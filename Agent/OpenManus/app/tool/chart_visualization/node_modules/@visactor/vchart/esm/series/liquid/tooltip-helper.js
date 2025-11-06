import { BaseSeriesTooltipHelper } from "../base/tooltip-helper";

export class LiquidSeriesTooltipHelper extends BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.markTooltipKeyCallback = datum => this.series.getValueField(), 
        this.markTooltipValueCallback = datum => datum[this.series.getValueField()], this.shapeStrokeCallback = datum => this.series.getMarkInName("liquid").getAttribute("fill", datum);
    }
}
//# sourceMappingURL=tooltip-helper.js.map
