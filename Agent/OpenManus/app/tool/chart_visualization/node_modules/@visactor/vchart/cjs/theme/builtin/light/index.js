"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.lightTheme = void 0;

const color_scheme_1 = require("./color-scheme"), series_1 = require("../common/series"), mark_1 = require("../common/mark"), component_1 = require("../common/component"), token_1 = require("../../token");

exports.lightTheme = {
    name: "light",
    background: {
        type: "palette",
        key: "backgroundColor"
    },
    padding: 20,
    fontFamily: {
        type: "token",
        key: "fontFamily"
    },
    colorScheme: color_scheme_1.colorScheme,
    token: token_1.token,
    mark: mark_1.markByType,
    markByName: mark_1.markByName,
    series: series_1.series,
    component: component_1.component,
    animationThreshold: 2e3
};
//# sourceMappingURL=index.js.map
