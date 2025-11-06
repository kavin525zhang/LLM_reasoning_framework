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

import { BaseRenderContributionTime, ContributionProvider, DefaultCanvasImageRender, DefaultRectRenderContribution, getTheme, ImageRenderContribution, inject, injectable, named } from "@visactor/vrender-core";

import { GIFIMAGE_NUMBER_TYPE } from "../../../graphic/constants";

let DefaultCanvasGifImageRender = class extends DefaultCanvasImageRender {
    constructor(imageRenderContribitions) {
        super(imageRenderContribitions), this.imageRenderContribitions = imageRenderContribitions, 
        this.numberType = GIFIMAGE_NUMBER_TYPE, this._renderContribitions = void 0, this.builtinContributions = [ defaultGifImageRenderContribution ], 
        this.init(imageRenderContribitions);
    }
    drawShape(image, context, x, y, drawContext, params, fillCb, strokeCb) {
        const imageAttribute = getTheme(image).image, {x: originX = imageAttribute.x, y: originY = imageAttribute.y, fillStrokeOrder: fillStrokeOrder = imageAttribute.fillStrokeOrder} = image.attribute, data = this.valid(image, imageAttribute, fillCb);
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
        const imageAttribute = getTheme(image).image;
        this._draw(image, imageAttribute, !1, drawContext);
    }
};

DefaultCanvasGifImageRender = __decorate([ injectable(), __param(0, inject(ContributionProvider)), __param(0, named(ImageRenderContribution)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasGifImageRender);

export { DefaultCanvasGifImageRender };

export class DefaultGifImageRenderContribution extends DefaultRectRenderContribution {
    constructor() {
        super(...arguments), this.time = BaseRenderContributionTime.afterFillStroke, this.useStyle = !0, 
        this.order = 0;
    }
    drawShape(image, context, x, y, doFill, doStroke, fVisible, sVisible, rectAttribute, drawContext, fillCb, strokeCb) {
        image.renderFrame && image.playing && image.renderFrame(context, x, y);
    }
}

export const defaultGifImageRenderContribution = new DefaultGifImageRenderContribution;
//# sourceMappingURL=gif-image-render.js.map
