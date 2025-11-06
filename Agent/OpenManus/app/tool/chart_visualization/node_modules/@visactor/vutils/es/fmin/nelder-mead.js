import { weightedSum } from "./blas1";

export function nelderMead(f, x0, parameters) {
    const maxIterations = (parameters = parameters || {}).maxIterations || 200 * x0.length, nonZeroDelta = parameters.nonZeroDelta || 1.05, zeroDelta = parameters.zeroDelta || .001, minErrorDelta = parameters.minErrorDelta || 1e-6, minTolerance = parameters.minErrorDelta || 1e-5, rho = void 0 !== parameters.rho ? parameters.rho : 1, chi = void 0 !== parameters.chi ? parameters.chi : 2, psi = void 0 !== parameters.psi ? parameters.psi : -.5, sigma = void 0 !== parameters.sigma ? parameters.sigma : .5;
    let maxDiff;
    const N = x0.length, simplex = new Array(N + 1);
    simplex[0] = x0, simplex[0].fx = f(x0), simplex[0].id = 0;
    for (let i = 0; i < N; ++i) {
        const point = x0.slice();
        point[i] = point[i] ? point[i] * nonZeroDelta : zeroDelta, simplex[i + 1] = point, 
        simplex[i + 1].fx = f(point), simplex[i + 1].id = i + 1;
    }
    function updateSimplex(value) {
        for (let i = 0; i < value.length; i++) simplex[N][i] = value[i];
        simplex[N].fx = value.fx;
    }
    const sortOrder = function(a, b) {
        return a.fx - b.fx;
    }, centroid = x0.slice(), reflected = x0.slice(), contracted = x0.slice(), expanded = x0.slice();
    for (let iteration = 0; iteration < maxIterations; ++iteration) {
        if (simplex.sort(sortOrder), parameters.history) {
            const sortedSimplex = simplex.map((function(x) {
                const state = x.slice();
                return state.fx = x.fx, state.id = x.id, state;
            }));
            sortedSimplex.sort((function(a, b) {
                return a.id - b.id;
            })), parameters.history.push({
                x: simplex[0].slice(),
                fx: simplex[0].fx,
                simplex: sortedSimplex
            });
        }
        maxDiff = 0;
        for (let i = 0; i < N; ++i) maxDiff = Math.max(maxDiff, Math.abs(simplex[0][i] - simplex[1][i]));
        if (Math.abs(simplex[0].fx - simplex[N].fx) < minErrorDelta && maxDiff < minTolerance) break;
        for (let i = 0; i < N; ++i) {
            centroid[i] = 0;
            for (let j = 0; j < N; ++j) centroid[i] += simplex[j][i];
            centroid[i] /= N;
        }
        const worst = simplex[N];
        if (weightedSum(reflected, 1 + rho, centroid, -rho, worst), reflected.fx = f(reflected), 
        reflected.fx < simplex[0].fx) weightedSum(expanded, 1 + chi, centroid, -chi, worst), 
        expanded.fx = f(expanded), expanded.fx < reflected.fx ? updateSimplex(expanded) : updateSimplex(reflected); else if (reflected.fx >= simplex[N - 1].fx) {
            let shouldReduce = !1;
            if (reflected.fx > worst.fx ? (weightedSum(contracted, 1 + psi, centroid, -psi, worst), 
            contracted.fx = f(contracted), contracted.fx < worst.fx ? updateSimplex(contracted) : shouldReduce = !0) : (weightedSum(contracted, 1 - psi * rho, centroid, psi * rho, worst), 
            contracted.fx = f(contracted), contracted.fx < reflected.fx ? updateSimplex(contracted) : shouldReduce = !0), 
            shouldReduce) {
                if (sigma >= 1) break;
                for (let i = 1; i < simplex.length; ++i) weightedSum(simplex[i], 1 - sigma, simplex[0], sigma, simplex[i]), 
                simplex[i].fx = f(simplex[i]);
            }
        } else updateSimplex(reflected);
    }
    return simplex.sort(sortOrder), {
        fx: simplex[0].fx,
        x: simplex[0]
    };
}
//# sourceMappingURL=nelder-mead.js.map
