"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.indicator = void 0;

const getTextStyle = (fontSizeKey, fillKey) => ({
    fontSize: {
        type: "token",
        key: fontSizeKey
    },
    fill: {
        type: "palette",
        key: fillKey
    },
    fontWeight: "normal",
    fillOpacity: 1,
    textBaseline: "top",
    textAlign: "center"
});

exports.indicator = {
    title: {
        visible: !0,
        autoLimit: !1,
        autoFit: !1,
        style: getTextStyle("l1FontSize", "primaryFontColor")
    },
    content: {
        visible: !0,
        style: getTextStyle("l2FontSize", "tertiaryFontColor")
    }
};
//# sourceMappingURL=indicator.js.map
