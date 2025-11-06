import { PointService } from "@visactor/vutils";

export function orientateCircles(circles, orientation, orientationOrder) {
    let i;
    if (null === orientationOrder ? circles.sort((function(a, b) {
        return b.radius - a.radius;
    })) : circles.sort(orientationOrder), circles.length > 0) {
        const largestX = circles[0].x, largestY = circles[0].y;
        for (i = 0; i < circles.length; ++i) circles[i].x -= largestX, circles[i].y -= largestY;
    }
    if (2 === circles.length) {
        PointService.distancePP(circles[0], circles[1]) < Math.abs(circles[1].radius - circles[0].radius) && (circles[1].x = circles[0].x + circles[0].radius - circles[1].radius - 1e-10, 
        circles[1].y = circles[0].y);
    }
    if (circles.length > 1) {
        const rotation = Math.atan2(circles[1].x, circles[1].y) - orientation, c = Math.cos(rotation), s = Math.sin(rotation);
        let x, y;
        for (i = 0; i < circles.length; ++i) x = circles[i].x, y = circles[i].y, circles[i].x = c * x - s * y, 
        circles[i].y = s * x + c * y;
    }
    if (circles.length > 2) {
        let angle = Math.atan2(circles[2].x, circles[2].y) - orientation;
        for (;angle < 0; ) angle += 2 * Math.PI;
        for (;angle > 2 * Math.PI; ) angle -= 2 * Math.PI;
        if (angle > Math.PI) {
            const slope = circles[1].y / (1e-10 + circles[1].x);
            for (i = 0; i < circles.length; ++i) {
                const d = (circles[i].x + slope * circles[i].y) / (1 + slope * slope);
                circles[i].x = 2 * d - circles[i].x, circles[i].y = 2 * d * slope - circles[i].y;
            }
        }
    }
}

export function disjointCluster(circles) {
    function find(circle) {
        return circle.parent !== circle && (circle.parent = find(circle.parent)), circle.parent;
    }
    function union(x, y) {
        const xRoot = find(x), yRoot = find(y);
        xRoot.parent = yRoot;
    }
    circles.map((function(circle) {
        circle.parent = circle;
    }));
    for (let i = 0; i < circles.length; ++i) for (let j = i + 1; j < circles.length; ++j) {
        const maxDistance = circles[i].radius + circles[j].radius;
        PointService.distancePP(circles[i], circles[j]) + 1e-10 < maxDistance && union(circles[j], circles[i]);
    }
    const disjointClusters = {};
    let setId;
    for (let i = 0; i < circles.length; ++i) setId = find(circles[i]).parent.setId, 
    setId in disjointClusters || (disjointClusters[setId] = []), disjointClusters[setId].push(circles[i]);
    circles.map((function(circle) {
        delete circle.parent;
    }));
    const ret = [];
    for (setId in disjointClusters) disjointClusters.hasOwnProperty(setId) && ret.push(disjointClusters[setId]);
    return ret;
}

export function getBoundingBox(circles) {
    const minMax = function(d) {
        return {
            max: Math.max.apply(null, circles.map((function(c) {
                return c[d] + c.radius;
            }))),
            min: Math.min.apply(null, circles.map((function(c) {
                return c[d] - c.radius;
            })))
        };
    };
    return {
        xRange: minMax("x"),
        yRange: minMax("y")
    };
}
//# sourceMappingURL=common.js.map