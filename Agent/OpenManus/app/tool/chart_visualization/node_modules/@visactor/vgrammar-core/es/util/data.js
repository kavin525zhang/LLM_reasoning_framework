import { DataSet, DataView, csvParser, dsvParser, tsvParser } from "@visactor/vdataset";

import { array, isString } from "@visactor/vutils";

const jsonParser = (data, options = {}, dataView) => {
    if (!isString(data)) return array(data);
    try {
        return array(JSON.parse(data));
    } catch (e) {
        return [];
    }
}, parsers = {
    csv: csvParser,
    dsv: dsvParser,
    tsv: tsvParser,
    json: jsonParser
};

export const parseFormat = (data, format) => {
    if (!format || !parsers[format.type]) return array(data);
    const options = "dsv" === format.type ? {
        delimiter: format.delimiter
    } : {};
    return parsers[format.type](data, options, new DataView(new DataSet));
};
//# sourceMappingURL=data.js.map
