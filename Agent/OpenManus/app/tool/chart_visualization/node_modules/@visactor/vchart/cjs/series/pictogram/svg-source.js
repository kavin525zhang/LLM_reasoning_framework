"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.clearSVGSource = exports.getSVGSource = exports.unregisterSVGSource = exports.registerSVGSource = exports.svgSourceMap = void 0;

const vdataset_1 = require("@visactor/vdataset"), register_1 = require("../../data/register"), util_1 = require("../../util");

let svgDataSet;

function initSVGDataSet() {
    svgDataSet || (svgDataSet = new vdataset_1.DataSet, (0, register_1.registerDataSetInstanceParser)(svgDataSet, "svg", vdataset_1.svgParser));
}

function registerSVGSource(key, source) {
    exports.svgSourceMap.has(key) && (0, util_1.warn)(`svg source key of '${key}' already exists, will be overwritten.`), 
    initSVGDataSet();
    const dataView = new vdataset_1.DataView(svgDataSet);
    dataView.parse(source, {
        type: "svg"
    }), exports.svgSourceMap.set(key, dataView);
}

function unregisterSVGSource(key) {
    exports.svgSourceMap.has(key) ? exports.svgSourceMap.delete(key) : (0, util_1.warn)(`map type of '${key}' does not exists.`);
}

function getSVGSource(type) {
    return exports.svgSourceMap.get(type);
}

function clearSVGSource() {
    exports.svgSourceMap.clear(), svgDataSet = null;
}

exports.svgSourceMap = new Map, exports.registerSVGSource = registerSVGSource, exports.unregisterSVGSource = unregisterSVGSource, 
exports.getSVGSource = getSVGSource, exports.clearSVGSource = clearSVGSource;
//# sourceMappingURL=svg-source.js.map
