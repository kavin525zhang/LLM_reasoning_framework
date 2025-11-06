"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.AutoRefreshPlugin = void 0;

const generator_1 = require("../../common/generator"), application_1 = require("../../application");

class AutoRefreshPlugin {
    constructor() {
        this.name = "AutoRefreshPlugin", this.activeEvent = "onRegister", this._uid = generator_1.Generator.GenAutoIncrementId(), 
        this.key = this.name + this._uid, this.handleChange = graphic => {
            graphic.glyphHost && (graphic = graphic.glyphHost), graphic.stage === this.pluginService.stage && null != graphic.stage && graphic.stage.renderNextFrame();
        };
    }
    activate(context) {
        this.pluginService = context, this.dpr = application_1.application.global.devicePixelRatio, 
        this.refresh();
    }
    refresh() {
        this._refreshByMediaQuery() || this._refreshByRaf();
    }
    _refreshByRaf() {
        const raf = application_1.application.global.getRequestAnimationFrame();
        this.rafId = raf((() => {
            application_1.application.global.devicePixelRatio !== this.dpr && (this.dpr = application_1.application.global.devicePixelRatio, 
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
        const craf = application_1.application.global.getCancelAnimationFrame();
        craf && this.rafId && craf(this.rafId), null === (_a = this.autoRefreshCbs) || void 0 === _a || _a.forEach((cb => {
            cb();
        })), this.autoRefreshCbs = void 0;
    }
}

exports.AutoRefreshPlugin = AutoRefreshPlugin;
//# sourceMappingURL=auto-refresh-plugin.js.map
