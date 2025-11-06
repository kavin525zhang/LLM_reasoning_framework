import { merge } from "@visactor/vutils";

import { DEFAULT_THEME, theme } from "./theme";

import { registerGroup, registerRect, registerSymbol, registerText } from "@visactor/vrender-kits";

export function loadPoptipComponent() {
    registerGroup(), registerText(), registerSymbol(), registerRect();
}

export function setPoptipTheme(defaultPoptipTheme) {
    merge(theme.poptip, DEFAULT_THEME, defaultPoptipTheme);
}
//# sourceMappingURL=register.js.map
