"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.discreteLegendFilter = exports.discreteLegendDataMake = void 0;

const vutils_1 = require("@visactor/vutils"), data_1 = require("../../../../constant/data"), discreteLegendDataMake = (data, op) => {
    const result = [], tempKey = {}, {series: series, seriesField: seriesField} = op;
    return series().forEach((s => {
        const field = seriesField(s);
        let infoList;
        infoList = field === s.getSeriesField() ? s.getSeriesInfoList() : s.getSeriesInfoInField(field), 
        infoList.forEach((info => {
            tempKey[info.key] || (tempKey[info.key] = !0, result.push(info));
        }));
    })), result;
};

exports.discreteLegendDataMake = discreteLegendDataMake;

const discreteLegendFilter = (data, op) => {
    var _a, _b, _c;
    const {series: series, selected: selected, field: field, data: legendData, customFilter: customFilter} = op, selectedData = selected(), legendKeys = legendData();
    if (0 === selectedData.length && legendKeys.length) return [];
    if (selectedData.length === legendKeys.length) return data;
    const selectedFilter = {};
    selectedData.forEach((s => {
        selectedFilter[s] = !0;
    }));
    const datumField = null !== (_a = field()) && void 0 !== _a ? _a : data_1.DEFAULT_DATA_SERIES_FIELD;
    return customFilter ? customFilter(data, selectedData, datumField) : ((0, vutils_1.isArray)(data) && (null === (_b = data[0]) || void 0 === _b ? void 0 : _b.nodes) ? (data[0].nodes = data[0].nodes.filter((d => !0 === selectedFilter[d.key])), 
    (null === (_c = data[0]) || void 0 === _c ? void 0 : _c.links) && (data[0].links = data[0].links.filter((d => !0 === selectedFilter[d.source] && !0 === selectedFilter[d.target])))) : (0, 
    vutils_1.isValid)(datumField) && (data = data.filter((d => !0 === selectedFilter[series.getSeriesFieldValue(d, datumField)]))), 
    data);
};

exports.discreteLegendFilter = discreteLegendFilter;
//# sourceMappingURL=discrete.js.map
