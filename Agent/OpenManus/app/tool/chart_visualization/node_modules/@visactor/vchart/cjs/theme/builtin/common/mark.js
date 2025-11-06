"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.markByName = exports.markByType = void 0, exports.markByType = {
    text: {
        style: {
            fontSize: {
                type: "token",
                key: "l4FontSize"
            },
            fontWeight: "normal",
            fillOpacity: 1
        }
    }
}, exports.markByName = {
    label: {
        style: {
            fontSize: {
                type: "token",
                key: "l4FontSize"
            },
            fontWeight: "normal",
            fillOpacity: 1,
            lineJoin: "bevel"
        }
    },
    area: {
        style: {
            fillOpacity: .2
        }
    },
    line: {
        style: {
            lineWidth: 2,
            lineCap: "round",
            lineJoin: "round"
        }
    },
    point: {
        style: {
            size: 8,
            stroke: {
                type: "palette",
                key: "backgroundColor"
            },
            lineWidth: 1,
            fillOpacity: 1
        }
    },
    word: {
        style: {
            fontWeight: null,
            fontSize: null
        }
    },
    fillingWord: {
        style: {
            fontWeight: null,
            fontSize: null
        }
    },
    sunburst: {
        style: {
            lineWidth: 1,
            stroke: {
                type: "palette",
                key: "backgroundColor"
            }
        }
    },
    circlePacking: {
        style: {
            lineWidth: 1,
            stroke: {
                type: "palette",
                key: "backgroundColor"
            }
        }
    },
    funnel3d: {
        style: {
            stroke: !1
        }
    },
    barBackground: {
        visible: !1,
        style: {
            fill: {
                type: "palette",
                key: "primaryFontColor",
                a: .06
            },
            stroke: "transparent"
        }
    }
};
//# sourceMappingURL=mark.js.map
