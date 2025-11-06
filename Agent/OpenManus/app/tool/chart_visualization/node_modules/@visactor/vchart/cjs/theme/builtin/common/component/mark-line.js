"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.markLine = void 0;

const mark_1 = require("./mark"), getSymbolTheme = visible => ({
    visible: visible,
    symbolType: "triangle",
    size: 10,
    style: {
        fill: {
            type: "palette",
            key: "markLineStrokeColor"
        },
        stroke: null,
        lineWidth: 0
    }
}), labelTheme = (0, mark_1.getCommonLabelTheme)();

labelTheme.refY = 5, exports.markLine = {
    line: {
        style: {
            lineDash: [ 3, 3 ],
            stroke: {
                type: "palette",
                key: "markLineStrokeColor"
            }
        }
    },
    startSymbol: getSymbolTheme(!1),
    endSymbol: getSymbolTheme(!0),
    label: labelTheme
};
//# sourceMappingURL=mark-line.js.map
