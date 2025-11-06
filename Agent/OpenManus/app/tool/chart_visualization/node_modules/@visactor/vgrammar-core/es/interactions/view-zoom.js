import { throttle } from "@visactor/vutils";

import { ViewNavigationBase } from "./view-navigation-base";

export class ViewZoom extends ViewNavigationBase {
    constructor(view, option) {
        super(view, Object.assign({}, ViewZoom.defaultOptions, option)), this.type = ViewZoom.type, 
        this.handleStartInner = e => {
            this.formatZoomEvent(e), !e || this.options.shouldStart && !this.options.shouldStart(e) || (this._inited || this._initGrammars(), 
            this._isStarted = !0, this.updateView("start", this.handleZoomStart(e, this._state, {
                rate: this.options.rate,
                focus: this.options.focus
            }), "zoom", e));
        }, this.handleEnd = e => {
            this._isStarted && (this.formatZoomEvent(e), !e || this.options.shouldEnd && !this.options.shouldEnd(e) || this.updateView("end", this.handleZoomEnd(e, this._state, {
                rate: this.options.rate,
                focus: this.options.focus
            }), "zoom", e));
        }, this.handleReset = e => {
            this._isStarted && (!e || this.options.shouldReset && !this.options.shouldReset(e) || (this.updateView("reset", this.handleZoomReset(e, this._state, {
                rate: this.options.rate,
                focus: this.options.focus
            }), "zoom", e), this._isStarted = !1));
        }, this.handleStart = throttle(this.handleStartInner, this.options.throttle);
    }
    getEvents() {
        return [ {
            type: this.options.trigger,
            handler: this.handleStart
        }, {
            type: this.options.endTrigger,
            handler: this.handleEnd
        }, {
            type: this.options.triggerOff,
            handler: this.handleReset
        } ];
    }
}

ViewZoom.type = "view-zoom", ViewZoom.defaultOptions = {
    realtime: !0,
    focus: !0,
    trigger: "wheel",
    endTrigger: "pointerup",
    triggerOff: "dblclick",
    rate: 1,
    throttle: 100
};
//# sourceMappingURL=view-zoom.js.map
