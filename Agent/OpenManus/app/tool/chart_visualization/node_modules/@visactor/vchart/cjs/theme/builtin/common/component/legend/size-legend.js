"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.sizeLegend = void 0;

const continuous_1 = require("./continuous"), getSizeLegendTheme = horizontal => {
    const rail = {
        style: {
            fill: {
                type: "palette",
                key: "sliderRailColor"
            }
        }
    };
    return horizontal ? (rail.width = 200, rail.height = 4) : (rail.height = 200, rail.width = 4), 
    Object.assign(Object.assign({}, continuous_1.DEFAULT_CONTINUOUS_LEGEND_THEME), {
        sizeBackground: {
            fill: {
                type: "palette",
                key: "dataZoomChartColor"
            }
        },
        track: {
            style: {
                fill: {
                    type: "palette",
                    key: "sliderTrackColor",
                    a: .8
                }
            }
        },
        rail: rail,
        handler: {
            style: {
                symbolType: "circle",
                lineWidth: 0,
                outerBorder: {
                    lineWidth: 2,
                    distance: .8,
                    stroke: {
                        type: "palette",
                        key: "sliderTrackColor"
                    }
                },
                fill: {
                    type: "palette",
                    key: "sliderHandleColor"
                }
            }
        }
    });
};

exports.sizeLegend = {
    horizontal: getSizeLegendTheme(!0),
    vertical: getSizeLegendTheme(!1)
};
//# sourceMappingURL=size-legend.js.map
