import { isEmpty, isValidNumber } from "@visactor/vutils";

import { filterHierarchyDataByRange, isHierarchyItem } from "../../../../util";

export const continuousLegendDataMake = (data, op) => {
    const {series: series, field: field, scale: scale} = op, datumField = field();
    if (field && datumField) {
        let min = 1 / 0, max = -1 / 0;
        return series().forEach((s => {
            const statisticData = s.getRawDataStatisticsByField(datumField, !0), seriesMin = null == statisticData ? void 0 : statisticData.min, seriesMax = null == statisticData ? void 0 : statisticData.max;
            isValidNumber(seriesMin) && (min = Math.min(seriesMin, min)), isValidNumber(seriesMax) && (max = Math.max(seriesMax, max));
        })), [ min, max ];
    }
    if (scale) {
        const _scale = scale();
        return _scale ? _scale.domain() : [];
    }
    return [];
};

export const continuousLegendFilter = (data, op) => {
    const {selected: selected, field: field, data: legendData, isHierarchyData: isHierarchyData, customFilter: customFilter} = op, selectedRange = selected(), datumField = field(), isHierarchy = isHierarchyData || (data => data && data.some((d => d && isHierarchyItem(d))));
    if (selectedRange === legendData()) return data;
    if (datumField && !isEmpty(selectedRange)) {
        const [min, max] = selectedRange;
        return customFilter ? customFilter(data, selectedRange, datumField) : isHierarchy(data) ? filterHierarchyDataByRange(data, +min, +max, datumField) : data.filter((datum => datum[datumField] >= min && datum[datumField] <= max));
    }
    return data;
};
//# sourceMappingURL=continuous.js.map
