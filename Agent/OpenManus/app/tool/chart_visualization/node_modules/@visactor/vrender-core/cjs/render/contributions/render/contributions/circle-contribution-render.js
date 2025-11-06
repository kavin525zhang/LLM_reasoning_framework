"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.defaultCircleBackgroundRenderContribution = exports.defaultCircleTextureRenderContribution = exports.defaultCircleRenderContribution = exports.DefaultCircleRenderContribution = void 0;

const canvas_utils_1 = require("../../../../common/canvas-utils"), base_contribution_render_1 = require("./base-contribution-render"), enums_1 = require("../../../../common/enums"), base_texture_contribution_render_1 = require("./base-texture-contribution-render");

class DefaultCircleRenderContribution {
    constructor() {
        this.time = enums_1.BaseRenderContributionTime.afterFillStroke, this.useStyle = !0, 
        this.order = 0;
    }
    drawShape(circle, context, x, y, doFill, doStroke, fVisible, sVisible, circleAttribute, drawContext, fillCb, strokeCb) {
        const {outerBorder: outerBorder, innerBorder: innerBorder} = circle.attribute, doOuterBorder = outerBorder && !1 !== outerBorder.visible, doInnerBorder = innerBorder && !1 !== innerBorder.visible;
        if (!doOuterBorder && !doInnerBorder) return;
        const {radius: radius = circleAttribute.radius, startAngle: startAngle = circleAttribute.startAngle, endAngle: endAngle = circleAttribute.endAngle, opacity: opacity = circleAttribute.opacity, x: originX = circleAttribute.x, y: originY = circleAttribute.y, scaleX: scaleX = circleAttribute.scaleX, scaleY: scaleY = circleAttribute.scaleY, keepStrokeScale: keepStrokeScale = circleAttribute.keepStrokeScale} = circle.attribute, renderBorder = (borderStyle, key) => {
            const doStroke = !(!borderStyle || !borderStyle.stroke), {distance: distance = circleAttribute[key].distance} = borderStyle, d = keepStrokeScale ? distance : (0, 
            canvas_utils_1.getScaledStroke)(context, distance, context.dpr), sign = "outerBorder" === key ? 1 : -1;
            if (context.beginPath(), context.arc(x, y, radius + sign * d, startAngle, endAngle), 
            context.closePath(), context.setShadowBlendStyle && context.setShadowBlendStyle(circle, circle.attribute, circleAttribute), 
            strokeCb) strokeCb(context, borderStyle, circleAttribute[key]); else if (doStroke) {
                const lastOpacity = circleAttribute[key].opacity;
                circleAttribute[key].opacity = opacity, context.setStrokeStyle(circle, borderStyle, (originX - x) / scaleX, (originY - y) / scaleY, circleAttribute[key]), 
                circleAttribute[key].opacity = lastOpacity, context.stroke();
            }
        };
        doOuterBorder && renderBorder(outerBorder, "outerBorder"), doInnerBorder && renderBorder(innerBorder, "innerBorder");
    }
}

exports.DefaultCircleRenderContribution = DefaultCircleRenderContribution, exports.defaultCircleRenderContribution = new DefaultCircleRenderContribution, 
exports.defaultCircleTextureRenderContribution = base_texture_contribution_render_1.defaultBaseTextureRenderContribution, 
exports.defaultCircleBackgroundRenderContribution = base_contribution_render_1.defaultBaseBackgroundRenderContribution;
//# sourceMappingURL=circle-contribution-render.js.map
