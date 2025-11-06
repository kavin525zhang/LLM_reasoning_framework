"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.constrainedMDSLayout = void 0;

const vutils_1 = require("@visactor/vutils"), common_1 = require("./common");

function constrainedMDSLayout(areas, params) {
    const restarts = (params = params || {}).restarts || 10, sets = [], setIds = {};
    let i;
    for (i = 0; i < areas.length; ++i) {
        const area = areas[i];
        1 === area.sets.length && (setIds[area.sets[0]] = sets.length, sets.push(area));
    }
    const matrices = (0, common_1.getDistanceMatrices)(areas, sets, setIds);
    let distances = matrices.distances;
    const constraints = matrices.constraints, norm = (0, vutils_1.norm2)(distances.map(vutils_1.norm2)) / distances.length;
    distances = distances.map((row => row.map((value => value / norm))));
    const obj = function(x, fxPrime) {
        return constrainedMDSGradient(x, fxPrime, distances, constraints);
    };
    let best, current;
    for (i = 0; i < restarts; ++i) {
        const initial = (0, vutils_1.zeros)(2 * distances.length).map(((entry, i) => (0, 
        vutils_1.seedRandom)(i)));
        current = (0, vutils_1.conjugateGradient)(obj, initial, params), (!best || current.fx < best.fx) && (best = current);
    }
    const positions = best.x, circles = {};
    for (i = 0; i < sets.length; ++i) {
        const set = sets[i];
        circles[set.sets[0]] = {
            x: positions[2 * i] * norm,
            y: positions[2 * i + 1] * norm,
            radius: Math.sqrt(set.size / Math.PI)
        };
    }
    if (params.history) for (i = 0; i < params.history.length; ++i) vutils_1.scale(params.history[i].x, norm);
    return circles;
}

function constrainedMDSGradient(x, fxPrime, distances, constraints) {
    let i, loss = 0;
    for (i = 0; i < fxPrime.length; ++i) fxPrime[i] = 0;
    for (i = 0; i < distances.length; ++i) {
        const xi = x[2 * i], yi = x[2 * i + 1];
        for (let j = i + 1; j < distances.length; ++j) {
            const xj = x[2 * j], yj = x[2 * j + 1], dij = distances[i][j], constraint = constraints[i][j], squaredDistance = (xj - xi) * (xj - xi) + (yj - yi) * (yj - yi), distance = Math.sqrt(squaredDistance), delta = squaredDistance - dij * dij;
            constraint > 0 && distance <= dij || constraint < 0 && distance >= dij || (loss += 2 * delta * delta, 
            fxPrime[2 * i] += 4 * delta * (xi - xj), fxPrime[2 * i + 1] += 4 * delta * (yi - yj), 
            fxPrime[2 * j] += 4 * delta * (xj - xi), fxPrime[2 * j + 1] += 4 * delta * (yj - yi));
        }
    }
    return loss;
}

//# sourceMappingURL=constrained-mds-layout.js.map
exports.constrainedMDSLayout = constrainedMDSLayout;