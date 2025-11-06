import { ContainerModule, GraphicRender } from "@visactor/vrender-core";

import { DefaultCanvasLottieRender } from "./lottie-render";

let loadLottieModule = !1;

export const lottieModule = new ContainerModule((bind => {
    loadLottieModule || (loadLottieModule = !0, bind(DefaultCanvasLottieRender).toSelf().inSingletonScope(), 
    bind(GraphicRender).toService(DefaultCanvasLottieRender));
}));
//# sourceMappingURL=lottie-module.js.map
