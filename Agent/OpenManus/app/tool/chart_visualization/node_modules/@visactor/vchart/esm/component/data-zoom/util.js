import { isArray, last } from "@visactor/vutils";

import { array, isNil } from "../../util";

export const lockStatisticsFilter = (statisticsData, op) => {
    const {getNewDomain: getNewDomain, isContinuous: isContinuous, field: field, originalFields: originalFields} = op, datumField = field(), newDomain = getNewDomain();
    if (isNil(newDomain) || isNil(datumField)) return statisticsData;
    const fields = originalFields(), realField = isArray(datumField) ? datumField[0] : datumField;
    return statisticsData[realField] && fields && fields[realField] && fields[realField].lockStatisticsByDomain && !isContinuous() && (statisticsData[realField].values = newDomain), 
    statisticsData;
};

export const dataFilterWithNewDomain = (data, op) => {
    const {getNewDomain: getNewDomain, isContinuous: isContinuous, field: field} = op, datumField = field(), newDomain = getNewDomain();
    if (isNil(newDomain) || isNil(datumField)) return data;
    if (0 === newDomain.length) return [];
    const domainMap = {};
    newDomain.forEach((d => {
        domainMap[d] || (domainMap[d] = 1);
    }));
    let filter = null;
    return filter = isContinuous() ? d => {
        let flag = !1;
        return array(datumField).every((field => {
            d[field] >= newDomain[0] && d[field] <= last(newDomain) && (flag = !0);
        })), flag;
    } : d => {
        let flag = !1;
        return array(datumField).every((field => {
            (domainMap[d[field] + ""] || domainMap[d[field]]) && (flag = !0);
        })), flag;
    }, data.filter(filter);
};

export const dataFilterComputeDomain = (data, op) => {
    const {stateFields: stateFields, valueFields: valueFields, dataCollection: dataCollection} = op.input, {stateField: stateField, valueField: valueField} = op.output, resultObj = {}, resultData = [];
    return dataCollection.forEach(((dv, i) => {
        var _a;
        if (isNil(stateFields[i])) return;
        const stateFieldInfo = null === (_a = dv.getFields()) || void 0 === _a ? void 0 : _a[stateFields[i]];
        stateFieldInfo && stateFieldInfo.lockStatisticsByDomain && stateFieldInfo.domain.forEach((d => {
            resultObj[d] = 0;
        })), dv.latestData.forEach((d => {
            array(stateFields[i]).forEach((state => {
                isNil(d[state]) || (isNil(resultObj[d[state]]) && (resultObj[d[state]] = 0), isNil(valueFields[i]) || (resultObj[d[state]] += isNaN(parseFloat(d[valueFields[i]])) ? 1 : parseFloat(d[valueFields[i]])));
            }));
        }));
    })), Object.keys(resultObj).forEach(((d, i) => {
        const res = {
            [stateField]: d
        };
        valueField && (res[valueField] = resultObj[d]), resultData.push(res);
    })), resultData;
};
//# sourceMappingURL=util.js.map
