var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}, __metadata = this && this.__metadata || function(k, v) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
};

import { injectable, BaseEnvContribution, RafBasedSTO } from "@visactor/vrender-core";

import { CanvasWrapDisableWH } from "./canvas-wrap";

function createCanvas(width, height, id) {
    const _c = new OffscreenCanvas(width, height), context = _c.getContext("2d");
    return new CanvasWrapDisableWH({
        width: width,
        height: height,
        context: context,
        _c: _c,
        getBoundingClientRect: () => ({
            width: width,
            height: height
        }),
        getContext: () => context
    }, context, 1, width, height, id);
}

let HarmonyEnvContribution = class extends BaseEnvContribution {
    constructor() {
        super(), this.type = "harmony", this.supportEvent = !0, this.supportsTouchEvents = !0;
        try {
            this.supportsPointerEvents = !!globalThis.PointerEvent, this.supportsMouseEvents = !!globalThis.MouseEvent;
        } catch (err) {
            this.supportsPointerEvents = !1, this.supportsMouseEvents = !1;
        }
        this.applyStyles = !0, this.rafSTO = new RafBasedSTO(0);
    }
    configure(service, params) {
        service.env === this.type && service.setActiveEnvContribution(this);
    }
    getDynamicCanvasCount() {
        return 9999;
    }
    getStaticCanvasCount() {
        return 9999;
    }
    loadImage(url) {}
    loadSvg(url) {
        return Promise.reject();
    }
    createCanvas(params) {
        return createCanvas(params.width, params.height, params.id);
    }
    createOffscreenCanvas(params) {}
    releaseCanvas(canvas) {}
    getDevicePixelRatio() {
        return 1;
    }
    getRequestAnimationFrame() {
        return callback => this.rafSTO.call(callback);
    }
    getCancelAnimationFrame() {
        return h => {
            this.rafSTO.clear(h);
        };
    }
    mapToCanvasPoint(event) {
        var _a;
        return null === (_a = null == event ? void 0 : event.type) || void 0 === _a || _a.startsWith("mouse"), 
        event;
    }
    addEventListener(type, listener, options) {
        return null;
    }
    removeEventListener(type, listener, options) {
        return null;
    }
    dispatchEvent(event) {
        return null;
    }
    getElementById(str) {
        return null;
    }
    getRootElement() {
        return null;
    }
    getDocument() {
        return null;
    }
    release(...params) {}
};

HarmonyEnvContribution = __decorate([ injectable(), __metadata("design:paramtypes", []) ], HarmonyEnvContribution);

export { HarmonyEnvContribution };
//# sourceMappingURL=harmony-contribution.js.map