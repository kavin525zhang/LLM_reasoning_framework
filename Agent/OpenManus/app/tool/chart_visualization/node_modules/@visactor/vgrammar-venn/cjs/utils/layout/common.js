"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getDistanceMatrices = exports.distanceFromIntersectArea = void 0;

const vutils_1 = require("@visactor/vutils");

function distanceFromIntersectArea(r1, r2, overlap) {
    return Math.min(r1, r2) * Math.min(r1, r2) * Math.PI <= overlap + vutils_1.SMALL ? Math.abs(r1 - r2) : (0, 
    vutils_1.findZeroOfFunction)((function(distance) {
        return (0, vutils_1.circleOverlap)(r1, r2, distance) - overlap;
    }), 0, r1 + r2);
}

function getDistanceMatrices(areas, sets, setIds) {
    const distances = (0, vutils_1.zerosM)(sets.length, sets.length), constraints = (0, 
    vutils_1.zerosM)(sets.length, sets.length);
    return areas.filter((function(x) {
        return 2 === x.sets.length;
    })).map((function(current) {
        const left = setIds[current.sets[0]], right = setIds[current.sets[1]], distance = distanceFromIntersectArea(Math.sqrt(sets[left].size / Math.PI), Math.sqrt(sets[right].size / Math.PI), current.size);
        distances[left][right] = distances[right][left] = distance;
        let c = 0;
        current.size + 1e-10 >= Math.min(sets[left].size, sets[right].size) ? c = 1 : current.size <= 1e-10 && (c = -1), 
        constraints[left][right] = constraints[right][left] = c;
    })), {
        distances: distances,
        constraints: constraints
    };
}

exports.distanceFromIntersectArea = distanceFromIntersectArea, exports.getDistanceMatrices = getDistanceMatrices;
//# sourceMappingURL=common.js.map