import { ascending } from "./ascending";

import isNil from "./isNil";

import { Logger } from "../logger";

export function bisect(a, x, lo = 0, hi) {
    for (isNil(hi) && (hi = a.length); lo < hi; ) {
        const mid = lo + hi >>> 1;
        ascending(a[mid], x) > 0 ? hi = mid : lo = mid + 1;
    }
    return lo;
}

export function findZeroOfFunction(f, a, b, parameters) {
    var _a, _b;
    const maxIterations = null !== (_a = null == parameters ? void 0 : parameters.maxIterations) && void 0 !== _a ? _a : 100, tolerance = null !== (_b = null == parameters ? void 0 : parameters.tolerance) && void 0 !== _b ? _b : 1e-10, fA = f(a), fB = f(b);
    let delta = b - a;
    if (fA * fB > 0) {
        return Logger.getInstance().error("Initial bisect points must have opposite signs"), 
        NaN;
    }
    if (0 === fA) return a;
    if (0 === fB) return b;
    for (let i = 0; i < maxIterations; ++i) {
        delta /= 2;
        const mid = a + delta, fMid = f(mid);
        if (fMid * fA >= 0 && (a = mid), Math.abs(delta) < tolerance || 0 === fMid) return mid;
    }
    return a + delta;
}

export const binaryFuzzySearch = (arr, compareFn) => binaryFuzzySearchInNumberRange(0, arr.length, (value => compareFn(arr[value])));

export const binaryFuzzySearchInNumberRange = (x1, x2, compareFn) => {
    let left = x1, right = x2;
    for (;left < right; ) {
        const mid = Math.floor((left + right) / 2);
        compareFn(mid) >= 0 ? right = mid : left = mid + 1;
    }
    return left;
};
//# sourceMappingURL=bisect.js.map