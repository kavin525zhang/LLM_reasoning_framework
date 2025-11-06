"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerViewEventsAPI = void 0;

const vutils_1 = require("@visactor/vutils"), event_1 = require("../parse/event"), util_1 = require("../parse/util"), constants_1 = require("./constants"), events_1 = require("./events"), vrender_core_1 = require("@visactor/vrender-core"), events_extend_1 = __importDefault(require("../graph/util/events-extend")), View_1 = __importDefault(require("./View"));

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
            (0, vutils_1.isString)(entry) ? singleEvent.type = entry : (0, vutils_1.isObject)(entry) && Object.assign(singleEvent, entry), 
            singleEvent.debounce = 50, this.bindEvents(singleEvent);
        })) : this.bindEvents(eventSpec);
    }
    bindEvents(eventSpec) {
        if (this._eventConfig.disable) return;
        const {type: evtType, filter: filter, callback: callback, throttle: throttle, debounce: debounce, consume: consume, target: target, dependency: dependency} = eventSpec, eventSelector = (0, 
        event_1.parseEventSelector)(evtType);
        if (!eventSelector) return;
        const {source: source, type: type} = eventSelector, markFilter = (0, event_1.generateFilterByMark)(eventSelector), validateSignals = (Array.isArray(target) && target.length ? target.map((entry => ({
            signal: this.getSignalById(entry.target),
            callback: entry.callback
        }))) : [ {
            signal: (0, vutils_1.isString)(target) ? this.getSignalById(target) : null,
            callback: callback
        } ]).filter((entry => entry.signal || entry.callback)), refs = (0, util_1.parseReference)(dependency, this), send = (0, 
        event_1.parseHandler)((evt => {
            const needPreventDefault = source === constants_1.EVENT_SOURCE_VIEW && (0, events_1.prevent)(this._eventConfig, type) || consume && (void 0 === evt.cancelable || evt.cancelable);
            source === constants_1.EVENT_SOURCE_WINDOW && (evt = (0, events_extend_1.default)(this, evt, type, constants_1.EVENT_SOURCE_WINDOW));
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
        if (source === constants_1.EVENT_SOURCE_VIEW) {
            if ((0, events_1.permit)(this._eventConfig, constants_1.EVENT_SOURCE_VIEW, type)) return this.addEventListener(type, send, constants_1.NO_TRAP), 
            () => {
                this.removeEventListener(type, send);
            };
        } else if (source === constants_1.EVENT_SOURCE_WINDOW) return vrender_core_1.vglobal.addEventListener(type, send), 
        this._eventListeners.push({
            type: type,
            source: vrender_core_1.vglobal,
            handler: send
        }), () => {
            vrender_core_1.vglobal.removeEventListener(type, send);
            const index = this._eventListeners.findIndex((entry => entry.type === type && entry.source === vrender_core_1.vglobal && entry.handler === send));
            index >= 0 && this._eventListeners.splice(index, 1);
        };
    }
}

const registerViewEventsAPI = () => {
    (0, vutils_1.mixin)(View_1.default, ViewEventsMixin);
};

exports.registerViewEventsAPI = registerViewEventsAPI;
//# sourceMappingURL=view-event-mixin.js.map
