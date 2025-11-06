"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.lottieModule = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), lottie_render_1 = require("./lottie-render");

let loadLottieModule = !1;

exports.lottieModule = new vrender_core_1.ContainerModule((bind => {
    loadLottieModule || (loadLottieModule = !0, bind(lottie_render_1.DefaultCanvasLottieRender).toSelf().inSingletonScope(), 
    bind(vrender_core_1.GraphicRender).toService(lottie_render_1.DefaultCanvasLottieRender));
}));
//# sourceMappingURL=lottie-module.js.map
