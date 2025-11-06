"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.gifImageModule = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), gif_image_render_1 = require("./gif-image-render");

let loadGifImageModule = !1;

exports.gifImageModule = new vrender_core_1.ContainerModule((bind => {
    loadGifImageModule || (loadGifImageModule = !0, bind(gif_image_render_1.DefaultCanvasGifImageRender).toSelf().inSingletonScope(), 
    bind(vrender_core_1.GraphicRender).toService(gif_image_render_1.DefaultCanvasGifImageRender));
}));
//# sourceMappingURL=gif-image-module.js.map
