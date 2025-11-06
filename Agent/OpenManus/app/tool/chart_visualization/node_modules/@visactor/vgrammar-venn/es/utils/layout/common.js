import { SMALL, circleOverlap, findZeroOfFunction, zerosM } from "@visactor/vutils";

export function distanceFromIntersectArea(r1, r2, overlap) {
    return Math.min(r1, r2) * Math.min(r1, r2) * Math.PI <= overlap + SMALL ? Math.abs(r1 - r2) : findZeroOfFunction((function(distance) {
        return circleOverlap(r1, r2, distance) - overlap;
    }), 0, r1 + r2);
}

export function getDistanceMatrices(areas, sets, setIds) {
    const distances = zerosM(sets.length, sets.length), constraints = zerosM(sets.length, sets.length);
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
//# sourceMappingURL=common.js.map