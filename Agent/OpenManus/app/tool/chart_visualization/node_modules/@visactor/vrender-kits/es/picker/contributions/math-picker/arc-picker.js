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

import { inject, injectable, ArcRender, ARC_NUMBER_TYPE } from "@visactor/vrender-core";

import { PickerBase } from "../common/base";

let DefaultMathArcPicker = class extends PickerBase {
    constructor(canvasRenderer) {
        super(), this.canvasRenderer = canvasRenderer, this.type = "arc", this.numberType = ARC_NUMBER_TYPE;
    }
};

DefaultMathArcPicker = __decorate([ injectable(), __param(0, inject(ArcRender)), __metadata("design:paramtypes", [ Object ]) ], DefaultMathArcPicker);

export { DefaultMathArcPicker };
//# sourceMappingURL=arc-picker.js.map
