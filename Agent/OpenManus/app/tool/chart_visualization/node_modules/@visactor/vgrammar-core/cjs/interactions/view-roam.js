"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ViewRoam = void 0;

const vutils_1 = require("@visactor/vutils"), view_navigation_base_1 = require("./view-navigation-base");

class ViewRoam extends view_navigation_base_1.ViewNavigationBase {
    constructor(view, option) {
        super(view, (0, vutils_1.merge)({}, ViewRoam.defaultOptions, option)), this.type = ViewRoam.type, 
        this.handleRoamZoomStartInner = e => {
            this.formatZoomEvent(e), !e || this.options.shouldStart && !this.options.shouldStart(e) || (this._inited || this._initGrammars(), 
            this._isZoomStarted = !0, this.updateView("start", this.handleZoomStart(e, this._state, this.options.zoom), "zoom", e));
        }, this.handleRoamZoomEnd = e => {
            this._isZoomStarted && (this.formatZoomEvent(e), !e || this.options.shouldEnd && !this.options.shouldEnd(e) || (this.updateView("end", this.handleZoomEnd(e, this._state, this.options.zoom), "zoom", e), 
            this._isZoomStarted = !1));
        }, this.handleRoamZoomReset = e => {
            this._isZoomStarted && e && (!this.options.shouldReset || this.options.shouldReset(e)) && (this.updateView("reset", this.handleZoomReset(e, this._state, this.options.zoom), "zoom", e), 
            this._isZoomStarted = !1);
        }, this.handleRoamDragStart = e => {
            !e || this.options.shouldStart && !this.options.shouldStart(e) || (this._inited || this._initGrammars(), 
            this._isDragStarted = !0, this.updateView("start", this.handleDragStart(e, this._state, this.options.drag), "drag", e));
        }, this.handleRoamDragUpdateInner = e => {
            this._isDragStarted && e && (!this.options.shouldUpdate || this.options.shouldUpdate(e)) && this.updateView("update", this.handleDragUpdate(e, this._state, this.options.drag), "drag", e);
        }, this.handleRoamDragEnd = e => {
            this._isDragStarted && e && (!this.options.shouldEnd || this.options.shouldEnd(e)) && (this.updateView("end", this.handleDragEnd(e, this._state, this.options.drag), "drag", e), 
            this._isDragStarted = !1);
        }, this.handleRoamScrollStartInner = e => {
            this.formatScrollEvent(e), !e || this.options.shouldStart && !this.options.shouldStart(e) || (this._inited || this._initGrammars(), 
            this._isScrollStarted = !0, this.updateView("start", this.handleScrollStart(e, this._state, this.options.scroll), "scroll", e));
        }, this.handleRoamScrollEnd = e => {
            this._isScrollStarted && (this.formatScrollEvent(e), !e || this.options.shouldEnd && !this.options.shouldEnd(e) || (this.updateView("end", this.handleScrollEnd(e, this._state, this.options.scroll), "scroll", e), 
            this._isScrollStarted = !0));
        }, this.handleRoamZoomStart = (0, vutils_1.throttle)(this.handleRoamZoomStartInner, this.options.throttle), 
        this.handleRoamDragUpdate = (0, vutils_1.throttle)(this.handleRoamDragUpdateInner, this.options.throttle), 
        this.handleRoamScrollStart = (0, vutils_1.throttle)(this.handleRoamScrollStartInner, this.options.throttle);
    }
    getEvents() {
        var _a, _b, _c;
        const events = [];
        return (null === (_a = this.options.zoom) || void 0 === _a ? void 0 : _a.enable) && (this.options.zoom.trigger && events.push({
            type: this.options.zoom.trigger,
            handler: this.handleRoamZoomStart
        }), this.options.zoom.endTrigger && events.push({
            type: this.options.zoom.endTrigger,
            handler: this.handleRoamZoomEnd
        }), this.options.zoom.triggerOff && events.push({
            type: this.options.zoom.triggerOff,
            handler: this.handleRoamZoomReset
        })), (null === (_b = this.options.scroll) || void 0 === _b ? void 0 : _b.enable) && (this.options.scroll.trigger && events.push({
            type: this.options.scroll.trigger,
            handler: this.handleRoamScrollStart
        }), this.options.scroll.trigger && events.push({
            type: this.options.scroll.endTrigger,
            handler: this.handleRoamScrollEnd
        })), (null === (_c = this.options.drag) || void 0 === _c ? void 0 : _c.enable) && (this.options.drag.trigger && events.push({
            type: this.options.drag.trigger,
            handler: this.handleRoamDragStart
        }), this.options.drag.updateTrigger && events.push({
            type: this.options.drag.updateTrigger,
            handler: this.handleRoamDragUpdate
        }), this.options.drag.endTrigger && events.push({
            type: this.options.drag.endTrigger,
            handler: this.handleRoamDragEnd
        })), events;
    }
}

exports.ViewRoam = ViewRoam, ViewRoam.type = "view-roam", ViewRoam.defaultOptions = {
    zoom: {
        realtime: !0,
        enable: !0,
        focus: !0,
        trigger: "wheel",
        endTrigger: "pointerup",
        triggerOff: "dblclick",
        rate: 1
    },
    scroll: {
        realtime: !0,
        enable: !1,
        reversed: !1,
        trigger: "wheel",
        endTrigger: "pointerup"
    },
    drag: {
        realtime: !0,
        enable: !0,
        reversed: !1,
        trigger: "pointerdown",
        updateTrigger: "pointermove",
        endTrigger: "pointerup"
    },
    throttle: 100
};
//# sourceMappingURL=view-roam.js.map
