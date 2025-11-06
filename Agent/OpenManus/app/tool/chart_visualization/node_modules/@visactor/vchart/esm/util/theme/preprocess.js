import { isPlainObject } from "@visactor/vutils";

import { getActualColor, isColorKey } from "../../theme/color-scheme/util";

import { isTokenKey, queryToken } from "../../theme/token";

const IGNORE_KEYS = [ "animationThreshold", "colorScheme", "name", "padding" ];

export function preprocessTheme(obj, colorScheme, tokenMap, seriesSpec) {
    if (!obj) return obj;
    colorScheme || (colorScheme = obj.colorScheme), tokenMap || (tokenMap = obj.token);
    const newObj = {};
    return Object.keys(obj).forEach((key => {
        const value = obj[key];
        IGNORE_KEYS.includes(key) ? newObj[key] = value : isPlainObject(value) ? isColorKey(value) ? newObj[key] = getActualColor(value, colorScheme, seriesSpec) : isTokenKey(value) ? newObj[key] = queryToken(tokenMap, value) : newObj[key] = preprocessTheme(value, colorScheme, tokenMap, seriesSpec) : newObj[key] = value;
    })), newObj;
}
//# sourceMappingURL=preprocess.js.map
