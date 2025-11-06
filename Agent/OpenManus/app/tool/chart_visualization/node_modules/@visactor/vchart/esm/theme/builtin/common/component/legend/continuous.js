const getTextTheme = () => ({
    style: {
        fontSize: {
            type: "token",
            key: "l5FontSize"
        },
        lineHeight: {
            type: "token",
            key: "l5LineHeight"
        },
        fontWeight: "normal",
        fill: {
            type: "palette",
            key: "secondaryFontColor",
            default: "#89909d"
        }
    },
    space: 6
});

export const DEFAULT_CONTINUOUS_LEGEND_THEME = {
    orient: "right",
    position: "middle",
    padding: [ 16, 24 ],
    title: {
        visible: !1,
        padding: 0,
        textStyle: {
            fontSize: {
                type: "token",
                key: "l5FontSize"
            },
            lineHeight: {
                type: "token",
                key: "l5LineHeight"
            },
            fontWeight: "normal",
            fill: {
                type: "palette",
                key: "primaryFontColor"
            }
        },
        space: 12
    },
    handler: {
        visible: !0
    },
    startText: {
        style: {
            fontSize: {
                type: "token",
                key: "l5FontSize"
            },
            lineHeight: {
                type: "token",
                key: "l5LineHeight"
            },
            fontWeight: "normal",
            fill: {
                type: "palette",
                key: "secondaryFontColor",
                default: "#89909d"
            }
        },
        space: 6
    },
    endText: {
        style: {
            fontSize: {
                type: "token",
                key: "l5FontSize"
            },
            lineHeight: {
                type: "token",
                key: "l5LineHeight"
            },
            fontWeight: "normal",
            fill: {
                type: "palette",
                key: "secondaryFontColor",
                default: "#89909d"
            }
        },
        space: 6
    },
    handlerText: {
        style: {
            fontSize: {
                type: "token",
                key: "l5FontSize"
            },
            lineHeight: {
                type: "token",
                key: "l5LineHeight"
            },
            fontWeight: "normal",
            fill: {
                type: "palette",
                key: "secondaryFontColor",
                default: "#89909d"
            }
        },
        space: 6
    }
};
//# sourceMappingURL=continuous.js.map
