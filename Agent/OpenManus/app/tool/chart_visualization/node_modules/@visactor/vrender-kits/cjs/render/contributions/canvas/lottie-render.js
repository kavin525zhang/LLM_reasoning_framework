"use strict";

var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DefaultCanvasLottieRender = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), constants_1 = require("../../../graphic/constants");

let DefaultCanvasLottieRender = class extends vrender_core_1.DefaultCanvasRectRender {
    constructor() {
        super(...arguments), this.numberType = constants_1.LOTTIE_NUMBER_TYPE;
    }
    drawShape(lottie, context, x, y, drawContext, params, fillCb, strokeCb) {
        const _fillCb = fillCb || (() => this._drawShape.call(this, lottie, context, x, y, drawContext, params));
        super.drawShape(lottie, context, x, y, drawContext, params, _fillCb, strokeCb);
    }
    _drawShape(lottie, context, x, y, drawContext, params) {
        var _a;
        const lottieAttribute = null !== (_a = this.tempTheme) && void 0 !== _a ? _a : (0, 
        vrender_core_1.getTheme)(lottie, null == params ? void 0 : params.theme).rect, {x: originX = lottieAttribute.x, y: originY = lottieAttribute.y} = lottie.attribute;
        context.setCommonStyle(lottie, lottie.attribute, originX - x, originY - y, lottieAttribute);
        const canvas = lottie.canvas;
        if (canvas) {
            const pattern = context.createPattern(canvas, "no-repeat"), dpr = context.dpr;
            pattern.setTransform && pattern.setTransform(new DOMMatrix([ 1 / dpr, 0, 0, 1 / dpr, x, y ])), 
            context.fillStyle = pattern;
        }
        context.fill();
    }
};

DefaultCanvasLottieRender = __decorate([ (0, vrender_core_1.injectable)() ], DefaultCanvasLottieRender), 
exports.DefaultCanvasLottieRender = DefaultCanvasLottieRender;
//# sourceMappingURL=lottie-render.js.map
