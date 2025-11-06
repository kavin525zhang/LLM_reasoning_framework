"use strict";

var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.defaultRectBackgroundRenderContribution = exports.defaultRectTextureRenderContribution = exports.defaultRectRenderContribution = exports.SplitRectAfterRenderContribution = exports.SplitRectBeforeRenderContribution = exports.DefaultRectRenderContribution = void 0;

const vutils_1 = require("@visactor/vutils"), inversify_lite_1 = require("../../../../common/inversify-lite"), canvas_utils_1 = require("../../../../common/canvas-utils"), base_contribution_render_1 = require("./base-contribution-render"), rect_1 = require("../../../../common/shape/rect"), enums_1 = require("../../../../common/enums"), base_texture_contribution_render_1 = require("./base-texture-contribution-render");

class DefaultRectRenderContribution {
    constructor() {
        this.time = enums_1.BaseRenderContributionTime.afterFillStroke, this.useStyle = !0, 
        this.order = 0;
    }
    drawShape(rect, context, x, y, doFill, doStroke, fVisible, sVisible, rectAttribute, drawContext, fillCb, strokeCb) {
        const {outerBorder: outerBorder, innerBorder: innerBorder} = rect.attribute, doOuterBorder = outerBorder && !1 !== outerBorder.visible, doInnerBorder = innerBorder && !1 !== innerBorder.visible;
        if (!doOuterBorder && !doInnerBorder) return;
        const {cornerRadius: cornerRadius = rectAttribute.cornerRadius, cornerType: cornerType = rectAttribute.cornerType, opacity: opacity = rectAttribute.opacity, x: originX = rectAttribute.x, y: originY = rectAttribute.y, scaleX: scaleX = rectAttribute.scaleX, scaleY: scaleY = rectAttribute.scaleY, x1: x1, y1: y1, keepStrokeScale: keepStrokeScale = rectAttribute.keepStrokeScale} = rect.attribute;
        let {width: width, height: height} = rect.attribute;
        width = (null != width ? width : x1 - x) || 0, height = (null != height ? height : y1 - y) || 0;
        const renderBorder = (borderStyle, key) => {
            const doStroke = !(!borderStyle || !borderStyle.stroke), sign = "outerBorder" === key ? -1 : 1, {distance: distance = rectAttribute[key].distance} = borderStyle, d = keepStrokeScale ? distance : (0, 
            canvas_utils_1.getScaledStroke)(context, distance, context.dpr), nextX = x + sign * d, nextY = y + sign * d, dw = 2 * d;
            if (0 === cornerRadius || (0, vutils_1.isArray)(cornerRadius) && cornerRadius.every((num => 0 === num)) ? (context.beginPath(), 
            context.rect(nextX, nextY, width - sign * dw, height - sign * dw)) : (context.beginPath(), 
            (0, rect_1.createRectPath)(context, nextX, nextY, width - sign * dw, height - sign * dw, cornerRadius, "bevel" !== cornerType)), 
            context.setShadowBlendStyle && context.setShadowBlendStyle(rect, rect.attribute, rectAttribute), 
            strokeCb) strokeCb(context, borderStyle, rectAttribute[key]); else if (doStroke) {
                const lastOpacity = rectAttribute[key].opacity;
                rectAttribute[key].opacity = opacity, context.setStrokeStyle(rect, borderStyle, (originX - x) / scaleX, (originY - y) / scaleY, rectAttribute[key]), 
                rectAttribute[key].opacity = lastOpacity, context.stroke();
            }
        };
        doOuterBorder && renderBorder(outerBorder, "outerBorder"), doInnerBorder && renderBorder(innerBorder, "innerBorder");
    }
}

exports.DefaultRectRenderContribution = DefaultRectRenderContribution;

let SplitRectBeforeRenderContribution = class {
    constructor() {
        this.time = enums_1.BaseRenderContributionTime.beforeFillStroke, this.useStyle = !0, 
        this.order = 0;
    }
    drawShape(group, context, x, y, doFill, doStroke, fVisible, sVisible, groupAttribute, drawContext, fillCb, strokeCb, doFillOrStroke) {
        const {stroke: stroke = groupAttribute.stroke} = group.attribute;
        Array.isArray(stroke) && stroke.some((s => !1 === s)) && (doFillOrStroke.doStroke = !1);
    }
};

SplitRectBeforeRenderContribution = __decorate([ (0, inversify_lite_1.injectable)() ], SplitRectBeforeRenderContribution), 
exports.SplitRectBeforeRenderContribution = SplitRectBeforeRenderContribution;

let SplitRectAfterRenderContribution = class {
    constructor() {
        this.time = enums_1.BaseRenderContributionTime.afterFillStroke, this.useStyle = !0, 
        this.order = 0;
    }
    drawShape(rect, context, x, y, doFill, doStroke, fVisible, sVisible, groupAttribute, drawContext, fillCb, strokeCb) {
        const {x1: x1, y1: y1, x: originX = groupAttribute.x, y: originY = groupAttribute.y, stroke: stroke = groupAttribute.stroke, cornerRadius: cornerRadius = groupAttribute.cornerRadius, cornerType: cornerType = groupAttribute.cornerType} = rect.attribute;
        let {width: width, height: height} = rect.attribute;
        if (width = (null != width ? width : x1 - originX) || 0, height = (null != height ? height : y1 - originY) || 0, 
        Array.isArray(stroke) && stroke.some((s => !1 === s))) {
            if (context.setStrokeStyle(rect, rect.attribute, x, y, groupAttribute), !(0 === cornerRadius || (0, 
            vutils_1.isArray)(cornerRadius) && cornerRadius.every((num => 0 === num)))) {
                let lastStroke, lastStrokeI = 0;
                return (0, rect_1.createRectPath)(context, x, y, width, height, cornerRadius, "bevel" !== cornerType, new Array(4).fill(0).map(((_, i) => (x1, y1, x2, y2) => {
                    stroke[i] && (lastStrokeI === i - 1 && stroke[i] === lastStroke || (context.setStrokeStyle(rect, Object.assign(Object.assign({}, rect.attribute), {
                        stroke: stroke[i]
                    }), x, y, groupAttribute), context.beginPath(), context.moveTo(x1, y1), lastStroke = stroke[i]), 
                    lastStrokeI = i, context.lineTo(x2, y2), context.stroke(), 3 === i && context.beginPath());
                }))), void context.stroke();
            }
            if (context.beginPath(), context.moveTo(x, y), stroke[0] ? context.lineTo(x + width, y) : context.moveTo(x + width, y), 
            stroke[1] ? context.lineTo(x + width, y + height) : context.moveTo(x + width, y + height), 
            stroke[2] ? context.lineTo(x, y + height) : context.moveTo(x, y + height), stroke[3]) {
                const adjustY = stroke[0] ? y - context.lineWidth / 2 : y;
                context.lineTo(x, adjustY);
            } else context.moveTo(x, y);
            context.stroke();
        }
    }
};

SplitRectAfterRenderContribution = __decorate([ (0, inversify_lite_1.injectable)() ], SplitRectAfterRenderContribution), 
exports.SplitRectAfterRenderContribution = SplitRectAfterRenderContribution, exports.defaultRectRenderContribution = new DefaultRectRenderContribution, 
exports.defaultRectTextureRenderContribution = base_texture_contribution_render_1.defaultBaseTextureRenderContribution, 
exports.defaultRectBackgroundRenderContribution = base_contribution_render_1.defaultBaseBackgroundRenderContribution;
//# sourceMappingURL=rect-contribution-render.js.map
