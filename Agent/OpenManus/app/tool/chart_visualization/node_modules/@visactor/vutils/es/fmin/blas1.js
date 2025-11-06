import { dotProduct } from "../math";

export function zeros(x) {
    const r = new Array(x);
    for (let i = 0; i < x; ++i) r[i] = 0;
    return r;
}

export function zerosM(x, y) {
    return zeros(x).map((function() {
        return zeros(y);
    }));
}

export function norm2(a) {
    return Math.sqrt(dotProduct(a, a));
}

export function scale(ret, value, c) {
    for (let i = 0; i < value.length; ++i) ret[i] = value[i] * c;
}

export function weightedSum(ret, w1, v1, w2, v2) {
    for (let j = 0; j < ret.length; ++j) ret[j] = w1 * v1[j] + w2 * v2[j];
}

export function gemv(output, A, x) {
    for (let i = 0; i < output.length; ++i) output[i] = dotProduct(A[i], x);
}
//# sourceMappingURL=blas1.js.map
