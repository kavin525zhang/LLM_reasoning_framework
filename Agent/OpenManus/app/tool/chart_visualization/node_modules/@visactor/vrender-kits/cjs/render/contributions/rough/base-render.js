"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.RoughBaseRender = void 0;

class RoughBaseRender {
    drawShape(graphic, ctx, x, y, drawContext, params, fillCb, strokeCb) {
        if (this.canvasRenderer.drawShape) return this.canvasRenderer.drawShape(graphic, ctx, x, y, drawContext, params, fillCb, strokeCb);
    }
}

exports.RoughBaseRender = RoughBaseRender;
//# sourceMappingURL=base-render.js.map
