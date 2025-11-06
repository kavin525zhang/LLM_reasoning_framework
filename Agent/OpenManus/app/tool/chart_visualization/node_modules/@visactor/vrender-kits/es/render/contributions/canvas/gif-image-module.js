import { ContainerModule, GraphicRender } from "@visactor/vrender-core";

import { DefaultCanvasGifImageRender } from "./gif-image-render";

let loadGifImageModule = !1;

export const gifImageModule = new ContainerModule((bind => {
    loadGifImageModule || (loadGifImageModule = !0, bind(DefaultCanvasGifImageRender).toSelf().inSingletonScope(), 
    bind(GraphicRender).toService(DefaultCanvasGifImageRender));
}));
//# sourceMappingURL=gif-image-module.js.map
