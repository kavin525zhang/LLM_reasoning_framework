import { colorScheme } from "./color-scheme";

import { series } from "../common/series";

import { markByName, markByType } from "../common/mark";

import { component } from "../common/component";

import { token } from "../../token";

export const lightTheme = {
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
    colorScheme: colorScheme,
    token: token,
    mark: markByType,
    markByName: markByName,
    series: series,
    component: component,
    animationThreshold: 2e3
};
//# sourceMappingURL=index.js.map
