import { getScaledStroke } from "../../../../common/canvas-utils";

import { defaultBaseBackgroundRenderContribution } from "./base-contribution-render";

import { drawArcPath } from "../utils";

import { BaseRenderContributionTime } from "../../../../common/enums";

import { defaultBaseTextureRenderContribution } from "./base-texture-contribution-render";

export class DefaultArcRenderContribution {
    constructor() {
        this.time = BaseRenderContributionTime.afterFillStroke, this.useStyle = !0, this.order = 0;
    }
    drawShape(arc, context, x, y, doFill, doStroke, fVisible, sVisible, arcAttribute, drawContext, fillCb, strokeCb) {
        const {outerBorder: outerBorder, innerBorder: innerBorder} = arc.attribute, doOuterBorder = outerBorder && !1 !== outerBorder.visible, doInnerBorder = innerBorder && !1 !== innerBorder.visible;
        if (!doOuterBorder && !doInnerBorder) return;
        const {innerPadding: innerPadding = arcAttribute.innerPadding, outerPadding: outerPadding = arcAttribute.outerPadding, startAngle: startAngle = arcAttribute.startAngle, endAngle: endAngle = arcAttribute.endAngle, opacity: opacity = arcAttribute.opacity, x: originX = arcAttribute.x, y: originY = arcAttribute.y, scaleX: scaleX = arcAttribute.scaleX, scaleY: scaleY = arcAttribute.scaleY, keepStrokeScale: keepStrokeScale = arcAttribute.keepStrokeScale} = arc.attribute;
        let {innerRadius: innerRadius = arcAttribute.innerRadius, outerRadius: outerRadius = arcAttribute.outerRadius} = arc.attribute;
        outerRadius += outerPadding, innerRadius -= innerPadding;
        const renderBorder = (borderStyle, key) => {
            const doStroke = !(!borderStyle || !borderStyle.stroke), {distance: distance = arcAttribute[key].distance} = borderStyle, d = keepStrokeScale ? distance : getScaledStroke(context, distance, context.dpr), deltaAngle = distance / outerRadius, sign = "outerBorder" === key ? 1 : -1;
            if (arc.setAttributes({
                outerRadius: outerRadius + sign * d,
                innerRadius: innerRadius - sign * d,
                startAngle: startAngle - sign * deltaAngle,
                endAngle: endAngle + sign * deltaAngle
            }), context.beginPath(), drawArcPath(arc, context, x, y, outerRadius + sign * d, innerRadius - sign * d), 
            context.setShadowBlendStyle && context.setShadowBlendStyle(arc, arc.attribute, arcAttribute), 
            strokeCb) strokeCb(context, borderStyle, arcAttribute[key]); else if (doStroke) {
                const lastOpacity = arcAttribute[key].opacity;
                arcAttribute[key].opacity = opacity, context.setStrokeStyle(arc, borderStyle, (originX - x) / scaleX, (originY - y) / scaleY, arcAttribute[key]), 
                arcAttribute[key].opacity = lastOpacity, context.stroke();
            }
        };
        doOuterBorder && renderBorder(outerBorder, "outerBorder"), doInnerBorder && renderBorder(innerBorder, "innerBorder"), 
        arc.setAttributes({
            outerRadius: outerRadius,
            innerRadius: innerRadius,
            startAngle: startAngle,
            endAngle: endAngle
        });
    }
}

export const defaultArcRenderContribution = new DefaultArcRenderContribution;

export const defaultArcTextureRenderContribution = defaultBaseTextureRenderContribution;

export const defaultArcBackgroundRenderContribution = defaultBaseBackgroundRenderContribution;
//# sourceMappingURL=arc-contribution-render.js.map
