import { Generator } from "../../common/generator";

import { application } from "../../application";

export class AutoRefreshPlugin {
    constructor() {
        this.name = "AutoRefreshPlugin", this.activeEvent = "onRegister", this._uid = Generator.GenAutoIncrementId(), 
        this.key = this.name + this._uid, this.handleChange = graphic => {
            graphic.glyphHost && (graphic = graphic.glyphHost), graphic.stage === this.pluginService.stage && null != graphic.stage && graphic.stage.renderNextFrame();
        };
    }
    activate(context) {
        this.pluginService = context, this.dpr = application.global.devicePixelRatio, this.refresh();
    }
    refresh() {
        this._refreshByMediaQuery() || this._refreshByRaf();
    }
    _refreshByRaf() {
        const raf = application.global.getRequestAnimationFrame();
        this.rafId = raf((() => {
            application.global.devicePixelRatio !== this.dpr && (this.dpr = application.global.devicePixelRatio, 
            this.pluginService.stage.setDpr(this.dpr, !0)), this.refresh();
        }));
    }
    _refreshByMediaQuery() {
        try {
            const mqString = `(resolution: ${window.devicePixelRatio}dppx)`, updatePixelRatio = () => {
                window.devicePixelRatio !== this.dpr && (this.dpr = window.devicePixelRatio, this.pluginService.stage.setDpr(this.dpr, !0));
            }, dom = matchMedia(mqString);
            dom && dom.addEventListener("change", updatePixelRatio), this.autoRefreshCbs || (this.autoRefreshCbs = []), 
            this.autoRefreshCbs.push((() => {
                dom && dom.removeEventListener("change", updatePixelRatio);
            }));
        } catch (err) {
            return !1;
        }
        return !0;
    }
    deactivate(context) {
        var _a;
        const craf = application.global.getCancelAnimationFrame();
        craf && this.rafId && craf(this.rafId), null === (_a = this.autoRefreshCbs) || void 0 === _a || _a.forEach((cb => {
            cb();
        })), this.autoRefreshCbs = void 0;
    }
}
//# sourceMappingURL=auto-refresh-plugin.js.map
