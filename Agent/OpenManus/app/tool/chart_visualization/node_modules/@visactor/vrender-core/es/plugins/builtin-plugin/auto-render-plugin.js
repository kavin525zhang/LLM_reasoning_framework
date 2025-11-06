import { Generator } from "../../common/generator";

import { application } from "../../application";

export class AutoRenderPlugin {
    constructor() {
        this.name = "AutoRenderPlugin", this.activeEvent = "onRegister", this._uid = Generator.GenAutoIncrementId(), 
        this.key = this.name + this._uid, this.handleChange = graphic => {
            graphic.glyphHost && (graphic = graphic.glyphHost), graphic.stage === this.pluginService.stage && null != graphic.stage && graphic.stage.renderNextFrame();
        };
    }
    activate(context) {
        this.pluginService = context, application.graphicService.hooks.onAttributeUpdate.tap(this.key, this.handleChange), 
        application.graphicService.hooks.onSetStage.tap(this.key, this.handleChange), application.graphicService.hooks.onRemove.tap(this.key, this.handleChange);
    }
    deactivate(context) {
        const filterByName = taps => taps.filter((item => item.name !== this.key));
        application.graphicService.hooks.onAttributeUpdate.taps = filterByName(application.graphicService.hooks.onAttributeUpdate.taps), 
        application.graphicService.hooks.onSetStage.taps = filterByName(application.graphicService.hooks.onSetStage.taps), 
        application.graphicService.hooks.onRemove.taps = filterByName(application.graphicService.hooks.onRemove.taps);
    }
}
//# sourceMappingURL=auto-render-plugin.js.map
