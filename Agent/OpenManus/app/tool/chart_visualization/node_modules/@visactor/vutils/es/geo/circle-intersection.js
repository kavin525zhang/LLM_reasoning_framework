import { PointService } from "../data-structure";

import { SMALL } from "./constant";

export function intersectionArea(circles, stats) {
    const intersectionPoints = getIntersectionPoints(circles), innerPoints = intersectionPoints.filter((function(p) {
        return containedInCircles(p, circles);
    }));
    let arcArea = 0, polygonArea = 0;
    const arcs = [];
    if (innerPoints.length > 1) {
        const center = getCenter(innerPoints);
        for (let i = 0; i < innerPoints.length; ++i) {
            const p = innerPoints[i];
            p.angle = Math.atan2(p.x - center.x, p.y - center.y);
        }
        innerPoints.sort((function(a, b) {
            return b.angle - a.angle;
        }));
        let p2 = innerPoints[innerPoints.length - 1];
        for (let i = 0; i < innerPoints.length; ++i) {
            const p1 = innerPoints[i];
            polygonArea += (p2.x + p1.x) * (p1.y - p2.y);
            const midPoint = {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2
            };
            let arc = null;
            for (let j = 0; j < p1.parentIndex.length; ++j) if (p2.parentIndex.indexOf(p1.parentIndex[j]) > -1) {
                const circle = circles[p1.parentIndex[j]], a1 = Math.atan2(p1.x - circle.x, p1.y - circle.y), a2 = Math.atan2(p2.x - circle.x, p2.y - circle.y);
                let angleDiff = a2 - a1;
                angleDiff < 0 && (angleDiff += 2 * Math.PI);
                const a = a2 - angleDiff / 2;
                let width = PointService.distancePP(midPoint, {
                    x: circle.x + circle.radius * Math.sin(a),
                    y: circle.y + circle.radius * Math.cos(a)
                });
                width > 2 * circle.radius && (width = 2 * circle.radius), (null === arc || arc.width > width) && (arc = {
                    circle: circle,
                    width: width,
                    p1: p1,
                    p2: p2
                });
            }
            null !== arc && (arcs.push(arc), arcArea += circleArea(arc.circle.radius, arc.width), 
            p2 = p1);
        }
    } else {
        let smallest = circles[0];
        for (let i = 1; i < circles.length; ++i) circles[i].radius < smallest.radius && (smallest = circles[i]);
        let disjoint = !1;
        for (let i = 0; i < circles.length; ++i) if (PointService.distancePP(circles[i], smallest) > Math.abs(smallest.radius - circles[i].radius)) {
            disjoint = !0;
            break;
        }
        disjoint ? arcArea = polygonArea = 0 : (arcArea = smallest.radius * smallest.radius * Math.PI, 
        arcs.push({
            circle: smallest,
            p1: {
                x: smallest.x,
                y: smallest.y + smallest.radius
            },
            p2: {
                x: smallest.x - SMALL,
                y: smallest.y + smallest.radius
            },
            width: 2 * smallest.radius
        }));
    }
    return polygonArea /= 2, stats && (stats.area = arcArea + polygonArea, stats.arcArea = arcArea, 
    stats.polygonArea = polygonArea, stats.arcs = arcs, stats.innerPoints = innerPoints, 
    stats.intersectionPoints = intersectionPoints), arcArea + polygonArea;
}

export function containedInCircles(point, circles) {
    for (let i = 0; i < circles.length; ++i) if (PointService.distancePP(point, circles[i]) > circles[i].radius + SMALL) return !1;
    return !0;
}

function getIntersectionPoints(circles) {
    const ret = [];
    for (let i = 0; i < circles.length; ++i) for (let j = i + 1; j < circles.length; ++j) {
        const intersect = circleCircleIntersection(circles[i], circles[j]);
        for (let k = 0; k < intersect.length; ++k) {
            const p = intersect[k];
            p.parentIndex = [ i, j ], ret.push(p);
        }
    }
    return ret;
}

export function circleArea(r, width) {
    return r * r * Math.acos(1 - width / r) - (r - width) * Math.sqrt(width * (2 * r - width));
}

export function circleOverlap(r1, r2, d) {
    if (d >= r1 + r2) return 0;
    if (d <= Math.abs(r1 - r2)) return Math.PI * Math.min(r1, r2) * Math.min(r1, r2);
    const w2 = r2 - (d * d - r1 * r1 + r2 * r2) / (2 * d);
    return circleArea(r1, r1 - (d * d - r2 * r2 + r1 * r1) / (2 * d)) + circleArea(r2, w2);
}

export function circleCircleIntersection(p1, p2) {
    const d = PointService.distancePP(p1, p2), r1 = p1.radius, r2 = p2.radius;
    if (d >= r1 + r2 || d <= Math.abs(r1 - r2)) return [];
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(r1 * r1 - a * a), x0 = p1.x + a * (p2.x - p1.x) / d, y0 = p1.y + a * (p2.y - p1.y) / d, rx = -(p2.y - p1.y) * (h / d), ry = -(p2.x - p1.x) * (h / d);
    return [ {
        x: x0 + rx,
        y: y0 - ry
    }, {
        x: x0 - rx,
        y: y0 + ry
    } ];
}

export function getCenter(points) {
    const center = {
        x: 0,
        y: 0
    };
    for (let i = 0; i < points.length; ++i) center.x += points[i].x, center.y += points[i].y;
    return center.x /= points.length, center.y /= points.length, center;
}
//# sourceMappingURL=circle-intersection.js.map
