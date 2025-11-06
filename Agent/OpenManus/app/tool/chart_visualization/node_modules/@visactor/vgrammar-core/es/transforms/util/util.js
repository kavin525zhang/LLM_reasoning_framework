import { isNil, isString } from "@visactor/vutils";

import { accessorName } from "@visactor/vgrammar-util";

export function fieldNames(fields, as) {
    return fields ? fields.map(((f, i) => {
        var _a;
        return null !== (_a = as[i]) && void 0 !== _a ? _a : isString(f) ? f : accessorName(f);
    })) : null;
}

export function partition(data, groupBy, field) {
    if (isNil(groupBy)) return [ data.map(field) ];
    const groups = [], map = {};
    return data.forEach((entry => {
        const groupKey = groupBy.map((groupFunc => groupFunc(entry))).toString();
        if (map[groupKey]) map[groupKey].push(field(entry)); else {
            const groupItem = [];
            groupItem.dims = groupKey, groups.push(groupItem), map[groupKey] = groupItem;
        }
    })), groups;
}

export function sum(arr) {
    return arr.reduce(((accumulator, currentValue) => accumulator + currentValue), 0);
}

export function average(arr) {
    if (0 === arr.length) return 0;
    return sum(arr) / arr.length;
}
//# sourceMappingURL=util.js.map
