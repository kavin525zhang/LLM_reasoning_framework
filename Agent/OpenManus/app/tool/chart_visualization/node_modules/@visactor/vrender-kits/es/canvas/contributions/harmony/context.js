var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import { injectable, createColor, getScaledStroke, application } from "@visactor/vrender-core";

import { BrowserContext2d } from "../browser";

import { getContextFont } from "@visactor/vutils";

let HarmonyContext2d = class extends BrowserContext2d {
    get globalAlpha() {
        return this._globalAlpha;
    }
    set globalAlpha(ga) {
        this.nativeContext.globalAlpha = ga * this.baseGlobalAlpha, this._globalAlpha = ga * this.baseGlobalAlpha;
    }
    setLineDash(segments) {
        const a = arguments, _context = this.nativeContext;
        if (this.nativeContext.setLineDash) {
            const lineDash = a[0];
            if (0 === lineDash[0] && 0 === lineDash[1]) return;
            lineDash && _context.setLineDash(lineDash);
        }
    }
    _setStrokeStyle(params, attribute, offsetX, offsetY, defaultParams) {
        const _context = this.nativeContext;
        defaultParams || (defaultParams = this.strokeAttributes);
        const {strokeOpacity: strokeOpacity = defaultParams.strokeOpacity, opacity: opacity = defaultParams.opacity} = attribute;
        if (strokeOpacity > 1e-12 && opacity > 1e-12) {
            const {lineWidth: lineWidth = defaultParams.lineWidth, stroke: stroke = defaultParams.stroke, lineJoin: lineJoin = defaultParams.lineJoin, lineDash: lineDash = defaultParams.lineDash, lineCap: lineCap = defaultParams.lineCap, miterLimit: miterLimit = defaultParams.miterLimit, keepStrokeScale: keepStrokeScale = defaultParams.keepStrokeScale, lineDashOffset: lineDashOffset = defaultParams.lineDashOffset} = attribute;
            _context.globalAlpha = strokeOpacity * opacity * this.baseGlobalAlpha, _context.lineWidth = keepStrokeScale ? lineWidth : getScaledStroke(this, lineWidth, this.dpr), 
            _context.strokeStyle = createColor(this, stroke, params, offsetX, offsetY), _context.lineJoin = lineJoin, 
            0 === lineDash[0] && 0 === lineDash[1] || (lineDash && _context.setLineDash(lineDash), 
            _context.lineDashOffset = lineDashOffset), _context.lineCap = lineCap, _context.miterLimit = miterLimit;
        }
    }
    measureText(text, method = application.global.measureTextMethod) {
        this.setTransform(1, 0, 0, 1, 0, 0, !0, application.global.devicePixelRatio);
        return super.measureText(text, method);
    }
    setTextStyleWithoutAlignBaseline(params, defaultParams, z) {
        const _context = this.nativeContext;
        defaultParams || (defaultParams = this.textAttributes);
        const {scaleIn3d: scaleIn3d = defaultParams.scaleIn3d} = params;
        let font = "";
        font = params.font ? params.font : getContextFont(params, defaultParams, scaleIn3d && this.camera && this.camera.getProjectionScale(z)), 
        _context.font = (font || "").replace("px", "vp");
        const {fontFamily: fontFamily = defaultParams.fontFamily, fontSize: fontSize = defaultParams.fontSize} = params;
        this.fontFamily = fontFamily, this.fontSize = fontSize, _context.textAlign = "left", 
        _context.textBaseline = "alphabetic";
    }
    setTextStyle(params, defaultParams, z) {
        var _a, _b;
        const _context = this.nativeContext;
        defaultParams || (defaultParams = this.textAttributes);
        let font = "";
        font = params.font ? params.font : getContextFont(params, defaultParams, this.camera && this.camera.getProjectionScale(z)), 
        _context.font = (font || "").replace("px", "vp");
        const {fontFamily: fontFamily = defaultParams.fontFamily, fontSize: fontSize = defaultParams.fontSize} = params;
        this.fontFamily = fontFamily, this.fontSize = fontSize, _context.textAlign = null !== (_a = params.textAlign) && void 0 !== _a ? _a : defaultParams.textAlign, 
        _context.textBaseline = null !== (_b = params.textBaseline) && void 0 !== _b ? _b : defaultParams.textBaseline;
    }
    createPattern(image, repetition) {
        return null;
    }
    drawImage() {
        const _context = this.nativeContext, a = arguments;
        a[0].drawImage && (a[0] = a[0].transferToImageBitmap()), 3 === a.length ? _context.drawImage(a[0], a[1], a[2]) : 5 === a.length ? _context.drawImage(a[0], a[1], a[2], a[3], a[4]) : 9 === a.length && _context.drawImage(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
    }
    draw() {}
};

HarmonyContext2d.env = "harmony", HarmonyContext2d = __decorate([ injectable() ], HarmonyContext2d);

export { HarmonyContext2d };
//# sourceMappingURL=context.js.map
