"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getTooltipSpecForShow = void 0;

const vutils_1 = require("@visactor/vutils"), common_1 = require("./common"), pick_keys = [ "updateTitle", "updateContent", "updatePosition", "maxLineCount", "othersLine" ], getTooltipSpecForShow = (activeType, globalSpec, series, data, params) => {
    var _a, _b, _c;
    const finalSpec = {
        activeType: activeType
    };
    switch (activeType) {
      case "mark":
      case "group":
        if (series) {
            const seriesSpec = null === (_a = series.getSpec()) || void 0 === _a ? void 0 : _a.tooltip;
            return finalSpec.visible = !0, (null == seriesSpec ? void 0 : seriesSpec.handler) && (finalSpec.handler = seriesSpec.handler), 
            (null === (_b = finalSpec.handler) || void 0 === _b ? void 0 : _b.showTooltip) ? finalSpec : ((null == seriesSpec ? void 0 : seriesSpec[activeType]) && pick_keys.forEach((k => {
                (0, vutils_1.isValid)(seriesSpec[activeType][k]) && (finalSpec[k] = seriesSpec[activeType][k]);
            })), Object.assign(Object.assign({}, finalSpec), series.tooltipHelper.getTooltipData(activeType, globalSpec, data, data[0].datum, params)));
        }
        break;

      case "dimension":
        if (null == data ? void 0 : data.length) {
            if (getSeriesListFromDimensionInfo(data).every((series => {
                var _a;
                return !(0, common_1.isActiveTypeVisible)("dimension", null === (_a = series.tooltipHelper) || void 0 === _a ? void 0 : _a.spec);
            })) ? finalSpec.visible = !1 : finalSpec.visible = !0, finalSpec.handler = globalSpec.handler, 
            null === (_c = finalSpec.handler) || void 0 === _c ? void 0 : _c.showTooltip) return finalSpec;
            const patternList = [];
            return data.forEach((info => info.data.forEach((datum => {
                const {series: series} = datum, pattern = series.tooltipHelper.getTooltipData(activeType, globalSpec, data, datum.datum, params);
                pattern && patternList.push(pattern);
            })))), (0, common_1.combineContents)(patternList);
        }
    }
    return null;
};

exports.getTooltipSpecForShow = getTooltipSpecForShow;

const getSeriesListFromDimensionInfo = dimensionInfo => {
    const list = [];
    return dimensionInfo.forEach((info => {
        info.data.forEach((datum => {
            (0, vutils_1.isValid)(datum.series) && list.push(datum.series);
        }));
    })), list;
};
//# sourceMappingURL=get-spec.js.map
