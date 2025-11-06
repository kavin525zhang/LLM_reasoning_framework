"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.sunburst = void 0;

const polar_1 = require("../../../../constant/polar");

exports.sunburst = {
    innerRadius: 0,
    outerRadius: 1,
    startAngle: polar_1.POLAR_START_ANGLE,
    endAngle: polar_1.POLAR_END_ANGLE,
    gap: 0,
    labelLayout: {
        align: "center",
        offset: 0,
        rotate: "radial"
    },
    sunburst: {
        style: {
            stroke: {
                type: "palette",
                key: "backgroundColor"
            },
            fillOpacity: 1,
            cursor: "pointer"
        }
    },
    label: {
        visible: !0,
        style: {
            cursor: "pointer",
            fill: {
                type: "palette",
                key: "primaryFontColor"
            },
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
//# sourceMappingURL=sunburst.js.map
