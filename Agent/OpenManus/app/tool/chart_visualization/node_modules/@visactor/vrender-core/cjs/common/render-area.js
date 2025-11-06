"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.drawAreaSegments = void 0;

const vutils_1 = require("@visactor/vutils"), enums_1 = require("./enums"), cubic_bezier_1 = require("./segment/curve/cubic-bezier"), line_1 = require("./segment/curve/line"), render_utils_1 = require("./render-utils");

function drawAreaSegments(path, segPath, percent, params) {
    var _a;
    const {top: top, bottom: bottom} = segPath;
    if (top.curves.length !== bottom.curves.length) return;
    if (percent >= 1) {
        const topList = [], bottomList = [];
        let lastDefined = !0;
        for (let i = 0, n = top.curves.length; i < n; i++) {
            const topCurve = top.curves[i];
            lastDefined !== topCurve.defined ? (lastDefined ? (drawAreaBlock(path, topList, bottomList, params), 
            topList.length = 0, bottomList.length = 0) : (topList.push(topCurve), bottomList.push(bottom.curves[n - i - 1])), 
            lastDefined = !lastDefined) : lastDefined && (topList.push(topCurve), bottomList.push(bottom.curves[n - i - 1]));
        }
        return void drawAreaBlock(path, topList, bottomList, params);
    }
    if (percent <= 0) return;
    let {direction: direction} = params || {};
    const {curves: topCurves} = top, endP = null !== (_a = topCurves[topCurves.length - 1].p3) && void 0 !== _a ? _a : topCurves[topCurves.length - 1].p1, xTotalLength = (0, 
    vutils_1.abs)(endP.x - topCurves[0].p0.x), yTotalLength = (0, vutils_1.abs)(endP.y - topCurves[0].p0.y);
    direction = null != direction ? direction : xTotalLength > yTotalLength ? enums_1.Direction.ROW : enums_1.Direction.COLUMN, 
    Number.isFinite(xTotalLength) || (direction = enums_1.Direction.COLUMN), Number.isFinite(yTotalLength) || (direction = enums_1.Direction.ROW);
    const totalDrawLength = percent * (direction === enums_1.Direction.ROW ? xTotalLength : yTotalLength);
    let drawedLengthUntilLast = 0, lastDefined = !0;
    const topList = [], bottomList = [];
    for (let i = 0, n = top.curves.length; i < n; i++) {
        const topCurve = top.curves[i], curCurveLength = topCurve.getLength(direction), percent = (totalDrawLength - drawedLengthUntilLast) / curCurveLength;
        if (percent < 0) break;
        drawedLengthUntilLast += curCurveLength;
        let tc = null, bc = null;
        lastDefined !== topCurve.defined ? (lastDefined ? (drawAreaBlock(path, topList, bottomList, params), 
        topList.length = 0, bottomList.length = 0) : (tc = topCurve, bc = bottom.curves[n - i - 1]), 
        lastDefined = !lastDefined) : lastDefined && (tc = topCurve, bc = bottom.curves[n - i - 1]), 
        tc && bc && (percent < 1 && (tc = tc.p2 && tc.p3 ? (0, cubic_bezier_1.divideCubic)(tc, percent)[0] : (0, 
        line_1.divideLinear)(tc, percent)[0], bc = bc.p2 && bc.p3 ? (0, cubic_bezier_1.divideCubic)(bc, 1 - percent)[1] : (0, 
        line_1.divideLinear)(bc, 1 - percent)[1]), tc.defined = lastDefined, bc.defined = lastDefined, 
        topList.push(tc), bottomList.push(bc)), tc = null, bc = null;
    }
    drawAreaBlock(path, topList, bottomList, params);
}

function drawAreaBlock(path, topList, bottomList, params) {
    const {offsetX: offsetX = 0, offsetY: offsetY = 0, offsetZ: offsetZ = 0} = params || {};
    let needMoveTo = !0;
    topList.forEach((curve => {
        curve.defined ? (needMoveTo && path.moveTo(curve.p0.x + offsetX, curve.p0.y + offsetY, offsetZ), 
        (0, render_utils_1.drawSegItem)(path, curve, 1, params), needMoveTo = !1) : needMoveTo = !0;
    })), needMoveTo = !0;
    for (let i = bottomList.length - 1; i >= 0; i--) {
        const curve = bottomList[i];
        curve.defined ? (needMoveTo && path.lineTo(curve.p0.x + offsetX, curve.p0.y + offsetY, offsetZ), 
        (0, render_utils_1.drawSegItem)(path, curve, 1, params), needMoveTo = !1) : needMoveTo = !0;
    }
    path.closePath();
}

exports.drawAreaSegments = drawAreaSegments;