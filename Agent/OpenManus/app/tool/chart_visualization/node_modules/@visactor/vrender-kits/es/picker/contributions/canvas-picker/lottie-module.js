import { ContainerModule } from "@visactor/vrender-core";

import { CanvasLottiePicker, CanvasPickerContribution } from "../constants";

import { DefaultCanvasLottiePicker } from "./lottie-picker";

let loadLottiePick = !1;

export const lottieCanvasPickModule = new ContainerModule(((bind, unbind, isBound, rebind) => {
    loadLottiePick || (loadLottiePick = !0, bind(CanvasLottiePicker).to(DefaultCanvasLottiePicker).inSingletonScope(), 
    bind(CanvasPickerContribution).toService(CanvasLottiePicker));
}));
//# sourceMappingURL=lottie-module.js.map
