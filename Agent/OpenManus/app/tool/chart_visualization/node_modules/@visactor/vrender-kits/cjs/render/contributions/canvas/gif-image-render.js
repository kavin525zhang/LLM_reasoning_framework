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
}), exports.defaultGifImageRenderContribution = exports.DefaultGifImageRenderContribution = exports.DefaultCanvasGifImageRender = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), constants_1 = require("../../../graphic/constants");

let DefaultCanvasGifImageRender = class extends vrender_core_1.DefaultCanvasImageRender {
    constructor(imageRenderContribitions) {
        super(imageRenderContribitions), this.imageRenderContribitions = imageRenderContribitions, 
        this.numberType = constants_1.GIFIMAGE_NUMBER_TYPE, this._renderContribitions = void 0, 
        this.builtinContributions = [ exports.defaultGifImageRenderContribution ], this.init(imageRenderContribitions);
    }
    drawShape(image, context, x, y, drawContext, params, fillCb, strokeCb) {
        const imageAttribute = (0, vrender_core_1.getTheme)(image).image, {x: originX = imageAttribute.x, y: originY = imageAttribute.y, fillStrokeOrder: fillStrokeOrder = imageAttribute.fillStrokeOrder} = image.attribute, data = this.valid(image, imageAttribute, fillCb);
        if (!data) return;
        const {fVisible: fVisible, sVisible: sVisible, doFill: doFill, doStroke: doStroke} = data, _runFill = () => {
            doFill && fillCb && fillCb(context, image.attribute, imageAttribute);
        }, _runStroke = () => {
            doStroke && (strokeCb ? strokeCb(context, image.attribute, imageAttribute) : sVisible && (context.setStrokeStyle(image, image.attribute, originX - x, originY - y, imageAttribute), 
            context.stroke()));
        };
        fillStrokeOrder ? (_runStroke(), context.save(), context.clip(), this.beforeRenderStep(image, context, x, y, doFill, !1, fVisible, !1, imageAttribute, drawContext, fillCb), 
        _runFill(), context.restore()) : (context.save(), context.clip(), this.beforeRenderStep(image, context, x, y, doFill, !1, fVisible, !1, imageAttribute, drawContext, fillCb), 
        _runFill(), context.restore(), _runStroke()), this.afterRenderStep(image, context, x, y, doFill, !1, fVisible, !1, imageAttribute, drawContext, fillCb);
    }
    draw(image, renderService, drawContext) {
        const {context: context} = renderService.drawParams;
        if (!context) return;
        const imageAttribute = (0, vrender_core_1.getTheme)(image).image;
        this._draw(image, imageAttribute, !1, drawContext);
    }
};

DefaultCanvasGifImageRender = __decorate([ (0, vrender_core_1.injectable)(), __param(0, (0, 
vrender_core_1.inject)(vrender_core_1.ContributionProvider)), __param(0, (0, vrender_core_1.named)(vrender_core_1.ImageRenderContribution)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasGifImageRender), 
exports.DefaultCanvasGifImageRender = DefaultCanvasGifImageRender;

class DefaultGifImageRenderContribution extends vrender_core_1.DefaultRectRenderContribution {
    constructor() {
        super(...arguments), this.time = vrender_core_1.BaseRenderContributionTime.afterFillStroke, 
        this.useStyle = !0, this.order = 0;
    }
    drawShape(image, context, x, y, doFill, doStroke, fVisible, sVisible, rectAttribute, drawContext, fillCb, strokeCb) {
        image.renderFrame && image.playing && image.renderFrame(context, x, y);
    }
}

exports.DefaultGifImageRenderContribution = DefaultGifImageRenderContribution, exports.defaultGifImageRenderContribution = new DefaultGifImageRenderContribution;
//# sourceMappingURL=gif-image-render.js.map
