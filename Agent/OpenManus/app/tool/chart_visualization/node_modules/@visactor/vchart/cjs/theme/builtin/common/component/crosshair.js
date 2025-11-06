"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.crosshair = void 0;

const getLabelSpec = () => ({
    visible: !1,
    style: {
        fontWeight: "normal",
        fill: {
            type: "palette",
            key: "axisMarkerFontColor"
        },
        fontSize: {
            type: "token",
            key: "l5FontSize"
        }
    },
    labelBackground: {
        padding: {
            bottom: 0,
            top: 0,
            left: 2,
            right: 2
        },
        style: {
            fill: {
                type: "palette",
                key: "axisMarkerBackgroundColor"
            },
            cornerRadius: 1
        }
    }
}), getBandField = () => ({
    visible: !1,
    line: {
        type: "rect",
        visible: !0,
        style: {
            fill: {
                type: "palette",
                key: "axisGridColor"
            },
            opacity: .7,
            lineWidth: 0,
            stroke: {
                type: "palette",
                key: "markLineStrokeColor"
            },
            lineDash: [ 2, 3 ]
        }
    },
    label: {
        visible: !1,
        style: {
            fontWeight: "normal",
            fill: {
                type: "palette",
                key: "axisMarkerFontColor"
            },
            fontSize: {
                type: "token",
                key: "l5FontSize"
            }
        },
        labelBackground: {
            padding: {
                bottom: 0,
                top: 0,
                left: 2,
                right: 2
            },
            style: {
                fill: {
                    type: "palette",
                    key: "axisMarkerBackgroundColor"
                },
                cornerRadius: 1
            }
        }
    }
}), getLinearField = () => ({
    visible: !1,
    line: {
        type: "line",
        visible: !0,
        style: {
            stroke: {
                type: "palette",
                key: "markLineStrokeColor"
            },
            fill: "transparent",
            opacity: .7,
            lineDash: [ 2, 3 ]
        }
    },
    label: {
        visible: !1,
        style: {
            fontWeight: "normal",
            fill: {
                type: "palette",
                key: "axisMarkerFontColor"
            },
            fontSize: {
                type: "token",
                key: "l5FontSize"
            }
        },
        labelBackground: {
            padding: {
                bottom: 0,
                top: 0,
                left: 2,
                right: 2
            },
            style: {
                fill: {
                    type: "palette",
                    key: "axisMarkerBackgroundColor"
                },
                cornerRadius: 1
            }
        }
    }
});

exports.crosshair = {
    trigger: "hover",
    bandField: {
        visible: !1,
        line: {
            type: "rect",
            visible: !0,
            style: {
                fill: {
                    type: "palette",
                    key: "axisGridColor"
                },
                opacity: .7,
                lineWidth: 0,
                stroke: {
                    type: "palette",
                    key: "markLineStrokeColor"
                },
                lineDash: [ 2, 3 ]
            }
        },
        label: {
            visible: !1,
            style: {
                fontWeight: "normal",
                fill: {
                    type: "palette",
                    key: "axisMarkerFontColor"
                },
                fontSize: {
                    type: "token",
                    key: "l5FontSize"
                }
            },
            labelBackground: {
                padding: {
                    bottom: 0,
                    top: 0,
                    left: 2,
                    right: 2
                },
                style: {
                    fill: {
                        type: "palette",
                        key: "axisMarkerBackgroundColor"
                    },
                    cornerRadius: 1
                }
            }
        }
    },
    linearField: {
        visible: !1,
        line: {
            type: "line",
            visible: !0,
            style: {
                stroke: {
                    type: "palette",
                    key: "markLineStrokeColor"
                },
                fill: "transparent",
                opacity: .7,
                lineDash: [ 2, 3 ]
            }
        },
        label: {
            visible: !1,
            style: {
                fontWeight: "normal",
                fill: {
                    type: "palette",
                    key: "axisMarkerFontColor"
                },
                fontSize: {
                    type: "token",
                    key: "l5FontSize"
                }
            },
            labelBackground: {
                padding: {
                    bottom: 0,
                    top: 0,
                    left: 2,
                    right: 2
                },
                style: {
                    fill: {
                        type: "palette",
                        key: "axisMarkerBackgroundColor"
                    },
                    cornerRadius: 1
                }
            }
        }
    }
};
//# sourceMappingURL=crosshair.js.map
