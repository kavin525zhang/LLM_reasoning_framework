"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LinkSeriesTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper"), vutils_1 = require("@visactor/vutils");

class LinkSeriesTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
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
            value: datum => vutils_1.TimeUtil.getInstance().timeFormat("%Y%m%d %H:%M", datum.from.split("_")[1])
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

exports.LinkSeriesTooltipHelper = LinkSeriesTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
