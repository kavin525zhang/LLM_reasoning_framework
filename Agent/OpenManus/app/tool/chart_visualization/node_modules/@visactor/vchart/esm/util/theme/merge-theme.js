import { array } from "@visactor/vutils";

import { transformColorSchemeToStandardStruct } from "../../theme/color-scheme/util";

import { mergeSpec } from "@visactor/vutils-extension";

import { Factory } from "../../core/factory";

export function mergeTheme(target, ...sources) {
    return mergeSpec(transformThemeToMerge(target), ...sources.map(transformThemeToMerge));
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

export function transformColorSchemeToMerge(colorScheme) {
    return colorScheme && (colorScheme = Object.keys(colorScheme).reduce(((scheme, key) => {
        const value = colorScheme[key];
        return scheme[key] = transformColorSchemeToStandardStruct(value), scheme;
    }), {})), colorScheme;
}

export function transformSeriesThemeToMerge(seriesTheme, seriesType, markByType, markByName) {
    const seriesMarkInfoMap = Factory.getSeriesMarkMap(seriesType);
    if (!seriesMarkInfoMap) return seriesTheme;
    const newTheme = {};
    return Object.values(seriesMarkInfoMap).forEach((({type: type, name: name}) => {
        newTheme[name] = mergeSpec({}, null == markByType ? void 0 : markByType[array(type)[0]], null == markByName ? void 0 : markByName[name], null == seriesTheme ? void 0 : seriesTheme[name]);
    })), Object.assign(Object.assign({}, seriesTheme), newTheme);
}
//# sourceMappingURL=merge-theme.js.map
