import { ThemeManager } from "../../theme";

import { isObject, isString } from "@visactor/vutils";

export function getThemeObject(theme, transformed) {
    return isString(theme) ? ThemeManager.themeExist(theme) ? ThemeManager.getTheme(theme, transformed) : {} : isObject(theme) ? theme : {};
}
//# sourceMappingURL=common.js.map
