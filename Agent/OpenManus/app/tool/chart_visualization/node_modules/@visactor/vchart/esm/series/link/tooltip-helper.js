import { BaseSeriesTooltipHelper } from "../base/tooltip-helper";

import { TimeUtil } from "@visactor/vutils";

export class LinkSeriesTooltipHelper extends BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.shapeTypeCallback = () => "square";
    }
    enableByType(activeType) {
        return "mark" === activeType;
    }
    getDefaultTitlePattern(activeType) {
        return {
            key: "link info",
            value: "link info"
        };
    }
    getDefaultContentList() {
        return [ {
            key: "time",
            value: datum => TimeUtil.getInstance().timeFormat("%Y%m%d %H:%M", datum.from.split("_")[1])
        }, {
            key: "type",
            value: datum => datum.action_type
        }, {
            key: "from",
            value: datum => datum.from
        }, {
            key: "to",
            value: datum => datum.to
        } ];
    }
}
//# sourceMappingURL=tooltip-helper.js.map
