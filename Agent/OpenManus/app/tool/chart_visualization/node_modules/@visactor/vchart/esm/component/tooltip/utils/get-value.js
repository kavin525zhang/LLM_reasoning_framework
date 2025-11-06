import { get, isFunction, isNil, isPlainObject, isValid } from "@visactor/vutils";

import { getFormatFunction } from "../../util";

export const getTooltipContentValue = (field, datum, params, formatter) => {
    let value;
    if (value = isFunction(field) ? field(datum, params) : isPlainObject(field) && isValid(field.field) ? get(datum, field.field) : field, 
    formatter) {
        const {formatFunc: formatFunc, args: args} = getFormatFunction(void 0, formatter, field, datum);
        formatFunc && args && (value = formatFunc(...args));
    }
    return value;
};

export const getTooltipPatternValue = (field, data, params) => isNil(field) ? field : isFunction(field) ? field(data, params) : field;

export function getFirstDatumFromTooltipData(data) {
    var _a;
    const dimInfoList = (null === (_a = data[0]) || void 0 === _a ? void 0 : _a.series) ? [ {
        data: data,
        value: ""
    } ] : data;
    for (const {data: dataList} of dimInfoList) for (const {datum: datumList} of dataList) for (const datumItem of null != datumList ? datumList : []) if (datumItem) return datumItem;
}
//# sourceMappingURL=get-value.js.map
