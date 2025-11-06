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
}), exports.defaultBaseClipRenderAfterContribution = exports.DefaultBaseClipRenderAfterContribution = exports.defaultBaseClipRenderBeforeContribution = exports.DefaultBaseClipRenderBeforeContribution = exports.DefaultBaseInteractiveRenderContribution = exports.defaultBaseBackgroundRenderContribution = exports.DefaultBaseBackgroundRenderContribution = void 0;

const inversify_lite_1 = require("../../../../common/inversify-lite"), theme_1 = require("../../../../graphic/theme"), canvas_allocate_1 = require("../../../../allocator/canvas-allocate"), enums_1 = require("../../../../common/enums"), contribution_provider_1 = require("../../../../common/contribution-provider"), constants_1 = require("./constants");

class DefaultBaseBackgroundRenderContribution {
    constructor() {
        this.time = enums_1.BaseRenderContributionTime.beforeFillStroke, this.useStyle = !0, 
        this.order = 0;
    }
    drawShape(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb, options) {
        var _a;
        const {background: background, backgroundOpacity: backgroundOpacity = (null !== (_a = graphic.attribute.fillOpacity) && void 0 !== _a ? _a : graphicAttribute.backgroundOpacity), opacity: opacity = graphicAttribute.opacity, backgroundMode: backgroundMode = graphicAttribute.backgroundMode, backgroundFit: backgroundFit = graphicAttribute.backgroundFit, backgroundKeepAspectRatio: backgroundKeepAspectRatio = graphicAttribute.backgroundKeepAspectRatio, backgroundScale: backgroundScale = graphicAttribute.backgroundScale, backgroundOffsetX: backgroundOffsetX = graphicAttribute.backgroundOffsetX, backgroundOffsetY: backgroundOffsetY = graphicAttribute.backgroundOffsetY, backgroundClip: backgroundClip = graphicAttribute.backgroundClip} = graphic.attribute;
        if (background) if (graphic.backgroundImg && graphic.resources) {
            const res = graphic.resources.get(background);
            if ("success" !== res.state || !res.data) return;
            if (context.save(), graphic.parent && !graphic.transMatrix.onlyTranslate()) {
                const groupAttribute = (0, theme_1.getTheme)(graphic.parent).group, {scrollX: scrollX = groupAttribute.scrollX, scrollY: scrollY = groupAttribute.scrollY} = graphic.parent.attribute;
                context.setTransformFromMatrix(graphic.parent.globalTransMatrix, !0), context.translate(scrollX, scrollY);
            }
            backgroundClip && context.clip();
            const b = graphic.AABBBounds;
            context.setCommonStyle(graphic, graphic.attribute, x, y, graphicAttribute), context.globalAlpha = backgroundOpacity * opacity, 
            this.doDrawImage(context, res.data, b, {
                backgroundMode: backgroundMode,
                backgroundFit: backgroundFit,
                backgroundKeepAspectRatio: backgroundKeepAspectRatio,
                backgroundScale: backgroundScale,
                backgroundOffsetX: backgroundOffsetX,
                backgroundOffsetY: backgroundOffsetY
            }), context.restore(), graphic.transMatrix.onlyTranslate() || context.setTransformForCurrent();
        } else context.highPerformanceSave(), context.setCommonStyle(graphic, graphic.attribute, x, y, graphicAttribute), 
        context.globalAlpha = backgroundOpacity * opacity, context.fillStyle = background, 
        context.fill(), context.highPerformanceRestore();
    }
    doDrawImage(context, data, b, params) {
        const {backgroundMode: backgroundMode, backgroundFit: backgroundFit, backgroundKeepAspectRatio: backgroundKeepAspectRatio, backgroundScale: backgroundScale = 1, backgroundOffsetX: backgroundOffsetX = 0, backgroundOffsetY: backgroundOffsetY = 0} = params, targetW = b.width(), targetH = b.height();
        let w = targetW, h = targetH;
        if ("no-repeat" === backgroundMode) if (backgroundFit) if (backgroundKeepAspectRatio) {
            const maxScale = Math.max(targetW / data.width, targetH / data.height);
            context.drawImage(data, b.x1 + backgroundOffsetX, b.y1 + backgroundOffsetY, data.width * maxScale * backgroundScale, data.height * maxScale * backgroundScale);
        } else context.drawImage(data, b.x1, b.y1, b.width(), b.height()); else {
            const resW = data.width * backgroundScale, resH = data.height * backgroundScale;
            context.drawImage(data, b.x1 + backgroundOffsetX, b.y1 + backgroundOffsetY, resW, resH);
        } else {
            if (backgroundFit && "repeat" !== backgroundMode && (data.width || data.height)) {
                const resW = data.width, resH = data.height;
                if ("repeat-x" === backgroundMode) {
                    w = resW * (targetH / resH), h = targetH;
                } else if ("repeat-y" === backgroundMode) {
                    h = resH * (targetW / resW), w = targetW;
                }
                const dpr = context.dpr, canvas = canvas_allocate_1.canvasAllocate.allocate({
                    width: w,
                    height: h,
                    dpr: dpr
                }), ctx = canvas.getContext("2d");
                ctx && (ctx.inuse = !0, ctx.clearMatrix(), ctx.setTransformForCurrent(!0), ctx.clearRect(0, 0, w, h), 
                ctx.drawImage(data, 0, 0, w, h), data = canvas.nativeCanvas), canvas_allocate_1.canvasAllocate.free(canvas);
            }
            const dpr = context.dpr, pattern = context.createPattern(data, backgroundMode);
            pattern.setTransform && pattern.setTransform(new DOMMatrix([ 1 / dpr, 0, 0, 1 / dpr, 0, 0 ])), 
            context.fillStyle = pattern, context.translate(b.x1, b.y1), context.fillRect(0, 0, targetW, targetH), 
            context.translate(-b.x1, -b.y1);
        }
    }
}

exports.DefaultBaseBackgroundRenderContribution = DefaultBaseBackgroundRenderContribution, 
exports.defaultBaseBackgroundRenderContribution = new DefaultBaseBackgroundRenderContribution;

let DefaultBaseInteractiveRenderContribution = class {
    constructor(subRenderContribitions) {
        this.subRenderContribitions = subRenderContribitions, this.time = enums_1.BaseRenderContributionTime.afterFillStroke, 
        this.useStyle = !0, this.order = 0;
    }
    drawShape(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb, options) {
        this._subRenderContribitions || (this._subRenderContribitions = this.subRenderContribitions.getContributions()), 
        this._subRenderContribitions.forEach((c => {
            c.render(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb, options);
        }));
    }
};

DefaultBaseInteractiveRenderContribution = __decorate([ (0, inversify_lite_1.injectable)(), __param(0, (0, 
inversify_lite_1.inject)(contribution_provider_1.ContributionProvider)), __param(0, (0, 
inversify_lite_1.named)(constants_1.InteractiveSubRenderContribution)), __metadata("design:paramtypes", [ Object ]) ], DefaultBaseInteractiveRenderContribution), 
exports.DefaultBaseInteractiveRenderContribution = DefaultBaseInteractiveRenderContribution;

class DefaultBaseClipRenderBeforeContribution {
    constructor() {
        this.time = enums_1.BaseRenderContributionTime.beforeFillStroke, this.useStyle = !0, 
        this.order = 0;
    }
    drawShape(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb, options) {
        var _a, _b;
        const {clipConfig: clipConfig} = graphic.attribute;
        if (!clipConfig) return;
        const clipPath = graphic.getClipPath();
        if (!clipPath) return;
        const draw = !(fillCb || strokeCb), b = graphic.AABBBounds, width = null !== (_a = graphic.attribute.width) && void 0 !== _a ? _a : b.width(), height = null !== (_b = graphic.attribute.height) && void 0 !== _b ? _b : b.height();
        draw && context.save(), context.beginPath(), !1 === clipPath.draw(context, [ width, height ], x + width / 2, y + height / 2, 0) && context.closePath(), 
        fillCb && fillCb(context, graphic.attribute, graphicAttribute, !0), draw && context.clip();
    }
}

exports.DefaultBaseClipRenderBeforeContribution = DefaultBaseClipRenderBeforeContribution, 
exports.defaultBaseClipRenderBeforeContribution = new DefaultBaseClipRenderBeforeContribution;

class DefaultBaseClipRenderAfterContribution {
    constructor() {
        this.time = enums_1.BaseRenderContributionTime.afterFillStroke, this.useStyle = !0, 
        this.order = 0;
    }
    drawShape(graphic, context, x, y, doFill, doStroke, fVisible, sVisible, graphicAttribute, drawContext, fillCb, strokeCb, options) {
        const {clipConfig: clipConfig} = graphic.attribute;
        if (!clipConfig) return;
        graphic.getClipPath() && (fillCb || strokeCb || context.restore());
    }
}

exports.DefaultBaseClipRenderAfterContribution = DefaultBaseClipRenderAfterContribution, 
exports.defaultBaseClipRenderAfterContribution = new DefaultBaseClipRenderAfterContribution;
//# sourceMappingURL=base-contribution-render.js.map
