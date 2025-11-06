import { canvasAllocate } from "../../../../allocator/canvas-allocate";

import { BaseRenderContributionTime } from "../../../../common/enums";

import { createSymbol } from "../../../../graphic";

import { pi2 } from "@visactor/vutils";

function formatRatio(ratio) {
    return ratio <= .5 ? 4 * ratio - 1 : -4 * ratio + 3;
}

function drawWave(ctx, ratio, boundsWidth, boundsHeight, textureOptions, offsetX, offsetY) {
    const {fill: fill = "orange", percent: percent = .6, frequency: frequency = 4, opacity: opacity, phi: phi = 0} = textureOptions;
    let {amplitude: amplitude = 10} = textureOptions;
    amplitude *= formatRatio(ratio);
    const height = boundsHeight * (1 - percent), width = boundsWidth, step = Math.max(Math.round(width / 70), 2);
    ctx.beginPath(), ctx.moveTo(0 + offsetX, boundsHeight + offsetY), ctx.lineTo(0 + offsetX, height + offsetY);
    const delta = width / frequency * ratio, c = width / Math.PI / (2 * frequency);
    for (let i = 0; i < width; i += step) {
        const y = amplitude * Math.sin((i + delta + phi) / c + phi);
        ctx.lineTo(i + offsetX, height + y + offsetY);
    }
    ctx.lineTo(width + offsetX, boundsHeight + offsetY), ctx.closePath(), ctx.fillStyle = fill, 
    isFinite(opacity) && (ctx.globalAlpha = opacity), ctx.fill();
}

export class DefaultBaseTextureRenderContribution {
    constructor() {
        this.time = BaseRenderContributionTime.afterFillStroke, this.useStyle = !0, this.order = 10, 
        this._tempSymbolGraphic = null;
    }
    createCommonPattern(size, padding, color, targetContext, cb) {
        const r = (size - 2 * padding) / 2, dpr = targetContext.dpr, canvas = canvasAllocate.allocate({
            width: size,
            height: size,
            dpr: dpr
        }), ctx = canvas.getContext("2d");
        if (!ctx) return null;
        ctx.inuse = !0, ctx.clearMatrix(), ctx.setTransformForCurrent(!0), ctx.clearRect(0, 0, size, size), 
        cb(r, ctx);
        const pattern = targetContext.createPattern(canvas.nativeCanvas, "repeat");
        return pattern.setTransform && pattern.setTransform(new DOMMatrix([ 1 / dpr, 0, 0, 1 / dpr, 0, 0 ])), 
        canvasAllocate.free(canvas), pattern;
    }
    createCirclePattern(size, padding, color, targetContext) {
        return this.createCommonPattern(size, padding, color, targetContext, ((r, ctx) => {
            ctx.fillStyle = color, ctx.arc(r, r, r, 0, pi2), ctx.fill();
        }));
    }
    createDiamondPattern(size, padding, color, targetContext) {
        return this.createCommonPattern(size, padding, color, targetContext, ((r, ctx) => {
            const x = size / 2, y = x;
            ctx.fillStyle = color, ctx.moveTo(x, y - r), ctx.lineTo(r + x, y), ctx.lineTo(x, y + r), 
            ctx.lineTo(x - r, y), ctx.closePath(), ctx.fill();
        }));
    }
    createRectPattern(size, padding, color, targetContext) {
        return this.createCommonPattern(size, padding, color, targetContext, ((r, ctx) => {
            const x = padding, y = x;
            ctx.fillStyle = color, ctx.fillRect(x, y, 2 * r, 2 * r);
        }));
    }
    createVerticalLinePattern(size, padding, color, targetContext) {
        return this.createCommonPattern(size, padding, color, targetContext, ((r, ctx) => {
            const x = padding;
            ctx.fillStyle = color, ctx.fillRect(x, 0, 2 * r, size);
        }));
    }
    createHorizontalLinePattern(size, padding, color, targetContext) {
        return this.createCommonPattern(size, padding, color, targetContext, ((r, ctx) => {
            const y = padding;
            ctx.fillStyle = color, ctx.fillRect(0, y, size, 2 * r);
        }));
    }
    createBiasLRLinePattern(size, padding, color, targetContext) {
        return this.createCommonPattern(size, padding, color, targetContext, ((r, ctx) => {
            ctx.strokeStyle = color, ctx.lineWidth = r, ctx.moveTo(0, 0), ctx.lineTo(size, size);
            const dx = size / 2, dy = -dx;
            ctx.moveTo(dx, dy), ctx.lineTo(dx + size, dy + size), ctx.moveTo(-dx, -dy), ctx.lineTo(-dx + size, -dy + size), 
            ctx.stroke();
        }));
    }
    createBiasRLLinePattern(size, padding, color, targetContext) {
        return this.createCommonPattern(size, padding, color, targetContext, ((r, ctx) => {
            ctx.strokeStyle = color, ctx.lineWidth = r, ctx.moveTo(size, 0), ctx.lineTo(0, size);
            const dx = size / 2, dy = dx;
            ctx.moveTo(size + dx, dy), ctx.lineTo(dx, dy + size), ctx.moveTo(size - dx, -dy), 
            ctx.lineTo(-dx, -dy + size), ctx.stroke();
        }));
    }
    createGridPattern(size, padding, color, targetContext) {
        return this.createCommonPattern(size, padding, color, targetContext, ((r, ctx) => {
            const x = padding, y = x;
            ctx.fillStyle = color, ctx.fillRect(x, y, r, r), ctx.fillRect(x + r, y + r, r, r);
        }));
    }
    initTextureMap(ctx, stage) {
        this.textureMap = new Map;
    }
    drawShape(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb, options) {
        this.textureMap || this.initTextureMap(context, graphic.stage);
        const {texture: texture = graphicAttribute.texture, textureColor: textureColor = graphicAttribute.textureColor, textureSize: textureSize = graphicAttribute.textureSize, texturePadding: texturePadding = graphicAttribute.texturePadding} = graphic.attribute;
        texture && this.drawTexture(texture, graphic, context, x, y, graphicAttribute, textureColor, textureSize, texturePadding);
    }
    drawTexture(texture, graphic, context, x, y, graphicAttribute, textureColor, textureSize, texturePadding) {
        var _a;
        const {textureRatio: textureRatio = graphicAttribute.textureRatio, textureOptions: textureOptions = null} = graphic.attribute;
        let pattern = this.textureMap.get(texture);
        if (!pattern) switch (texture) {
          case "circle":
            pattern = this.createCirclePattern(textureSize, texturePadding, textureColor, context);
            break;

          case "diamond":
            pattern = this.createDiamondPattern(textureSize, texturePadding, textureColor, context);
            break;

          case "rect":
            pattern = this.createRectPattern(textureSize, texturePadding, textureColor, context);
            break;

          case "vertical-line":
            pattern = this.createVerticalLinePattern(textureSize, texturePadding, textureColor, context);
            break;

          case "horizontal-line":
            pattern = this.createHorizontalLinePattern(textureSize, texturePadding, textureColor, context);
            break;

          case "bias-lr":
            pattern = this.createBiasLRLinePattern(textureSize, texturePadding, textureColor, context);
            break;

          case "bias-rl":
            pattern = this.createBiasRLLinePattern(textureSize, texturePadding, textureColor, context);
            break;

          case "grid":
            pattern = this.createGridPattern(textureSize, texturePadding, textureColor, context);
        }
        if (textureOptions && textureOptions.dynamicTexture) {
            const {gridConfig: gridConfig = {}, useNewCanvas: useNewCanvas} = textureOptions, b = graphic.AABBBounds;
            x = b.x1, y = b.y1;
            const originalContext = context;
            let newCanvas;
            if (useNewCanvas) {
                newCanvas = canvasAllocate.allocate({
                    width: b.width(),
                    height: b.height(),
                    dpr: context.dpr
                });
                const ctx = newCanvas.getContext("2d");
                ctx.clearRect(0, 0, b.width(), b.height()), x = 0, y = 0, context = ctx;
            }
            if (originalContext.save(), graphic.parent && !graphic.transMatrix.onlyTranslate()) {
                const {scrollX: scrollX = 0, scrollY: scrollY = 0} = graphic.parent.attribute;
                originalContext.setTransformFromMatrix(graphic.parent.globalTransMatrix), originalContext.translate(scrollX, scrollY, !0);
            }
            originalContext.setCommonStyle(graphic, graphic.attribute, x, y, graphicAttribute), 
            originalContext.clip();
            const width = b.width(), height = b.height(), padding = texturePadding, cellSize = textureSize, gridColumns = gridConfig.columns ? gridConfig.columns : Math.ceil(width / cellSize), gridRows = gridConfig.rows ? gridConfig.rows : Math.ceil(height / cellSize), gutterColumn = gridConfig.gutterColumn ? gridConfig.gutterColumn : 2 * padding, gutterRow = gridConfig.gutterRow ? gridConfig.gutterRow : 2 * padding;
            this._tempSymbolGraphic || (this._tempSymbolGraphic = createSymbol({}));
            const sizeW = gridConfig.columns ? width / gridConfig.columns : cellSize, sizeH = gridConfig.rows ? height / gridConfig.rows : cellSize;
            this._tempSymbolGraphic.setAttributes({
                size: [ sizeW - gutterColumn, sizeH - gutterRow ],
                symbolType: texture
            });
            const parsedPath = this._tempSymbolGraphic.getParsedPath();
            for (let i = 0; i < gridRows; i++) for (let j = 0; j < gridColumns; j++) {
                const _x = x + cellSize / 2 + j * cellSize, _y = y + cellSize / 2 + i * cellSize;
                null === (_a = textureOptions.beforeDynamicTexture) || void 0 === _a || _a.call(textureOptions, context, i, j, gridRows, gridColumns, textureRatio, graphic, b.width(), b.height()), 
                context.beginPath(), !1 === parsedPath.draw(context, Math.min(sizeW - gutterColumn, sizeH - gutterRow), _x, _y, 0) && context.closePath(), 
                context.fillStyle = textureColor, textureOptions.dynamicTexture(context, i, j, gridRows, gridColumns, textureRatio, graphic, b.width(), b.height());
            }
            useNewCanvas && (originalContext.globalAlpha = 1, originalContext.drawImage(newCanvas.nativeCanvas, 0, 0, newCanvas.nativeCanvas.width, newCanvas.nativeCanvas.height, b.x1, b.y1, b.width() * originalContext.dpr, b.height() * originalContext.dpr)), 
            originalContext.restore();
        } else if (pattern) context.highPerformanceSave(), context.setCommonStyle(graphic, graphic.attribute, x, y, graphicAttribute), 
        context.fillStyle = pattern, context.fill(), context.highPerformanceRestore(); else if ("wave" === texture) {
            context.save(), context.setCommonStyle(graphic, graphic.attribute, x, y, graphicAttribute), 
            context.clip();
            const b = graphic.AABBBounds;
            drawWave(context, textureRatio, b.width(), b.height(), Object.assign(Object.assign({}, textureOptions || {}), {
                fill: textureColor
            }), x + b.x1 - x, y + b.y1 - y), context.restore();
        }
    }
}

export const defaultBaseTextureRenderContribution = new DefaultBaseTextureRenderContribution;
//# sourceMappingURL=base-texture-contribution-render.js.map
