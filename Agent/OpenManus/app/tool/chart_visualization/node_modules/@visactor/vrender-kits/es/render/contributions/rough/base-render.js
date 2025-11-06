export class RoughBaseRender {
    drawShape(graphic, ctx, x, y, drawContext, params, fillCb, strokeCb) {
        if (this.canvasRenderer.drawShape) return this.canvasRenderer.drawShape(graphic, ctx, x, y, drawContext, params, fillCb, strokeCb);
    }
}
//# sourceMappingURL=base-render.js.map
