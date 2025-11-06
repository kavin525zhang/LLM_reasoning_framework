"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.commonAxis = void 0, exports.commonAxis = {
    domainLine: {
        visible: !0,
        style: {
            lineWidth: 1,
            stroke: {
                type: "palette",
                key: "axisDomainColor"
            },
            strokeOpacity: 1
        }
    },
    grid: {
        visible: !0,
        style: {
            lineWidth: 1,
            stroke: {
                type: "palette",
                key: "axisGridColor"
            },
            strokeOpacity: 1,
            lineDash: []
        }
    },
    subGrid: {
        visible: !1,
        style: {
            lineWidth: 1,
            stroke: {
                type: "palette",
                key: "axisGridColor"
            },
            strokeOpacity: 1,
            lineDash: [ 4, 4 ]
        }
    },
    tick: {
        visible: !0,
        inside: !1,
        tickSize: 4,
        alignWithLabel: !0,
        style: {
            lineWidth: 1,
            stroke: {
                type: "palette",
                key: "axisDomainColor"
            },
            strokeOpacity: 1
        }
    },
    subTick: {
        visible: !1,
        tickSize: 2,
        style: {
            lineWidth: 1,
            stroke: {
                type: "palette",
                key: "axisDomainColor"
            },
            strokeOpacity: 1
        }
    },
    label: {
        visible: !0,
        inside: !1,
        space: 10,
        style: {
            fontSize: {
                type: "token",
                key: "l5FontSize"
            },
            fill: {
                type: "palette",
                key: "axisLabelFontColor"
            },
            fontWeight: "normal",
            fillOpacity: 1
        }
    },
    title: {
        space: 10,
        padding: 0,
        style: {
            fontSize: {
                type: "token",
                key: "l5FontSize"
            },
            lineHeight: {
                type: "token",
                key: "l5LineHeight"
            },
            fill: {
                type: "palette",
                key: "secondaryFontColor"
            },
            fontWeight: "normal",
            fillOpacity: 1
        }
    }
};
//# sourceMappingURL=common-axis.js.map
