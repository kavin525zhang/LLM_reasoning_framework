var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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

import { injectable } from "../../../common/inversify-lite";

import { AABBBounds } from "@visactor/vutils";

let BaseEnvContribution = class {
    configure(service, ...p) {
        service.env === this.type && service.setActiveEnvContribution(this);
    }
    getNativeAABBBounds(dom) {
        return new AABBBounds;
    }
    removeDom(dom) {
        return !1;
    }
    createDom(params) {
        return null;
    }
    updateDom(dom, params) {
        return !1;
    }
    getDynamicCanvasCount() {
        return 999;
    }
    getStaticCanvasCount() {
        return 999;
    }
    getElementById(str) {
        return document.getElementById(str);
    }
    getRootElement() {
        return document.body;
    }
    loadJson(url) {
        const jsonPromise = fetch(url).then((data => data.json()));
        return jsonPromise.then((json => ({
            data: json,
            state: "success"
        }))).catch((() => ({
            data: null,
            state: "fail"
        }))), jsonPromise;
    }
    loadArrayBuffer(url) {
        return fetch(url).then((data => data.arrayBuffer())).then((arrayBuffer => ({
            data: arrayBuffer,
            loadState: "success"
        }))).catch((() => ({
            data: null,
            loadState: "fail"
        })));
    }
    loadBlob(url) {
        return fetch(url).then((data => data.blob())).then((blob => ({
            data: blob,
            loadState: "success"
        }))).catch((() => ({
            data: null,
            loadState: "fail"
        })));
    }
    getElementTop(dom, baseWindow) {
        return 0;
    }
    getElementLeft(dom, baseWindow) {
        return 0;
    }
    getElementTopLeft(dom, baseWindow) {
        return {
            top: 0,
            left: 0
        };
    }
    loadFont(font, source, descriptors) {
        return __awaiter(this, void 0, void 0, (function*() {
            return {
                loadState: "fail"
            };
        }));
    }
    isMacOS() {
        return !1;
    }
    copyToClipBoard(text) {
        return Promise.resolve(null);
    }
};

BaseEnvContribution = __decorate([ injectable() ], BaseEnvContribution);

export { BaseEnvContribution };
//# sourceMappingURL=base-contribution.js.map
