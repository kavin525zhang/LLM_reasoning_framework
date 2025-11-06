import { isObject, isString, mixin } from "@visactor/vutils";

import { generateFilterByMark, parseEventSelector, parseHandler } from "../parse/event";

import { parseReference } from "../parse/util";

import { EVENT_SOURCE_VIEW, EVENT_SOURCE_WINDOW, NO_TRAP } from "./constants";

import { permit, prevent } from "./events";

import { vglobal } from "@visactor/vrender-core";

import getExtendedEvents from "../graph/util/events-extend";

import View from "./View";

class ViewEventsMixin {
    event(eventSpec) {
        if ("between" in eventSpec) {
            const [starEvent, endEvent] = eventSpec.between, id = `${starEvent.type}-${eventSpec.type}-${endEvent.type}`;
            let unbindEndEvent;
            this.bindEvents(Object.assign({}, starEvent, {
                callback: () => {
                    if (this._eventCache || (this._eventCache = {}), !this._eventCache[id]) {
                        const unbindEvent = this.bindEvents(eventSpec);
                        this._eventCache[id] = unbindEvent;
                    }
                    unbindEndEvent || (unbindEndEvent = this.bindEvents(Object.assign({}, endEvent, {
                        callback: () => {
                            this._eventCache[id] && (this._eventCache[id](), this._eventCache[id] = null);
                        }
                    })));
                }
            }));
        } else "merge" in eventSpec ? eventSpec.merge.forEach((entry => {
            const singleEvent = Object.assign({}, eventSpec);
            isString(entry) ? singleEvent.type = entry : isObject(entry) && Object.assign(singleEvent, entry), 
            singleEvent.debounce = 50, this.bindEvents(singleEvent);
        })) : this.bindEvents(eventSpec);
    }
    bindEvents(eventSpec) {
        if (this._eventConfig.disable) return;
        const {type: evtType, filter: filter, callback: callback, throttle: throttle, debounce: debounce, consume: consume, target: target, dependency: dependency} = eventSpec, eventSelector = parseEventSelector(evtType);
        if (!eventSelector) return;
        const {source: source, type: type} = eventSelector, markFilter = generateFilterByMark(eventSelector), validateSignals = (Array.isArray(target) && target.length ? target.map((entry => ({
            signal: this.getSignalById(entry.target),
            callback: entry.callback
        }))) : [ {
            signal: isString(target) ? this.getSignalById(target) : null,
            callback: callback
        } ]).filter((entry => entry.signal || entry.callback)), refs = parseReference(dependency, this), send = parseHandler((evt => {
            const needPreventDefault = source === EVENT_SOURCE_VIEW && prevent(this._eventConfig, type) || consume && (void 0 === evt.cancelable || evt.cancelable);
            source === EVENT_SOURCE_WINDOW && (evt = getExtendedEvents(this, evt, type, EVENT_SOURCE_WINDOW));
            let hasCommitted = !1;
            if ((!filter || filter(evt)) && (!markFilter || markFilter(evt.element)) && validateSignals.length) {
                const params = refs.reduce(((params, ref) => (params[ref.id()] = ref.output(), params)), {});
                validateSignals.forEach((entry => {
                    if (entry.callback && entry.signal) {
                        entry.signal.set(entry.callback(evt, params)) && (this.commit(entry.signal), hasCommitted = !0);
                    } else entry.callback ? entry.callback(evt, params) : (this.commit(entry.signal), 
                    hasCommitted = !0);
                }));
            }
            needPreventDefault && evt.preventDefault(), consume && evt.stopPropagation(), hasCommitted && this.run();
        }), {
            throttle: throttle,
            debounce: debounce
        });
        if (source === EVENT_SOURCE_VIEW) {
            if (permit(this._eventConfig, EVENT_SOURCE_VIEW, type)) return this.addEventListener(type, send, NO_TRAP), 
            () => {
                this.removeEventListener(type, send);
            };
        } else if (source === EVENT_SOURCE_WINDOW) return vglobal.addEventListener(type, send), 
        this._eventListeners.push({
            type: type,
            source: vglobal,
            handler: send
        }), () => {
            vglobal.removeEventListener(type, send);
            const index = this._eventListeners.findIndex((entry => entry.type === type && entry.source === vglobal && entry.handler === send));
            index >= 0 && this._eventListeners.splice(index, 1);
        };
    }
}

export const registerViewEventsAPI = () => {
    mixin(View, ViewEventsMixin);
};
//# sourceMappingURL=view-event-mixin.js.map
