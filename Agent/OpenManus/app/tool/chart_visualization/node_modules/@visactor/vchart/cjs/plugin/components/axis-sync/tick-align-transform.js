"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.tickAlign = void 0;

const vrender_components_1 = require("@visactor/vrender-components"), vutils_1 = require("@visactor/vutils");

function saveTick(value, minInput, inputRange, minOutput, outputRange) {
    const sub = (0, vutils_1.precisionSub)(value, minInput), decimalPlaces = Math.max((0, 
    vutils_1.getDecimalPlaces)(inputRange), (0, vutils_1.getDecimalPlaces)(sub));
    return outputRange * (Math.round(sub * 10 ** decimalPlaces) / Math.round(inputRange * 10 ** decimalPlaces)) + minOutput;
}

const tickAlign = (data, op) => {
    var _a, _b, _c, _d, _e;
    if (!data) return data;
    const targetAxis = null === (_a = null == op ? void 0 : op.targetAxis) || void 0 === _a ? void 0 : _a.call(op);
    if (!targetAxis) return data;
    const currentAxis = null === (_b = null == op ? void 0 : op.currentAxis) || void 0 === _b ? void 0 : _b.call(op);
    if (!currentAxis) return data;
    const currentData = null === (_c = currentAxis.getTickData()) || void 0 === _c ? void 0 : _c.getDataView();
    if (!currentData) return data;
    if (!currentData.transformsArr.find((t => t.type.includes("ticks")))) return data;
    const currentScale = currentAxis.getScale();
    if (!currentScale) return data;
    const targetData = null === (_e = null === (_d = targetAxis.getTickData()) || void 0 === _d ? void 0 : _d.getDataView()) || void 0 === _e ? void 0 : _e.latestData;
    if (!(null == targetData ? void 0 : targetData.length)) return data;
    const targetScale = targetAxis.getScale();
    if (!targetScale) return data;
    const targetDomain = targetScale.domain(), targetRange = (0, vutils_1.last)(targetDomain) - targetDomain[0];
    if (0 === targetRange) return data;
    const currentDomain = currentScale.domain(), currentRange = (0, vutils_1.last)(currentDomain) - currentDomain[0];
    if (0 === targetRange) return data;
    const newTicks = targetData.map((d => saveTick(d.value, targetDomain[0], targetRange, currentDomain[0], currentRange)));
    return (0, vrender_components_1.convertDomainToTickData)(newTicks);
};

exports.tickAlign = tickAlign;
//# sourceMappingURL=tick-align-transform.js.map
