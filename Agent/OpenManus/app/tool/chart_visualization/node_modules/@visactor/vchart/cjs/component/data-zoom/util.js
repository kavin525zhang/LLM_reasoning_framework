"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.dataFilterComputeDomain = exports.dataFilterWithNewDomain = exports.lockStatisticsFilter = void 0;

const vutils_1 = require("@visactor/vutils"), util_1 = require("../../util"), lockStatisticsFilter = (statisticsData, op) => {
    const {getNewDomain: getNewDomain, isContinuous: isContinuous, field: field, originalFields: originalFields} = op, datumField = field(), newDomain = getNewDomain();
    if ((0, util_1.isNil)(newDomain) || (0, util_1.isNil)(datumField)) return statisticsData;
    const fields = originalFields(), realField = (0, vutils_1.isArray)(datumField) ? datumField[0] : datumField;
    return statisticsData[realField] && fields && fields[realField] && fields[realField].lockStatisticsByDomain && !isContinuous() && (statisticsData[realField].values = newDomain), 
    statisticsData;
};

exports.lockStatisticsFilter = lockStatisticsFilter;

const dataFilterWithNewDomain = (data, op) => {
    const {getNewDomain: getNewDomain, isContinuous: isContinuous, field: field} = op, datumField = field(), newDomain = getNewDomain();
    if ((0, util_1.isNil)(newDomain) || (0, util_1.isNil)(datumField)) return data;
    if (0 === newDomain.length) return [];
    const domainMap = {};
    newDomain.forEach((d => {
        domainMap[d] || (domainMap[d] = 1);
    }));
    let filter = null;
    return filter = isContinuous() ? d => {
        let flag = !1;
        return (0, util_1.array)(datumField).every((field => {
            d[field] >= newDomain[0] && d[field] <= (0, vutils_1.last)(newDomain) && (flag = !0);
        })), flag;
    } : d => {
        let flag = !1;
        return (0, util_1.array)(datumField).every((field => {
            (domainMap[d[field] + ""] || domainMap[d[field]]) && (flag = !0);
        })), flag;
    }, data.filter(filter);
};

exports.dataFilterWithNewDomain = dataFilterWithNewDomain;

const dataFilterComputeDomain = (data, op) => {
    const {stateFields: stateFields, valueFields: valueFields, dataCollection: dataCollection} = op.input, {stateField: stateField, valueField: valueField} = op.output, resultObj = {}, resultData = [];
    return dataCollection.forEach(((dv, i) => {
        var _a;
        if ((0, util_1.isNil)(stateFields[i])) return;
        const stateFieldInfo = null === (_a = dv.getFields()) || void 0 === _a ? void 0 : _a[stateFields[i]];
        stateFieldInfo && stateFieldInfo.lockStatisticsByDomain && stateFieldInfo.domain.forEach((d => {
            resultObj[d] = 0;
        })), dv.latestData.forEach((d => {
            (0, util_1.array)(stateFields[i]).forEach((state => {
                (0, util_1.isNil)(d[state]) || ((0, util_1.isNil)(resultObj[d[state]]) && (resultObj[d[state]] = 0), 
                (0, util_1.isNil)(valueFields[i]) || (resultObj[d[state]] += isNaN(parseFloat(d[valueFields[i]])) ? 1 : parseFloat(d[valueFields[i]])));
            }));
        }));
    })), Object.keys(resultObj).forEach(((d, i) => {
        const res = {
            [stateField]: d
        };
        valueField && (res[valueField] = resultObj[d]), resultData.push(res);
    })), resultData;
};

exports.dataFilterComputeDomain = dataFilterComputeDomain;
//# sourceMappingURL=util.js.map
