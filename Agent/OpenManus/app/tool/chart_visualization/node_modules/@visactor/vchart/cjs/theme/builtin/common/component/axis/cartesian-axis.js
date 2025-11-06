"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.axisZ = exports.axisY = exports.axisX = void 0;

const getUnitTheme = () => ({
    visible: !1,
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
});

exports.axisX = {
    label: {
        space: 8
    },
    title: {
        space: 8
    },
    maxHeight: "30%",
    unit: {
        visible: !1,
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
    }
}, exports.axisY = {
    label: {
        space: 12,
        autoLimit: !0
    },
    title: {
        space: 12,
        autoRotate: !0
    },
    maxWidth: "30%",
    unit: {
        visible: !1,
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
    }
}, exports.axisZ = Object.assign(Object.assign({}, exports.axisX), {
    label: {
        space: 0
    }
});
//# sourceMappingURL=cartesian-axis.js.map
