import { DataSet, DataView, svgParser } from "@visactor/vdataset";

import { registerDataSetInstanceParser } from "../../data/register";

import { warn } from "../../util";

export const svgSourceMap = new Map;

let svgDataSet;

function initSVGDataSet() {
    svgDataSet || (svgDataSet = new DataSet, registerDataSetInstanceParser(svgDataSet, "svg", svgParser));
}

export function registerSVGSource(key, source) {
    svgSourceMap.has(key) && warn(`svg source key of '${key}' already exists, will be overwritten.`), 
    initSVGDataSet();
    const dataView = new DataView(svgDataSet);
    dataView.parse(source, {
        type: "svg"
    }), svgSourceMap.set(key, dataView);
}

export function unregisterSVGSource(key) {
    svgSourceMap.has(key) ? svgSourceMap.delete(key) : warn(`map type of '${key}' does not exists.`);
}

export function getSVGSource(type) {
    return svgSourceMap.get(type);
}

export function clearSVGSource() {
    svgSourceMap.clear(), svgDataSet = null;
}
//# sourceMappingURL=svg-source.js.map
