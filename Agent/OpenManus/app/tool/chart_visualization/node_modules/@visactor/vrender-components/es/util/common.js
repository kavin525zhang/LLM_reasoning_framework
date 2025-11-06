import { isNil } from "@visactor/vutils";

export function traverseGroup(group, cb) {
    group.forEachChildren((node => {
        const stopped = cb(node);
        node.isContainer && !stopped && traverseGroup(node, cb);
    }));
}

export const isVisible = obj => !isNil(obj) && !1 !== obj.visible;

export function getMarksByName(root, name) {
    if (!name) return [];
    const group = root.find((node => node.name === name), !0);
    return group ? group.getChildren() : [];
}

export function getNoneGroupMarksByName(root, name) {
    if (!name) return [];
    const group = root.find((node => node.name === name), !0);
    return group ? group.findAll((node => "group" !== node.type), !0) : [];
}

export function removeRepeatPoint(points) {
    const result = [ points[0] ];
    for (let i = 1; i < points.length; i++) points[i].x === points[i - 1].x && points[i].y === points[i - 1].y || result.push(points[i]);
    return result;
}

export function isPostiveXAxis(angle) {
    return angle >= 0 && angle < Math.PI / 2 || angle > 3 * Math.PI / 2 && angle <= 2 * Math.PI;
}

export function fuzzyEqualNumber(a, b, delta) {
    return Math.abs(a - b) < delta;
}

export function getTextAlignAttrOfVerticalDir(autoRotate, lineEndAngle, itemPosition) {
    return autoRotate ? {
        textAlign: "right",
        textBaseline: "middle"
    } : {
        textAlign: lineEndAngle < Math.PI && itemPosition.toLocaleLowerCase().includes("top") || lineEndAngle > Math.PI && itemPosition.toLocaleLowerCase().includes("bottom") ? "left" : lineEndAngle < Math.PI && itemPosition.toLocaleLowerCase().includes("bottom") || lineEndAngle > Math.PI && itemPosition.toLocaleLowerCase().includes("top") ? "right" : "center",
        textBaseline: lineEndAngle < Math.PI && itemPosition.includes("inside") || lineEndAngle > Math.PI && !itemPosition.includes("inside") ? "bottom" : "top"
    };
}
//# sourceMappingURL=common.js.map
