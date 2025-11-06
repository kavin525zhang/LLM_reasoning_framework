import { array, isValid } from "@visactor/vutils";

export const getRelatedRegionInfo = (modelInfo, currentChartSpecInfo) => {
    var _a;
    const spec = modelInfo.spec, {regionId: regionId, regionIndex: regionIndex} = spec;
    if (isValid(regionId)) {
        const regionIdList = array(regionId);
        return null === (_a = currentChartSpecInfo.region) || void 0 === _a ? void 0 : _a.filter((({spec: spec}) => regionIdList.includes(spec.id)));
    }
    if (isValid(regionIndex)) return array(regionIndex).map((index => {
        var _a;
        return null === (_a = currentChartSpecInfo.region) || void 0 === _a ? void 0 : _a[index];
    })).filter(isValid);
};

export const getRelatedSeriesInfo = (modelInfo, currentChartSpecInfo) => {
    var _a;
    const spec = modelInfo.spec, {seriesId: seriesId, seriesIndex: seriesIndex} = spec;
    if (isValid(seriesId)) {
        const seriesIdList = array(seriesId);
        return null === (_a = currentChartSpecInfo.series) || void 0 === _a ? void 0 : _a.filter((({spec: spec}) => seriesIdList.includes(spec.id)));
    }
    if (isValid(seriesIndex)) return array(seriesIndex).map((index => {
        var _a;
        return null === (_a = currentChartSpecInfo.series) || void 0 === _a ? void 0 : _a[index];
    })).filter(isValid);
};
//# sourceMappingURL=util.js.map
