"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.continuousLegendFilter = exports.continuousLegendDataMake = void 0;

const vutils_1 = require("@visactor/vutils"), util_1 = require("../../../../util"), continuousLegendDataMake = (data, op) => {
    const {series: series, field: field, scale: scale} = op, datumField = field();
    if (field && datumField) {
        let min = 1 / 0, max = -1 / 0;
        return series().forEach((s => {
            const statisticData = s.getRawDataStatisticsByField(datumField, !0), seriesMin = null == statisticData ? void 0 : statisticData.min, seriesMax = null == statisticData ? void 0 : statisticData.max;
            (0, vutils_1.isValidNumber)(seriesMin) && (min = Math.min(seriesMin, min)), (0, 
            vutils_1.isValidNumber)(seriesMax) && (max = Math.max(seriesMax, max));
        })), [ min, max ];
    }
    if (scale) {
        const _scale = scale();
        return _scale ? _scale.domain() : [];
    }
    return [];
};

exports.continuousLegendDataMake = continuousLegendDataMake;

const continuousLegendFilter = (data, op) => {
    const {selected: selected, field: field, data: legendData, isHierarchyData: isHierarchyData, customFilter: customFilter} = op, selectedRange = selected(), datumField = field(), isHierarchy = isHierarchyData || (data => data && data.some((d => d && (0, 
    util_1.isHierarchyItem)(d))));
    if (selectedRange === legendData()) return data;
    if (datumField && !(0, vutils_1.isEmpty)(selectedRange)) {
        const [min, max] = selectedRange;
        return customFilter ? customFilter(data, selectedRange, datumField) : isHierarchy(data) ? (0, 
        util_1.filterHierarchyDataByRange)(data, +min, +max, datumField) : data.filter((datum => datum[datumField] >= min && datum[datumField] <= max));
    }
    return data;
};

exports.continuousLegendFilter = continuousLegendFilter;
//# sourceMappingURL=continuous.js.map
