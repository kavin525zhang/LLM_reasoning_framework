import { isContinuous } from "@visactor/vscale";

import { isFunction, isValid, last } from "@visactor/vutils";

import { convertDomainToTickData, getCartesianLabelBounds } from "./util";

import { textIntersect as intersect, hasOverlap } from "../util";

const filterTicksByBreak = (ticks, breakDomains) => breakDomains && breakDomains.length ? ticks.filter((tick => breakDomains.every((breakDomain => tick < breakDomain[0] || tick > breakDomain[1])))) : ticks;

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

export const DEFAULT_CONTINUOUS_TICK_COUNT = 5;

export const continuousTicks = (scale, op) => {
    var _a, _b;
    if (!isContinuous(scale.type)) return convertDomainToTickData(scale.domain());
    const range = scale.range(), rangeSize = Math.abs(range[range.length - 1] - range[0]);
    if (rangeSize < 2) return convertDomainToTickData([ scale.domain()[0] ]);
    const {tickCount: tickCount, forceTickCount: forceTickCount, tickStep: tickStep, noDecimals: noDecimals = !1, labelStyle: labelStyle, breakData: breakData} = op;
    let scaleTicks;
    if (isValid(tickStep)) ticks = scale.stepTicks(tickStep), breakDomains = breakData && breakData() ? breakData().breakDomains : null, 
    scaleTicks = breakDomains && breakDomains.length ? ticks.filter((tick => breakDomains.every((breakDomain => tick < breakDomain[0] || tick > breakDomain[1])))) : ticks; else if (isValid(forceTickCount)) scaleTicks = getScaleTicks(op, scale, forceTickCount, ((count, subDomain) => subDomain && subDomain.length ? scale.domain(subDomain, !0).forceTicks(count) : scale.forceTicks(count))); else if ("d3" === op.tickMode) {
        const count = null !== (_a = isFunction(tickCount) ? tickCount({
            axisLength: rangeSize,
            labelStyle: labelStyle
        }) : tickCount) && void 0 !== _a ? _a : 5;
        scaleTicks = getScaleTicks(op, scale, count, ((count, subDomain) => subDomain && subDomain.length ? scale.domain(subDomain, !0).d3Ticks(count, {
            noDecimals: noDecimals
        }) : scale.d3Ticks(count, {
            noDecimals: noDecimals
        })));
    } else {
        const count = null !== (_b = isFunction(tickCount) ? tickCount({
            axisLength: rangeSize,
            labelStyle: labelStyle
        }) : tickCount) && void 0 !== _b ? _b : 5, customTicks = isFunction(op.tickMode) ? op.tickMode : void 0;
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
            })), items = getCartesianLabelBounds(scale, samplingScaleTicks, op).map(((bounds, i) => ({
                AABBBounds: bounds,
                value: samplingScaleTicks[i]
            })));
        } else items = getCartesianLabelBounds(scale, scaleTicks, op).map(((bounds, i) => ({
            AABBBounds: bounds,
            value: scaleTicks[i]
        })));
        const firstSourceItem = items[0], lastSourceItem = last(items), samplingMethod = breakData && breakData() ? methods.greedy : methods.parity;
        for (;items.length >= 3 && hasOverlap(items, labelGap); ) items = samplingMethod(items, labelGap);
        const checkFirst = op.labelFirstVisible;
        let checkLast = op.labelLastVisible;
        intersect(firstSourceItem, lastSourceItem, labelGap) && items.includes(lastSourceItem) && items.length > 1 && checkFirst && checkLast && (items.splice(items.indexOf(lastSourceItem), 1), 
        checkLast = !1), forceItemVisible(firstSourceItem, items, checkFirst, (item => intersect(item, firstSourceItem, labelGap))), 
        forceItemVisible(lastSourceItem, items, checkLast, (item => intersect(item, lastSourceItem, labelGap) || !(!checkFirst || item === firstSourceItem) && intersect(item, firstSourceItem, labelGap)), !0);
        const ticks = items.map((item => item.value));
        ticks.length < 3 && labelFlush && (ticks.length > 1 && ticks.pop(), last(ticks) !== last(scaleTicks) && ticks.push(last(scaleTicks))), 
        scaleTicks = ticks;
    }
    return convertDomainToTickData(scaleTicks);
};

const methods = {
    parity: function(items) {
        return items.filter(((item, i) => i % 2 == 0));
    },
    greedy: function(items, sep) {
        let a;
        return items.filter(((b, i) => (!i || !intersect(a, b, sep)) && (a = b, !0)));
    }
};
//# sourceMappingURL=continuous.js.map
