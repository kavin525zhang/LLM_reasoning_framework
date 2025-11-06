"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.binaryFuzzySearchInNumberRange = exports.binaryFuzzySearch = exports.findZeroOfFunction = exports.bisect = void 0;

const ascending_1 = require("./ascending"), isNil_1 = __importDefault(require("./isNil")), logger_1 = require("../logger");

function bisect(a, x, lo = 0, hi) {
    for ((0, isNil_1.default)(hi) && (hi = a.length); lo < hi; ) {
        const mid = lo + hi >>> 1;
        (0, ascending_1.ascending)(a[mid], x) > 0 ? hi = mid : lo = mid + 1;
    }
    return lo;
}

function findZeroOfFunction(f, a, b, parameters) {
    var _a, _b;
    const maxIterations = null !== (_a = null == parameters ? void 0 : parameters.maxIterations) && void 0 !== _a ? _a : 100, tolerance = null !== (_b = null == parameters ? void 0 : parameters.tolerance) && void 0 !== _b ? _b : 1e-10, fA = f(a), fB = f(b);
    let delta = b - a;
    if (fA * fB > 0) {
        return logger_1.Logger.getInstance().error("Initial bisect points must have opposite signs"), 
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

exports.bisect = bisect, exports.findZeroOfFunction = findZeroOfFunction;

const binaryFuzzySearch = (arr, compareFn) => (0, exports.binaryFuzzySearchInNumberRange)(0, arr.length, (value => compareFn(arr[value])));

exports.binaryFuzzySearch = binaryFuzzySearch;

const binaryFuzzySearchInNumberRange = (x1, x2, compareFn) => {
    let left = x1, right = x2;
    for (;left < right; ) {
        const mid = Math.floor((left + right) / 2);
        compareFn(mid) >= 0 ? right = mid : left = mid + 1;
    }
    return left;
};

exports.binaryFuzzySearchInNumberRange = binaryFuzzySearchInNumberRange;
//# sourceMappingURL=bisect.js.map