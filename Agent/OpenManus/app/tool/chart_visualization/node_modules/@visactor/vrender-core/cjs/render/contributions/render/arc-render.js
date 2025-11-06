"use strict";

var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}, __metadata = this && this.__metadata || function(k, v) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
}, __param = this && this.__param || function(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DefaultCanvasArcRender = void 0;

const vutils_1 = require("@visactor/vutils"), inversify_lite_1 = require("../../../common/inversify-lite"), theme_1 = require("../../../graphic/theme"), utils_1 = require("../../../common/utils"), contribution_provider_1 = require("../../../common/contribution-provider"), utils_2 = require("../render/utils"), utils_3 = require("./utils"), conical_gradient_1 = require("../../../canvas/conical-gradient"), constants_1 = require("./contributions/constants"), constants_2 = require("../../../graphic/constants"), base_render_1 = require("./base-render"), contributions_1 = require("./contributions");

let DefaultCanvasArcRender = class extends base_render_1.BaseRender {
    constructor(arcRenderContribitions) {
        super(), this.arcRenderContribitions = arcRenderContribitions, this.numberType = constants_2.ARC_NUMBER_TYPE, 
        this.builtinContributions = [ contributions_1.defaultArcRenderContribution, contributions_1.defaultArcBackgroundRenderContribution, contributions_1.defaultArcTextureRenderContribution ], 
        this.init(arcRenderContribitions);
    }
    drawArcTailCapPath(arc, context, cx, cy, outerRadius, innerRadius, _sa, _ea) {
        const capAngle = _ea - _sa, data = arc.getParsedAngle(), startAngle = data.startAngle;
        let endAngle = data.endAngle;
        endAngle = _ea;
        (0, vutils_1.abs)(endAngle - startAngle);
        const clockwise = endAngle > startAngle;
        let collapsedToLine = !1;
        if (outerRadius < innerRadius) {
            const temp = outerRadius;
            outerRadius = innerRadius, innerRadius = temp;
        }
        const {outerDeltaAngle: outerDeltaAngle, xors: xors, yors: yors, xirs: xirs, yirs: yirs, limitedOcr: limitedOcr, outerCornerRadiusStart: outerCornerRadiusStart, outerCornerRadiusEnd: outerCornerRadiusEnd, maxOuterCornerRadius: maxOuterCornerRadius, xore: xore, yore: yore, xire: xire, yire: yire, limitedIcr: limitedIcr, innerDeltaAngle: innerDeltaAngle, innerStartAngle: innerStartAngle, innerCornerRadiusStart: innerCornerRadiusStart, innerCornerRadiusEnd: innerCornerRadiusEnd, maxInnerCornerRadius: maxInnerCornerRadius} = (0, 
        utils_2.calculateArcCornerRadius)(arc, startAngle, endAngle, innerRadius, outerRadius);
        if (limitedOcr > vutils_1.epsilon) {
            const cornerRadiusStart = (0, vutils_1.min)(outerCornerRadiusStart, limitedOcr), cornerRadiusEnd = (0, 
            vutils_1.min)(outerCornerRadiusEnd, limitedOcr), t0 = (0, utils_3.cornerTangents)(xirs, yirs, xors, yors, outerRadius, cornerRadiusStart, Number(clockwise)), t1 = (0, 
            utils_3.cornerTangents)(xore, yore, xire, yire, outerRadius, cornerRadiusEnd, Number(clockwise));
            if (limitedOcr < maxOuterCornerRadius && cornerRadiusStart === cornerRadiusEnd) context.moveTo(cx + t0.cx + t0.x01, cy + t0.cy + t0.y01), 
            context.arc(cx + t0.cx, cy + t0.cy, limitedOcr, (0, vutils_1.atan2)(t0.y01, t0.x01), (0, 
            vutils_1.atan2)(t1.y01, t1.x01), !clockwise); else {
                const a1 = endAngle - capAngle - .03, a2 = (0, vutils_1.atan2)(t1.y11, t1.x11);
                context.arc(cx, cy, outerRadius, a1, a2, !clockwise), cornerRadiusEnd > 0 && context.arc(cx + t1.cx, cy + t1.cy, cornerRadiusEnd, (0, 
                vutils_1.atan2)(t1.y11, t1.x11), (0, vutils_1.atan2)(t1.y01, t1.x01), !clockwise);
            }
        } else context.moveTo(cx + xors, cy + yors);
        if (!(innerRadius > vutils_1.epsilon) || innerDeltaAngle < .001) context.lineTo(cx + xire, cy + yire), 
        collapsedToLine = !0; else if (limitedIcr > vutils_1.epsilon) {
            const cornerRadiusStart = (0, vutils_1.min)(innerCornerRadiusStart, limitedIcr), cornerRadiusEnd = (0, 
            vutils_1.min)(innerCornerRadiusEnd, limitedIcr), t0 = (0, utils_3.cornerTangents)(xire, yire, xore, yore, innerRadius, -cornerRadiusEnd, Number(clockwise)), t1 = (0, 
            utils_3.cornerTangents)(xors, yors, xirs, yirs, innerRadius, -cornerRadiusStart, Number(clockwise));
            if (context.lineTo(cx + t0.cx + t0.x01, cy + t0.cy + t0.y01), limitedIcr < maxInnerCornerRadius && cornerRadiusStart === cornerRadiusEnd) {
                const arcEndAngle = (0, vutils_1.atan2)(t1.y01, t1.x01);
                context.arc(cx + t0.cx, cy + t0.cy, limitedIcr, (0, vutils_1.atan2)(t0.y01, t0.x01), arcEndAngle, !clockwise);
            } else {
                cornerRadiusEnd > 0 && context.arc(cx + t0.cx, cy + t0.cy, cornerRadiusEnd, (0, 
                vutils_1.atan2)(t0.y01, t0.x01), (0, vutils_1.atan2)(t0.y11, t0.x11), !clockwise);
                const a1 = (0, vutils_1.atan2)(t0.cy + t0.y11, t0.cx + t0.x11), a2 = endAngle - capAngle - .03;
                context.arc(cx, cy, innerRadius, a1, a2, clockwise);
            }
        } else context.lineTo(cx + innerRadius * (0, vutils_1.cos)(innerStartAngle), cy + innerRadius * (0, 
        vutils_1.sin)(innerStartAngle));
        return collapsedToLine;
    }
    drawShape(arc, context, x, y, drawContext, params, fillCb, strokeCb) {
        const arcAttribute = (0, theme_1.getTheme)(arc, null == params ? void 0 : params.theme).arc, {fill: fill = arcAttribute.fill, stroke: stroke = arcAttribute.stroke, x: originX = arcAttribute.x, y: originY = arcAttribute.y, fillStrokeOrder: fillStrokeOrder = arcAttribute.fillStrokeOrder} = arc.attribute, data = this.valid(arc, arcAttribute, fillCb, strokeCb);
        if (!data) return;
        const {fVisible: fVisible, sVisible: sVisible, doFill: doFill, doStroke: doStroke} = data, {outerPadding: outerPadding = arcAttribute.outerPadding, innerPadding: innerPadding = arcAttribute.innerPadding, cap: cap = arcAttribute.cap, forceShowCap: forceShowCap = arcAttribute.forceShowCap} = arc.attribute;
        let {outerRadius: outerRadius = arcAttribute.outerRadius, innerRadius: innerRadius = arcAttribute.innerRadius} = arc.attribute;
        outerRadius += outerPadding, innerRadius -= innerPadding;
        let conicalOffset = 0;
        const tempChangeConicalColor = ((0, vutils_1.isBoolean)(cap) && cap || cap[0]) && "conical" === fill.gradient;
        if (tempChangeConicalColor) {
            const {sc: sc, startAngle: startAngle, endAngle: endAngle} = arc.getParsedAngle();
            (0, vutils_1.abs)(endAngle - startAngle) < vutils_1.pi2 - vutils_1.epsilon && (conicalOffset = sc || 0, 
            fill.startAngle -= conicalOffset, fill.endAngle -= conicalOffset);
        }
        let beforeRenderContribitionsRuned = !1;
        const {isFullStroke: isFullStroke, stroke: arrayStroke} = (0, utils_1.parseStroke)(stroke);
        if (doFill || isFullStroke) {
            context.beginPath(), (0, utils_3.drawArcPath)(arc, context, x, y, outerRadius, innerRadius), 
            beforeRenderContribitionsRuned = !0, context.setShadowBlendStyle && context.setShadowBlendStyle(arc, arc.attribute, arcAttribute), 
            this.beforeRenderStep(arc, context, x, y, doFill, doStroke, fVisible, sVisible, arcAttribute, drawContext, fillCb, strokeCb);
            const _runFill = () => {
                doFill && (fillCb ? fillCb(context, arc.attribute, arcAttribute) : fVisible && (context.setCommonStyle(arc, arc.attribute, originX - x, originY - y, arcAttribute), 
                context.fill()));
            }, _runStroke = () => {
                doStroke && isFullStroke && (strokeCb ? strokeCb(context, arc.attribute, arcAttribute) : sVisible && (context.setStrokeStyle(arc, arc.attribute, originX - x, originY - y, arcAttribute), 
                context.stroke()));
            };
            fillStrokeOrder ? (_runStroke(), _runFill()) : (_runFill(), _runStroke());
        }
        if (!isFullStroke && doStroke) {
            context.beginPath();
            (0, utils_3.drawArcPath)(arc, context, x, y, outerRadius, innerRadius, arrayStroke);
            beforeRenderContribitionsRuned || this.beforeRenderStep(arc, context, x, y, doFill, doStroke, fVisible, sVisible, arcAttribute, drawContext, fillCb, strokeCb), 
            strokeCb ? strokeCb(context, arc.attribute, arcAttribute) : sVisible && (context.setStrokeStyle(arc, arc.attribute, x, y, arcAttribute), 
            context.stroke());
        }
        if (((0, vutils_1.isBoolean)(cap) && cap || cap[1]) && forceShowCap) {
            const {startAngle: sa, endAngle: ea} = arc.getParsedAngle();
            if ((0, vutils_1.abs)(ea - sa) >= vutils_1.pi2 - vutils_1.epsilon) {
                context.beginPath();
                const capAngle = Math.abs(outerRadius - innerRadius) / 2 / outerRadius, {endAngle: endAngle = arcAttribute.endAngle, fill: fill = arcAttribute.fill} = arc.attribute, startAngle = endAngle;
                this.drawArcTailCapPath(arc, context, x, y, outerRadius, innerRadius, startAngle, startAngle + capAngle), 
                beforeRenderContribitionsRuned || this.beforeRenderStep(arc, context, x, y, doFill, doStroke, fVisible, sVisible, arcAttribute, drawContext, fillCb, strokeCb);
                const _runFill = () => {
                    if (doFill) {
                        const color = fill;
                        if ("conical" === color.gradient) {
                            const lastColor = (0, conical_gradient_1.getConicGradientAt)(0, 0, endAngle, color);
                            fillCb || utils_3.fillVisible && (context.setCommonStyle(arc, arc.attribute, x, y, arcAttribute), 
                            context.fillStyle = lastColor, context.fill());
                        }
                    }
                }, _runStroke = () => {
                    doStroke && (strokeCb || sVisible && (context.setStrokeStyle(arc, arc.attribute, x, y, arcAttribute), 
                    context.stroke()));
                };
                _runFill(), _runStroke();
            }
        }
        this.afterRenderStep(arc, context, x, y, doFill, doStroke, fVisible, sVisible, arcAttribute, drawContext, fillCb, strokeCb), 
        tempChangeConicalColor && (fill.startAngle += conicalOffset, fill.endAngle += conicalOffset);
    }
    draw(arc, renderService, drawContext, params) {
        const arcAttribute = (0, theme_1.getTheme)(arc, null == params ? void 0 : params.theme).arc;
        this._draw(arc, arcAttribute, !1, drawContext, params);
    }
};

DefaultCanvasArcRender = __decorate([ (0, inversify_lite_1.injectable)(), __param(0, (0, 
inversify_lite_1.inject)(contribution_provider_1.ContributionProvider)), __param(0, (0, 
inversify_lite_1.named)(constants_1.ArcRenderContribution)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasArcRender), 
exports.DefaultCanvasArcRender = DefaultCanvasArcRender;
//# sourceMappingURL=arc-render.js.map
