"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.computeQuadrant = exports.calculateMaxRadius = exports.findBoundaryAngles = exports.normalizeAngle = exports.getAngleByPoint = exports.cartesianToPolar = exports.polarToCartesian = exports.clampAngleByDegree = exports.clampDegree = exports.clampAngleByRadian = exports.clampRadian = exports.radianToDegree = exports.degreeToRadian = void 0;

const math_1 = require("./math");

function degreeToRadian(degree) {
    return degree * (Math.PI / 180);
}

function radianToDegree(radian) {
    return 180 * radian / Math.PI;
}

exports.degreeToRadian = degreeToRadian, exports.radianToDegree = radianToDegree;

const clampRadian = (angle = 0) => {
    if (angle < 0) for (;angle < -math_1.tau; ) angle += math_1.tau; else if (angle > 0) for (;angle > math_1.tau; ) angle -= math_1.tau;
    return angle;
};

exports.clampRadian = clampRadian, exports.clampAngleByRadian = exports.clampRadian;

const clampDegree = (a = 0) => a > 360 || a < -360 ? a % 360 : a;

function polarToCartesian(center, radius, angleInRadian) {
    return radius ? {
        x: center.x + radius * Math.cos(angleInRadian),
        y: center.y + radius * Math.sin(angleInRadian)
    } : {
        x: center.x,
        y: center.y
    };
}

function cartesianToPolar(point, center = {
    x: 0,
    y: 0
}, startAngle = 0, endAngle = 2 * Math.PI) {
    const {x: x, y: y} = point, {x: centerX, y: centerY} = center;
    let dx = x - centerX, dy = y - centerY;
    const radius = Math.sqrt(dx * dx + dy * dy);
    if (0 === radius) return {
        radius: 0,
        angle: 0
    };
    dx /= radius, dy /= radius;
    let radian = Math.atan2(dy, dx);
    if (radian < startAngle) for (;radian <= startAngle; ) radian += 2 * Math.PI;
    if (radian > endAngle) for (;radian >= endAngle; ) radian -= 2 * Math.PI;
    return {
        radius: radius,
        angle: radian
    };
}

function getAngleByPoint(center, point) {
    return Math.atan2(point.y - center.y, point.x - center.x);
}

function normalizeAngle(angle) {
    for (;angle < 0; ) angle += 2 * Math.PI;
    for (;angle >= 2 * Math.PI; ) angle -= 2 * Math.PI;
    return angle;
}

function findBoundaryAngles(startAngle, endAngle) {
    const deltaAngle = Math.abs(endAngle - startAngle);
    if (deltaAngle >= 2 * Math.PI || 2 * Math.PI - deltaAngle < 1e-6) return [ 0, Math.PI / 2, Math.PI, 1.5 * Math.PI ];
    const normalMin = normalizeAngle(Math.min(startAngle, endAngle)), normalMax = normalMin + deltaAngle, steps = [ normalMin, normalMax ];
    let directionAngle = Math.floor(normalMin / Math.PI) * Math.PI / 2;
    for (;directionAngle < normalMax; ) directionAngle > normalMin && steps.push(directionAngle), 
    directionAngle += Math.PI / 2;
    return steps;
}

function calculateMaxRadius(rect, center, startAngle, endAngle) {
    const {x: x, y: y} = center, steps = findBoundaryAngles(startAngle, endAngle), {width: width, height: height} = rect, radiusList = [];
    return steps.forEach((step => {
        const sin = Math.sin(step), cos = Math.cos(step);
        1 === sin ? radiusList.push(height - y) : -1 === sin ? radiusList.push(y) : 1 === cos ? radiusList.push(width - x) : -1 === cos ? radiusList.push(x) : (sin > 0 ? radiusList.push(Math.abs((height - y) / sin)) : radiusList.push(Math.abs(y / sin)), 
        cos > 0 ? radiusList.push(Math.abs((width - x) / cos)) : radiusList.push(Math.abs(x / cos)));
    })), Math.min.apply(null, radiusList);
}

function computeQuadrant(angle) {
    return (angle = normalizeAngle(angle)) > 0 && angle <= Math.PI / 2 ? 2 : angle > Math.PI / 2 && angle <= Math.PI ? 3 : angle > Math.PI && angle <= 3 * Math.PI / 2 ? 4 : 1;
}

exports.clampDegree = clampDegree, exports.clampAngleByDegree = exports.clampDegree, 
exports.polarToCartesian = polarToCartesian, exports.cartesianToPolar = cartesianToPolar, 
exports.getAngleByPoint = getAngleByPoint, exports.normalizeAngle = normalizeAngle, 
exports.findBoundaryAngles = findBoundaryAngles, exports.calculateMaxRadius = calculateMaxRadius, 
exports.computeQuadrant = computeQuadrant;