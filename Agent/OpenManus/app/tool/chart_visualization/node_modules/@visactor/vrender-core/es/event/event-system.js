import { isUndefined, has, isString } from "@visactor/vutils";

import { EventManager } from "./event-manager";

import { FederatedPointerEvent, FederatedWheelEvent } from "./federated-event";

import { clock } from "./util";

const MOUSE_POINTER_ID = 1, TOUCH_TO_POINTER = {
    touchstart: "pointerdown",
    touchend: "pointerup",
    touchendoutside: "pointerupoutside",
    touchmove: "pointermove",
    touchcancel: "pointercancel"
};

export class EventSystem {
    constructor(params) {
        this.resolution = 1, this.onPointerDown = nativeEvent => {
            if (this.supportsTouchEvents && "touch" === nativeEvent.pointerType) return;
            const events = this.normalizeToPointerData(nativeEvent);
            if (this.autoPreventDefault && events[0].isNormalized) {
                (nativeEvent.cancelable || !("cancelable" in nativeEvent)) && nativeEvent.preventDefault();
            }
            for (let i = 0, j = events.length; i < j; i++) {
                const nativeEvent = events[i], federatedEvent = this.bootstrapEvent(this.rootPointerEvent, nativeEvent);
                this.manager.mapEvent(federatedEvent);
            }
            this.setCursor(this.manager.cursor, this.manager.cursorTarget), this.rootPointerEvent.nativeEvent = null;
        }, this.onPointerMove = nativeEvent => {
            if (this.supportsTouchEvents && "touch" === nativeEvent.pointerType) return;
            if (this.isEventOutsideOfTargetElement(nativeEvent)) return;
            const normalizedEvents = this.normalizeToPointerData(nativeEvent);
            for (let i = 0, j = normalizedEvents.length; i < j; i++) {
                const event = this.bootstrapEvent(this.rootPointerEvent, normalizedEvents[i]);
                this.manager.mapEvent(event);
            }
            this.setCursor(this.manager.cursor, this.manager.cursorTarget), this.rootPointerEvent.nativeEvent = null;
        }, this.onPointerUp = nativeEvent => {
            if (this.supportsTouchEvents && "touch" === nativeEvent.pointerType) return;
            const outside = this.isEventOutsideOfTargetViewPort(nativeEvent) ? "outside" : "", normalizedEvents = this.normalizeToPointerData(nativeEvent);
            for (let i = 0, j = normalizedEvents.length; i < j; i++) {
                const event = this.bootstrapEvent(this.rootPointerEvent, normalizedEvents[i]);
                event.type += outside, this.manager.mapEvent(event);
            }
            this.setCursor(this.manager.cursor, this.manager.cursorTarget), this.rootPointerEvent.nativeEvent = null;
        }, this.onPointerOverOut = nativeEvent => {
            if (this.supportsTouchEvents && "touch" === nativeEvent.pointerType) return;
            const normalizedEvents = this.normalizeToPointerData(nativeEvent);
            for (let i = 0, j = normalizedEvents.length; i < j; i++) {
                const event = this.bootstrapEvent(this.rootPointerEvent, normalizedEvents[i]);
                this.manager.mapEvent(event);
            }
            this.setCursor(this.manager.cursor, this.manager.cursorTarget), this.rootPointerEvent.nativeEvent = null;
        }, this.onWheel = nativeEvent => {
            const wheelEvent = this.normalizeWheelEvent(nativeEvent);
            this.manager.mapEvent(wheelEvent);
        };
        const {targetElement: targetElement, resolution: resolution, rootNode: rootNode, global: global, autoPreventDefault: autoPreventDefault = !1, clickInterval: clickInterval, supportsTouchEvents: supportsTouchEvents = global.supportsTouchEvents, supportsPointerEvents: supportsPointerEvents = global.supportsPointerEvents} = params;
        this.manager = new EventManager(rootNode, {
            clickInterval: clickInterval,
            supportsTouchEvents: supportsTouchEvents
        }), this.globalObj = global, this.supportsPointerEvents = supportsPointerEvents, 
        this.supportsTouchEvents = supportsTouchEvents, this.supportsMouseEvents = global.supportsMouseEvents, 
        this.applyStyles = global.applyStyles, this.autoPreventDefault = autoPreventDefault, 
        this.eventsAdded = !1, this.rootPointerEvent = new FederatedPointerEvent, this.rootWheelEvent = new FederatedWheelEvent, 
        this.cursorStyles = {
            default: "inherit",
            pointer: "pointer"
        }, this.resolution = resolution, this.setTargetElement(targetElement);
    }
    release() {
        this.removeEvents(), this.manager && this.manager.release(), this.domElement = null, 
        this.manager = null, this.globalObj = null;
    }
    setCursor(mode, target) {
        if (!target && !this.manager.rootTarget.window._handler.canvas.controled) return;
        mode || (mode = "default");
        const {applyStyles: applyStyles, domElement: domElement} = this;
        if (this.currentCursor === mode) return;
        this.currentCursor = mode;
        const style = this.cursorStyles[mode];
        style ? "string" == typeof style && applyStyles ? domElement.style.cursor = style : "function" == typeof style ? style(mode) : "object" == typeof style && applyStyles && Object.assign(domElement.style, style) : applyStyles && isString(mode) && !has(this.cursorStyles, mode) && (domElement.style.cursor = mode);
    }
    setTargetElement(element) {
        this.removeEvents(), this.domElement = element, this.addEvents();
    }
    addEvents() {
        if (this.eventsAdded || !this.domElement) return;
        const {globalObj: globalObj, domElement: domElement} = this;
        this.supportsPointerEvents ? (globalObj.getDocument() ? (globalObj.getDocument().addEventListener("pointermove", this.onPointerMove, !0), 
        globalObj.getDocument().addEventListener("pointerup", this.onPointerUp, !0)) : (domElement.addEventListener("pointermove", this.onPointerMove, !0), 
        domElement.addEventListener("pointerup", this.onPointerUp, !0)), domElement.addEventListener("pointerdown", this.onPointerDown, !0), 
        domElement.addEventListener("pointerleave", this.onPointerOverOut, !0), domElement.addEventListener("pointerover", this.onPointerOverOut, !0)) : (globalObj.getDocument() ? (globalObj.getDocument().addEventListener("mousemove", this.onPointerMove, !0), 
        globalObj.getDocument().addEventListener("mouseup", this.onPointerUp, !0)) : (domElement.addEventListener("mousemove", this.onPointerMove, !0), 
        domElement.addEventListener("mouseup", this.onPointerUp, !0)), domElement.addEventListener("mousedown", this.onPointerDown, !0), 
        domElement.addEventListener("mouseout", this.onPointerOverOut, !0), domElement.addEventListener("mouseover", this.onPointerOverOut, !0)), 
        this.supportsTouchEvents && (domElement.addEventListener("touchstart", this.onPointerDown, !0), 
        domElement.addEventListener("touchend", this.onPointerUp, !0), domElement.addEventListener("touchmove", this.onPointerMove, !0)), 
        domElement.addEventListener("wheel", this.onWheel, {
            capture: !0
        }), this.eventsAdded = !0;
    }
    removeEvents() {
        var _a;
        if (!this.eventsAdded || !this.domElement) return;
        const {globalObj: globalObj, domElement: domElement} = this, globalDocument = null !== (_a = globalObj.getDocument()) && void 0 !== _a ? _a : domElement;
        this.supportsPointerEvents ? (globalDocument.removeEventListener("pointermove", this.onPointerMove, !0), 
        globalDocument.removeEventListener("pointerup", this.onPointerUp, !0), domElement.removeEventListener("pointerdown", this.onPointerDown, !0), 
        domElement.removeEventListener("pointerleave", this.onPointerOverOut, !0), domElement.removeEventListener("pointerover", this.onPointerOverOut, !0)) : (globalDocument.removeEventListener("mousemove", this.onPointerMove, !0), 
        globalDocument.removeEventListener("mouseup", this.onPointerUp, !0), domElement.removeEventListener("mousedown", this.onPointerDown, !0), 
        domElement.removeEventListener("mouseout", this.onPointerOverOut, !0), domElement.removeEventListener("mouseover", this.onPointerOverOut, !0)), 
        this.supportsTouchEvents && (domElement.removeEventListener("touchstart", this.onPointerDown, !0), 
        domElement.removeEventListener("touchend", this.onPointerUp, !0), domElement.removeEventListener("touchmove", this.onPointerMove, !0)), 
        domElement.removeEventListener("wheel", this.onWheel, !0), this.domElement = null, 
        this.eventsAdded = !1;
    }
    mapToViewportPoint(event) {
        return this.domElement.pointTransform ? this.domElement.pointTransform(event.x, event.y) : event;
    }
    mapToCanvasPoint(nativeEvent) {
        var _a, _b;
        const point = null === (_a = this.globalObj) || void 0 === _a ? void 0 : _a.mapToCanvasPoint(nativeEvent, this.domElement);
        if (point) return point;
        let x = 0, y = 0;
        if (nativeEvent.changedTouches) {
            const data = null !== (_b = nativeEvent.changedTouches[0]) && void 0 !== _b ? _b : {};
            x = data.clientX || 0, y = data.clientY || 0;
        } else x = nativeEvent.clientX || 0, y = nativeEvent.clientY || 0;
        const rect = this.domElement.getBoundingClientRect();
        return {
            x: x - rect.left,
            y: y - rect.top
        };
    }
    normalizeToPointerData(event) {
        const normalizedEvents = [];
        if (this.supportsTouchEvents && event.changedTouches && event.changedTouches.length) for (let i = 0, li = event.changedTouches.length; i < li; i++) {
            const touch = event.changedTouches[i];
            isUndefined(touch.button) && (touch.button = 0), isUndefined(touch.buttons) && (touch.buttons = 1), 
            isUndefined(touch.isPrimary) && (touch.isPrimary = 1 === event.touches.length && "touchstart" === event.type), 
            isUndefined(touch.width) && (touch.width = touch.radiusX || 1), isUndefined(touch.height) && (touch.height = touch.radiusY || 1), 
            isUndefined(touch.tiltX) && (touch.tiltX = 0), isUndefined(touch.tiltY) && (touch.tiltY = 0), 
            isUndefined(touch.pointerType) && (touch.pointerType = "touch"), isUndefined(touch.pointerId) && (touch.pointerId = touch.identifier || 0), 
            isUndefined(touch.pressure) && (touch.pressure = touch.force || .5), isUndefined(touch.twist) && (touch.twist = 0), 
            isUndefined(touch.tangentialPressure) && (touch.tangentialPressure = 0), isUndefined(touch.layerX) && (touch.layerX = touch.offsetX = touch.clientX), 
            isUndefined(touch.layerY) && (touch.layerY = touch.offsetY = touch.clientY), touch.isNormalized = !0, 
            touch.type = event.type, normalizedEvents.push(touch);
        } else if (this.globalObj.supportsMouseEvents && (!(event instanceof MouseEvent) || this.supportsPointerEvents && event instanceof PointerEvent)) normalizedEvents.push(event); else {
            const tempEvent = event;
            isUndefined(tempEvent.isPrimary) && (tempEvent.isPrimary = !0), isUndefined(tempEvent.width) && (tempEvent.width = 1), 
            isUndefined(tempEvent.height) && (tempEvent.height = 1), isUndefined(tempEvent.tiltX) && (tempEvent.tiltX = 0), 
            isUndefined(tempEvent.tiltY) && (tempEvent.tiltY = 0), isUndefined(tempEvent.pointerType) && (tempEvent.pointerType = "mouse"), 
            isUndefined(tempEvent.pointerId) && (tempEvent.pointerId = 1), isUndefined(tempEvent.pressure) && (tempEvent.pressure = .5), 
            isUndefined(tempEvent.twist) && (tempEvent.twist = 0), isUndefined(tempEvent.tangentialPressure) && (tempEvent.tangentialPressure = 0), 
            tempEvent.isNormalized = !0, normalizedEvents.push(tempEvent);
        }
        return normalizedEvents;
    }
    normalizeWheelEvent(nativeEvent) {
        const event = this.rootWheelEvent;
        this.transferMouseData(event, nativeEvent), event.deltaMode = nativeEvent.deltaMode, 
        event.deltaX = nativeEvent.deltaX, event.deltaY = nativeEvent.deltaY, event.deltaZ = nativeEvent.deltaZ;
        const {x: canvasX, y: canvasY} = this.mapToCanvasPoint(nativeEvent);
        event.canvas.x = canvasX, event.canvas.y = canvasY, event.global.x = canvasX, event.global.y = canvasY, 
        event.offset.x = canvasX, event.offset.y = canvasY;
        const {x: viewX, y: viewY} = this.mapToViewportPoint(event);
        return event.viewport.x = viewX, event.viewport.y = viewY, event.nativeEvent = nativeEvent, 
        event.type = nativeEvent.type, event;
    }
    bootstrapEvent(event, nativeEvent) {
        event.originalEvent = null, event.nativeEvent = nativeEvent, event.pointerId = nativeEvent.pointerId, 
        event.width = nativeEvent.width, event.height = nativeEvent.height, event.isPrimary = nativeEvent.isPrimary, 
        event.pointerType = nativeEvent.pointerType, event.pressure = nativeEvent.pressure, 
        event.tangentialPressure = nativeEvent.tangentialPressure, event.tiltX = nativeEvent.tiltX, 
        event.tiltY = nativeEvent.tiltY, event.twist = nativeEvent.twist, this.transferMouseData(event, nativeEvent);
        const {x: canvasX, y: canvasY} = this.mapToCanvasPoint(nativeEvent);
        event.canvas.x = canvasX, event.canvas.y = canvasY, event.global.x = canvasX, event.global.y = canvasY, 
        event.offset.x = canvasX, event.offset.y = canvasY;
        const {x: viewX, y: viewY} = this.mapToViewportPoint(event);
        return event.viewport.x = viewX, event.viewport.y = viewY, event.isTrusted = nativeEvent.isTrusted, 
        "pointerleave" === event.type && (event.type = "pointerout"), event.type.startsWith("mouse") && (event.type = event.type.replace("mouse", "pointer")), 
        event.type.startsWith("touch") && (event.type = TOUCH_TO_POINTER[event.type] || event.type), 
        event;
    }
    transferMouseData(event, nativeEvent) {
        event.isTrusted = nativeEvent.isTrusted, event.srcElement = nativeEvent.srcElement, 
        event.timeStamp = clock.now(), event.type = nativeEvent.type, event.altKey = nativeEvent.altKey, 
        event.button = nativeEvent.button, event.buttons = nativeEvent.buttons, event.client.x = nativeEvent.clientX, 
        event.client.y = nativeEvent.clientY, event.ctrlKey = nativeEvent.ctrlKey, event.shiftKey = nativeEvent.shiftKey, 
        event.metaKey = nativeEvent.metaKey, event.movement.x = nativeEvent.movementX, event.movement.y = nativeEvent.movementY, 
        event.page.x = nativeEvent.pageX, event.page.y = nativeEvent.pageY, event.relatedTarget = null;
    }
    isEventOutsideOfTargetViewPort(nativeEvent) {
        if (this.isEventOutsideOfTargetElement(nativeEvent)) return !0;
        if (this.domElement.getViewBox) {
            const p = this.mapToViewportPoint(this.mapToCanvasPoint(nativeEvent)), b = this.domElement.getViewBox(), w = b.width(), h = b.height();
            return !(p.x < w && p.y < h && p.x > 0 && p.y > 0);
        }
        return !1;
    }
    isEventOutsideOfTargetElement(nativeEvent) {
        let target = nativeEvent.target;
        nativeEvent.composedPath && nativeEvent.composedPath().length > 0 && (target = nativeEvent.composedPath()[0]);
        return target !== (this.domElement.getNativeHandler ? this.domElement.getNativeHandler().nativeCanvas : this.domElement);
    }
    pauseTriggerEvent() {
        this.manager.pauseNotify = !0;
    }
    resumeTriggerEvent() {
        this.manager.pauseNotify = !1;
    }
}
//# sourceMappingURL=event-system.js.map
