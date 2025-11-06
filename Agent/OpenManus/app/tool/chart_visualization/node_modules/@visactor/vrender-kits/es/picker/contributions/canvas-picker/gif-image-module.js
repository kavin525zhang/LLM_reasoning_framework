import { ContainerModule } from "@visactor/vrender-core";

import { CanvasGifImagePicker, CanvasPickerContribution } from "../constants";

import { DefaultCanvasGifImagePicker } from "./gif-image-picker";

let loadGifImagePick = !1;

export const gifImageCanvasPickModule = new ContainerModule(((bind, unbind, isBound, rebind) => {
    loadGifImagePick || (loadGifImagePick = !0, bind(CanvasGifImagePicker).to(DefaultCanvasGifImagePicker).inSingletonScope(), 
    bind(CanvasPickerContribution).toService(CanvasGifImagePicker));
}));
//# sourceMappingURL=gif-image-module.js.map
