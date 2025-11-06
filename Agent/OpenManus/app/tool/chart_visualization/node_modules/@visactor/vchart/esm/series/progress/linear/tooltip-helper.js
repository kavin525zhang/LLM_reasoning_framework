import { BaseSeriesTooltipHelper } from "../../base/tooltip-helper";

export class LinearProgressSeriesTooltipHelper extends BaseSeriesTooltipHelper {
    enableByType(activeType) {
        return "dimension" !== activeType;
    }
}
//# sourceMappingURL=tooltip-helper.js.map
