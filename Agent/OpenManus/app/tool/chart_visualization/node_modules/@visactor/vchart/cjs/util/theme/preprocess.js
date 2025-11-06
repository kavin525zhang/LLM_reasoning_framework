"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.preprocessTheme = void 0;

const vutils_1 = require("@visactor/vutils"), util_1 = require("../../theme/color-scheme/util"), token_1 = require("../../theme/token"), IGNORE_KEYS = [ "animationThreshold", "colorScheme", "name", "padding" ];

function preprocessTheme(obj, colorScheme, tokenMap, seriesSpec) {
    if (!obj) return obj;
    colorScheme || (colorScheme = obj.colorScheme), tokenMap || (tokenMap = obj.token);
    const newObj = {};
    return Object.keys(obj).forEach((key => {
        const value = obj[key];
        IGNORE_KEYS.includes(key) ? newObj[key] = value : (0, vutils_1.isPlainObject)(value) ? (0, 
        util_1.isColorKey)(value) ? newObj[key] = (0, util_1.getActualColor)(value, colorScheme, seriesSpec) : (0, 
        token_1.isTokenKey)(value) ? newObj[key] = (0, token_1.queryToken)(tokenMap, value) : newObj[key] = preprocessTheme(value, colorScheme, tokenMap, seriesSpec) : newObj[key] = value;
    })), newObj;
}

exports.preprocessTheme = preprocessTheme;
//# sourceMappingURL=preprocess.js.map
