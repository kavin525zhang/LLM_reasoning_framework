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
}), exports.DefaultMathPickerService = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), constants_1 = require("./contributions/constants");

let DefaultMathPickerService = class extends vrender_core_1.DefaultPickService {
    constructor(contributions, pickItemInterceptorContributions, pickServiceInterceptorContributions) {
        super(pickItemInterceptorContributions, pickServiceInterceptorContributions), this.contributions = contributions, 
        this.pickItemInterceptorContributions = pickItemInterceptorContributions, this.pickServiceInterceptorContributions = pickServiceInterceptorContributions, 
        this.global.hooks.onSetEnv.tap("math-picker-service", ((lastEnv, env, global) => {
            this.configure(global, env);
        })), this.configure(this.global, this.global.env), this.pickerMap = new Map, this.init();
    }
    init() {
        this.contributions.getContributions().forEach((item => {
            this.pickerMap.set(item.numberType, item);
        })), super._init();
    }
    configure(global, env) {
        this.pickContext = new vrender_core_1.EmptyContext2d(null, 1);
    }
    pickItem(graphic, point, parentMatrix, params) {
        if (!1 === graphic.attribute.pickable) return null;
        const picker = this.pickerMap.get(graphic.numberType);
        if (!picker) return null;
        const pd = picker.contains(graphic, point, params), g = pd ? graphic : null;
        return g ? {
            graphic: g,
            params: pd
        } : null;
    }
};

DefaultMathPickerService = __decorate([ (0, vrender_core_1.injectable)(), __param(0, (0, 
vrender_core_1.inject)(vrender_core_1.ContributionProvider)), __param(0, (0, vrender_core_1.named)(constants_1.MathPickerContribution)), __param(1, (0, 
vrender_core_1.inject)(vrender_core_1.ContributionProvider)), __param(1, (0, vrender_core_1.named)(vrender_core_1.PickItemInterceptor)), __param(2, (0, 
vrender_core_1.inject)(vrender_core_1.ContributionProvider)), __param(2, (0, vrender_core_1.named)(vrender_core_1.PickServiceInterceptor)), __metadata("design:paramtypes", [ Object, Object, Object ]) ], DefaultMathPickerService), 
exports.DefaultMathPickerService = DefaultMathPickerService;
//# sourceMappingURL=math-picker-service.js.map