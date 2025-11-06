import { getCommonLabelTheme } from "./mark";

const getSymbolTheme = visible => ({
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
}), labelTheme = getCommonLabelTheme();

labelTheme.refY = 5;

export const markLine = {
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
