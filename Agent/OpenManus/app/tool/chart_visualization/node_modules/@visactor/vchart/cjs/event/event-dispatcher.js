"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.EventDispatcher = void 0;

const bubble_1 = require("./bubble"), vutils_1 = require("@visactor/vutils"), event_1 = require("../constant/event"), vgrammar_core_1 = require("@visactor/vgrammar-core"), componentTypeMap = {
    cartesianAxis: "axis",
    "cartesianAxis-band": "axis",
    "cartesianAxis-linear": "axis",
    "cartesianAxis-time": "axis",
    polarAxis: "axis",
    "polarAxis-band": "axis",
    "polarAxis-linear": "axis",
    discreteLegend: "legend",
    continuousLegend: "legend",
    colorLegend: "legend",
    sizeLegend: "legend"
};

class EventDispatcher {
    constructor(vchart, compiler) {
        this._viewBubbles = new Map, this._windowBubbles = new Map, this._canvasBubbles = new Map, 
        this._viewListeners = new Map, this._windowListeners = new Map, this._canvasListeners = new Map, 
        this._onDelegate = listenerParams => {
            var _a, _b;
            const chart = this.globalInstance.getChart(), model = (0, vutils_1.isValid)(listenerParams.modelId) && (null == chart ? void 0 : chart.getModelById(listenerParams.modelId)) || void 0, mark = (0, 
            vutils_1.isValid)(listenerParams.markId) && (null == chart ? void 0 : chart.getMarkById(listenerParams.markId)) || null, itemMap = new Map;
            let targetMark = null === (_a = listenerParams.item) || void 0 === _a ? void 0 : _a.mark;
            for (targetMark && (0, vutils_1.isValid)(targetMark.id()) && itemMap.set(targetMark.id(), listenerParams.item); null == targetMark ? void 0 : targetMark.elements; ) {
                const id = targetMark.id();
                (0, vutils_1.isValid)(id) && !itemMap.has(id) && itemMap.set(id, targetMark.elements[0]), 
                targetMark = targetMark.group;
            }
            const node = (0, vutils_1.get)(listenerParams.event, "target");
            let datum = listenerParams.datum;
            model && "component" === model.modelType && (datum = null !== (_b = model.getDatum(node)) && void 0 !== _b ? _b : datum);
            const params = {
                event: listenerParams.event,
                item: listenerParams.item,
                source: listenerParams.source,
                datum: datum,
                itemMap: itemMap,
                chart: chart,
                model: model,
                mark: null != mark ? mark : void 0,
                node: (0, vutils_1.get)(listenerParams.event, "target")
            };
            this.dispatch(listenerParams.type, params);
        }, this._onDelegateInteractionEvent = listenerParams => {
            const chart = this.globalInstance.getChart(), event = listenerParams.event;
            let items = null;
            event.elements && (items = event.elements);
            const params = {
                event: listenerParams.event,
                chart: chart,
                items: items,
                datums: items && items.map((item => item.getDatum()))
            };
            this.dispatch(listenerParams.type, params);
        }, this.globalInstance = vchart, this._compiler = compiler;
    }
    register(eType, handler) {
        var _a, _b, _c, _d, _e;
        this._parseQuery(handler);
        const bubbles = this.getEventBubble((null === (_a = handler.filter) || void 0 === _a ? void 0 : _a.source) || event_1.Event_Source_Type.chart), listeners = this.getEventListeners((null === (_b = handler.filter) || void 0 === _b ? void 0 : _b.source) || event_1.Event_Source_Type.chart);
        bubbles.get(eType) || bubbles.set(eType, new bubble_1.Bubble);
        if (bubbles.get(eType).addHandler(handler, null === (_c = handler.filter) || void 0 === _c ? void 0 : _c.level), 
        this._isValidEvent(eType) && !listeners.has(eType)) {
            const callback = this._onDelegate.bind(this);
            this._compiler.addEventListener(null === (_d = handler.filter) || void 0 === _d ? void 0 : _d.source, eType, callback), 
            listeners.set(eType, callback);
        } else if (this._isInteractionEvent(eType) && !listeners.has(eType)) {
            const callback = this._onDelegateInteractionEvent.bind(this);
            this._compiler.addEventListener(null === (_e = handler.filter) || void 0 === _e ? void 0 : _e.source, eType, callback), 
            listeners.set(eType, callback);
        }
        return this;
    }
    unregister(eType, handler) {
        var _a, _b, _c, _d;
        let clean = !1;
        const bubbles = this.getEventBubble((null === (_a = null == handler ? void 0 : handler.filter) || void 0 === _a ? void 0 : _a.source) || event_1.Event_Source_Type.chart), listeners = this.getEventListeners((null === (_b = null == handler ? void 0 : handler.filter) || void 0 === _b ? void 0 : _b.source) || event_1.Event_Source_Type.chart);
        if (handler) {
            const bubble = bubbles.get(eType);
            null == bubble || bubble.removeHandler(handler), 0 === (null == bubble ? void 0 : bubble.getCount()) && (null == bubble || bubble.release(), 
            bubbles.delete(eType), clean = !0), (null === (_c = null == handler ? void 0 : handler.wrappedCallback) || void 0 === _c ? void 0 : _c.cancel) && handler.wrappedCallback.cancel();
        } else {
            const bubble = bubbles.get(eType);
            null == bubble || bubble.release(), bubbles.delete(eType), clean = !0;
        }
        if (clean && this._isValidEvent(eType)) {
            const callback = listeners.get(eType);
            this._compiler.removeEventListener((null === (_d = null == handler ? void 0 : handler.filter) || void 0 === _d ? void 0 : _d.source) || event_1.Event_Source_Type.chart, eType, callback), 
            listeners.delete(eType);
        }
        return this;
    }
    dispatch(eType, params, level) {
        const bubble = this.getEventBubble(params.source || event_1.Event_Source_Type.chart).get(eType);
        if (!bubble) return this;
        let stopBubble = !1;
        if (level) {
            const handlers = bubble.getHandlers(level);
            stopBubble = this._invoke(handlers, eType, params);
        } else {
            let i = 0;
            for (;!stopBubble && i < event_1.EventBubbleLevels.length; ) stopBubble = this._invoke(bubble.getHandlers(event_1.EventBubbleLevels[i]), eType, params), 
            i++;
        }
        return this;
    }
    prevent(eType, except) {
        return [ "canvas", "chart", "window" ].forEach((type => {
            const bubble = this.getEventBubble(type).get(eType);
            bubble && bubble.getAllHandlers().forEach((handler => {
                except ? event_1.EventBubbleLevels.indexOf(handler.filter.level) < event_1.EventBubbleLevels.indexOf(except.level) && handler.callback !== except.handler && bubble.preventHandler(handler) : bubble.preventHandler(handler);
            }));
        })), this;
    }
    allow(eType) {
        return [ "canvas", "chart", "window" ].forEach((type => {
            const bubble = this.getEventBubble(type).get(eType);
            bubble && bubble.getAllHandlers().forEach((handler => bubble.allowHandler(handler)));
        })), this;
    }
    clear() {
        [ event_1.Event_Source_Type.chart, event_1.Event_Source_Type.window, event_1.Event_Source_Type.canvas ].forEach((type => {
            const listeners = this.getEventListeners(type);
            for (const entry of listeners.entries()) this._compiler.removeEventListener(type, entry[0], entry[1]);
            listeners.clear();
        })), [ this._viewBubbles, this._windowBubbles, this._canvasBubbles ].forEach((bubbles => {
            for (const bubble of bubbles.values()) bubble.release();
            bubbles.clear();
        }));
    }
    release() {
        this.clear(), this.globalInstance = null, this._compiler = null;
    }
    _filter(filter, evt, params) {
        var _a, _b, _c;
        if ((0, vutils_1.isFunction)(filter.filter) && !filter.filter(params)) return !1;
        if (filter.nodeName && (0, vutils_1.get)(params, "node.name") !== filter.nodeName) return !1;
        if (filter.markName && (null === (_a = null == params ? void 0 : params.mark) || void 0 === _a ? void 0 : _a.name) !== filter.markName) return !1;
        let modelType = null === (_b = params.model) || void 0 === _b ? void 0 : _b.type;
        return componentTypeMap[modelType] && (modelType = componentTypeMap[modelType]), 
        (!filter.type || modelType === filter.type) && (!("mark" === filter.level && !filter.type && !(null == params ? void 0 : params.mark)) && (!("model" === filter.level && !filter.type && !(null == params ? void 0 : params.model)) && (!(0, 
        vutils_1.isValid)(filter.userId) || (null === (_c = params.model) || void 0 === _c ? void 0 : _c.userId) === filter.userId)));
    }
    _prepareParams(filter, params) {
        if (filter.markName && params.mark && params.itemMap) {
            const markId = params.mark.getProductId(), item = params.itemMap.get(markId), datum = null == item ? void 0 : item.getDatum();
            return Object.assign(Object.assign({}, params), {
                item: item,
                datum: datum
            });
        }
        return Object.assign({}, params);
    }
    _invoke(handlers, type, params) {
        return handlers.map((handler => {
            var _a, _b, _c;
            const filter = handler.filter;
            if (!handler.prevented && (!handler.query || this._filter(filter, type, params))) {
                const stopBubble = (handler.wrappedCallback || handler.callback).call(null, this._prepareParams(filter, params)), doStopBubble = null != stopBubble ? stopBubble : null === (_a = handler.query) || void 0 === _a ? void 0 : _a.consume;
                return doStopBubble && (null === (_b = params.event) || void 0 === _b || _b.stopPropagation(), 
                null === (_c = params.event) || void 0 === _c || _c.preventDefault()), !!doStopBubble;
            }
        })).some((r => !0 === r));
    }
    _getQueryLevel(query) {
        return query ? query.level ? query.level : (0, vutils_1.isValid)(query.id) ? event_1.Event_Bubble_Level.model : event_1.Event_Bubble_Level.vchart : event_1.Event_Bubble_Level.vchart;
    }
    _parseQuery(handler) {
        var _a;
        const query = handler.query;
        (null == query ? void 0 : query.throttle) ? handler.wrappedCallback = (0, vutils_1.throttle)(handler.callback, query.throttle) : (null == query ? void 0 : query.debounce) && (handler.wrappedCallback = (0, 
        vutils_1.debounce)(handler.callback, query.debounce));
        let level = this._getQueryLevel(query), type = null, source = event_1.Event_Source_Type.chart, nodeName = null, markName = null, userId = null;
        return (null == query ? void 0 : query.nodeName) && (nodeName = query.nodeName), 
        (null == query ? void 0 : query.markName) && (markName = query.markName), !(null == query ? void 0 : query.type) || level !== event_1.Event_Bubble_Level.model && level !== event_1.Event_Bubble_Level.mark || (type = query.type), 
        (null == query ? void 0 : query.source) && (source = query.source), (0, vutils_1.isValid)(null == query ? void 0 : query.id) && (userId = null == query ? void 0 : query.id, 
        level = event_1.Event_Bubble_Level.model), handler.filter = {
            level: level,
            markName: markName,
            type: type,
            source: source,
            nodeName: nodeName,
            userId: userId,
            filter: null !== (_a = null == query ? void 0 : query.filter) && void 0 !== _a ? _a : null
        }, handler;
    }
    getEventBubble(source) {
        switch (source) {
          case event_1.Event_Source_Type.chart:
            return this._viewBubbles;

          case event_1.Event_Source_Type.window:
            return this._windowBubbles;

          case event_1.Event_Source_Type.canvas:
            return this._canvasBubbles;

          default:
            return this._viewBubbles;
        }
    }
    getEventListeners(source) {
        switch (source) {
          case event_1.Event_Source_Type.chart:
            return this._viewListeners;

          case event_1.Event_Source_Type.window:
            return this._windowListeners;

          case event_1.Event_Source_Type.canvas:
            return this._canvasListeners;

          default:
            return this._viewListeners;
        }
    }
    _isValidEvent(eType) {
        return event_1.BASE_EVENTS.includes(eType) || Object.values(event_1.VGRAMMAR_HOOK_EVENT).includes(eType);
    }
    _isInteractionEvent(eType) {
        let interactionType;
        return eType && (interactionType = eType.split(":")[0], interactionType) && vgrammar_core_1.Factory.hasInteraction(interactionType);
    }
}

exports.EventDispatcher = EventDispatcher;
//# sourceMappingURL=event-dispatcher.js.map
