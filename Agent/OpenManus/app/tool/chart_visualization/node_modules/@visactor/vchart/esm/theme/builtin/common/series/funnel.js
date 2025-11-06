const getFunnelTheme = is3d => {
    const res = {
        label: {
            style: {
                fill: "white",
                textBaseline: "middle",
                lineWidth: 2
            }
        },
        outerLabel: {
            style: {
                fontSize: {
                    type: "token",
                    key: "l4FontSize"
                },
                fill: {
                    type: "palette",
                    key: "secondaryFontColor"
                }
            },
            line: {
                style: {
                    stroke: {
                        type: "palette",
                        key: "axisDomainColor"
                    }
                }
            }
        },
        transformLabel: {
            style: {
                fontSize: {
                    type: "token",
                    key: "l4FontSize"
                },
                fill: {
                    type: "palette",
                    key: "secondaryFontColor"
                },
                textBaseline: "middle"
            }
        }
    };
    return res[is3d ? "transform3d" : "transform"] = {
        style: {
            fill: {
                type: "palette",
                key: "axisGridColor"
            }
        }
    }, res;
};

export const funnel = getFunnelTheme();

export const funnel3d = getFunnelTheme(!0);
//# sourceMappingURL=funnel.js.map
