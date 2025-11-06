import { getScaledStroke } from "../../../../common/canvas-utils";

import { defaultBaseBackgroundRenderContribution } from "./base-contribution-render";

import { BaseRenderContributionTime } from "../../../../common/enums";

import { defaultBaseTextureRenderContribution } from "./base-texture-contribution-render";

export class DefaultSymbolRenderContribution {
    constructor() {
        this.time = BaseRenderContributionTime.afterFillStroke, this.useStyle = !0, this.order = 0;
    }
    drawShape(symbol, context, x, y, doFill, doStroke, fVisible, sVisible, symbolAttribute, drawContext, fillCb, strokeCb) {
        const parsedPath = symbol.getParsedPath();
        if (!parsedPath) return;
        const {outerBorder: outerBorder, innerBorder: innerBorder} = symbol.attribute, doOuterBorder = outerBorder && !1 !== outerBorder.visible, doInnerBorder = innerBorder && !1 !== innerBorder.visible;
        if (!doOuterBorder && !doInnerBorder) return;
        const {size: size = symbolAttribute.size, opacity: opacity = symbolAttribute.opacity, x: originX = symbolAttribute.x, y: originY = symbolAttribute.y, scaleX: scaleX = symbolAttribute.scaleX, scaleY: scaleY = symbolAttribute.scaleY, keepStrokeScale: keepStrokeScale = symbolAttribute.keepStrokeScale} = symbol.attribute, renderBorder = (borderStyle, key) => {
            const doStroke = !(!borderStyle || !borderStyle.stroke), {distance: distance = symbolAttribute[key].distance} = borderStyle, d = keepStrokeScale ? distance : getScaledStroke(context, distance, context.dpr), sign = "outerBorder" === key ? 1 : -1;
            if (context.beginPath(), !1 === parsedPath.drawOffset(context, size, x, y, sign * d) && context.closePath(), 
            context.setShadowBlendStyle && context.setShadowBlendStyle(symbol, symbol.attribute, symbolAttribute), 
            strokeCb) strokeCb(context, borderStyle, symbolAttribute[key]); else if (doStroke) {
                const lastOpacity = symbolAttribute[key].opacity;
                symbolAttribute[key].opacity = opacity, context.setStrokeStyle(symbol, borderStyle, (originX - x) / scaleX, (originY - y) / scaleY, symbolAttribute[key]), 
                symbolAttribute[key].opacity = lastOpacity, context.stroke();
            }
        };
        doOuterBorder && renderBorder(outerBorder, "outerBorder"), doInnerBorder && renderBorder(innerBorder, "innerBorder");
    }
}

export class DefaultSymbolClipRangeStrokeRenderContribution {
    constructor() {
        this.time = BaseRenderContributionTime.afterFillStroke, this.useStyle = !0, this.order = 0;
    }
    drawShape(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb, options) {
        const {clipRange: clipRange = graphicAttribute.clipRange, x: originX = graphicAttribute.x, y: originY = graphicAttribute.y, z: z = graphicAttribute.z, size: size = graphicAttribute.size, scaleX: scaleX = graphicAttribute.scaleX, scaleY: scaleY = graphicAttribute.scaleY} = graphic.attribute, parsedPath = graphic.getParsedPath();
        if (!(parsedPath && clipRange < 1 && clipRange > 0)) return;
        context.beginPath(), parsedPath.drawWithClipRange && parsedPath.drawWithClipRange(context, size, x, y, clipRange, z, ((p, a) => {
            var _a, _b, _c, _d;
            if (graphic._parsedPath.svgCache) {
                const obj = Object.assign({}, a);
                obj.fill = null !== (_a = a.fill) && void 0 !== _a ? _a : graphic.attribute.fill, 
                obj.opacity = null !== (_b = a.opacity) && void 0 !== _b ? _b : graphic.attribute.opacity, 
                obj.fillOpacity = graphic.attribute.fillOpacity, obj.stroke = null !== (_c = a.stroke) && void 0 !== _c ? _c : graphic.attribute.stroke, 
                obj.lineWidth = null !== (_d = a.lineWidth) && void 0 !== _d ? _d : graphic.attribute.lineWidth, 
                a = obj;
            }
            a.stroke && (strokeCb ? strokeCb(context, graphic.attribute, graphicAttribute) : sVisible && (context.setStrokeStyle(graphic, a, (originX - x) / scaleX, (originY - y) / scaleY, graphicAttribute), 
            context.stroke()));
        })), doStroke && !parsedPath.isSvg && (strokeCb ? strokeCb(context, graphic.attribute, graphicAttribute) : sVisible && (context.setStrokeStyle(graphic, graphic.attribute, (originX - x) / scaleX, (originY - y) / scaleY, graphicAttribute), 
        context.stroke()));
    }
}

export const defaultSymbolRenderContribution = new DefaultSymbolRenderContribution;

export const defaultSymbolClipRangeStrokeRenderContribution = new DefaultSymbolClipRangeStrokeRenderContribution;

export const defaultSymbolTextureRenderContribution = defaultBaseTextureRenderContribution;

export const defaultSymbolBackgroundRenderContribution = defaultBaseBackgroundRenderContribution;
//# sourceMappingURL=symbol-contribution-render.js.map
