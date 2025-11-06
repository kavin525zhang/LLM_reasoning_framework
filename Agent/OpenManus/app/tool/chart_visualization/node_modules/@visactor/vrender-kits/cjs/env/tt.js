"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.initTTEnv = exports.loadTTEnv = exports.ttEnvModule = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), modules_1 = require("../canvas/contributions/tt/modules"), tt_contribution_1 = require("../window/contributions/tt-contribution"), math_module_1 = require("../picker/math-module"), tt_contribution_2 = require("./contributions/tt-contribution");

function loadTTEnv(container, loadPicker = !0) {
    loadTTEnv.__loaded || (loadTTEnv.__loaded = !0, container.load(exports.ttEnvModule), 
    container.load(modules_1.ttCanvasModule), container.load(tt_contribution_1.ttWindowModule), 
    loadPicker && (0, math_module_1.loadMathPicker)(container));
}

function initTTEnv() {
    loadTTEnv(vrender_core_1.container);
}

exports.ttEnvModule = new vrender_core_1.ContainerModule((bind => {
    exports.ttEnvModule.isTTBound || (exports.ttEnvModule.isTTBound = !0, bind(tt_contribution_2.TTEnvContribution).toSelf().inSingletonScope(), 
    bind(vrender_core_1.EnvContribution).toService(tt_contribution_2.TTEnvContribution));
})), exports.ttEnvModule.isTTBound = !1, exports.loadTTEnv = loadTTEnv, loadTTEnv.__loaded = !1, 
exports.initTTEnv = initTTEnv;
//# sourceMappingURL=tt.js.map