"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.average = exports.sum = exports.partition = exports.fieldNames = void 0;

const vutils_1 = require("@visactor/vutils"), vgrammar_util_1 = require("@visactor/vgrammar-util");

function fieldNames(fields, as) {
    return fields ? fields.map(((f, i) => {
        var _a;
        return null !== (_a = as[i]) && void 0 !== _a ? _a : (0, vutils_1.isString)(f) ? f : (0, 
        vgrammar_util_1.accessorName)(f);
    })) : null;
}

function partition(data, groupBy, field) {
    if ((0, vutils_1.isNil)(groupBy)) return [ data.map(field) ];
    const groups = [], map = {};
    return data.forEach((entry => {
        const groupKey = groupBy.map((groupFunc => groupFunc(entry))).toString();
        if (map[groupKey]) map[groupKey].push(field(entry)); else {
            const groupItem = [];
            groupItem.dims = groupKey, groups.push(groupItem), map[groupKey] = groupItem;
        }
    })), groups;
}

function sum(arr) {
    return arr.reduce(((accumulator, currentValue) => accumulator + currentValue), 0);
}

function average(arr) {
    if (0 === arr.length) return 0;
    return sum(arr) / arr.length;
}

exports.fieldNames = fieldNames, exports.partition = partition, exports.sum = sum, 
exports.average = average;
//# sourceMappingURL=util.js.map
