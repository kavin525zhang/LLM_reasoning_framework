"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.defaultArcBackgroundRenderContribution = exports.defaultArcTextureRenderContribution = exports.defaultArcRenderContribution = exports.DefaultArcRenderContribution = void 0;

const canvas_utils_1 = require("../../../../common/canvas-utils"), base_contribution_render_1 = require("./base-contribution-render"), utils_1 = require("../utils"), enums_1 = require("../../../../common/enums"), base_texture_contribution_render_1 = require("./base-texture-contribution-render");

class DefaultArcRenderContribution {
    constructor() {
        this.time = enums_1.BaseRenderContributionTime.afterFillStroke, this.useStyle = !0, 
        this.order = 0;
    }
    drawShape(arc, context, x, y, doFill, doStroke, fVisible, sVisible, arcAttribute, drawContext, fillCb, strokeCb) {
        const {outerBorder: outerBorder, innerBorder: innerBorder} = arc.attribute, doOuterBorder = outerBorder && !1 !== outerBorder.visible, doInnerBorder = innerBorder && !1 !== innerBorder.visible;
        if (!doOuterBorder && !doInnerBorder) return;
        const {innerPadding: innerPadding = arcAttribute.innerPadding, outerPadding: outerPadding = arcAttribute.outerPadding, startAngle: startAngle = arcAttribute.startAngle, endAngle: endAngle = arcAttribute.endAngle, opacity: opacity = arcAttribute.opacity, x: originX = arcAttribute.x, y: originY = arcAttribute.y, scaleX: scaleX = arcAttribute.scaleX, scaleY: scaleY = arcAttribute.scaleY, keepStrokeScale: keepStrokeScale = arcAttribute.keepStrokeScale} = arc.attribute;
        let {innerRadius: innerRadius = arcAttribute.innerRadius, outerRadius: outerRadius = arcAttribute.outerRadius} = arc.attribute;
        outerRadius += outerPadding, innerRadius -= innerPadding;
        const renderBorder = (borderStyle, key) => {
            const doStroke = !(!borderStyle || !borderStyle.stroke), {distance: distance = arcAttribute[key].distance} = borderStyle, d = keepStrokeScale ? distance : (0, 
            canvas_utils_1.getScaledStroke)(context, distance, context.dpr), deltaAngle = distance / outerRadius, sign = "outerBorder" === key ? 1 : -1;
            if (arc.setAttributes({
                outerRadius: outerRadius + sign * d,
                innerRadius: innerRadius - sign * d,
                startAngle: startAngle - sign * deltaAngle,
                endAngle: endAngle + sign * deltaAngle
            }), context.beginPath(), (0, utils_1.drawArcPath)(arc, context, x, y, outerRadius + sign * d, innerRadius - sign * d), 
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

exports.DefaultArcRenderContribution = DefaultArcRenderContribution, exports.defaultArcRenderContribution = new DefaultArcRenderContribution, 
exports.defaultArcTextureRenderContribution = base_texture_contribution_render_1.defaultBaseTextureRenderContribution, 
exports.defaultArcBackgroundRenderContribution = base_contribution_render_1.defaultBaseBackgroundRenderContribution;
//# sourceMappingURL=arc-contribution-render.js.map
