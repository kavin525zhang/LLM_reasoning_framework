import { isNil, isRectIntersect, isRotateAABBIntersect, rotatePoint } from "@visactor/vutils";

function genNormalBounds(item) {
    const bounds = item.AABBBounds;
    return {
        x1: bounds.x1,
        x2: bounds.x2,
        y1: bounds.y1,
        y2: bounds.y2,
        centerX: item.attribute.x,
        centerY: item.attribute.y,
        angle: item.attribute.angle
    };
}

export function genRotateBounds(items) {
    items.forEach((item => {
        if (item.rotatedBounds || !item.attribute.angle) return;
        const bounds = genNormalBounds(item), rotatedCenter = rotatePoint({
            x: item.attribute.x,
            y: item.attribute.y
        }, bounds.angle, {
            x: bounds.centerX,
            y: bounds.centerY
        }), deltaX = rotatedCenter.x - bounds.centerX, deltaY = rotatedCenter.y - bounds.centerY;
        bounds.x1 += deltaX, bounds.x2 += deltaX, bounds.y1 += deltaY, bounds.y2 += deltaY, 
        bounds.centerX += deltaX, bounds.centerY += deltaY, item.rotatedBounds = bounds;
    }));
}

export function itemIntersect(item1, item2) {
    var _a, _b;
    return (null === (_a = item1.OBBBounds) || void 0 === _a ? void 0 : _a.empty()) || (null === (_b = item2.OBBBounds) || void 0 === _b ? void 0 : _b.empty()) ? isRectIntersect(item1.AABBBounds, item2.AABBBounds, !1) && (!item1.rotatedBounds || !item2.rotatedBounds || isRotateAABBIntersect(item1.rotatedBounds, item2.rotatedBounds, !0)) : item1.OBBBounds.intersects(item2.OBBBounds);
}

const DELTA_ANGLE = Math.sin(Math.PI / 10);

export function isAngleVertical(angle, delta = DELTA_ANGLE) {
    const hasAngle = !isNil(angle) && 0 !== angle, cos = hasAngle ? Math.cos(angle) : 1;
    return hasAngle && Math.abs(cos) <= delta;
}

export function isAngleHorizontal(angle, delta = DELTA_ANGLE) {
    const hasAngle = !isNil(angle) && 0 !== angle, sin = hasAngle ? Math.sin(angle) : 0;
    return !hasAngle || Math.abs(sin) <= delta;
}
//# sourceMappingURL=util.js.map
