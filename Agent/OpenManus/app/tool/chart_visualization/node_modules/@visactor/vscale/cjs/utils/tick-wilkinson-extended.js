"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.wilkinsonExtended = exports.ALL_Q = exports.DEFAULT_Q = void 0, exports.DEFAULT_Q = [ 1, 5, 2, 2.5, 4, 3 ];

const DEFAULT_W = [ .25, .2, .5, .05 ];

exports.ALL_Q = [ 1, 5, 2, 2.5, 4, 3, 1.5, 7, 6, 8, 9 ];

const eps = 100 * Number.EPSILON;

function prettyNumber(n) {
    return Math.abs(n) < 1e-14 ? n : parseFloat(n.toFixed(14));
}

function mod(n, m) {
    return (n % m + m) % m;
}

function round(n) {
    return Math.round(1e12 * n) / 1e12;
}

function simplicity(q, Q, j, lmin, lmax, lstep) {
    const n = Q.length, i = Q.indexOf(q);
    let v = 0;
    const m = mod(lmin, lstep);
    return (m < eps || lstep - m < eps) && lmin <= 0 && lmax >= 0 && (v = 1), 1 - i / (n - 1) - j + v;
}

function simplicityMax(q, Q, j) {
    const n = Q.length;
    return 1 - Q.indexOf(q) / (n - 1) - j + 1;
}

function density(k, m, dMin, dMax, lMin, lMax) {
    const r = (k - 1) / (lMax - lMin), rt = (m - 1) / (Math.max(lMax, dMax) - Math.min(dMin, lMin));
    return 2 - Math.max(r / rt, rt / r);
}

function densityMax(k, m) {
    return k >= m ? 2 - (k - 1) / (m - 1) : 1;
}

function coverage(dMin, dMax, lMin, lMax) {
    return 1 - .5 * ((dMax - lMax) ** 2 + (dMin - lMin) ** 2) / (.1 * (dMax - dMin)) ** 2;
}

function coverageMax(dMin, dMax, span) {
    const range = dMax - dMin;
    if (span > range) {
        return 1 - ((span - range) / 2) ** 2 / (.1 * range) ** 2;
    }
    return 1;
}

function legibility() {
    return 1;
}

const wilkinsonExtended = (dMin, dMax, n = 5, options) => {
    const {onlyLoose: onlyLoose = !0, Q: Q = exports.DEFAULT_Q, w: w = DEFAULT_W} = options || {}, m = n < 0 ? 0 : Math.round(n);
    if (Number.isNaN(dMin) || Number.isNaN(dMax) || "number" != typeof dMin || "number" != typeof dMax || !m) return [];
    if (dMax - dMin < 1e-15 || 1 === m) return [ dMin ];
    const best = {
        score: -2,
        lmin: 0,
        lmax: 0,
        lstep: 0
    };
    let j = 1;
    for (;j < 1 / 0; ) {
        for (let i = 0; i < Q.length; i += 1) {
            const q = Q[i], sm = simplicityMax(q, Q, j);
            if (w[0] * sm + w[1] + w[2] + w[3] < best.score) {
                j = 1 / 0;
                break;
            }
            let k = 2;
            for (;k < 1 / 0; ) {
                const dm = densityMax(k, m);
                if (w[0] * sm + w[1] + w[2] * dm + w[3] < best.score) break;
                const delta = (dMax - dMin) / (k + 1) / j / q;
                let z = Math.ceil(Math.log10(delta));
                for (;z < 1 / 0; ) {
                    const step = j * q * 10 ** z, cm = coverageMax(dMin, dMax, step * (k - 1));
                    if (w[0] * sm + w[1] * cm + w[2] * dm + w[3] < best.score) break;
                    const minStart = Math.floor(dMax / step) * j - (k - 1) * j, maxStart = Math.ceil(dMin / step) * j;
                    if (minStart <= maxStart) {
                        const count = maxStart - minStart;
                        for (let i = 0; i <= count; i += 1) {
                            const lMin = (minStart + i) * (step / j), lMax = lMin + step * (k - 1), lStep = step, s = simplicity(q, Q, j, lMin, lMax, lStep), c = coverage(dMin, dMax, lMin, lMax), g = density(k, m, dMin, dMax, lMin, lMax), l = legibility(), score = w[0] * s + w[1] * c + w[2] * g + w[3] * l;
                            score > best.score && (!onlyLoose || lMin <= dMin && lMax >= dMax) && (best.lmin = lMin, 
                            best.lmax = lMax, best.lstep = lStep, best.score = score);
                        }
                    }
                    z += 1;
                }
                k += 1;
            }
        }
        j += 1;
    }
    const lmax = prettyNumber(best.lmax), lmin = prettyNumber(best.lmin), lstep = prettyNumber(best.lstep), tickCount = Math.floor(round((lmax - lmin) / lstep)) + 1, ticks = new Array(tickCount);
    ticks[0] = prettyNumber(lmin);
    for (let i = 1; i < tickCount; i += 1) ticks[i] = prettyNumber(ticks[i - 1] + lstep);
    return ticks;
};

exports.wilkinsonExtended = wilkinsonExtended;
//# sourceMappingURL=tick-wilkinson-extended.js.map