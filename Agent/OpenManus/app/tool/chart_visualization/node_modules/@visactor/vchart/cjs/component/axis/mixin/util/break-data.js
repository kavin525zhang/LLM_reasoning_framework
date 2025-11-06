"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.breakData = void 0;

const setDomain = (min, max, breaks) => breaks.reduce(((r, b, i) => (r.push([ b, breaks.length === i + 1 ? max : breaks[i + 1] ]), 
r)), [ [ min, breaks[0] ] ]);

function breakDomain(data, points) {
    const min = data[0], max = data[data.length - 1], breaks = points.filter((point => point > min && point < max));
    return 0 === breaks.length ? [ [ min, max ] ] : setDomain(min, max, breaks);
}

const sorter = (a, b) => a - b, fillBins = (data, points) => {
    const bins = [ {
        count: 0,
        sub: [],
        max: points[0],
        min: points[0]
    } ];
    let i = 0, j = 0;
    for (;i < points.length; ) data[j] <= points[i] ? (bins[i].count += 1, bins[i].sub.push(data[j]), 
    j += 1) : (i += 1, bins[i] = {
        count: 0,
        sub: [],
        max: points[i],
        min: points[i]
    });
    bins.forEach((bin => {
        bin.count && (bin.min = Math.min.apply(null, bin.sub));
    }));
    const remain = data.slice(j);
    return bins[i] = {
        count: remain.length,
        sub: remain,
        min: points[points.length - 1],
        max: Math.max.apply(null, remain)
    }, bins;
};

function breakScope(data, points, scopeType = "count") {
    const bins = fillBins(data, points), totalLength = "count" === scopeType ? data.length : bins.reduce(((res, bin, i) => bin.count > 0 ? res + bin.max - bin.min : res), 0), res = [];
    let acc = 0, resIndex = 0;
    return bins.forEach(((bin, i) => {
        if (0 === totalLength) res.push([ 0, i / bins.length - 1 ]); else {
            const length = "count" === scopeType ? bin.count : bin.max - bin.min, b0 = res[resIndex - 1] ? res[resIndex - 1][1] : 0, b1 = i === bins.length - 1 ? 1 : Math.min((acc + length) / totalLength, 1);
            (b0 !== b1 || 0 !== b0 && 1 !== b0) && (resIndex += 1, res.push([ b0, b1 ]), acc += length);
        }
    })), res;
}

function breakData(data, points, scopeType) {
    return data.sort(sorter), points.sort(sorter), {
        domain: breakDomain(data, points),
        scope: breakScope(data, points, scopeType)
    };
}

exports.breakData = breakData;
//# sourceMappingURL=break-data.js.map
