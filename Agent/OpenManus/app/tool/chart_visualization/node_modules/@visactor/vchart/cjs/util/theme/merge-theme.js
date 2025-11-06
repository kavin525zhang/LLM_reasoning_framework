"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.transformSeriesThemeToMerge = exports.transformColorSchemeToMerge = exports.mergeTheme = void 0;

const vutils_1 = require("@visactor/vutils"), util_1 = require("../../theme/color-scheme/util"), vutils_extension_1 = require("@visactor/vutils-extension"), factory_1 = require("../../core/factory");

function mergeTheme(target, ...sources) {
    return (0, vutils_extension_1.mergeSpec)(transformThemeToMerge(target), ...sources.map(transformThemeToMerge));
}

function transformThemeToMerge(theme) {
    var _a;
    if (!theme) return theme;
    const colorScheme = transformColorSchemeToMerge(theme.colorScheme);
    return Object.assign({}, theme, {
        colorScheme: colorScheme,
        token: null !== (_a = theme.token) && void 0 !== _a ? _a : {},
        series: Object.assign({}, theme.series)
    });
}

function transformColorSchemeToMerge(colorScheme) {
    return colorScheme && (colorScheme = Object.keys(colorScheme).reduce(((scheme, key) => {
        const value = colorScheme[key];
        return scheme[key] = (0, util_1.transformColorSchemeToStandardStruct)(value), scheme;
    }), {})), colorScheme;
}

function transformSeriesThemeToMerge(seriesTheme, seriesType, markByType, markByName) {
    const seriesMarkInfoMap = factory_1.Factory.getSeriesMarkMap(seriesType);
    if (!seriesMarkInfoMap) return seriesTheme;
    const newTheme = {};
    return Object.values(seriesMarkInfoMap).forEach((({type: type, name: name}) => {
        newTheme[name] = (0, vutils_extension_1.mergeSpec)({}, null == markByType ? void 0 : markByType[(0, 
        vutils_1.array)(type)[0]], null == markByName ? void 0 : markByName[name], null == seriesTheme ? void 0 : seriesTheme[name]);
    })), Object.assign(Object.assign({}, seriesTheme), newTheme);
}

exports.mergeTheme = mergeTheme, exports.transformColorSchemeToMerge = transformColorSchemeToMerge, 
exports.transformSeriesThemeToMerge = transformSeriesThemeToMerge;
//# sourceMappingURL=merge-theme.js.map
