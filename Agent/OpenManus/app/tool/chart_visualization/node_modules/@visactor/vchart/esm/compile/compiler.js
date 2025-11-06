var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { ChartEvent, Event_Source_Type } from "./../constant/event";

import { View } from "@visactor/vgrammar-core";

import { GrammarType } from "./interface/compilable-item";

import { toRenderMode } from "./util";

import { isMobileLikeMode, isTrueBrowser } from "../util/env";

import { isString } from "../util/type";

import { isNil, isValid, Logger, LoggerLevel } from "@visactor/vutils";

import { vglobal } from "@visactor/vrender-core";

export class Compiler {
    getVGrammarView() {
        return this._view;
    }
    getModel() {
        return this._model;
    }
    constructor(container, option) {
        this._viewListeners = new Map, this._windowListeners = new Map, this._canvasListeners = new Map, 
        this.isInited = !1, this._released = !1, this._model = {
            [GrammarType.signal]: {},
            [GrammarType.data]: {},
            [GrammarType.mark]: {}
        }, this._compileChart = null, this.handleStageRender = () => {
            var _a, _b;
            null === (_b = null === (_a = this._compileChart) || void 0 === _a ? void 0 : _a.getEvent()) || void 0 === _b || _b.emit(ChartEvent.afterRender, {
                chart: this._compileChart
            });
        }, this._container = container, this._option = option;
    }
    getRenderer() {
        var _a;
        return null === (_a = this._view) || void 0 === _a ? void 0 : _a.renderer;
    }
    getCanvas() {
        var _a;
        return null === (_a = this._view) || void 0 === _a ? void 0 : _a.renderer.canvas();
    }
    getStage() {
        var _a;
        return null === (_a = this._view) || void 0 === _a ? void 0 : _a.renderer.stage();
    }
    initView() {
        var _a, _b, _c, _d;
        if (this._released) return;
        if (this.isInited = !0, this._view) return;
        const logger = new Logger(null !== (_a = this._option.logLevel) && void 0 !== _a ? _a : LoggerLevel.Error);
        (null === (_b = this._option) || void 0 === _b ? void 0 : _b.onError) && logger.addErrorHandler(((...args) => {
            var _a, _b;
            null === (_b = null === (_a = this._option) || void 0 === _a ? void 0 : _a.onError) || void 0 === _b || _b.call(_a, ...args);
        }));
        const _e = this._option, {performanceHook: performanceHook, autoRefreshDpr: autoRefreshDpr, dpr: dpr, mode: mode, gestureConfig: gestureConfig, interactive: interactive, clickInterval: clickInterval, autoPreventDefault: autoPreventDefault} = _e, restOption = __rest(_e, [ "performanceHook", "autoRefreshDpr", "dpr", "mode", "gestureConfig", "interactive", "clickInterval", "autoPreventDefault" ]);
        this._view = new View(Object.assign(Object.assign({
            width: this._width,
            height: this._height,
            container: null !== (_c = this._container.dom) && void 0 !== _c ? _c : null,
            renderCanvas: null !== (_d = this._container.canvas) && void 0 !== _d ? _d : null,
            hooks: performanceHook
        }, restOption), {
            dpr: dpr,
            autoRefresh: isValid(autoRefreshDpr) ? autoRefreshDpr : !isValid(dpr),
            mode: toRenderMode(mode),
            autoFit: !1,
            eventConfig: {
                gesture: isValid(gestureConfig) ? gestureConfig : isMobileLikeMode(mode),
                disable: !1 === interactive,
                clickInterval: clickInterval,
                autoPreventDefault: autoPreventDefault
            },
            doLayout: () => {
                var _a;
                null === (_a = this._compileChart) || void 0 === _a || _a.onLayout(this._view);
            },
            logger: logger,
            logLevel: logger.level()
        })), this._setCanvasStyle(), this.getStage().hooks.afterRender.tap("chart-event", this.handleStageRender), 
        !1 !== interactive && this._viewListeners.forEach((listener => {
            var _a;
            null === (_a = this._view) || void 0 === _a || _a.addEventListener(listener.type, listener.callback);
        }));
    }
    _setCanvasStyle() {
        if (this._view && this._container.dom && !isString(this._container.dom)) {
            this._container.dom.style.display = "block", this._container.dom.style.position = "relative";
            const canvas = this.getCanvas();
            canvas && (canvas.style.display = "block");
        }
    }
    compileInteractions() {
        var _a;
        if (this._view.removeAllInteractions(), null === (_a = this._interactions) || void 0 === _a ? void 0 : _a.length) {
            const regionCombindInteractions = {};
            this._interactions.forEach((interaction => {
                var _a;
                if (interaction.regionId) {
                    const interactionId = `${interaction.regionId}-${interaction.type}-${null !== (_a = interaction.id) && void 0 !== _a ? _a : ""}`, spec = regionCombindInteractions[interactionId];
                    regionCombindInteractions[interactionId] = spec ? Object.assign(Object.assign(Object.assign({}, spec), interaction), {
                        selector: [ ...spec.selector, ...interaction.selector ]
                    }) : interaction;
                } else this._view.interaction(interaction.type, interaction);
            })), Object.keys(regionCombindInteractions).forEach((key => {
                const interaction = this._view.interaction(regionCombindInteractions[key].type, regionCombindInteractions[key]);
                if (this._compileChart) {
                    const region = this._compileChart.getRegionsInIds([ regionCombindInteractions[key].regionId ])[0];
                    region && region.interaction.addVgrammarInteraction(interaction.getStartState(), interaction);
                }
            }));
        }
    }
    compile(ctx, option) {
        if (this._released) return;
        const {chart: chart} = ctx;
        this._compileChart = chart, this.initView(), this._view && (chart.compile(), chart.afterCompile(), 
        this.updateDepend(), this.compileInteractions());
    }
    clearNextRender() {
        return !!this._nextRafId && (vglobal.getCancelAnimationFrame()(this._nextRafId), 
        this._nextRafId = null, !0);
    }
    clear(ctx, removeGraphicItems = !1) {
        const {chart: chart} = ctx;
        this.clearNextRender(), chart.clear(), this.releaseGrammar(removeGraphicItems);
    }
    renderNextTick(morphConfig) {
        this._released || this._nextRafId || (this._nextRafId = vglobal.getRequestAnimationFrame()((() => {
            this._nextRafId = null, this.render(morphConfig);
        })));
    }
    render(morphConfig) {
        var _a, _b;
        this._released || (this.initView(), this._view && (null === (_a = this._view) || void 0 === _a || _a.run(morphConfig), 
        this.clearNextRender() && (null === (_b = this._view) || void 0 === _b || _b.run(morphConfig))));
    }
    updateViewBox(viewBox, reRender = !0) {
        this._view && this._view.renderer.setViewBox(viewBox, reRender);
    }
    resize(width, height, reRender = !0) {
        this._view && (this._width = width, this._height = height, this._view.resize(width, height), 
        reRender && this.render({
            morph: !1
        }));
    }
    setBackground(color) {
        var _a;
        null === (_a = this._view) || void 0 === _a || _a.background(color);
    }
    setSize(width, height) {
        this._width = width, this._height = height, this._view && (this._view.width(width), 
        this._view.height(height));
    }
    setViewBox(viewBox, reRender = !0) {
        this._view && this._view.renderer.setViewBox(viewBox, reRender);
    }
    addEventListener(source, type, callback) {
        var _a, _b;
        if (!1 !== this._option.interactive) if (source === Event_Source_Type.chart) {
            const wrappedCallback = function(event, element) {
                var _a, _b, _c;
                const context = null !== (_b = null === (_a = null == element ? void 0 : element.mark) || void 0 === _a ? void 0 : _a.getContext()) && void 0 !== _b ? _b : {}, modelId = isValid(context.modelId) ? context.modelId : null, markId = isValid(context.markId) ? context.markId : null, modelUserId = isValid(context.modelUserId) ? context.modelUserId : null, markUserId = isValid(context.markUserId) ? context.markUserId : null, params = {
                    event: event,
                    type: type,
                    source: source,
                    item: element,
                    datum: (null === (_c = null == element ? void 0 : element.getDatum) || void 0 === _c ? void 0 : _c.call(element)) || null,
                    markId: markId,
                    modelId: modelId,
                    markUserId: markUserId,
                    modelUserId: modelUserId
                };
                callback.call(null, params);
            }.bind(this);
            this._viewListeners.set(callback, {
                type: type,
                callback: wrappedCallback
            }), null === (_a = this._view) || void 0 === _a || _a.addEventListener(type, wrappedCallback);
        } else if (source === Event_Source_Type.window) {
            const wrappedCallback = function(event) {
                const params = {
                    event: event,
                    type: type,
                    source: source,
                    item: null,
                    datum: null,
                    markId: null,
                    modelId: null,
                    markUserId: null,
                    modelUserId: null
                };
                callback.call(null, params);
            }.bind(this);
            this._windowListeners.set(callback, {
                type: type,
                callback: wrappedCallback
            });
            const windowObject = this._getGlobalThis();
            null == windowObject || windowObject.addEventListener(type, wrappedCallback);
        } else if (source === Event_Source_Type.canvas) {
            const wrappedCallback = function(event) {
                const params = {
                    event: event,
                    type: type,
                    source: source,
                    item: null,
                    datum: null,
                    markId: null,
                    modelId: null,
                    markUserId: null,
                    modelUserId: null
                };
                callback.call(null, params);
            }.bind(this);
            this._canvasListeners.set(callback, {
                type: type,
                callback: wrappedCallback
            });
            const canvasObject = null === (_b = this.getStage()) || void 0 === _b ? void 0 : _b.window;
            null == canvasObject || canvasObject.addEventListener(type, wrappedCallback);
        }
    }
    removeEventListener(source, type, callback) {
        var _a, _b, _c, _d, _e;
        if (!1 !== this._option.interactive) if (source === Event_Source_Type.chart) {
            const wrappedCallback = null === (_a = this._viewListeners.get(callback)) || void 0 === _a ? void 0 : _a.callback;
            wrappedCallback && (null === (_b = this._view) || void 0 === _b || _b.removeEventListener(type, wrappedCallback)), 
            this._viewListeners.delete(callback);
        } else if (source === Event_Source_Type.window) {
            const windowObject = this._getGlobalThis(), wrappedCallback = null === (_c = this._windowListeners.get(callback)) || void 0 === _c ? void 0 : _c.callback;
            wrappedCallback && (null == windowObject || windowObject.removeEventListener(type, wrappedCallback)), 
            this._windowListeners.delete(callback);
        } else if (source === Event_Source_Type.canvas) {
            const canvasObject = null === (_d = this.getStage()) || void 0 === _d ? void 0 : _d.window, wrappedCallback = null === (_e = this._canvasListeners.get(callback)) || void 0 === _e ? void 0 : _e.callback;
            canvasObject && wrappedCallback && (null == canvasObject || canvasObject.removeEventListener(type, wrappedCallback)), 
            this._canvasListeners.delete(callback);
        }
    }
    releaseEvent() {
        const stage = this.getStage();
        stage && stage.hooks.afterRender.unTap("chart-event", this.handleStageRender), this._viewListeners.clear(), 
        this._windowListeners.clear(), this._canvasListeners.clear();
    }
    release() {
        var _a;
        this.clearNextRender(), this.releaseEvent(), this._option = this._container = null, 
        this._releaseModel(), null === (_a = this._view) || void 0 === _a || _a.release(), 
        this._view = null, this.isInited = !1, this._compileChart = null, this._released = !0;
    }
    releaseGrammar(removeGraphicItems = !1) {
        var _a, _b;
        this._releaseModel(), removeGraphicItems && (null === (_a = this._view) || void 0 === _a || _a.removeAllGraphicItems()), 
        null === (_b = this._view) || void 0 === _b || _b.removeAllGrammars();
    }
    _releaseModel() {
        Object.keys(this._model).forEach((type => {
            Object.values(this._model[type]).forEach((grammarItemMap => {
                Object.values(grammarItemMap).forEach((item => {
                    item.removeProduct(!0);
                }));
            })), this._model[type] = {};
        }));
    }
    addGrammarItem(grammarItem) {
        const product = grammarItem.getProduct();
        if (isNil(product)) return;
        const id = product.id(), type = grammarItem.grammarType;
        isNil(this._model[type][id]) && (this._model[type][id] = {}), this._model[type][id][grammarItem.id] = grammarItem;
    }
    removeGrammarItem(grammarItem, reserveVGrammarModel) {
        var _a;
        const product = grammarItem.getProduct();
        if (isNil(product)) return;
        const id = product.id(), type = grammarItem.grammarType, map = this._model[type][id];
        isValid(map) && (delete map[grammarItem.id], 0 === Object.keys(map).length && delete this._model[type][id]), 
        reserveVGrammarModel || null === (_a = this._view) || void 0 === _a || _a.removeGrammar(product);
    }
    addInteraction(interaction) {
        this._interactions || (this._interactions = []), this._interactions.push(interaction);
    }
    removeInteraction(seriesId) {
        this._interactions && (this._interactions = this._interactions.filter((entry => entry.seriesId !== seriesId)));
    }
    updateDepend(items) {
        return isValid(items) && items.length > 0 ? items.every((item => item.updateDepend())) : (Object.values(this._model).forEach((productMap => {
            Object.values(productMap).forEach((grammarItemMap => {
                const grammarItems = Object.values(grammarItemMap), product = grammarItems[0].getProduct(), dependList = grammarItems.reduce(((depend, item) => item.getDepend().length > 0 ? depend.concat(item.getDepend()) : depend), []).filter((grammarItem => !!grammarItem)).map((grammarItem => grammarItem.getProduct()));
                product.depend(dependList);
            }));
        })), !0);
    }
    _getGlobalThis() {
        var _a;
        return isTrueBrowser(this._option.mode) ? globalThis : null === (_a = this.getStage()) || void 0 === _a ? void 0 : _a.window;
    }
}
//# sourceMappingURL=compiler.js.map