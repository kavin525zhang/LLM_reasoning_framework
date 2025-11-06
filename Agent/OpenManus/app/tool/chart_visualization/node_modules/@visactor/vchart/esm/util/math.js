import { isValidNumber } from "./type";

import { regressionLinear } from "@visactor/vgrammar-util";

import { isNumberClose, isGreater, isLess, isValid, PointService, median as visMedian, maxInArray, minInArray, normalizeAngle } from "@visactor/vutils";

import { angleLabelOrientAttribute } from "@visactor/vrender-components";

export const isClose = isNumberClose;

export { isGreater, isLess, normalizeAngle, angleLabelOrientAttribute };

export function normalizeStartEndAngle(start, end) {
    let startAngle = 0, endAngle = 2 * Math.PI;
    const isStartValid = isValid(start), isEndValid = isValid(end);
    for (isStartValid || isEndValid ? isEndValid ? isStartValid ? (startAngle = start, 
    endAngle = end) : (startAngle = end - 2 * Math.PI, endAngle = end) : (startAngle = start, 
    endAngle = start + 2 * Math.PI) : (startAngle = 0, endAngle = 2 * Math.PI); endAngle <= startAngle; ) endAngle += 2 * Math.PI;
    for (;startAngle > 2 * Math.PI; ) startAngle -= 2 * Math.PI, endAngle -= 2 * Math.PI;
    for (;endAngle < 0; ) startAngle += 2 * Math.PI, endAngle += 2 * Math.PI;
    return {
        startAngle: startAngle,
        endAngle: endAngle
    };
}

export function outOfBounds(bounds, x, y) {
    return bounds.x1 > x || bounds.x2 < x || bounds.y1 > y || bounds.y2 < y;
}

export function min(data, field) {
    const dataArray = [];
    return data.forEach((d => {
        const value = +d[field];
        isValidNumber(value) && dataArray.push(value);
    })), 0 === dataArray.length ? null : minInArray(dataArray);
}

export function max(data, field) {
    const dataArray = [];
    return data.forEach((d => {
        const value = +d[field];
        isValidNumber(value) && dataArray.push(value);
    })), 0 === dataArray.length ? null : maxInArray(dataArray);
}

export function sum(data, field) {
    return data.reduce(((pre, _cur) => {
        const cur = field ? +_cur[field] : +_cur;
        return isValidNumber(cur) && (pre += cur), pre;
    }), 0);
}

export function average(data, field) {
    let sum = 0, count = 0;
    data.forEach((x => {
        const v = field ? +x[field] : +x;
        isValidNumber(v) && (sum += v, count++);
    }));
    return sum / count;
}

export function variance(data, field) {
    const averageNumber = average(data, field);
    if (data.length <= 1) return 0;
    const total = data.reduce(((sum, cur) => sum + (field ? +cur[field] : +cur - averageNumber) ** 2), 0);
    return total / (data.length - 1);
}

export function standardDeviation(data, field) {
    return Math.sqrt(variance(data, field));
}

export function median(data, field) {
    return visMedian(data.map((datum => datum[field])));
}

export function regression(data, fieldX, fieldY) {
    const {predict: predict} = regressionLinear(data, (datum => datum[fieldX]), (datum => datum[fieldY])), x1 = min(data, fieldX), x2 = max(data, fieldX), predict1 = predict(x1), predict2 = predict(x2);
    return [ {
        [fieldX]: x1,
        [fieldY]: predict1
    }, {
        [fieldX]: x2,
        [fieldY]: predict2
    } ];
}

export function radiusLabelOrientAttribute(angle) {
    let align = "center", baseline = "middle";
    return align = (angle = normalizeAngle(angle)) >= Math.PI * (7 / 6) && angle <= Math.PI * (11 / 6) ? "right" : angle >= Math.PI * (1 / 6) && angle <= Math.PI * (5 / 6) ? "left" : "center", 
    baseline = angle >= Math.PI * (5 / 3) || angle <= Math.PI * (1 / 3) ? "bottom" : angle >= Math.PI * (2 / 3) && angle <= Math.PI * (4 / 3) ? "top" : "middle", 
    {
        align: align,
        baseline: baseline
    };
}

export function vectorAngle(v1, v2) {
    const v1Length = distance(v1), v2Length = distance(v2), rho = Math.asin((v1.x * v2.y - v2.x * v1.y) / v1Length / v2Length), theta = Math.acos((v1.x * v2.x + v1.y * v2.y) / v1Length / v2Length);
    return rho < 0 ? -theta : theta;
}

export function distance(p1, p2 = {
    x: 0,
    y: 0
}) {
    return PointService.distancePP(p1, p2);
}

export function getPercentValue(valueList, precision = 2) {
    const sum = valueList.reduce(((a, c) => a + (isNaN(c) ? 0 : c)), 0);
    if (0 === sum) return 0;
    const digits = Math.pow(10, precision), votesPerQuota = valueList.map((val => (isNaN(val) ? 0 : val) / sum * digits * 100)), targetSeats = 100 * digits, seats = votesPerQuota.map((votes => Math.floor(votes)));
    let currentSum = seats.reduce(((a, c) => a + c), 0);
    const remainder = votesPerQuota.map(((votes, idx) => votes - seats[idx]));
    for (;currentSum < targetSeats; ) {
        let max = Number.NEGATIVE_INFINITY, maxId = null;
        for (let i = 0; i < remainder.length; i++) remainder[i] > max && (max = remainder[i], 
        maxId = i);
        ++seats[maxId], remainder[maxId] = 0, ++currentSum;
    }
    return seats.map((entry => entry / digits));
}

export function isValidPoint(p) {
    return isValidNumber(p.x) && isValidNumber(p.y);
}
//# sourceMappingURL=math.js.map
