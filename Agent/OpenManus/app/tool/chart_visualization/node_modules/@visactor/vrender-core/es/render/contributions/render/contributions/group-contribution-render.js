import { DefaultBaseBackgroundRenderContribution } from "./base-contribution-render";

import { BaseRenderContributionTime } from "../../../../common/enums";

export class DefaultGroupBackgroundRenderContribution extends DefaultBaseBackgroundRenderContribution {
    constructor() {
        super(...arguments), this.time = BaseRenderContributionTime.beforeFillStroke;
    }
    drawShape(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb) {
        const {background: background, backgroundMode: backgroundMode = graphicAttribute.backgroundMode, backgroundFit: backgroundFit = graphicAttribute.backgroundFit, backgroundKeepAspectRatio: backgroundKeepAspectRatio = graphicAttribute.backgroundKeepAspectRatio, backgroundScale: backgroundScale = graphicAttribute.backgroundScale, backgroundOffsetX: backgroundOffsetX = graphicAttribute.backgroundOffsetX, backgroundOffsetY: backgroundOffsetY = graphicAttribute.backgroundOffsetY} = graphic.attribute;
        if (background) if (graphic.backgroundImg && graphic.resources) {
            const res = graphic.resources.get(background);
            if ("success" !== res.state || !res.data) return;
            context.highPerformanceSave(), context.setTransformFromMatrix(graphic.parent.globalTransMatrix, !0);
            const b = graphic.AABBBounds;
            this.doDrawImage(context, res.data, b, {
                backgroundMode: backgroundMode,
                backgroundFit: backgroundFit,
                backgroundKeepAspectRatio: backgroundKeepAspectRatio,
                backgroundScale: backgroundScale,
                backgroundOffsetX: backgroundOffsetX,
                backgroundOffsetY: backgroundOffsetY
            }), context.highPerformanceRestore(), context.setTransformForCurrent();
        } else context.highPerformanceSave(), context.fillStyle = background, context.fill(), 
        context.highPerformanceRestore();
    }
}

export const defaultGroupBackgroundRenderContribution = new DefaultGroupBackgroundRenderContribution;
//# sourceMappingURL=group-contribution-render.js.map
