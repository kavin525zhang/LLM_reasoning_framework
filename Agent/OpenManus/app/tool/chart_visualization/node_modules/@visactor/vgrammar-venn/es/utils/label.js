import { PointService, getCenter, intersectionArea, nelderMead, Logger } from "@visactor/vutils";

export function computeTextCenters(circles, areas) {
    const ret = {}, overlapped = getOverlappingCircles(circles);
    for (let i = 0; i < areas.length; ++i) {
        const area = areas[i].sets, areaIds = {}, exclude = {};
        for (let j = 0; j < area.length; ++j) {
            areaIds[area[j]] = !0;
            const overlaps = overlapped[area[j]];
            for (let k = 0; k < overlaps.length; ++k) exclude[overlaps[k]] = !0;
        }
        const interior = [], exterior = [];
        for (const setId in circles) setId in areaIds ? interior.push(circles[setId]) : setId in exclude || exterior.push(circles[setId]);
        const center = computeTextCenter(interior, exterior);
        if (ret[area.toString()] = center, center.disjoint && areas[i].size > 0) {
            Logger.getInstance().error("Area " + area + " not represented on screen");
        }
    }
    return ret;
}

function getOverlappingCircles(circles) {
    const ret = {}, circleIds = [];
    for (const circleId in circles) circleIds.push(circleId), ret[circleId] = [];
    for (let i = 0; i < circleIds.length; i++) {
        const a = circles[circleIds[i]];
        for (let j = i + 1; j < circleIds.length; ++j) {
            const b = circles[circleIds[j]], d = PointService.distancePP(a, b);
            d + b.radius <= a.radius + 1e-10 ? ret[circleIds[j]].push(circleIds[i]) : d + a.radius <= b.radius + 1e-10 && ret[circleIds[i]].push(circleIds[j]);
        }
    }
    return ret;
}

export function computeTextCenter(interior, exterior) {
    const points = [];
    for (let i = 0; i < interior.length; ++i) {
        const c = interior[i];
        points.push({
            x: c.x,
            y: c.y
        }), points.push({
            x: c.x + c.radius / 2,
            y: c.y
        }), points.push({
            x: c.x - c.radius / 2,
            y: c.y
        }), points.push({
            x: c.x,
            y: c.y + c.radius / 2
        }), points.push({
            x: c.x,
            y: c.y - c.radius / 2
        });
    }
    let initial = points[0], margin = circleMargin(points[0], interior, exterior);
    for (let i = 1; i < points.length; ++i) {
        const m = circleMargin(points[i], interior, exterior);
        m >= margin && (initial = points[i], margin = m);
    }
    const solution = nelderMead((function(p) {
        return -1 * circleMargin({
            x: p[0],
            y: p[1]
        }, interior, exterior);
    }), [ initial.x, initial.y ], {
        maxIterations: 500,
        minErrorDelta: 1e-10
    }).x;
    let ret = {
        x: solution[0],
        y: solution[1]
    }, valid = !0;
    for (let i = 0; i < interior.length; ++i) if (PointService.distancePP(ret, interior[i]) > interior[i].radius) {
        valid = !1;
        break;
    }
    for (let i = 0; i < exterior.length; ++i) if (PointService.distancePP(ret, exterior[i]) < exterior[i].radius) {
        valid = !1;
        break;
    }
    if (!valid) if (1 === interior.length) ret = {
        x: interior[0].x,
        y: interior[0].y
    }; else {
        const areaStats = {};
        intersectionArea(interior, areaStats), ret = 0 === areaStats.arcs.length ? {
            x: 0,
            y: -1e3,
            disjoint: !0
        } : 1 === areaStats.arcs.length ? {
            x: areaStats.arcs[0].circle.x,
            y: areaStats.arcs[0].circle.y
        } : exterior.length ? computeTextCenter(interior, []) : getCenter(areaStats.arcs.map((function(a) {
            return a.p1;
        })));
    }
    return ret;
}

function circleMargin(current, interior, exterior) {
    let i, m, margin = interior[0].radius - PointService.distancePP(interior[0], current);
    for (i = 1; i < interior.length; ++i) m = interior[i].radius - PointService.distancePP(interior[i], current), 
    m <= margin && (margin = m);
    for (i = 0; i < exterior.length; ++i) m = PointService.distancePP(exterior[i], current) - exterior[i].radius, 
    m <= margin && (margin = m);
    return margin;
}
//# sourceMappingURL=label.js.map