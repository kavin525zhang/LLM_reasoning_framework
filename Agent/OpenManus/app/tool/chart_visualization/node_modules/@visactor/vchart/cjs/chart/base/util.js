"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getRelatedSeriesInfo = exports.getRelatedRegionInfo = void 0;

const vutils_1 = require("@visactor/vutils"), getRelatedRegionInfo = (modelInfo, currentChartSpecInfo) => {
    var _a;
    const spec = modelInfo.spec, {regionId: regionId, regionIndex: regionIndex} = spec;
    if ((0, vutils_1.isValid)(regionId)) {
        const regionIdList = (0, vutils_1.array)(regionId);
        return null === (_a = currentChartSpecInfo.region) || void 0 === _a ? void 0 : _a.filter((({spec: spec}) => regionIdList.includes(spec.id)));
    }
    if ((0, vutils_1.isValid)(regionIndex)) return (0, vutils_1.array)(regionIndex).map((index => {
        var _a;
        return null === (_a = currentChartSpecInfo.region) || void 0 === _a ? void 0 : _a[index];
    })).filter(vutils_1.isValid);
};

exports.getRelatedRegionInfo = getRelatedRegionInfo;

const getRelatedSeriesInfo = (modelInfo, currentChartSpecInfo) => {
    var _a;
    const spec = modelInfo.spec, {seriesId: seriesId, seriesIndex: seriesIndex} = spec;
    if ((0, vutils_1.isValid)(seriesId)) {
        const seriesIdList = (0, vutils_1.array)(seriesId);
        return null === (_a = currentChartSpecInfo.series) || void 0 === _a ? void 0 : _a.filter((({spec: spec}) => seriesIdList.includes(spec.id)));
    }
    if ((0, vutils_1.isValid)(seriesIndex)) return (0, vutils_1.array)(seriesIndex).map((index => {
        var _a;
        return null === (_a = currentChartSpecInfo.series) || void 0 === _a ? void 0 : _a[index];
    })).filter(vutils_1.isValid);
};

exports.getRelatedSeriesInfo = getRelatedSeriesInfo;
//# sourceMappingURL=util.js.map
