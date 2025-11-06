"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.initHarmonyEnv = exports.loadHarmonyEnv = exports.harmonyEnvModule = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), math_module_1 = require("../picker/math-module"), harmony_contribution_1 = require("../window/contributions/harmony-contribution"), modules_1 = require("../canvas/contributions/harmony/modules"), harmony_contribution_2 = require("./contributions/harmony-contribution");

function loadHarmonyEnv(container, loadPicker = !0) {
    loadHarmonyEnv.__loaded || (loadHarmonyEnv.__loaded = !0, container.load(exports.harmonyEnvModule), 
    container.load(modules_1.harmonyCanvasModule), container.load(harmony_contribution_1.harmonyWindowModule), 
    loadPicker && (0, math_module_1.loadMathPicker)(container));
}

function initHarmonyEnv() {
    loadHarmonyEnv(vrender_core_1.container);
}

exports.harmonyEnvModule = new vrender_core_1.ContainerModule((bind => {
    exports.harmonyEnvModule.isHarmonyBound || (exports.harmonyEnvModule.isHarmonyBound = !0, 
    bind(harmony_contribution_2.HarmonyEnvContribution).toSelf().inSingletonScope(), 
    bind(vrender_core_1.EnvContribution).toService(harmony_contribution_2.HarmonyEnvContribution));
})), exports.harmonyEnvModule.isHarmonyBound = !1, exports.loadHarmonyEnv = loadHarmonyEnv, 
loadHarmonyEnv.__loaded = !1, exports.initHarmonyEnv = initHarmonyEnv;
//# sourceMappingURL=harmony.js.map