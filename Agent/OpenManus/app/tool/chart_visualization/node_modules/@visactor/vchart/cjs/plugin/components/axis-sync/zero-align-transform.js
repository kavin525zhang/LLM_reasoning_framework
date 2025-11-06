"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.zeroAlign = exports.getScaleInfo = exports.isValidAlignDomain = void 0;

const vutils_1 = require("@visactor/vutils");

function isValidAlignDomain(domain) {
    return domain.length >= 2 && (0, vutils_1.isValidNumber)(domain[0]) && (0, vutils_1.isValidNumber)((0, 
    vutils_1.last)(domain)) && (0, vutils_1.last)(domain) >= domain[0];
}

function getScaleInfo(axis, domain) {
    var _a;
    const total = (0, vutils_1.last)(domain) - domain[0], includeZero = (0, vutils_1.last)(domain) * domain[0] < 0;
    let negative = domain[0] <= 0 ? 0 - domain[0] : 0, positive = (0, vutils_1.last)(domain) > 0 ? (0, 
    vutils_1.last)(domain) - 0 : 0;
    0 === total ? domain[0] < 0 ? (negative = 1, positive = 0) : domain[0] > 0 && (negative = 0, 
    positive = 1) : (negative /= total, positive /= total);
    const domainSpec = axis.getDomainSpec(), result = {
        total: total,
        negative: negative,
        positive: positive,
        includeZero: includeZero,
        domain: domain,
        extendable_min: !(0, vutils_1.isValidNumber)(domainSpec.min),
        extendable_max: !(0, vutils_1.isValidNumber)(domainSpec.max)
    };
    if (null === (_a = axis._break) || void 0 === _a ? void 0 : _a.scope) {
        const index = domain.findIndex((value => value >= 0));
        let scope, domainTemp;
        0 === index ? (scope = axis._break.scope[index], domainTemp = [ domain[0], domain[1] ], 
        result.positive = 1, result.negative = 0) : (0, vutils_1.last)(domain) <= 0 ? (result.positive = 0, 
        result.negative = 1, domainTemp = [ domain[domain.length - 2], domain[domain.length - 1] ]) : (scope = axis._break.scope[index - 1], 
        domainTemp = [ domain[index - 1], domain[index] ], result.negative = scope[0] + (0 - domainTemp[0]) / (domainTemp[1] - domainTemp[0]) * (scope[1] - scope[0]), 
        result.positive = 1 - result.negative), result.break = !0, result.extendable_max = !1, 
        result.extendable_min = !1, result.domain = domainTemp;
    }
    return result;
}

function inDifferentCrossZero(info1, info2) {
    const {positive: positive1, negative: negative1, extendable_min: s1Extendable_min, extendable_max: s1Extendable_max, domain: domain1} = info1, {positive: positive2, negative: negative2, extendable_min: s2Extendable_min, extendable_max: s2Extendable_max, domain: domain2} = info2;
    if (positive2 > 0) {
        if (!s2Extendable_min) return !1;
        let comp = negative1 / positive1;
        s1Extendable_max && (comp = negative1 / Math.max(positive1, positive2), domain1[1] = -domain1[0] / comp), 
        domain2[0] = -domain2[1] * comp;
    } else if (negative2 > 0) {
        if (!s2Extendable_max) return !1;
        let comp = positive1 / negative1;
        s1Extendable_min && (comp = positive1 / Math.max(negative1, negative1), domain1[0] = -domain1[1] / comp), 
        domain2[1] = -domain2[0] * comp;
    }
    return !0;
}

function inOnlyZeroDomain(info1, info2) {
    const {extendable_min: s1Extendable_min, extendable_max: s1Extendable_max, domain: domain1} = info1, {positive: positive2, negative: negative2, domain: domain2} = info2;
    return (0 !== positive2 || 0 !== negative2) && (!(positive2 > 0 && !s1Extendable_max) && (!(negative2 > 0 && !s1Extendable_min) && (domain1[0] = domain2[0], 
    domain1[1] = domain2[1], !0)));
}

function inAllCrossZero(info1, info2) {
    const {positive: positive1, negative: negative1, extendable_max: s1Extendable_max, domain: domain1} = info1, {positive: positive2, negative: negative2, extendable_min: s2Extendable_min, domain: domain2} = info2;
    if (s1Extendable_max && s2Extendable_min) {
        const comp = Math.max(negative1, negative2) / Math.max(positive1, positive2);
        domain1[1] = -domain1[0] / comp, domain2[0] = -domain2[1] * comp;
    } else if (s2Extendable_min) {
        const comp = negative1 / positive1;
        domain2[0] = -domain2[1] * comp;
    } else {
        if (!s1Extendable_max) return !1;
        {
            const comp = negative2 / positive2;
            domain1[1] = -domain1[0] / comp;
        }
    }
    return !0;
}

function inNoCrossDifferentSide(info1, info2) {
    const {extendable_min: s1Extendable_min, domain: domain1} = info1, {extendable_max: s2Extendable_max, domain: domain2} = info2;
    return !(!s1Extendable_min || !s2Extendable_max) && (domain1[0] = -domain1[1], domain2[1] = -domain2[0], 
    !0);
}

exports.isValidAlignDomain = isValidAlignDomain, exports.getScaleInfo = getScaleInfo;

const zeroAlign = (targetAxis, currentAxis) => {
    var _a, _b, _c, _d, _e, _f;
    const s1 = targetAxis.getScale(), s2 = currentAxis.getScale();
    if (!s1 || !s2) return;
    const domain1 = null !== (_c = null === (_b = (_a = targetAxis).getDomainAfterSpec) || void 0 === _b ? void 0 : _b.call(_a)) && void 0 !== _c ? _c : [ 0, 1 ], domain2 = null !== (_f = null === (_e = (_d = currentAxis).getDomainAfterSpec) || void 0 === _e ? void 0 : _e.call(_d)) && void 0 !== _f ? _f : [ 0, 1 ];
    if (!(domain1 && domain2 && isValidAlignDomain(domain1) && isValidAlignDomain(domain2))) return;
    const info1 = getScaleInfo(targetAxis, domain1), info2 = getScaleInfo(currentAxis, domain2);
    if (!0 === info1.break && !0 === info2.break) return;
    const {positive: positive1, negative: negative1, extendable_min: s1Extendable_min, extendable_max: s1Extendable_max, includeZero: includeZero1} = info1, {positive: positive2, negative: negative2, extendable_min: s2Extendable_min, extendable_max: s2Extendable_max, includeZero: includeZero2} = info2;
    if (0 === positive1 && 0 === negative1) {
        if (!inOnlyZeroDomain(info1, info2)) return;
    } else if (0 === positive2 && 0 === negative2) {
        if (!inOnlyZeroDomain(info2, info1)) return;
    } else if (includeZero1 || includeZero2) if (includeZero1 && !includeZero2) {
        if (!inDifferentCrossZero(info1, info2)) return;
    } else if (includeZero2 && !includeZero1) {
        if (!inDifferentCrossZero(info2, info1)) return;
    } else {
        if (negative1 === negative2) return;
        if (negative1 > negative2) {
            if (!inAllCrossZero(info1, info2)) return;
        } else if (!inAllCrossZero(info2, info1)) return;
    } else {
        if (0 === negative1 && 0 === positive2) {
            if (!inNoCrossDifferentSide(info1, info2)) return;
        } else if (0 === negative2 && 0 === positive1 && !inNoCrossDifferentSide(info2, info1)) return;
        if (0 === negative1 && 0 === negative2) if (0 === domain1[0] && domain2[0] > 0) {
            if (!s2Extendable_min) return;
            domain2[0] = 0;
        } else {
            if (!(0 === domain2[0] && domain1[0] > 0)) return;
            if (!s1Extendable_min) return;
            domain1[0] = 0;
        }
        if (0 === positive1 && 0 === positive2) if (0 === domain1[1] && domain2[1] > 0) {
            if (!s2Extendable_max) return;
            domain2[1] = 0;
        } else {
            if (!(0 === domain2[1] && domain1[1] > 0)) return;
            if (!s1Extendable_max) return;
            domain1[1] = 0;
        }
    }
    s1.domain(domain1), s2.domain(domain2);
};

exports.zeroAlign = zeroAlign;
//# sourceMappingURL=zero-align-transform.js.map
