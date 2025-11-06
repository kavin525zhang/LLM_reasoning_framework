"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parseFormat = void 0;

const vdataset_1 = require("@visactor/vdataset"), vutils_1 = require("@visactor/vutils"), jsonParser = (data, options = {}, dataView) => {
    if (!(0, vutils_1.isString)(data)) return (0, vutils_1.array)(data);
    try {
        return (0, vutils_1.array)(JSON.parse(data));
    } catch (e) {
        return [];
    }
}, parsers = {
    csv: vdataset_1.csvParser,
    dsv: vdataset_1.dsvParser,
    tsv: vdataset_1.tsvParser,
    json: jsonParser
}, parseFormat = (data, format) => {
    if (!format || !parsers[format.type]) return (0, vutils_1.array)(data);
    const options = "dsv" === format.type ? {
        delimiter: format.delimiter
    } : {};
    return parsers[format.type](data, options, new vdataset_1.DataView(new vdataset_1.DataSet));
};

exports.parseFormat = parseFormat;
//# sourceMappingURL=data.js.map
