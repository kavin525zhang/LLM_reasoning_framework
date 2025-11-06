import { BaseSeriesTooltipHelper } from "../base/tooltip-helper";

export class GaugePointerTooltipHelper extends BaseSeriesTooltipHelper {
    enableByType(activeType) {
        return "dimension" !== activeType;
    }
}
//# sourceMappingURL=pointer-tooltip-helper.js.map
