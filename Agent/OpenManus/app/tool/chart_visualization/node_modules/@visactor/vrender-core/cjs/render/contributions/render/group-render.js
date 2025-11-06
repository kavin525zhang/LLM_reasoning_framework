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
}), exports.DefaultCanvasGroupRender = void 0;

const inversify_lite_1 = require("../../../common/inversify-lite"), theme_1 = require("../../../graphic/theme"), graphic_service_1 = require("../../../graphic/graphic-service/graphic-service"), vutils_1 = require("@visactor/vutils"), contribution_provider_1 = require("../../../common/contribution-provider"), rect_1 = require("../../../common/shape/rect"), utils_1 = require("./utils"), constants_1 = require("./contributions/constants"), matrix_allocate_1 = require("../../../allocator/matrix-allocate"), constants_2 = require("../../../graphic/constants"), enums_1 = require("../../../common/enums"), contributions_1 = require("./contributions"), matrix_1 = require("../../../common/matrix"), modules_1 = require("../../../modules");

let DefaultCanvasGroupRender = class {
    constructor(groupRenderContribitions) {
        this.groupRenderContribitions = groupRenderContribitions, this.numberType = constants_2.GROUP_NUMBER_TYPE;
    }
    drawShape(group, context, x, y, drawContext, params, fillCb, strokeCb) {
        const groupAttribute = (0, theme_1.getTheme)(group, null == params ? void 0 : params.theme).group, {fill: fill = groupAttribute.fill, background: background, stroke: stroke = groupAttribute.stroke, opacity: opacity = groupAttribute.opacity, width: width = groupAttribute.width, height: height = groupAttribute.height, clip: clip = groupAttribute.clip, fillOpacity: fillOpacity = groupAttribute.fillOpacity, strokeOpacity: strokeOpacity = groupAttribute.strokeOpacity, cornerRadius: cornerRadius = groupAttribute.cornerRadius, path: path = groupAttribute.path, lineWidth: lineWidth = groupAttribute.lineWidth, visible: visible = groupAttribute.visible, fillStrokeOrder: fillStrokeOrder = groupAttribute.fillStrokeOrder, cornerType: cornerType = groupAttribute.cornerType, x: originX = groupAttribute.x, y: originY = groupAttribute.y} = group.attribute, fVisible = (0, 
        utils_1.rectFillVisible)(opacity, fillOpacity, width, height, fill), sVisible = (0, 
        utils_1.rectStrokeVisible)(opacity, strokeOpacity, width, height), doFill = (0, 
        utils_1.runFill)(fill, background), doStroke = (0, utils_1.runStroke)(stroke, lineWidth);
        if (!group.valid || !visible) return;
        if (!clip) {
            if (!doFill && !doStroke) return;
            if (!(fVisible || sVisible || fillCb || strokeCb || background)) return;
        }
        if (path && path.length && drawContext.drawContribution) {
            const disableFill = context.disableFill, disableStroke = context.disableStroke, disableBeginPath = context.disableBeginPath;
            context.disableFill = !0, context.disableStroke = !0, context.disableBeginPath = !0, 
            path.forEach((g => {
                drawContext.drawContribution.getRenderContribution(g).draw(g, drawContext.renderService, drawContext, params);
            })), context.disableFill = disableFill, context.disableStroke = disableStroke, context.disableBeginPath = disableBeginPath;
        } else 0 === cornerRadius || (0, vutils_1.isArray)(cornerRadius) && cornerRadius.every((num => 0 === num)) ? (context.beginPath(), 
        context.rect(x, y, width, height)) : (context.beginPath(), (0, rect_1.createRectPath)(context, x, y, width, height, cornerRadius, "bevel" !== cornerType));
        this._groupRenderContribitions || (this._groupRenderContribitions = this.groupRenderContribitions.getContributions() || [], 
        this._groupRenderContribitions.push(contributions_1.defaultGroupBackgroundRenderContribution));
        const doFillOrStroke = {
            doFill: doFill,
            doStroke: doStroke
        };
        context.setShadowBlendStyle && context.setShadowBlendStyle(group, group.attribute, groupAttribute), 
        this._groupRenderContribitions.forEach((c => {
            c.time === enums_1.BaseRenderContributionTime.beforeFillStroke && c.drawShape(group, context, x, y, doFill, doStroke, fVisible, sVisible, groupAttribute, drawContext, fillCb, strokeCb, doFillOrStroke);
        })), clip && context.clip();
        const _runFill = () => {
            doFillOrStroke.doFill && (fillCb ? fillCb(context, group.attribute, groupAttribute) : fVisible && (context.setCommonStyle(group, group.attribute, originX - x, originY - y, groupAttribute), 
            context.fill()));
        }, _runStroke = () => {
            doFillOrStroke.doStroke && (strokeCb ? strokeCb(context, group.attribute, groupAttribute) : sVisible && (context.setStrokeStyle(group, group.attribute, originX - x, originY - y, groupAttribute), 
            context.stroke()));
        };
        fillStrokeOrder ? (_runStroke(), _runFill()) : (_runFill(), _runStroke()), this._groupRenderContribitions.forEach((c => {
            c.time === enums_1.BaseRenderContributionTime.afterFillStroke && c.drawShape(group, context, x, y, doFill, doStroke, fVisible, sVisible, groupAttribute, drawContext, fillCb, strokeCb);
        }));
    }
    draw(group, renderService, drawContext, params) {
        const {context: context} = drawContext;
        if (!context) return;
        const {clip: clip, baseOpacity: baseOpacity = 1, drawMode: drawMode, x: x, y: y, width: width, height: height} = group.attribute, lastNativeContext = context.nativeContext, lastNativeCanvas = context.canvas.nativeCanvas;
        if (drawMode > 0) {
            const canvas = context.canvas, newCanvas = modules_1.vglobal.createCanvas({
                width: canvas.width,
                height: canvas.height,
                dpr: 1
            }), newContext = newCanvas.getContext("2d"), transform = context.nativeContext.getTransform();
            newContext.setTransform(transform.a, transform.b, transform.c, transform.d, transform.e, transform.f), 
            1 === drawMode && (newContext.save(), newContext.clearRect(0, 0, canvas.width, canvas.height), 
            newContext.beginPath(), newContext.rect(x, y, width, height), newContext.clip(), 
            newContext.drawImage(canvas.nativeCanvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.displayWidth, canvas.displayHeight), 
            newContext.restore()), context.nativeContext = newContext, canvas.nativeCanvas = newCanvas;
        }
        clip ? context.save() : context.highPerformanceSave();
        const baseGlobalAlpha = context.baseGlobalAlpha;
        context.baseGlobalAlpha *= baseOpacity;
        const groupAttribute = (0, theme_1.getTheme)(group, null == params ? void 0 : params.theme).group, lastModelMatrix = context.modelMatrix;
        if (context.camera) {
            const nextModelMatrix = matrix_allocate_1.mat4Allocate.allocate(), modelMatrix = matrix_allocate_1.mat4Allocate.allocate();
            (0, graphic_service_1.getModelMatrix)(modelMatrix, group, groupAttribute), lastModelMatrix ? (0, 
            matrix_1.multiplyMat4Mat4)(nextModelMatrix, lastModelMatrix, modelMatrix) : (0, 
            matrix_1.multiplyMat4Mat4)(nextModelMatrix, nextModelMatrix, modelMatrix), context.modelMatrix = nextModelMatrix, 
            matrix_allocate_1.mat4Allocate.free(modelMatrix), context.setTransform(1, 0, 0, 1, 0, 0, !0);
        } else context.transformFromMatrix(group.transMatrix, !0);
        context.beginPath(), params.skipDraw ? this.drawShape(group, context, 0, 0, drawContext, params, (() => !1), (() => !1)) : this.drawShape(group, context, 0, 0, drawContext);
        const {scrollX: scrollX = groupAttribute.scrollX, scrollY: scrollY = groupAttribute.scrollY} = group.attribute;
        let p;
        if ((scrollX || scrollY) && context.translate(scrollX, scrollY), params && params.drawingCb && (p = params.drawingCb()), 
        context.modelMatrix !== lastModelMatrix && matrix_allocate_1.mat4Allocate.free(context.modelMatrix), 
        context.modelMatrix = lastModelMatrix, context.baseGlobalAlpha = baseGlobalAlpha, 
        drawMode > 0) {
            const newContext = context.nativeContext, newCanvas = context.canvas.nativeCanvas;
            lastNativeContext.save(), lastNativeContext.setTransform(context.dpr, 0, 0, context.dpr, 0, 0, !0), 
            1 === drawMode && newContext.rect(x, y, width, height), lastNativeContext.drawImage(newCanvas, 0, 0, newCanvas.width, newCanvas.height, 0, 0, context.canvas.displayWidth, context.canvas.displayHeight);
            const transform = newContext.getTransform();
            lastNativeContext.setTransform(transform.a, transform.b, transform.c, transform.d, transform.e, transform.f), 
            context.nativeContext = lastNativeContext, context.canvas.nativeCanvas = lastNativeCanvas, 
            lastNativeContext.restore();
        }
        p && p.then ? p.then((() => {
            clip ? context.restore() : context.highPerformanceRestore();
        })) : clip ? context.restore() : context.highPerformanceRestore();
    }
};

DefaultCanvasGroupRender = __decorate([ (0, inversify_lite_1.injectable)(), __param(0, (0, 
inversify_lite_1.inject)(contribution_provider_1.ContributionProvider)), __param(0, (0, 
inversify_lite_1.named)(constants_1.GroupRenderContribution)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasGroupRender), 
exports.DefaultCanvasGroupRender = DefaultCanvasGroupRender;
//# sourceMappingURL=group-render.js.map
