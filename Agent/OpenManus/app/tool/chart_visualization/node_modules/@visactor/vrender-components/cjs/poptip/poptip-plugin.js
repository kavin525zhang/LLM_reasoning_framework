"use strict";

var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PopTipForClipedTextPlugin = exports.PopTipPlugin = exports.PopTipPluginBase = void 0;

const vrender_core_1 = require("@visactor/vrender-core");

class PopTipPluginBase {
    constructor() {
        this.activeEvent = "onRegister", this._uid = vrender_core_1.Generator.GenAutoIncrementId(), 
        this.poptip = e => {
            const graphic = e.target;
            this.needHide(graphic) ? this.unpoptip(e) : graphic !== this.activeGraphic && (this.needShow(graphic) && (graphic.setAttributes({}), 
            graphic._showPoptip = 1), this.activeGraphic && (this.activeGraphic.setAttributes({}), 
            this.activeGraphic._showPoptip = 2), this.setActiveGraphic(graphic, !0));
        }, this.unpoptip = e => {
            this.activeGraphic && (this.activeGraphic.setAttributes({}), this.activeGraphic._showPoptip = 2, 
            this.setActiveGraphic(null, !0));
        };
    }
    activate(context) {
        this.pluginService = context;
        const {stage: stage} = this.pluginService;
        stage.addEventListener("pointerover", this.poptip);
    }
    needHide(graphic) {
        return graphic.isContainer || !graphic.attribute;
    }
    needShow(graphic) {
        return !!graphic.attribute.poptip;
    }
    setActiveGraphic(graphic, rerender) {
        this.activeGraphic = graphic, this.pluginService.stage.renderNextFrame();
    }
    deactivate(context) {
        const {stage: stage} = this.pluginService;
        stage.removeEventListener("pointerover", this.poptip);
    }
}

exports.PopTipPluginBase = PopTipPluginBase;

let PopTipPlugin = class extends PopTipPluginBase {
    constructor() {
        super(...arguments), this.name = "poptip", this.key = this.name + this._uid;
    }
};

PopTipPlugin = __decorate([ (0, vrender_core_1.injectable)() ], PopTipPlugin), exports.PopTipPlugin = PopTipPlugin;

let PopTipForClipedTextPlugin = class extends PopTipPluginBase {
    constructor() {
        super(...arguments), this.name = "poptipForText", this.key = this.name + this._uid, 
        this.pointerlave = e => {
            const {stage: stage} = this.pluginService;
            e.target === stage && this.unpoptip(e);
        };
    }
    activate(context) {
        super.activate(context);
        const {stage: stage} = this.pluginService;
        stage.addEventListener("pointerleave", this.pointerlave);
    }
    needHide(graphic) {
        return "text" !== graphic.type || !graphic.cliped || graphic.isContainer || !graphic.attribute || graphic.attribute.disableAutoClipedPoptip;
    }
    needShow(graphic) {
        return !0;
    }
    deactivate(context) {
        const {stage: stage} = this.pluginService;
        super.deactivate(context), stage.removeEventListener("pointerleave", this.pointerlave);
    }
};

PopTipForClipedTextPlugin = __decorate([ (0, vrender_core_1.injectable)() ], PopTipForClipedTextPlugin), 
exports.PopTipForClipedTextPlugin = PopTipForClipedTextPlugin;
//# sourceMappingURL=poptip-plugin.js.map
