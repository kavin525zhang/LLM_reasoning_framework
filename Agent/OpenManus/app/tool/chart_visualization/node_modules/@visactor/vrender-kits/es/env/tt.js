import { container, ContainerModule, EnvContribution } from "@visactor/vrender-core";

import { ttCanvasModule } from "../canvas/contributions/tt/modules";

import { ttWindowModule } from "../window/contributions/tt-contribution";

import { loadMathPicker } from "../picker/math-module";

import { TTEnvContribution } from "./contributions/tt-contribution";

export const ttEnvModule = new ContainerModule((bind => {
    ttEnvModule.isTTBound || (ttEnvModule.isTTBound = !0, bind(TTEnvContribution).toSelf().inSingletonScope(), 
    bind(EnvContribution).toService(TTEnvContribution));
}));

ttEnvModule.isTTBound = !1;

export function loadTTEnv(container, loadPicker = !0) {
    loadTTEnv.__loaded || (loadTTEnv.__loaded = !0, container.load(ttEnvModule), container.load(ttCanvasModule), 
    container.load(ttWindowModule), loadPicker && loadMathPicker(container));
}

loadTTEnv.__loaded = !1;

export function initTTEnv() {
    loadTTEnv(container);
}
//# sourceMappingURL=tt.js.map