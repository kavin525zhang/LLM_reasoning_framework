"use strict";

var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.TaroContext2d = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), browser_1 = require("../browser"), vutils_1 = require("@visactor/vutils");

let TaroContext2d = class extends browser_1.BrowserContext2d {
    get globalAlpha() {
        return this._globalAlpha;
    }
    set globalAlpha(ga) {
        this.nativeContext.setGlobalAlpha(ga), this._globalAlpha = ga;
    }
    draw() {
        this.nativeContext.draw();
    }
    strokeText(text, x, y) {}
    _setCommonStyle(params, attribute, offsetX, offsetY, defaultParams) {
        const _context = this.nativeContext;
        defaultParams || (defaultParams = this.fillAttributes);
        const {fillOpacity: fillOpacity = defaultParams.fillOpacity, opacity: opacity = defaultParams.opacity, fill: fill = defaultParams.fill} = attribute;
        fillOpacity > 1e-12 && opacity > 1e-12 && (_context.setGlobalAlpha(fillOpacity * opacity), 
        _context.setFillStyle((0, vrender_core_1.createColor)(this, fill, params, offsetX, offsetY)));
    }
    _setStrokeStyle(params, attribute, offsetX, offsetY, defaultParams) {
        const _context = this.nativeContext;
        defaultParams || (defaultParams = this.strokeAttributes);
        const {strokeOpacity: strokeOpacity = defaultParams.strokeOpacity, opacity: opacity = defaultParams.opacity} = attribute;
        if (strokeOpacity > 1e-12 && opacity > 1e-12) {
            const {lineWidth: lineWidth = defaultParams.lineWidth, stroke: stroke = defaultParams.stroke, lineJoin: lineJoin = defaultParams.lineJoin, lineDash: lineDash = defaultParams.lineDash, lineDashOffset: lineDashOffset = defaultParams.lineDashOffset, lineCap: lineCap = defaultParams.lineCap, miterLimit: miterLimit = defaultParams.miterLimit, keepStrokeScale: keepStrokeScale = defaultParams.keepStrokeScale} = attribute;
            _context.setGlobalAlpha(strokeOpacity * opacity), _context.setLineWidth(keepStrokeScale ? lineWidth : (0, 
            vrender_core_1.getScaledStroke)(this, lineWidth, this.dpr)), _context.setStrokeStyle((0, 
            vrender_core_1.createColor)(this, stroke, params, offsetX, offsetY)), _context.setLineJoin(lineJoin), 
            lineDash && (_context.setLineDash(lineDash), _context.lineDashOffset = lineDashOffset), 
            _context.setLineCap(lineCap), _context.setMiterLimit(miterLimit);
        }
    }
    setTextStyleWithoutAlignBaseline(params, defaultParams) {
        var _a;
        const _context = this.nativeContext;
        defaultParams || (defaultParams = this.textAttributes), params.font ? _context.font = params.font : _context.font = (0, 
        vutils_1.getContextFont)(params, defaultParams), _context.setFontSize(null !== (_a = params.fontSize) && void 0 !== _a ? _a : defaultParams.fontSize);
    }
    setTextStyle(params, defaultParams) {
        var _a, _b;
        const _context = this.nativeContext;
        defaultParams || (defaultParams = this.textAttributes), params.font ? _context.font = params.font : _context.font = (0, 
        vutils_1.getContextFont)(params, defaultParams), _context.setTextAlign(null !== (_a = params.textAlign) && void 0 !== _a ? _a : defaultParams.textAlign), 
        _context.setTextBaseline(null !== (_b = params.textBaseline) && void 0 !== _b ? _b : defaultParams.textBaseline);
    }
    createConicGradient(x, y, startAngle, endAngle) {
        return null;
    }
    createPattern(image, repetition) {
        return null;
    }
    getImageData(sx, sy, sw, sh) {
        const ctx = this.nativeContext, taro = ctx.taro;
        if (ctx && taro) return !ctx.getImageData && taro.canvasGetImageData ? new Promise(((resolve, reject) => {
            try {
                taro.canvasGetImageData({
                    canvasId: this.canvas.nativeCanvas.id,
                    sx: sx,
                    sy: sy,
                    sw: sw,
                    sh: sh,
                    success(res) {
                        resolve(res);
                    }
                });
            } catch (err) {
                reject(err);
            }
        })) : void 0;
    }
    createRadialGradient(x0, y0, r0, x1, y1, r1) {
        return this.nativeContext.createCircularGradient && this.nativeContext.createCircularGradient(x0, y0, r0, x1, y1, r1);
    }
};

TaroContext2d.env = "taro", TaroContext2d = __decorate([ (0, vrender_core_1.injectable)() ], TaroContext2d), 
exports.TaroContext2d = TaroContext2d;
//# sourceMappingURL=context.js.map
