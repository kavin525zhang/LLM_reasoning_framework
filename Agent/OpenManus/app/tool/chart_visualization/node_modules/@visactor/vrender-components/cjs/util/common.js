"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getTextAlignAttrOfVerticalDir = exports.fuzzyEqualNumber = exports.isPostiveXAxis = exports.removeRepeatPoint = exports.getNoneGroupMarksByName = exports.getMarksByName = exports.isVisible = exports.traverseGroup = void 0;

const vutils_1 = require("@visactor/vutils");

function traverseGroup(group, cb) {
    group.forEachChildren((node => {
        const stopped = cb(node);
        node.isContainer && !stopped && traverseGroup(node, cb);
    }));
}

exports.traverseGroup = traverseGroup;

const isVisible = obj => !(0, vutils_1.isNil)(obj) && !1 !== obj.visible;

function getMarksByName(root, name) {
    if (!name) return [];
    const group = root.find((node => node.name === name), !0);
    return group ? group.getChildren() : [];
}

function getNoneGroupMarksByName(root, name) {
    if (!name) return [];
    const group = root.find((node => node.name === name), !0);
    return group ? group.findAll((node => "group" !== node.type), !0) : [];
}

function removeRepeatPoint(points) {
    const result = [ points[0] ];
    for (let i = 1; i < points.length; i++) points[i].x === points[i - 1].x && points[i].y === points[i - 1].y || result.push(points[i]);
    return result;
}

function isPostiveXAxis(angle) {
    return angle >= 0 && angle < Math.PI / 2 || angle > 3 * Math.PI / 2 && angle <= 2 * Math.PI;
}

function fuzzyEqualNumber(a, b, delta) {
    return Math.abs(a - b) < delta;
}

function getTextAlignAttrOfVerticalDir(autoRotate, lineEndAngle, itemPosition) {
    return autoRotate ? {
        textAlign: "right",
        textBaseline: "middle"
    } : {
        textAlign: lineEndAngle < Math.PI && itemPosition.toLocaleLowerCase().includes("top") || lineEndAngle > Math.PI && itemPosition.toLocaleLowerCase().includes("bottom") ? "left" : lineEndAngle < Math.PI && itemPosition.toLocaleLowerCase().includes("bottom") || lineEndAngle > Math.PI && itemPosition.toLocaleLowerCase().includes("top") ? "right" : "center",
        textBaseline: lineEndAngle < Math.PI && itemPosition.includes("inside") || lineEndAngle > Math.PI && !itemPosition.includes("inside") ? "bottom" : "top"
    };
}

exports.isVisible = isVisible, exports.getMarksByName = getMarksByName, exports.getNoneGroupMarksByName = getNoneGroupMarksByName, 
exports.removeRepeatPoint = removeRepeatPoint, exports.isPostiveXAxis = isPostiveXAxis, 
exports.fuzzyEqualNumber = fuzzyEqualNumber, exports.getTextAlignAttrOfVerticalDir = getTextAlignAttrOfVerticalDir;
//# sourceMappingURL=common.js.map
