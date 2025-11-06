"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.AutoRenderPlugin = void 0;

const generator_1 = require("../../common/generator"), application_1 = require("../../application");

class AutoRenderPlugin {
    constructor() {
        this.name = "AutoRenderPlugin", this.activeEvent = "onRegister", this._uid = generator_1.Generator.GenAutoIncrementId(), 
        this.key = this.name + this._uid, this.handleChange = graphic => {
            graphic.glyphHost && (graphic = graphic.glyphHost), graphic.stage === this.pluginService.stage && null != graphic.stage && graphic.stage.renderNextFrame();
        };
    }
    activate(context) {
        this.pluginService = context, application_1.application.graphicService.hooks.onAttributeUpdate.tap(this.key, this.handleChange), 
        application_1.application.graphicService.hooks.onSetStage.tap(this.key, this.handleChange), 
        application_1.application.graphicService.hooks.onRemove.tap(this.key, this.handleChange);
    }
    deactivate(context) {
        const filterByName = taps => taps.filter((item => item.name !== this.key));
        application_1.application.graphicService.hooks.onAttributeUpdate.taps = filterByName(application_1.application.graphicService.hooks.onAttributeUpdate.taps), 
        application_1.application.graphicService.hooks.onSetStage.taps = filterByName(application_1.application.graphicService.hooks.onSetStage.taps), 
        application_1.application.graphicService.hooks.onRemove.taps = filterByName(application_1.application.graphicService.hooks.onRemove.taps);
    }
}

exports.AutoRenderPlugin = AutoRenderPlugin;
//# sourceMappingURL=auto-render-plugin.js.map
