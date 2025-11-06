"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.continuousTicks = exports.DEFAULT_CONTINUOUS_TICK_COUNT = void 0;

const vscale_1 = require("@visactor/vscale"), vutils_1 = require("@visactor/vutils"), util_1 = require("./util"), util_2 = require("../util"), filterTicksByBreak = (ticks, breakDomains) => breakDomains && breakDomains.length ? ticks.filter((tick => breakDomains.every((breakDomain => tick < breakDomain[0] || tick > breakDomain[1])))) : ticks;

function getScaleTicks(op, scale, count, getTicks) {
    let scaleTicks;
    const {breakData: breakData} = op;
    if (breakData && breakData()) {
        const {breakDomains: breakDomains} = breakData(), domain = scale.domain();
        scaleTicks = [];
        for (let i = 0; i < domain.length - 1; i++) {
            getTicks(count, [ domain[i], domain[i + 1] ]).forEach((tick => {
                breakDomains.some((breakDomain => tick >= breakDomain[0] && tick <= breakDomain[1])) || scaleTicks.push(tick);
            }));
        }
        scale.domain(domain);
    } else scaleTicks = getTicks(count);
    return scaleTicks;
}

function forceItemVisible(sourceItem, items, check, comparator, inverse = !1) {
    if (check && !items.includes(sourceItem)) {
        let remainLength = items.length;
        if (remainLength > 1) {
            inverse ? items.push(sourceItem) : items.unshift(sourceItem);
            for (let i = 0; i < remainLength; i++) {
                const index = inverse ? remainLength - 1 - i : i;
                if (!comparator(items[index])) break;
                items.splice(index, 1), i--, remainLength--;
            }
        }
    }
}

exports.DEFAULT_CONTINUOUS_TICK_COUNT = 5;

const continuousTicks = (scale, op) => {
    var _a, _b;
    if (!(0, vscale_1.isContinuous)(scale.type)) return (0, util_1.convertDomainToTickData)(scale.domain());
    const range = scale.range(), rangeSize = Math.abs(range[range.length - 1] - range[0]);
    if (rangeSize < 2) return (0, util_1.convertDomainToTickData)([ scale.domain()[0] ]);
    const {tickCount: tickCount, forceTickCount: forceTickCount, tickStep: tickStep, noDecimals: noDecimals = !1, labelStyle: labelStyle, breakData: breakData} = op;
    let scaleTicks;
    if ((0, vutils_1.isValid)(tickStep)) ticks = scale.stepTicks(tickStep), breakDomains = breakData && breakData() ? breakData().breakDomains : null, 
    scaleTicks = breakDomains && breakDomains.length ? ticks.filter((tick => breakDomains.every((breakDomain => tick < breakDomain[0] || tick > breakDomain[1])))) : ticks; else if ((0, 
    vutils_1.isValid)(forceTickCount)) scaleTicks = getScaleTicks(op, scale, forceTickCount, ((count, subDomain) => subDomain && subDomain.length ? scale.domain(subDomain, !0).forceTicks(count) : scale.forceTicks(count))); else if ("d3" === op.tickMode) {
        const count = null !== (_a = (0, vutils_1.isFunction)(tickCount) ? tickCount({
            axisLength: rangeSize,
            labelStyle: labelStyle
        }) : tickCount) && void 0 !== _a ? _a : exports.DEFAULT_CONTINUOUS_TICK_COUNT;
        scaleTicks = getScaleTicks(op, scale, count, ((count, subDomain) => subDomain && subDomain.length ? scale.domain(subDomain, !0).d3Ticks(count, {
            noDecimals: noDecimals
        }) : scale.d3Ticks(count, {
            noDecimals: noDecimals
        })));
    } else {
        const count = null !== (_b = (0, vutils_1.isFunction)(tickCount) ? tickCount({
            axisLength: rangeSize,
            labelStyle: labelStyle
        }) : tickCount) && void 0 !== _b ? _b : exports.DEFAULT_CONTINUOUS_TICK_COUNT, customTicks = (0, 
        vutils_1.isFunction)(op.tickMode) ? op.tickMode : void 0;
        scaleTicks = getScaleTicks(op, scale, count, ((count, subDomain) => subDomain && subDomain.length ? scale.domain(subDomain, !0).ticks(count, {
            noDecimals: noDecimals,
            customTicks: customTicks
        }) : scale.ticks(count, {
            noDecimals: noDecimals,
            customTicks: customTicks
        })));
    }
    var ticks, breakDomains;
    const domain = scale.domain();
    if (op.labelFirstVisible && domain[0] !== scaleTicks[0] && !scaleTicks.includes(domain[0]) && scaleTicks.unshift(domain[0]), 
    op.labelLastVisible && domain[domain.length - 1] !== scaleTicks[scaleTicks.length - 1] && !scaleTicks.includes(domain[domain.length - 1]) && scaleTicks.push(domain[domain.length - 1]), 
    op.sampling && scaleTicks.length > 1 && ("cartesian" === op.coordinateType || "polar" === op.coordinateType && "radius" === op.axisOrientType)) {
        const {labelGap: labelGap = 4, labelFlush: labelFlush} = op, MIN_FONT_SIZE = 6;
        let items;
        if (scaleTicks.length * MIN_FONT_SIZE > rangeSize) {
            const samplingScaleTicks = [], step = Math.floor(scaleTicks.length * MIN_FONT_SIZE / rangeSize);
            scaleTicks.forEach(((tick, index) => {
                index % step != 0 && index !== scaleTicks.length - 1 || samplingScaleTicks.push(tick);
            })), items = (0, util_1.getCartesianLabelBounds)(scale, samplingScaleTicks, op).map(((bounds, i) => ({
                AABBBounds: bounds,
                value: samplingScaleTicks[i]
            })));
        } else items = (0, util_1.getCartesianLabelBounds)(scale, scaleTicks, op).map(((bounds, i) => ({
            AABBBounds: bounds,
            value: scaleTicks[i]
        })));
        const firstSourceItem = items[0], lastSourceItem = (0, vutils_1.last)(items), samplingMethod = breakData && breakData() ? methods.greedy : methods.parity;
        for (;items.length >= 3 && (0, util_2.hasOverlap)(items, labelGap); ) items = samplingMethod(items, labelGap);
        const checkFirst = op.labelFirstVisible;
        let checkLast = op.labelLastVisible;
        (0, util_2.textIntersect)(firstSourceItem, lastSourceItem, labelGap) && items.includes(lastSourceItem) && items.length > 1 && checkFirst && checkLast && (items.splice(items.indexOf(lastSourceItem), 1), 
        checkLast = !1), forceItemVisible(firstSourceItem, items, checkFirst, (item => (0, 
        util_2.textIntersect)(item, firstSourceItem, labelGap))), forceItemVisible(lastSourceItem, items, checkLast, (item => (0, 
        util_2.textIntersect)(item, lastSourceItem, labelGap) || !(!checkFirst || item === firstSourceItem) && (0, 
        util_2.textIntersect)(item, firstSourceItem, labelGap)), !0);
        const ticks = items.map((item => item.value));
        ticks.length < 3 && labelFlush && (ticks.length > 1 && ticks.pop(), (0, vutils_1.last)(ticks) !== (0, 
        vutils_1.last)(scaleTicks) && ticks.push((0, vutils_1.last)(scaleTicks))), scaleTicks = ticks;
    }
    return (0, util_1.convertDomainToTickData)(scaleTicks);
};

exports.continuousTicks = continuousTicks;

const methods = {
    parity: function(items) {
        return items.filter(((item, i) => i % 2 == 0));
    },
    greedy: function(items, sep) {
        let a;
        return items.filter(((b, i) => (!i || !(0, util_2.textIntersect)(a, b, sep)) && (a = b, 
        !0)));
    }
};
//# sourceMappingURL=continuous.js.map
