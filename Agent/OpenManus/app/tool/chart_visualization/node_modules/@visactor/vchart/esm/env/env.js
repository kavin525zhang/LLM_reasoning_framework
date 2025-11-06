import { initAllEnv, loadBrowserEnv, loadFeishuEnv, loadLynxEnv, loadNodeEnv, loadTaroEnv, loadWxEnv, loadTTEnv, loadHarmonyEnv } from "@visactor/vrender-kits";

import { container } from "@visactor/vrender-core";

export const registerAllEnv = () => {
    initAllEnv();
};

export const registerBrowserEnv = () => {
    loadBrowserEnv(container);
};

export const registerLarkEnv = () => {
    loadFeishuEnv(container);
};

export const registerLynxEnv = () => {
    loadLynxEnv(container);
};

export const registerNodeEnv = () => {
    loadNodeEnv(container);
};

export const registerTaroEnv = () => {
    loadTaroEnv(container);
};

export const registerWXEnv = () => {
    loadWxEnv(container);
};

export const registerTTEnv = () => {
    loadTTEnv(container);
};

export const registerHarmonyEnv = () => {
    loadHarmonyEnv(container);
};
//# sourceMappingURL=env.js.map