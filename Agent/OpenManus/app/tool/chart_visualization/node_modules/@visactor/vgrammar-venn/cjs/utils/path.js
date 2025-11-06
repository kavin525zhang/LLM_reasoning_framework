"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCirclesFromArcs = exports.getArcsFromPath = exports.getPathFromArcs = exports.getArcsFromCircles = void 0;

const vutils_1 = require("@visactor/vutils"), getArcsFromCircles = circles => {
    const areaStats = {}, circleList = Object.values(circles);
    if (!circleList.length) return [];
    (0, vutils_1.intersectionArea)(circleList, areaStats);
    const arcs = areaStats.arcs.map((({p1: p1, p2: p2, circle: circle, width: width}) => ({
        p1: p1,
        p2: p2,
        radius: circle.radius,
        setId: circle.setId,
        largeArcFlag: width > circle.radius
    }))), result = [];
    let i = 0, arc = arcs[0];
    for (;i < arcs.length && arc; ) {
        const {p2: p2} = arc;
        result.push(arc), arc = arcs.find((a => vutils_1.PointService.distancePP(a.p1, p2) < vutils_1.SMALL)), 
        i++;
    }
    return result;
};

exports.getArcsFromCircles = getArcsFromCircles;

const getPathFromArcs = arcs => {
    if (!(null == arcs ? void 0 : arcs.length)) return "";
    let i = 0, arc = arcs[0];
    const {p1: p1} = arc;
    let path = `M${p1.x},${p1.y}`;
    for (;arc; ) {
        const {p2: p2, radius: radius, largeArcFlag: largeArcFlag} = arc;
        path += `A${radius},${radius} 0 ${largeArcFlag ? 1 : 0},0 ${p2.x},${p2.y}`, arc = arcs[++i];
    }
    return path += " Z", path;
};

exports.getPathFromArcs = getPathFromArcs;

const getArcsFromPath = path => {
    const arcs = [], segments = path.split("A"), m = segments[0];
    let i = m.indexOf(",");
    for (arcs.push({
        p1: {
            x: +m.slice(1, i),
            y: +m.slice(i + 1)
        }
    }), i = 1; i < segments.length; i++) {
        const s = segments[i].split(",");
        arcs[i - 1].radius = +s[0];
        const p2x = +s[2].slice(2), p2y = +s[3].split(" ")[0];
        arcs[i - 1].p2 = {
            x: p2x,
            y: p2y
        }, arcs[i - 1].largeArcFlag = "1" === s[1][s[1].length - 1], i < segments.length - 1 && arcs.push({
            p1: {
                x: p2x,
                y: p2y
            }
        });
    }
    return arcs;
};

exports.getArcsFromPath = getArcsFromPath;

const getCirclesFromArcs = arcs => {
    var _a;
    return null !== (_a = null == arcs ? void 0 : arcs.map((arc => {
        const {p1: p1, p2: p2, radius: radius, largeArcFlag: largeArcFlag, setId: setId} = arc, {x: x1, y: y1} = p1, {x: x2, y: y2} = p2, d = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** .5, mX = (x1 + x2) / 2, mY = (y1 + y2) / 2, h = (radius ** 2 - (d / 2) ** 2) ** .5;
        let x = mX + h * (y2 - y1) / d, y = mY - h * (x2 - x1) / d;
        return ((0, vutils_1.crossProduct)([ x2 - x1, y2 - y1 ], [ x - x1, y - y1 ]) > 0 || largeArcFlag) && (x = mX - h * (y2 - y1) / d, 
        y = mY + h * (x2 - x1) / d), {
            x: x,
            y: y,
            radius: radius,
            setId: setId
        };
    }))) && void 0 !== _a ? _a : [];
};

exports.getCirclesFromArcs = getCirclesFromArcs;
//# sourceMappingURL=path.js.map