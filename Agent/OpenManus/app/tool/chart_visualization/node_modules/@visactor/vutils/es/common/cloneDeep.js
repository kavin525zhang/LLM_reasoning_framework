import isArray from "./isArray";

import isBoolean from "./isBoolean";

import isDate from "./isDate";

import isNumber from "./isNumber";

import isString from "./isString";

import isValid from "./isValid";

export default function cloneDeep(value, ignoreWhen, excludeKeys) {
    let result;
    if (!isValid(value) || "object" != typeof value || ignoreWhen && ignoreWhen(value)) return value;
    const isArr = isArray(value), length = value.length;
    result = isArr ? new Array(length) : "object" == typeof value ? {} : isBoolean(value) || isNumber(value) || isString(value) ? value : isDate(value) ? new Date(+value) : void 0;
    const props = isArr ? void 0 : Object.keys(Object(value));
    let index = -1;
    if (result) for (;++index < (props || value).length; ) {
        const key = props ? props[index] : index, subValue = value[key];
        excludeKeys && excludeKeys.includes(key.toString()) ? result[key] = subValue : result[key] = cloneDeep(subValue, ignoreWhen, excludeKeys);
    }
    return result;
}
//# sourceMappingURL=cloneDeep.js.map