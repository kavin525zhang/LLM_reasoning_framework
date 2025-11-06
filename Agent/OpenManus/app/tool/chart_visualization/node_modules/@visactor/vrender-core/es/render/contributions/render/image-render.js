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

import { inject, injectable, named } from "../../../common/inversify-lite";

import { ContributionProvider } from "../../../common/contribution-provider";

import { getTheme } from "../../../graphic/theme";

import { ImageRenderContribution } from "./contributions/constants";

import { IMAGE_NUMBER_TYPE } from "../../../graphic/constants";

import { isArray, isString } from "@visactor/vutils";

import { createRectPath } from "../../../common/shape/rect";

import { BaseRender } from "./base-render";

import { defaultImageBackgroundRenderContribution, defaultImageRenderContribution } from "./contributions";

import { ResourceLoader } from "../../../resource-loader/loader";

const repeatStr = [ "", "repeat-x", "repeat-y", "repeat" ];

let DefaultCanvasImageRender = class extends BaseRender {
    constructor(imageRenderContribitions) {
        super(), this.imageRenderContribitions = imageRenderContribitions, this.numberType = IMAGE_NUMBER_TYPE, 
        this.builtinContributions = [ defaultImageRenderContribution, defaultImageBackgroundRenderContribution ], 
        this.init(imageRenderContribitions);
    }
    drawShape(image, context, x, y, drawContext, params, fillCb, strokeCb) {
        const imageAttribute = getTheme(image).image, {repeatX: repeatX = imageAttribute.repeatX, repeatY: repeatY = imageAttribute.repeatY, x: originX = imageAttribute.x, y: originY = imageAttribute.y, cornerRadius: cornerRadius = imageAttribute.cornerRadius, fillStrokeOrder: fillStrokeOrder = imageAttribute.fillStrokeOrder, cornerType: cornerType = imageAttribute.cornerType, image: url} = image.attribute, data = this.valid(image, imageAttribute, fillCb);
        if (!data) return;
        const {fVisible: fVisible, sVisible: sVisible, doFill: doFill, doStroke: doStroke} = data;
        if (!url || !image.resources) return;
        const res = image.resources.get(url);
        if ("success" !== res.state) return;
        const width = image.width, height = image.height;
        context.beginPath();
        let needRestore = !1;
        0 === cornerRadius || isArray(cornerRadius) && cornerRadius.every((num => 0 === num)) ? context.rect(x, y, width, height) : (createRectPath(context, x, y, width, height, cornerRadius, "bevel" !== cornerType), 
        needRestore = !0), context.setShadowBlendStyle && context.setShadowBlendStyle(image, image.attribute, imageAttribute);
        const _runFill = () => {
            if (doFill) if (fillCb) fillCb(context, image.attribute, imageAttribute); else if (fVisible) {
                context.setCommonStyle(image, image.attribute, x, y, imageAttribute);
                let repeat = 0;
                if ("repeat" === repeatX && (repeat |= 1), "repeat" === repeatY && (repeat |= 2), 
                repeat) {
                    const pattern = context.createPattern(res.data, repeatStr[repeat]);
                    context.fillStyle = pattern, context.translate(x, y, !0), context.fillRect(0, 0, width, height), 
                    context.translate(-x, -y, !0);
                } else context.drawImage(res.data, x, y, width, height);
            }
        }, _runStroke = () => {
            doStroke && (strokeCb ? strokeCb(context, image.attribute, imageAttribute) : sVisible && (context.setStrokeStyle(image, image.attribute, originX - x, originY - y, imageAttribute), 
            context.stroke()));
        };
        fillStrokeOrder ? (_runStroke(), needRestore && (context.save(), context.clip()), 
        this.beforeRenderStep(image, context, x, y, doFill, !1, fVisible, !1, imageAttribute, drawContext, fillCb), 
        _runFill(), needRestore && context.restore()) : (needRestore && (context.save(), 
        context.clip()), this.beforeRenderStep(image, context, x, y, doFill, !1, fVisible, !1, imageAttribute, drawContext, fillCb), 
        _runFill(), needRestore && context.restore(), _runStroke()), this.afterRenderStep(image, context, x, y, doFill, !1, fVisible, !1, imageAttribute, drawContext, fillCb);
    }
    draw(image, renderService, drawContext) {
        const {image: url} = image.attribute;
        if (!url || !image.resources) return;
        const res = image.resources.get(url);
        if ("loading" === res.state && isString(url)) return void ResourceLoader.improveImageLoading(url);
        if ("success" !== res.state) return;
        const {context: context} = renderService.drawParams;
        if (!context) return;
        const imageAttribute = getTheme(image).image;
        this._draw(image, imageAttribute, !1, drawContext);
    }
};

DefaultCanvasImageRender = __decorate([ injectable(), __param(0, inject(ContributionProvider)), __param(0, named(ImageRenderContribution)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasImageRender);

export { DefaultCanvasImageRender };
//# sourceMappingURL=image-render.js.map
