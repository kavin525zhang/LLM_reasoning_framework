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
}), exports.DefaultCanvasRect3dPicker = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), base_3d_picker_1 = require("../common/base-3d-picker");

let DefaultCanvasRect3dPicker = class extends base_3d_picker_1.Base3dPicker {
    constructor(canvasRenderer) {
        super(), this.canvasRenderer = canvasRenderer, this.type = "rect3d", this.numberType = vrender_core_1.RECT3D_NUMBER_TYPE, 
        this.themeType = "rect";
    }
};

DefaultCanvasRect3dPicker = __decorate([ (0, vrender_core_1.injectable)(), __param(0, (0, 
vrender_core_1.inject)(vrender_core_1.Rect3DRender)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasRect3dPicker), 
exports.DefaultCanvasRect3dPicker = DefaultCanvasRect3dPicker;
//# sourceMappingURL=rect3d-picker.js.map
