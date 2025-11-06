import { DEFAULT_CONTINUOUS_LEGEND_THEME } from "./continuous";

const getColorLegendTheme = horizontal => {
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
    Object.assign(Object.assign({}, DEFAULT_CONTINUOUS_LEGEND_THEME), {
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

export const colorLegend = {
    horizontal: getColorLegendTheme(!0),
    vertical: getColorLegendTheme(!1)
};
//# sourceMappingURL=color-legend.js.map
