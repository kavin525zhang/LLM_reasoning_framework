export const venn = {
    circle: {
        style: {
            opacity: .8
        },
        state: {
            hover: {
                opacity: 1
            }
        }
    },
    overlap: {
        style: {
            opacity: .8
        },
        state: {
            hover: {
                opacity: 1,
                stroke: "white",
                lineWidth: 2
            }
        }
    },
    label: {
        visible: !0,
        style: {
            fill: "white",
            textBaseline: "middle",
            textAlign: "center",
            fontSize: {
                type: "token",
                key: "l4FontSize"
            },
            lineHeight: {
                type: "token",
                key: "l4LineHeight"
            }
        }
    },
    overlapLabel: {
        visible: !0,
        style: {
            textBaseline: "middle",
            textAlign: "center",
            fontSize: {
                type: "token",
                key: "l5FontSize"
            },
            lineHeight: {
                type: "token",
                key: "l5LineHeight"
            }
        }
    }
};
//# sourceMappingURL=venn.js.map
