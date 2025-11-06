"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.conjugateGradient = void 0;

const math_1 = require("../math"), blas1_1 = require("./blas1"), linesearch_1 = require("./linesearch");

function conjugateGradient(f, initial, params) {
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
    (0, blas1_1.scale)(pk, current.fxprime, -1);
    for (let i = 0; i < maxIterations; ++i) {
        if (a = (0, linesearch_1.wolfeLineSearch)(f, pk, current, next, a), params.history && params.history.push({
            x: current.x.slice(),
            fx: current.fx,
            fxprime: current.fxprime.slice(),
            alpha: a
        }), a) {
            (0, blas1_1.weightedSum)(yk, 1, next.fxprime, -1, current.fxprime);
            const delta_k = (0, math_1.dotProduct)(current.fxprime, current.fxprime), beta_k = Math.max(0, (0, 
            math_1.dotProduct)(yk, next.fxprime) / delta_k);
            (0, blas1_1.weightedSum)(pk, beta_k, pk, -1, next.fxprime), temp = current, current = next, 
            next = temp;
        } else (0, blas1_1.scale)(pk, current.fxprime, -1);
        if ((0, blas1_1.norm2)(current.fxprime) <= 1e-5) break;
    }
    return params.history && params.history.push({
        x: current.x.slice(),
        fx: current.fx,
        fxprime: current.fxprime.slice(),
        alpha: a
    }), current;
}

exports.conjugateGradient = conjugateGradient;
//# sourceMappingURL=conjugate-gradient.js.map
