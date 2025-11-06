import { debounce, isNil, pointInRect, throttle } from "@visactor/vutils";

import { RenderModeEnum } from "../../typings/spec/common";

import { getDefaultTriggerEventByMode } from "../../component/common/trigger/config";

import { Event_Bubble_Level, Event_Source_Type } from "../../constant/event";

import { isMiniAppLikeMode, isMobileLikeMode } from "../../util";

const delayMap = {
    debounce: debounce,
    throttle: throttle
};

export class Zoomable {
    constructor() {
        this._isGestureListener = !1;
    }
    initZoomable(evt, mode = RenderModeEnum["desktop-browser"]) {
        this._eventObj = evt, this._renderMode = mode, this._gestureController = this._option.getChart().getVGrammarView().renderer._gestureController, 
        this._isGestureListener = isMobileLikeMode(this._renderMode) || isMiniAppLikeMode(this._renderMode), 
        getDefaultTriggerEventByMode(this._renderMode) && (this._clickEnable = !0, this._zoomableTrigger = new (this._getZoomTriggerEvent("trigger")));
    }
    _getZoomTriggerEvent(type) {
        return getDefaultTriggerEventByMode(this._renderMode)[type];
    }
    _zoomEventDispatch(params, regionOrSeries, callback, allowComponentZoom) {
        if (!this._isGestureListener && !params.event) return;
        const event = this._isGestureListener ? params : params.event.clone();
        this._zoomableTrigger.parserZoomEvent(event);
        const {zoomDelta: zoomDelta, zoomX: zoomX, zoomY: zoomY, path: path} = event;
        if (!allowComponentZoom && !path.some((node => node.name && node.name.includes("region")))) return;
        if (isNil(zoomDelta)) return;
        if (!pointInRect({
            x: zoomX,
            y: zoomY
        }, this._getRegionOrSeriesLayout(regionOrSeries), !1)) return;
        this._clearDragEvent(), this._zoomableTrigger.clearScroll();
        let extendParams = {};
        callback && (extendParams = callback({
            zoomDelta: zoomDelta,
            zoomX: zoomX,
            zoomY: zoomY
        }, event)), this._eventObj.emit("zoom", Object.assign(Object.assign({
            scale: event.zoomDelta,
            scaleCenter: {
                x: event.zoomX,
                y: event.zoomY
            }
        }, extendParams), {
            model: this
        }));
    }
    _getRegionOrSeriesLayout(rs) {
        "region" !== rs.type && (rs = rs.getRegion());
        const {x: x, y: y, width: width, height: height} = rs.layout.getLayout();
        return {
            x1: x,
            y1: y,
            x2: x + width,
            y2: y + height
        };
    }
    _bindZoomEventAsRegion(eventObj, regionOrSeries, callback, option) {
        var _a, _b;
        const delayType = null !== (_a = null == option ? void 0 : option.delayType) && void 0 !== _a ? _a : "throttle", delayTime = null !== (_b = null == option ? void 0 : option.delayTime) && void 0 !== _b ? _b : 0, event = this._isGestureListener ? this._gestureController : eventObj, zoomParams = this._isGestureListener ? [ this._getZoomTriggerEvent("zoom") ] : [ this._getZoomTriggerEvent("zoom"), {
            level: Event_Bubble_Level.chart,
            consume: !0
        } ], zoomEndParams = this._isGestureListener ? [ this._getZoomTriggerEvent("zoomEnd") ] : [ this._getZoomTriggerEvent("zoomEnd"), {
            level: Event_Bubble_Level.chart,
            consume: !1
        } ];
        event.on(...zoomEndParams, delayMap[delayType]((params => {
            this._zoomableTrigger.clearZoom();
        }), delayTime)), event.on(...zoomParams, delayMap[delayType]((params => {
            var _a;
            this._zoomEventDispatch(params, regionOrSeries, callback, null !== (_a = null == option ? void 0 : option.allowComponentZoom) && void 0 !== _a && _a);
        }), delayTime));
    }
    initZoomEventOfSeries(s, callback, option) {
        this._option.disableTriggerEvent || getDefaultTriggerEventByMode(this._renderMode) && this._bindZoomEventAsRegion(s.event, s, callback, option);
    }
    initZoomEventOfRegions(regions, filter, callback, option) {
        this._option.disableTriggerEvent || getDefaultTriggerEventByMode(this._renderMode) && regions.forEach((r => {
            filter ? r.getSeries().forEach((s => {
                filter(s) && this._bindZoomEventAsRegion(s.event, s, callback, option);
            })) : this._bindZoomEventAsRegion(this._eventObj, r, callback, option);
        }));
    }
    _scrollEventDispatch(params, regionOrSeries, callback) {
        let stopBubble = !1;
        if (!this._isGestureListener && (!params.event || this._option.disableTriggerEvent)) return stopBubble;
        const event = this._isGestureListener ? params : params.event;
        this._zoomableTrigger.parserScrollEvent(event);
        const {scrollX: scrollX, scrollY: scrollY, canvasX: canvasX, canvasY: canvasY} = event;
        return isNil(scrollX) && isNil(scrollY) ? stopBubble : pointInRect({
            x: canvasX,
            y: canvasY
        }, this._getRegionOrSeriesLayout(regionOrSeries), !1) ? (this._clearDragEvent(), 
        this._zoomableTrigger.clearZoom(), callback && (stopBubble = callback({
            scrollX: scrollX,
            scrollY: scrollY
        }, event)), this._eventObj.emit("scroll", {
            scrollX: scrollX,
            scrollY: scrollY,
            model: this
        }), stopBubble) : stopBubble;
    }
    _bindScrollEventAsRegion(eventObj, regionOrSeries, callback, option) {
        var _a, _b;
        const delayType = null !== (_a = null == option ? void 0 : option.delayType) && void 0 !== _a ? _a : "throttle", delayTime = null !== (_b = null == option ? void 0 : option.delayTime) && void 0 !== _b ? _b : 0, event = this._isGestureListener ? this._gestureController : eventObj, scrollParams = this._isGestureListener ? [ this._getZoomTriggerEvent("scroll") ] : [ this._getZoomTriggerEvent("scroll"), {
            level: Event_Bubble_Level.chart,
            consume: !0
        } ], scrollEndParams = this._isGestureListener ? [ this._getZoomTriggerEvent("scrollEnd") ] : [ this._getZoomTriggerEvent("scrollEnd"), {
            level: Event_Bubble_Level.chart,
            consume: !1
        } ];
        event.on(...scrollEndParams, delayMap[delayType]((params => {
            this._zoomableTrigger.clearScroll();
        }), delayTime)), event.on(...scrollParams, delayMap[delayType]((params => this._scrollEventDispatch(params, regionOrSeries, callback)), delayTime));
    }
    initScrollEventOfSeries(s, callback, option) {
        getDefaultTriggerEventByMode(this._renderMode) && this._bindScrollEventAsRegion(s.event, s, callback, option);
    }
    initScrollEventOfRegions(regions, filter, callback, option) {
        this._option.disableTriggerEvent || getDefaultTriggerEventByMode(this._renderMode) && regions.forEach((r => {
            filter ? r.getSeries().forEach((s => {
                filter(s) && this._bindScrollEventAsRegion(s.event, s, callback, option);
            })) : this._bindScrollEventAsRegion(this._eventObj, r, callback, option);
        }));
    }
    _bindDragEventAsRegion(eventObj, regionOrSeries, callback, option) {
        eventObj.on(this._getZoomTriggerEvent("start"), {
            level: Event_Bubble_Level.chart
        }, (params => {
            if (!params.event) return;
            const {event: event} = params;
            pointInRect({
                x: event.canvasX,
                y: event.canvasY
            }, this._getRegionOrSeriesLayout(regionOrSeries), !1) && this._handleDrag(params, callback, option);
        })), eventObj.on("click", {
            level: Event_Bubble_Level.chart
        }, (() => !this._clickEnable));
    }
    initDragEventOfSeries(s, callback, option) {
        this._option.disableTriggerEvent || getDefaultTriggerEventByMode(this._renderMode) && s.event.on(this._getZoomTriggerEvent("start"), {
            level: Event_Bubble_Level.model,
            filter: ({model: model}) => (null == model ? void 0 : model.id) === s.id
        }, (params => {
            this._handleDrag(params, callback, option);
        }));
    }
    initDragEventOfRegions(regions, filter, callback, option) {
        this._option.disableTriggerEvent || getDefaultTriggerEventByMode(this._renderMode) && regions.forEach((r => {
            filter ? r.getSeries().forEach((s => {
                filter(s) && (s.event.on(this._getZoomTriggerEvent("start"), {
                    level: Event_Bubble_Level.model,
                    filter: ({model: model}) => (null == model ? void 0 : model.id) === s.id
                }, (params => {
                    this._handleDrag(params, callback);
                })), s.event.on("click", {
                    level: Event_Bubble_Level.model,
                    filter: ({model: model}) => (null == model ? void 0 : model.id) === s.id
                }, (() => !this._clickEnable)));
            })) : this._bindDragEventAsRegion(this._eventObj, r, callback, option);
        }));
    }
    _clearDragEvent() {
        const move = this._getZoomTriggerEvent("move"), end = this._getZoomTriggerEvent("end");
        this._handleDragMouseMove && (this._eventObj.off(move, {
            level: Event_Bubble_Level.chart,
            source: Event_Source_Type.chart
        }, this._handleDragMouseMove), this._handleDragMouseMove = void 0), this._handleDragMouseUp && (end.forEach((endEventType => {
            this._eventObj.off(endEventType, {
                level: Event_Bubble_Level.chart,
                source: Event_Source_Type.chart
            }, this._handleDragMouseUp), this._eventObj.allow(endEventType);
        })), this._handleDragMouseUp = void 0);
    }
    isDragEnable(event) {
        if (this._isGestureListener && this._gestureController) {
            const events = this._gestureController.cachedEvents;
            return !events || events.length < 2;
        }
        return !0;
    }
    _handleDrag(params, callback, option) {
        var _a, _b, _c;
        if (this._clearDragEvent(), this._option.disableTriggerEvent) return;
        if (this._clickEnable = !1, !this.isDragEnable(params.event)) return;
        this._zoomableTrigger.clearZoom(), this._zoomableTrigger.clearScroll();
        const delayType = null !== (_a = null == option ? void 0 : option.delayType) && void 0 !== _a ? _a : "throttle", delayTime = null !== (_b = null == option ? void 0 : option.delayTime) && void 0 !== _b ? _b : 0, realTime = null === (_c = null == option ? void 0 : option.realTime) || void 0 === _c || _c, move = this._getZoomTriggerEvent("move"), end = this._getZoomTriggerEvent("end"), event = params.event;
        let moveX = event.canvasX, moveY = event.canvasY, upX = event.canvasX, upY = event.canvasY;
        this._handleDragMouseUp = delayMap[delayType]((params => {
            this._clickEnable = !0;
            const event = params.event, delta = [ event.canvasX - upX, event.canvasY - upY ];
            upX = event.canvasX, upY = event.canvasY, !realTime && callback && callback(delta, params.event), 
            this._eventObj.emit("panend", {
                delta: delta,
                model: this
            }), this._clearDragEvent();
        }), delayTime), this._handleDragMouseMove = delayMap[delayType]((params => {
            if (!this.isDragEnable(params.event)) return;
            this._clickEnable = !1, end.forEach((endEventType => {
                this._eventObj.prevent(endEventType, {
                    handler: this._handleDragMouseUp,
                    level: Event_Bubble_Level.chart
                });
            }));
            const event = params.event, delta = [ event.canvasX - moveX, event.canvasY - moveY ];
            moveX = event.canvasX, moveY = event.canvasY, realTime && callback && callback(delta, params.event), 
            this._eventObj.emit("panmove", {
                delta: delta,
                model: this
            });
        }), delayTime), this._eventObj.on(move, {
            level: Event_Bubble_Level.chart,
            source: Event_Source_Type.chart
        }, this._handleDragMouseMove), end.forEach((endEventType => {
            this._eventObj.on(endEventType, {
                level: Event_Bubble_Level.chart,
                source: Event_Source_Type.chart
            }, this._handleDragMouseUp);
        }));
    }
}
//# sourceMappingURL=zoomable.js.map
