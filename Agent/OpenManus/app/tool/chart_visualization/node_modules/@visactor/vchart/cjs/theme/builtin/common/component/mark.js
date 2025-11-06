"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCommonLabelTheme = void 0;

const getCommonLabelTheme = () => ({
    style: {
        fontSize: {
            type: "token",
            key: "l4FontSize"
        },
        fontWeight: "normal",
        fontStyle: "normal",
        fill: {
            type: "palette",
            key: "primaryFontColor"
        }
    },
    labelBackground: {
        padding: {
            top: 2,
            bottom: 2,
            right: 4,
            left: 4
        },
        style: {
            cornerRadius: 3,
            fill: {
                type: "palette",
                key: "markLabelBackgroundColor"
            }
        }
    }
});

exports.getCommonLabelTheme = getCommonLabelTheme;
//# sourceMappingURL=mark.js.map
