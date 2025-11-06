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

import { SYMBOL_NUMBER_TYPE } from "../../../graphic/constants";

import { BaseRender } from "./base-render";

import { SymbolRenderContribution } from "./contributions/constants";

import { isArray } from "@visactor/vutils";

import { defaultSymbolBackgroundRenderContribution, defaultSymbolClipRangeStrokeRenderContribution, defaultSymbolRenderContribution, defaultSymbolTextureRenderContribution } from "./contributions";

let DefaultCanvasSymbolRender = class extends BaseRender {
    constructor(symbolRenderContribitions) {
        super(), this.symbolRenderContribitions = symbolRenderContribitions, this.numberType = SYMBOL_NUMBER_TYPE, 
        this.builtinContributions = [ defaultSymbolRenderContribution, defaultSymbolBackgroundRenderContribution, defaultSymbolTextureRenderContribution, defaultSymbolClipRangeStrokeRenderContribution ], 
        this.init(symbolRenderContribitions);
    }
    drawShape(symbol, context, x, y, drawContext, params, fillCb, strokeCb) {
        var _a;
        const symbolAttribute = getTheme(symbol, null == params ? void 0 : params.theme).symbol, {size: size = symbolAttribute.size, x: originX = symbolAttribute.x, y: originY = symbolAttribute.y, scaleX: scaleX = symbolAttribute.scaleX, scaleY: scaleY = symbolAttribute.scaleY, fillStrokeOrder: fillStrokeOrder = symbolAttribute.fillStrokeOrder, clipRange: clipRange = symbolAttribute.clipRange} = symbol.attribute, data = this.valid(symbol, symbolAttribute, fillCb, strokeCb);
        if (!data) return;
        const {fVisible: fVisible, sVisible: sVisible, doFill: doFill, doStroke: doStroke} = data, parsedPath = symbol.getParsedPath();
        if (!parsedPath) return;
        const {keepDirIn3d: keepDirIn3d = symbolAttribute.keepDirIn3d} = symbol.attribute, z = null !== (_a = this.z) && void 0 !== _a ? _a : 0;
        context.beginPath();
        let _size = size, _x = x, _y = y, _z = z;
        const camera = context.camera;
        if (keepDirIn3d && camera && context.project) {
            const p = context.project(x, y, z);
            context.camera = null, _size = isArray(size) ? [ size[0] * scaleX, size[1] * scaleY ] : size * scaleX, 
            _x = p.x, _y = p.y, _z = void 0;
        }
        !1 === parsedPath.draw(context, size, _x, _y, _z, ((p, a) => {
            var _a, _b, _c, _d;
            if (symbol._parsedPath.svgCache) {
                const obj = Object.assign({}, a);
                obj.fill = null !== (_a = a.fill) && void 0 !== _a ? _a : symbol.attribute.fill, 
                obj.opacity = null !== (_b = a.opacity) && void 0 !== _b ? _b : symbol.attribute.opacity, 
                obj.fillOpacity = symbol.attribute.fillOpacity, obj.stroke = null !== (_c = a.stroke) && void 0 !== _c ? _c : symbol.attribute.stroke, 
                obj.lineWidth = null !== (_d = a.lineWidth) && void 0 !== _d ? _d : symbol.attribute.lineWidth, 
                a = obj;
            }
            const _runFill = () => {
                a.fill && (fillCb ? fillCb(context, symbol.attribute, symbolAttribute) : (context.setCommonStyle(symbol, a, originX - x, originY - y, symbolAttribute), 
                context.fill()));
            }, _runStroke = () => {
                a.stroke && (strokeCb ? strokeCb(context, symbol.attribute, symbolAttribute) : sVisible && clipRange >= 1 && (context.setStrokeStyle(symbol, a, (originX - x) / scaleX, (originY - y) / scaleY, symbolAttribute), 
                context.stroke()));
            };
            fillStrokeOrder ? (_runStroke(), _runFill()) : (_runFill(), _runStroke());
        })) && context.closePath(), context.camera = camera, context.setShadowBlendStyle && context.setShadowBlendStyle(symbol, symbol.attribute, symbolAttribute), 
        this.beforeRenderStep(symbol, context, x, y, doFill, doStroke, fVisible, sVisible, symbolAttribute, drawContext, fillCb, strokeCb);
        const _runFill = () => {
            doFill && !parsedPath.isSvg && (fillCb ? fillCb(context, symbol.attribute, symbolAttribute) : fVisible && (context.setCommonStyle(symbol, symbol.attribute, originX - x, originY - y, symbolAttribute), 
            context.fill()));
        }, _runStroke = () => {
            doStroke && !parsedPath.isSvg && (strokeCb ? strokeCb(context, symbol.attribute, symbolAttribute) : sVisible && clipRange >= 1 && (context.setStrokeStyle(symbol, symbol.attribute, (originX - x) / scaleX, (originY - y) / scaleY, symbolAttribute), 
            context.stroke()));
        };
        fillStrokeOrder ? (_runStroke(), _runFill()) : (_runFill(), _runStroke()), this.afterRenderStep(symbol, context, x, y, doFill, doStroke, fVisible, sVisible, symbolAttribute, drawContext, fillCb, strokeCb);
    }
    draw(symbol, renderService, drawContext, params) {
        const symbolAttribute = getTheme(symbol, null == params ? void 0 : params.theme).symbol;
        this._draw(symbol, symbolAttribute, !1, drawContext, params);
    }
};

DefaultCanvasSymbolRender = __decorate([ injectable(), __param(0, inject(ContributionProvider)), __param(0, named(SymbolRenderContribution)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasSymbolRender);

export { DefaultCanvasSymbolRender };
//# sourceMappingURL=symbol-render.js.map
