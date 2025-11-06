"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.gifImageCanvasPickModule = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), constants_1 = require("../constants"), gif_image_picker_1 = require("./gif-image-picker");

let loadGifImagePick = !1;

exports.gifImageCanvasPickModule = new vrender_core_1.ContainerModule(((bind, unbind, isBound, rebind) => {
    loadGifImagePick || (loadGifImagePick = !0, bind(constants_1.CanvasGifImagePicker).to(gif_image_picker_1.DefaultCanvasGifImagePicker).inSingletonScope(), 
    bind(constants_1.CanvasPickerContribution).toService(constants_1.CanvasGifImagePicker));
}));
//# sourceMappingURL=gif-image-module.js.map
