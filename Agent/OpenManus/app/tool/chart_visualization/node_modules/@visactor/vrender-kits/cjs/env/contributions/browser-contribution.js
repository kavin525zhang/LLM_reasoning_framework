"use strict";

var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}, __metadata = this && this.__metadata || function(k, v) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
}, __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))((function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            var value;
            result.done ? resolve(result.value) : (value = result.value, value instanceof P ? value : new P((function(resolve) {
                resolve(value);
            }))).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    }));
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BrowserEnvContribution = exports.createImageElement = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), vutils_1 = require("@visactor/vutils");

class DynamicB {
    get x1() {
        return this.dom.getBoundingClientRect().left;
    }
    get x2() {
        return this.dom.getBoundingClientRect().right;
    }
    get y1() {
        return this.dom.getBoundingClientRect().top;
    }
    get y2() {
        return this.dom.getBoundingClientRect().bottom;
    }
    get width() {
        return this.dom.getBoundingClientRect().width;
    }
    get height() {
        return this.dom.getBoundingClientRect().height;
    }
    constructor(dom) {
        this.dom = dom;
    }
}

function createImageElement(src, isSvg = !1) {
    const img = document.createElement("img");
    if (vrender_core_1.application.global.isImageAnonymous && (img.crossOrigin = "anonymous"), 
    isSvg) {
        const data = new Blob([ src ], {
            type: "image/svg+xml"
        });
        src = window.URL.createObjectURL(data);
    }
    if (img.src = src, img.complete) return Promise.resolve(img);
    return new Promise(((resolve, reject) => {
        img.onload = () => {
            resolve(img);
        }, img.onerror = () => {
            reject(new Error("加载失败"));
        };
    }));
}

exports.createImageElement = createImageElement;

let BrowserEnvContribution = class extends vrender_core_1.BaseEnvContribution {
    constructor() {
        super(), this.type = "browser", this.supportEvent = !0;
        try {
            this.supportsTouchEvents = "ontouchstart" in globalThis, this.supportsPointerEvents = !!globalThis.PointerEvent, 
            this.supportsMouseEvents = !!globalThis.MouseEvent;
        } catch (err) {
            this.supportsTouchEvents = !1, this.supportsPointerEvents = !1, this.supportsPointerEvents = !1;
        }
        this.applyStyles = !0;
    }
    mapToCanvasPoint(nativeEvent, domElement) {
        var _a, _b;
        let clientX = 0, clientY = 0, offsetX = 0, offsetY = 0;
        if (nativeEvent.changedTouches) {
            const data = null !== (_a = nativeEvent.changedTouches[0]) && void 0 !== _a ? _a : {};
            clientX = data.clientX || 0, clientY = data.clientY || 0, offsetX = clientX, offsetY = clientY;
        } else clientX = nativeEvent.clientX || 0, clientY = nativeEvent.clientY || 0, offsetX = nativeEvent.offsetX || 0, 
        offsetY = nativeEvent.offsetY || 0;
        if (domElement) {
            const x = clientX, y = clientY, rect = domElement.getBoundingClientRect(), nativeCanvas = null === (_b = domElement.getNativeHandler) || void 0 === _b ? void 0 : _b.call(domElement).nativeCanvas;
            let scaleX, scaleY;
            return nativeCanvas && (scaleX = rect.width / nativeCanvas.offsetWidth, scaleY = rect.height / nativeCanvas.offsetHeight), 
            {
                x: (x - rect.left) / ((0, vutils_1.isValidNumber)(scaleX) ? scaleX : 1),
                y: (y - rect.top) / ((0, vutils_1.isValidNumber)(scaleY) ? scaleY : 1)
            };
        }
        return {
            x: offsetX,
            y: offsetY
        };
    }
    getNativeAABBBounds(_dom) {
        let dom = _dom;
        if ("string" == typeof _dom && (dom = (new DOMParser).parseFromString(_dom, "text/html").firstChild, 
        dom.lastChild && (dom = dom.lastChild.firstChild)), dom.getBoundingClientRect) {
            const b = dom.getBoundingClientRect();
            return new DynamicB(b);
        }
        return new vutils_1.AABBBounds;
    }
    removeDom(dom) {
        return dom.parentElement.removeChild(dom), !0;
    }
    updateDom(dom, params) {
        const {width: width, height: height, style: style} = params;
        return style && ((0, vutils_1.isString)(style) ? dom.setAttribute("style", style) : Object.keys(style).forEach((k => {
            dom.style[k] = style[k];
        }))), null != width && (dom.style.width = `${width}px`), null != height && (dom.style.height = `${height}px`), 
        !0;
    }
    createDom(params) {
        const {tagName: tagName = "div", parent: parent} = params, element = document.createElement(tagName);
        if (this.updateDom(element, params), parent) {
            const pd = (0, vutils_1.isString)(parent) ? this.getElementById(parent) : parent;
            pd && pd.appendChild && pd.appendChild(element);
        }
        return element;
    }
    loadImage(url) {
        return createImageElement(url, !1).then((img => ({
            data: img,
            loadState: "success"
        }))).catch((() => ({
            data: null,
            loadState: "fail"
        })));
    }
    loadSvg(url) {
        return createImageElement(url, !0).then((img => ({
            data: img,
            loadState: "success"
        }))).catch((() => ({
            data: null,
            loadState: "fail"
        })));
    }
    createCanvas(params) {
        var _a, _b;
        const canvas = document.createElement("canvas");
        params.id && (canvas.id = null !== (_a = params.id) && void 0 !== _a ? _a : vrender_core_1.Generator.GenAutoIncrementId().toString());
        const dpr = null !== (_b = params.dpr) && void 0 !== _b ? _b : window.devicePixelRatio;
        return params.width && params.height && (canvas.style.width = `${params.width}px`, 
        canvas.style.height = `${params.height}px`, canvas.width = params.width * dpr, canvas.height = params.height * dpr), 
        canvas;
    }
    createOffscreenCanvas(params) {
        var _a;
        const dpr = null !== (_a = params.dpr) && void 0 !== _a ? _a : window.devicePixelRatio;
        return new OffscreenCanvas(params.width * dpr, params.height * dpr);
    }
    releaseCanvas(canvas) {
        let c;
        c = "string" == typeof canvas ? document.getElementById(canvas) : canvas, c && c.parentElement && c.parentElement.removeChild(c);
    }
    getDevicePixelRatio() {
        return window.devicePixelRatio;
    }
    getRequestAnimationFrame() {
        return window.requestAnimationFrame;
    }
    getCancelAnimationFrame() {
        return window.cancelAnimationFrame;
    }
    addEventListener(type, listener, options) {
        return document.addEventListener(type, listener, options);
    }
    removeEventListener(type, listener, options) {
        return document.removeEventListener(type, listener, options);
    }
    dispatchEvent(event) {
        return document.dispatchEvent(event);
    }
    getElementById(str) {
        return document.getElementById(str);
    }
    getRootElement() {
        return document.body;
    }
    getDocument() {
        return document;
    }
    release(...params) {}
    getElementTop(element, baseWindow) {
        let actualTop = element.offsetTop, current = element.offsetParent;
        for (;null !== current; ) actualTop += current.offsetTop, current = current.offsetParent;
        return actualTop;
    }
    getElementLeft(element, baseWindow) {
        let actualLeft = element.offsetLeft, current = element.offsetParent;
        for (;null !== current; ) actualLeft += current.offsetLeft, current = current.offsetParent;
        return actualLeft;
    }
    getElementTopLeft(element, baseWindow) {
        let actualTop = element.offsetTop, actualLeft = element.offsetLeft, current = element.offsetParent;
        for (;null !== current; ) actualTop += current.offsetTop, actualLeft += current.offsetLeft, 
        current = current.offsetParent;
        return {
            top: actualTop,
            left: actualLeft
        };
    }
    loadFont(font, source, descriptors) {
        return __awaiter(this, void 0, void 0, (function*() {
            return new FontFace(font, (0, vutils_1.isString)(source) ? `url(${source})` : source, descriptors).load().then((function(loadedFont) {
                return document.fonts.add(loadedFont), {
                    loadState: "success"
                };
            })).catch((function(error) {
                return console.error("Failed to load font:", error), {
                    loadState: "fail"
                };
            }));
        }));
    }
    isMacOS() {
        if (void 0 === this._isMacOS) try {
            this._isMacOS = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        } catch (err) {
            this._isMacOS = !1;
        }
        return this._isMacOS;
    }
    copyToClipBoard(text) {
        return navigator.clipboard.writeText(text).then((() => {})).catch((err => {}));
    }
};

BrowserEnvContribution = __decorate([ (0, vrender_core_1.injectable)(), __metadata("design:paramtypes", []) ], BrowserEnvContribution), 
exports.BrowserEnvContribution = BrowserEnvContribution;
//# sourceMappingURL=browser-contribution.js.map