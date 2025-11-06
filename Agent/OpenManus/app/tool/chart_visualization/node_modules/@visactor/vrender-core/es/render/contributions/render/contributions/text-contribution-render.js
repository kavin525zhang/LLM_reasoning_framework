import { isObject } from "@visactor/vutils";

import { BaseRenderContributionTime } from "../../../../common/enums";

import { DefaultBaseBackgroundRenderContribution } from "./base-contribution-render";

import { boundsAllocate } from "../../../../allocator/bounds-allocate";

import { getTextBounds } from "../../../../graphic/bounds";

import { createRectPath } from "../../../../common/shape/rect";

export class DefaultTextBackgroundRenderContribution extends DefaultBaseBackgroundRenderContribution {
    constructor() {
        super(...arguments), this.time = BaseRenderContributionTime.beforeFillStroke;
    }
    drawShape(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb) {
        var _a, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const {backgroundMode: backgroundMode = graphicAttribute.backgroundMode, backgroundFit: backgroundFit = graphicAttribute.backgroundFit, backgroundKeepAspectRatio: backgroundKeepAspectRatio = graphicAttribute.backgroundKeepAspectRatio} = graphic.attribute;
        let matrix, {background: background} = graphic.attribute;
        if (!background) return;
        const restore = () => {
            "richtext" === graphic.type && (context.restore(), context.save(), matrix && context.setTransformFromMatrix(matrix, !0, 1));
        };
        let b;
        "richtext" === graphic.type && (matrix = context.currentMatrix.clone(), context.restore(), 
        context.save(), context.setTransformForCurrent());
        const shouldReCalBounds = isObject(background) && background.background, onlyTranslate = graphic.transMatrix.onlyTranslate();
        if (shouldReCalBounds) {
            const _b = graphic.AABBBounds, x = (null !== (_a = background.x) && void 0 !== _a ? _a : _b.x1) + (null !== (_c = background.dx) && void 0 !== _c ? _c : 0), y = (null !== (_d = background.y) && void 0 !== _d ? _d : _b.y1) + (null !== (_e = background.dy) && void 0 !== _e ? _e : 0), w = null !== (_f = background.width) && void 0 !== _f ? _f : _b.width(), h = null !== (_g = background.height) && void 0 !== _g ? _g : _b.height();
            if (b = boundsAllocate.allocate(x, y, x + w, y + h), background = background.background, 
            !onlyTranslate) {
                const w = b.width(), h = b.height();
                b.set((null !== (_h = background.x) && void 0 !== _h ? _h : 0) + (null !== (_j = background.dx) && void 0 !== _j ? _j : 0), (null !== (_k = background.y) && void 0 !== _k ? _k : 0) + (null !== (_l = background.dy) && void 0 !== _l ? _l : 0), w, h);
            }
        } else b = graphic.AABBBounds, onlyTranslate || (b = getTextBounds(Object.assign(Object.assign({}, graphic.attribute), {
            angle: 0,
            scaleX: 1,
            scaleY: 1,
            x: 0,
            y: 0,
            dx: 0,
            dy: 0
        })).clone());
        if (graphic.backgroundImg && graphic.resources) {
            const res = graphic.resources.get(background);
            if ("success" !== res.state || !res.data) return void restore();
            context.highPerformanceSave(), onlyTranslate && context.setTransformFromMatrix(graphic.parent.globalTransMatrix, !0), 
            context.setCommonStyle(graphic, graphic.attribute, x, y, graphicAttribute), this.doDrawImage(context, res.data, b, {
                backgroundMode: backgroundMode,
                backgroundFit: backgroundFit,
                backgroundKeepAspectRatio: backgroundKeepAspectRatio
            }), context.highPerformanceRestore(), context.setTransformForCurrent();
        } else {
            const {backgroundCornerRadius: backgroundCornerRadius} = graphic.attribute;
            context.highPerformanceSave(), context.setCommonStyle(graphic, graphic.attribute, x, y, graphicAttribute), 
            context.fillStyle = background, backgroundCornerRadius ? (createRectPath(context, b.x1, b.y1, b.width(), b.height(), backgroundCornerRadius, !0), 
            context.fill()) : context.fillRect(b.x1, b.y1, b.width(), b.height()), context.highPerformanceRestore();
        }
        shouldReCalBounds && boundsAllocate.free(b), restore();
    }
}

export const defaultTextBackgroundRenderContribution = new DefaultTextBackgroundRenderContribution;
//# sourceMappingURL=text-contribution-render.js.map
