"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.markArea = void 0;

const mark_1 = require("./mark");

exports.markArea = {
    area: {
        style: {
            fill: {
                type: "palette",
                key: "axisDomainColor",
                a: .25
            }
        }
    },
    label: (0, mark_1.getCommonLabelTheme)()
};
//# sourceMappingURL=mark-area.js.map
