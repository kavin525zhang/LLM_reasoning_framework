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

import { inject, injectable, Pyramid3dRender, PYRAMID3D_NUMBER_TYPE } from "@visactor/vrender-core";

import { Base3dPicker } from "../common/base-3d-picker";

let DefaultCanvasPyramid3dPicker = class extends Base3dPicker {
    constructor(canvasRenderer) {
        super(), this.canvasRenderer = canvasRenderer, this.type = "pyramid3d", this.numberType = PYRAMID3D_NUMBER_TYPE, 
        this.themeType = "polygon";
    }
};

DefaultCanvasPyramid3dPicker = __decorate([ injectable(), __param(0, inject(Pyramid3dRender)), __metadata("design:paramtypes", [ Object ]) ], DefaultCanvasPyramid3dPicker);

export { DefaultCanvasPyramid3dPicker };
//# sourceMappingURL=pyramid3d-picker.js.map
