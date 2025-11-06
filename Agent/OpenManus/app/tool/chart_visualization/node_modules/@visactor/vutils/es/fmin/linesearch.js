import { dotProduct } from "../math";

import { weightedSum } from "./blas1";

export function wolfeLineSearch(f, pk, current, next, a, c1, c2) {
    const phi0 = current.fx, phiPrime0 = dotProduct(current.fxprime, pk);
    let phi = phi0, phi_old = phi0, phiPrime = phiPrime0, a0 = 0;
    function zoom(a_lo, a_high, phi_lo) {
        for (let iteration = 0; iteration < 16; ++iteration) if (a = (a_lo + a_high) / 2, 
        weightedSum(next.x, 1, current.x, a, pk), phi = next.fx = f(next.x, next.fxprime), 
        phiPrime = dotProduct(next.fxprime, pk), phi > phi0 + c1 * a * phiPrime0 || phi >= phi_lo) a_high = a; else {
            if (Math.abs(phiPrime) <= -c2 * phiPrime0) return a;
            phiPrime * (a_high - a_lo) >= 0 && (a_high = a_lo), a_lo = a, phi_lo = phi;
        }
        return 0;
    }
    a = a || 1, c1 = c1 || 1e-6, c2 = c2 || .1;
    for (let iteration = 0; iteration < 10; ++iteration) {
        if (weightedSum(next.x, 1, current.x, a, pk), phi = next.fx = f(next.x, next.fxprime), 
        phiPrime = dotProduct(next.fxprime, pk), phi > phi0 + c1 * a * phiPrime0 || iteration && phi >= phi_old) return zoom(a0, a, phi_old);
        if (Math.abs(phiPrime) <= -c2 * phiPrime0) return a;
        if (phiPrime >= 0) return zoom(a, a0, phi);
        phi_old = phi, a0 = a, a *= 2;
    }
    return a;
}
//# sourceMappingURL=linesearch.js.map
