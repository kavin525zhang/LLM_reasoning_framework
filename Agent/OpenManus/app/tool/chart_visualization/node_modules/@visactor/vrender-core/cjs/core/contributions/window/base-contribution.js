"use strict";

var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}, __metadata = this && this.__metadata || function(k, v) {
    if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseWindowHandlerContribution = void 0;

const inversify_lite_1 = require("../../../common/inversify-lite"), generator_1 = require("../../../common/generator"), vutils_1 = require("@visactor/vutils");

let BaseWindowHandlerContribution = class {
    constructor() {
        this._uid = generator_1.Generator.GenAutoIncrementId(), this.viewBox = new vutils_1.AABBBounds, 
        this.modelMatrix = new vutils_1.Matrix(1, 0, 0, 1, 0, 0);
    }
    onChange(cb) {
        this._onChangeCb = cb;
    }
    configure(window, global) {
        global.env === this.type && window.setWindowHandler(this);
    }
    release(...params) {
        this.releaseWindow();
    }
    isVisible(bbox) {
        return !0;
    }
    onVisibleChange(cb) {}
    getTopLeft(baseWindow) {
        return {
            top: 0,
            left: 0
        };
    }
    setViewBox(vb) {
        this.viewBox.setValue(vb.x1, vb.y1, vb.x2, vb.y2);
    }
    getViewBox() {
        return this.viewBox;
    }
    setViewBoxTransform(a, b, c, d, e, f) {
        this.modelMatrix.setValue(a, b, c, d, e, f);
    }
    getViewBoxTransform() {
        return this.modelMatrix;
    }
};

BaseWindowHandlerContribution = __decorate([ (0, inversify_lite_1.injectable)(), __metadata("design:paramtypes", []) ], BaseWindowHandlerContribution), 
exports.BaseWindowHandlerContribution = BaseWindowHandlerContribution;
//# sourceMappingURL=base-contribution.js.map
