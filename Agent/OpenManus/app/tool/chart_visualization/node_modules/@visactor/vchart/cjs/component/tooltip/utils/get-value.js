"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getFirstDatumFromTooltipData = exports.getTooltipPatternValue = exports.getTooltipContentValue = void 0;

const vutils_1 = require("@visactor/vutils"), util_1 = require("../../util"), getTooltipContentValue = (field, datum, params, formatter) => {
    let value;
    if (value = (0, vutils_1.isFunction)(field) ? field(datum, params) : (0, vutils_1.isPlainObject)(field) && (0, 
    vutils_1.isValid)(field.field) ? (0, vutils_1.get)(datum, field.field) : field, 
    formatter) {
        const {formatFunc: formatFunc, args: args} = (0, util_1.getFormatFunction)(void 0, formatter, field, datum);
        formatFunc && args && (value = formatFunc(...args));
    }
    return value;
};

exports.getTooltipContentValue = getTooltipContentValue;

const getTooltipPatternValue = (field, data, params) => (0, vutils_1.isNil)(field) ? field : (0, 
vutils_1.isFunction)(field) ? field(data, params) : field;

function getFirstDatumFromTooltipData(data) {
    var _a;
    const dimInfoList = (null === (_a = data[0]) || void 0 === _a ? void 0 : _a.series) ? [ {
        data: data,
        value: ""
    } ] : data;
    for (const {data: dataList} of dimInfoList) for (const {datum: datumList} of dataList) for (const datumItem of null != datumList ? datumList : []) if (datumItem) return datumItem;
}

exports.getTooltipPatternValue = getTooltipPatternValue, exports.getFirstDatumFromTooltipData = getFirstDatumFromTooltipData;
//# sourceMappingURL=get-value.js.map
