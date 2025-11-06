"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.waterfallFillTotal = exports.waterfall = void 0;

const vutils_1 = require("@visactor/vutils"), waterfall_1 = require("../../constant/waterfall"), debug_1 = require("../../util/debug"), data_1 = require("../../constant/data"), waterfall = (lastData, op) => {
    if (!lastData || 0 === lastData.length) return lastData;
    const {indexField: indexField, total: totalSpec, groupData: groupData} = op, totalData = [], {dimensionValues: dimensionValues, dimensionData: dimensionData} = groupData().latestData, indexValues = Array.from(dimensionValues[indexField]);
    let temp = {
        start: 0,
        end: 0,
        positive: 0,
        negative: 0,
        lastIndex: null
    };
    return indexValues.forEach(((key, index) => {
        const total = {
            start: temp.end,
            end: temp.end,
            lastIndex: temp.lastIndex,
            lastEnd: temp.end,
            index: key,
            isTotal: !1,
            positive: temp.end,
            negative: temp.end
        }, indexData = !0 === op.stackInverse ? dimensionData[key].reverse() : dimensionData[key];
        if (null == indexData || indexData.forEach(((d, i) => {
            i === indexData.length - 1 ? d[data_1.STACK_FIELD_TOTAL_TOP] = !0 : delete d[data_1.STACK_FIELD_TOTAL_TOP];
        })), indexData.length > 1) {
            const isTotalCheck = d => {
                if (totalSpec && "end" !== totalSpec.type) {
                    if ("field" === totalSpec.type || "custom" === totalSpec.type) {
                        return !!d[totalSpec.tagField];
                    }
                } else if (index === indexValues.length - 1) return !0;
                return !1;
            };
            if (indexData.some((d => isTotalCheck(d)))) return temp = computeTotalWithMultipleData(indexData, key, total, totalData, temp, indexValues, index, op, isTotalCheck), 
            void totalData.push(total);
        }
        temp = computeNormalData(indexData, key, total, totalData, temp, indexValues, index, op), 
        totalData.push(total);
    })), totalData;
};

function computeTotalWithMultipleData(indexData, key, total, totalData, temp, indexValues, index, op, isTotalCheck) {
    total.isTotal = !0;
    const {valueField: valueField, startAs: startAs, endAs: endAs, total: totalSpec} = op, _normalTemp = [], _totalTemp = [];
    if (indexData.forEach((d => {
        isTotalCheck(d) ? _totalTemp.push(d) : _normalTemp.push(d);
    })), _totalTemp.length === indexData.length) {
        const result = computeNormalData([ indexData[0] ], key, total, totalData, temp, indexValues, index, op);
        return _totalTemp.forEach((d => {
            d[startAs] = indexData[0][startAs], d[endAs] = indexData[0][endAs], d[valueField] = indexData[0][valueField];
        })), result;
    }
    const totalConfigData = _totalTemp[0];
    let {start: start, end: end} = getTotalStartEnd(totalConfigData, total, totalData, temp, totalSpec);
    total.start = start, total.end = end;
    let positive = start, navigate = start, valueTemp = end - start;
    return _normalTemp.forEach((d => {
        const value = +d[valueField];
        value >= 0 ? (d[startAs] = +positive, positive = (0, vutils_1.precisionAdd)(positive, value)) : (d[startAs] = +navigate, 
        navigate = (0, vutils_1.precisionAdd)(navigate, value)), d[endAs] = (0, vutils_1.precisionAdd)(d[startAs], value), 
        start = (0, vutils_1.precisionAdd)(start, value), valueTemp = (0, vutils_1.precisionSub)(valueTemp, value);
    })), _totalTemp.forEach((d => {
        d[startAs] = +start, d[endAs] = (0, vutils_1.precisionAdd)(d[startAs], valueTemp), 
        d[valueField] = valueTemp;
    })), Object.assign(Object.assign({}, total), {
        lastIndex: key
    });
}

function computeNormalData(indexData, key, total, totalData, temp, indexValues, index, op) {
    const {valueField: valueField, startAs: startAs, endAs: endAs, total: totalSpec, seriesField: seriesField, seriesFieldName: seriesFieldName} = op;
    return indexData.forEach((d => {
        let isTotalTag = !1;
        if (totalSpec && "end" !== totalSpec.type) {
            if ("field" === totalSpec.type || "custom" === totalSpec.type) {
                if (d[totalSpec.tagField]) {
                    isTotalTag = !0;
                    const {start: start, end: end} = getTotalStartEnd(d, total, totalData, temp, totalSpec);
                    d[startAs] = start, d[endAs] = end, d[valueField] = end - start, total.start = start, 
                    total.end = end;
                }
            }
        } else index === indexValues.length - 1 && (total.start = 0, d[startAs] = total.start, 
        d[endAs] = total.end, isTotalTag = !0);
        if (!isTotalTag) {
            const value = +d[valueField];
            value >= 0 ? (d[startAs] = +total.positive, total.positive = (0, vutils_1.precisionAdd)(total.positive, value)) : (d[startAs] = +total.negative, 
            total.negative = (0, vutils_1.precisionAdd)(total.negative, value)), d[endAs] = (0, 
            vutils_1.precisionAdd)(d[startAs], value), total.end = (0, vutils_1.precisionAdd)(total.end, value);
        }
        total.isTotal = isTotalTag, ((0, vutils_1.isNil)(seriesField) || seriesField === waterfall_1.WaterfallDefaultSeriesField) && (d[waterfall_1.WaterfallDefaultSeriesField] = isTotalTag ? seriesFieldName.total : +d[valueField] >= 0 ? seriesFieldName.increase : seriesFieldName.decrease);
    })), Object.assign(Object.assign({}, total), {
        lastIndex: key
    });
}

function getTotalStartEnd(d, total, totalData, temp, totalSpec) {
    return totalSpec && "end" !== totalSpec.type ? "field" === totalSpec.type || "custom" === totalSpec.type ? "custom" === totalSpec.type ? getTotalInCustomType(d, temp, totalSpec) : totalSpec.collectCountField && !(0, 
    vutils_1.isNil)(d[totalSpec.collectCountField]) ? getTotalInCollectField(d, totalData, total, totalSpec) : getTotalInField(d, total, totalSpec) : {
        start: 0,
        end: 0
    } : getTotalInEndType(total);
}

function getTotalInEndType(total) {
    return {
        start: 0,
        end: total.end
    };
}

function getTotalInCustomType(d, temp, totalSpec) {
    return totalSpec.product(d, temp);
}

function getTotalInCollectField(d, totalData, total, totalSpec) {
    let start = 0, end = total.end;
    const startIndex = totalData.length - +d[totalSpec.collectCountField], endIndex = totalData.length - 1;
    return startIndex < 0 ? (0, debug_1.warn)("total.collectCountField error") : start = totalData[startIndex].start, 
    endIndex < 0 ? (0, debug_1.warn)("total.collectCountField error") : end = totalData[endIndex].end, 
    {
        start: start,
        end: end
    };
}

function getTotalInField(d, total, totalSpec) {
    let start = 0, end = total.end;
    return totalSpec.startField && !(0, vutils_1.isNil)(d[totalSpec.startField]) && (start = +d[totalSpec.startField]), 
    totalSpec.valueField && !(0, vutils_1.isNil)(d[totalSpec.valueField]) && (end = (0, 
    vutils_1.precisionAdd)(start, +d[totalSpec.valueField])), {
        start: start,
        end: end
    };
}

exports.waterfall = waterfall;

const waterfallFillTotal = (data, op) => {
    if (!data) return data;
    const {indexField: indexField, valueField: valueField, total: total, seriesField: seriesField} = op, totalData = {
        [indexField]: (null == total ? void 0 : total.text) || "total",
        [valueField]: data.reduce(((pre, cur) => (0, vutils_1.precisionAdd)(pre, +cur[valueField])), 0)
    };
    return seriesField && (totalData[seriesField] = "total"), data.push(totalData), 
    data;
};

exports.waterfallFillTotal = waterfallFillTotal;
//# sourceMappingURL=waterfall.js.map
