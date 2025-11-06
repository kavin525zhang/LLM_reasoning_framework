import { container, ContainerModule, EnvContribution } from "@visactor/vrender-core";

import { loadMathPicker } from "../picker/math-module";

import { harmonyWindowModule } from "../window/contributions/harmony-contribution";

import { harmonyCanvasModule } from "../canvas/contributions/harmony/modules";

import { HarmonyEnvContribution } from "./contributions/harmony-contribution";

export const harmonyEnvModule = new ContainerModule((bind => {
    harmonyEnvModule.isHarmonyBound || (harmonyEnvModule.isHarmonyBound = !0, bind(HarmonyEnvContribution).toSelf().inSingletonScope(), 
    bind(EnvContribution).toService(HarmonyEnvContribution));
}));

harmonyEnvModule.isHarmonyBound = !1;

export function loadHarmonyEnv(container, loadPicker = !0) {
    loadHarmonyEnv.__loaded || (loadHarmonyEnv.__loaded = !0, container.load(harmonyEnvModule), 
    container.load(harmonyCanvasModule), container.load(harmonyWindowModule), loadPicker && loadMathPicker(container));
}

loadHarmonyEnv.__loaded = !1;

export function initHarmonyEnv() {
    loadHarmonyEnv(container);
}
//# sourceMappingURL=harmony.js.map