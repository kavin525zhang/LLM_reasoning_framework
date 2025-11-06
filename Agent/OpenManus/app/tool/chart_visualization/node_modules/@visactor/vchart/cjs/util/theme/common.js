"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getThemeObject = void 0;

const theme_1 = require("../../theme"), vutils_1 = require("@visactor/vutils");

function getThemeObject(theme, transformed) {
    return (0, vutils_1.isString)(theme) ? theme_1.ThemeManager.themeExist(theme) ? theme_1.ThemeManager.getTheme(theme, transformed) : {} : (0, 
    vutils_1.isObject)(theme) ? theme : {};
}

exports.getThemeObject = getThemeObject;
//# sourceMappingURL=common.js.map
