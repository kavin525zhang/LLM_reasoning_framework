"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.colorLegend = void 0;

const continuous_1 = require("./continuous"), getColorLegendTheme = horizontal => {
    const rail = {
        width: 200,
        height: 8,
        style: {
            fill: {
                type: "palette",
                key: "sliderRailColor"
            }
        }
    };
    return horizontal ? (rail.width = 200, rail.height = 8) : (rail.width = 8, rail.height = 200), 
    Object.assign(Object.assign({}, continuous_1.DEFAULT_CONTINUOUS_LEGEND_THEME), {
        rail: rail,
        handler: {
            style: {
                symbolType: "circle",
                lineWidth: 0,
                outerBorder: {
                    lineWidth: 2,
                    distance: .8,
                    stroke: "#ffffff"
                },
                shadowBlur: 12,
                shadowOffsetX: 0,
                shadowOffsetY: 4,
                shadowColor: {
                    type: "palette",
                    key: "shadowColor"
                }
            }
        }
    });
};

exports.colorLegend = {
    horizontal: getColorLegendTheme(!0),
    vertical: getColorLegendTheme(!1)
};
//# sourceMappingURL=color-legend.js.map
