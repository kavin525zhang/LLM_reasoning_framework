"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.lottieCanvasPickModule = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), constants_1 = require("../constants"), lottie_picker_1 = require("./lottie-picker");

let loadLottiePick = !1;

exports.lottieCanvasPickModule = new vrender_core_1.ContainerModule(((bind, unbind, isBound, rebind) => {
    loadLottiePick || (loadLottiePick = !0, bind(constants_1.CanvasLottiePicker).to(lottie_picker_1.DefaultCanvasLottiePicker).inSingletonScope(), 
    bind(constants_1.CanvasPickerContribution).toService(constants_1.CanvasLottiePicker));
}));
//# sourceMappingURL=lottie-module.js.map
