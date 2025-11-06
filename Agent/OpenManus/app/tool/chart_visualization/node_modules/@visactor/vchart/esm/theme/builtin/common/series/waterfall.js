export const waterfall = {
    seriesFieldName: {
        total: "total",
        increase: "increase",
        decrease: "decrease"
    },
    leaderLine: {
        style: {
            stroke: "black",
            lineWidth: 1,
            lineDash: [ 4, 4 ]
        }
    },
    stackLabel: {
        visible: !0,
        offset: 12,
        position: "withChange",
        style: {
            fill: "black",
            fontSize: {
                type: "token",
                key: "l4FontSize"
            }
        }
    },
    label: {
        visible: !1,
        offset: 12,
        position: "inside",
        style: {
            lineWidth: 2
        }
    }
};
//# sourceMappingURL=waterfall.js.map
