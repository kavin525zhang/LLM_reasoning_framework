"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DotSeriesTooltipHelper = void 0;

const tooltip_helper_1 = require("../base/tooltip-helper"), vutils_1 = require("@visactor/vutils");

class DotSeriesTooltipHelper extends tooltip_helper_1.BaseSeriesTooltipHelper {
    constructor() {
        super(...arguments), this.shapeTypeCallback = () => "square";
    }
    enableByType(activeType) {
        return "mark" === activeType;
    }
    getDefaultTitlePattern(activeType) {
        return {
            key: "event info",
            value: "event info"
        };
    }
    getDefaultContentList() {
        return [ {
            key: datum => datum.type,
            value: datum => datum.id
        }, {
            key: "event_time",
            value: datum => vutils_1.TimeUtil.getInstance().timeFormat("%Y%m%d", datum.event_time)
        }, {
            key: "action_type",
            value: datum => datum.action_type
        }, {
            key: "children",
            value: datum => datum.children
        } ];
    }
    getTooltipData(activeType, chartTooltipSpec, data, datum, params) {
        var _a, _b, _c, _d;
        const res = super.getTooltipData(activeType, chartTooltipSpec, data, datum, params), userUpdateContent = null !== (_c = null === (_b = null === (_a = this.spec) || void 0 === _a ? void 0 : _a[activeType]) || void 0 === _b ? void 0 : _b.updateContent) && void 0 !== _c ? _c : null === (_d = null == chartTooltipSpec ? void 0 : chartTooltipSpec[activeType]) || void 0 === _d ? void 0 : _d.updateContent;
        return res && !userUpdateContent && (res.updateContent = (prev, datum, params) => {
            const childrenContent = [], childrenPrev = prev.filter((p => "children" === p.key));
            return childrenPrev.length > 0 && childrenPrev[0].value.forEach((element => {
                let flag = !0;
                for (const key in element) childrenContent.push(Object.assign(Object.assign({}, childrenPrev[0]), {
                    shapeType: "circle",
                    hasShape: flag,
                    key: key,
                    value: element[key] + ""
                })), flag = !1;
            })), prev.concat(childrenContent);
        }), res;
    }
}

exports.DotSeriesTooltipHelper = DotSeriesTooltipHelper;
//# sourceMappingURL=tooltip-helper.js.map
