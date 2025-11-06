import { dotProduct } from "../math";

import { norm2, scale, weightedSum } from "./blas1";

import { wolfeLineSearch } from "./linesearch";

export function conjugateGradient(f, initial, params) {
    let current = {
        x: initial.slice(),
        fx: 0,
        fxprime: initial.slice()
    }, next = {
        x: initial.slice(),
        fx: 0,
        fxprime: initial.slice()
    };
    const yk = initial.slice();
    let temp, a = 1;
    const maxIterations = (params = params || {}).maxIterations || 20 * initial.length;
    current.fx = f(current.x, current.fxprime);
    const pk = current.fxprime.slice();
    scale(pk, current.fxprime, -1);
    for (let i = 0; i < maxIterations; ++i) {
        if (a = wolfeLineSearch(f, pk, current, next, a), params.history && params.history.push({
            x: current.x.slice(),
            fx: current.fx,
            fxprime: current.fxprime.slice(),
            alpha: a
        }), a) {
            weightedSum(yk, 1, next.fxprime, -1, current.fxprime);
            const delta_k = dotProduct(current.fxprime, current.fxprime), beta_k = Math.max(0, dotProduct(yk, next.fxprime) / delta_k);
            weightedSum(pk, beta_k, pk, -1, next.fxprime), temp = current, current = next, next = temp;
        } else scale(pk, current.fxprime, -1);
        if (norm2(current.fxprime) <= 1e-5) break;
    }
    return params.history && params.history.push({
        x: current.x.slice(),
        fx: current.fx,
        fxprime: current.fxprime.slice(),
        alpha: a
    }), current;
}
//# sourceMappingURL=conjugate-gradient.js.map
