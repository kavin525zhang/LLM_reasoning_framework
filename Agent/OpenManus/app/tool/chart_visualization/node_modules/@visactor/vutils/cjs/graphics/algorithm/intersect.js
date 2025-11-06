"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isRotateAABBIntersect = exports.rotatePoint = exports.pointInRect = exports.isRectIntersect = exports.rectInsideAnotherRect = exports.InnerBBox = exports.getRectIntersect = exports.getIntersectPoint = exports.isIntersect = void 0;

const angle_1 = require("../../angle"), math_1 = require("../../math");

function sub(out, v1, v2) {
    out[0] = v1[0] - v2[0], out[1] = v1[1] - v2[1];
}

function isIntersect(left1, right1, left2, right2) {
    let min1 = left1[0], max1 = right1[0], min2 = left2[0], max2 = right2[0];
    return max1 < min1 && ([min1, max1] = [ max1, min1 ]), max2 < min2 && ([max2, min2] = [ min2, max2 ]), 
    !(max1 < min2 || max2 < min1) && (min1 = left1[1], max1 = right1[1], min2 = left2[1], 
    max2 = right2[1], max1 < min1 && ([min1, max1] = [ max1, min1 ]), max2 < min2 && ([max2, min2] = [ min2, max2 ]), 
    !(max1 < min2 || max2 < min1));
}

function getIntersectPoint(left1, right1, left2, right2) {
    if (!isIntersect(left1, right1, left2, right2)) return !1;
    const dir1 = [ 0, 0 ], dir2 = [ 0, 0 ], tempVec = [ 0, 0 ];
    if (sub(dir1, right1, left1), sub(dir2, right2, left2), (0, math_1.fuzzyEqualVec)(dir1, dir2)) return !0;
    sub(tempVec, left2, left1);
    const t = (0, math_1.crossProduct)(tempVec, dir2) / (0, math_1.crossProduct)(dir1, dir2);
    return t >= 0 && t <= 1 && [ left1[0] + dir1[0] * t, left1[1] + dir1[1] * t ];
}

function getRectIntersect(bbox1, bbox2, format) {
    if (null === bbox1) return bbox2;
    if (null === bbox2) return bbox1;
    const {x11: x11, x12: x12, y11: y11, y12: y12, x21: x21, x22: x22, y21: y21, y22: y22} = formatTwoBBox(bbox1, bbox2, format);
    return x11 >= x22 || x12 <= x21 || y11 >= y22 || y12 <= y21 ? {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    } : {
        x1: Math.max(x11, x21),
        y1: Math.max(y11, y21),
        x2: Math.min(x12, x22),
        y2: Math.min(y12, y22)
    };
}

var InnerBBox;

exports.isIntersect = isIntersect, exports.getIntersectPoint = getIntersectPoint, 
exports.getRectIntersect = getRectIntersect, function(InnerBBox) {
    InnerBBox[InnerBBox.NONE = 0] = "NONE", InnerBBox[InnerBBox.BBOX1 = 1] = "BBOX1", 
    InnerBBox[InnerBBox.BBOX2 = 2] = "BBOX2";
}(InnerBBox = exports.InnerBBox || (exports.InnerBBox = {}));

const formatTwoBBox = (bbox1, bbox2, format) => {
    let x11 = bbox1.x1, x12 = bbox1.x2, y11 = bbox1.y1, y12 = bbox1.y2, x21 = bbox2.x1, x22 = bbox2.x2, y21 = bbox2.y1, y22 = bbox2.y2;
    return format && (x11 > x12 && ([x11, x12] = [ x12, x11 ]), y11 > y12 && ([y11, y12] = [ y12, y11 ]), 
    x21 > x22 && ([x21, x22] = [ x22, x21 ]), y21 > y22 && ([y21, y22] = [ y22, y21 ])), 
    {
        x11: x11,
        x12: x12,
        y11: y11,
        y12: y12,
        x21: x21,
        x22: x22,
        y21: y21,
        y22: y22
    };
};

function rectInsideAnotherRect(bbox1, bbox2, format) {
    if (!bbox1 || !bbox2) return InnerBBox.NONE;
    const {x11: x11, x12: x12, y11: y11, y12: y12, x21: x21, x22: x22, y21: y21, y22: y22} = formatTwoBBox(bbox1, bbox2, format);
    return x11 > x21 && x12 < x22 && y11 > y21 && y12 < y22 ? InnerBBox.BBOX1 : x21 > x11 && x22 < x12 && y21 > y11 && y22 < y12 ? InnerBBox.BBOX2 : InnerBBox.NONE;
}

function isRectIntersect(bbox1, bbox2, format) {
    if (bbox1 && bbox2) {
        if (!format) return !(bbox1.x1 > bbox2.x2 || bbox1.x2 < bbox2.x1 || bbox1.y1 > bbox2.y2 || bbox1.y2 < bbox2.y1);
        const {x11: x11, x12: x12, y11: y11, y12: y12, x21: x21, x22: x22, y21: y21, y22: y22} = formatTwoBBox(bbox1, bbox2, !0);
        return !(x11 > x22 || x12 < x21 || y11 > y22 || y12 < y21);
    }
    return !0;
}

function pointInRect(point, bbox, format) {
    if (!bbox) return !0;
    if (!format) return point.x >= bbox.x1 && point.x <= bbox.x2 && point.y >= bbox.y1 && point.y <= bbox.y2;
    let x11 = bbox.x1, x12 = bbox.x2, y11 = bbox.y1, y12 = bbox.y2;
    return x11 > x12 && ([x11, x12] = [ x12, x11 ]), y11 > y12 && ([y11, y12] = [ y12, y11 ]), 
    point.x >= x11 && point.x <= x12 && point.y >= y11 && point.y <= y12;
}

function getProjectionRadius(checkAxis, axis) {
    return Math.abs(axis[0] * checkAxis[0] + axis[1] * checkAxis[1]);
}

function rotatePoint({x: x, y: y}, rad, origin = {
    x: 0,
    y: 0
}) {
    return {
        x: (x - origin.x) * Math.cos(rad) - (y - origin.y) * Math.sin(rad) + origin.x,
        y: (x - origin.x) * Math.sin(rad) + (y - origin.y) * Math.cos(rad) + origin.y
    };
}

function getCenterPoint(box) {
    return {
        x: (box.x1 + box.x2) / 2,
        y: (box.y1 + box.y2) / 2
    };
}

function toRect(box, isDeg) {
    const deg = isDeg ? (0, angle_1.degreeToRadian)(box.angle) : box.angle, cp = getCenterPoint(box);
    return [ rotatePoint({
        x: box.x1,
        y: box.y1
    }, deg, cp), rotatePoint({
        x: box.x2,
        y: box.y1
    }, deg, cp), rotatePoint({
        x: box.x2,
        y: box.y2
    }, deg, cp), rotatePoint({
        x: box.x1,
        y: box.y2
    }, deg, cp) ];
}

function isRotateAABBIntersect(box1, box2, isDeg = !1) {
    const rect1 = toRect(box1, isDeg), rect2 = toRect(box2, isDeg), vector = (start, end) => [ end.x - start.x, end.y - start.y ], vp1p2 = vector(getCenterPoint(box1), getCenterPoint(box2)), AB = vector(rect1[0], rect1[1]), BC = vector(rect1[1], rect1[2]), A1B1 = vector(rect2[0], rect2[1]), B1C1 = vector(rect2[1], rect2[2]), deg11 = isDeg ? (0, 
    angle_1.degreeToRadian)(box1.angle) : box1.angle;
    let deg12 = isDeg ? (0, angle_1.degreeToRadian)(90 - box1.angle) : box1.angle + math_1.halfPi;
    const deg21 = isDeg ? (0, angle_1.degreeToRadian)(box2.angle) : box2.angle;
    let deg22 = isDeg ? (0, angle_1.degreeToRadian)(90 - box2.angle) : box2.angle + math_1.halfPi;
    deg12 > math_1.pi2 && (deg12 -= math_1.pi2), deg22 > math_1.pi2 && (deg22 -= math_1.pi2);
    const isCover = (checkAxisRadius, deg, targetAxis1, targetAxis2) => {
        const checkAxis = [ Math.cos(deg), Math.sin(deg) ];
        return checkAxisRadius + (getProjectionRadius(checkAxis, targetAxis1) + getProjectionRadius(checkAxis, targetAxis2)) / 2 > getProjectionRadius(checkAxis, vp1p2);
    };
    return isCover((box1.x2 - box1.x1) / 2, deg11, A1B1, B1C1) && isCover((box1.y2 - box1.y1) / 2, deg12, A1B1, B1C1) && isCover((box2.x2 - box2.x1) / 2, deg21, AB, BC) && isCover((box2.y2 - box2.y1) / 2, deg22, AB, BC);
}

exports.rectInsideAnotherRect = rectInsideAnotherRect, exports.isRectIntersect = isRectIntersect, 
exports.pointInRect = pointInRect, exports.rotatePoint = rotatePoint, exports.isRotateAABBIntersect = isRotateAABBIntersect;
//# sourceMappingURL=intersect.js.map
