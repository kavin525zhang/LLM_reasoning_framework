var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))((function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            var value;
            result.done ? resolve(result.value) : (value = result.value, value instanceof P ? value : new P((function(resolve) {
                resolve(value);
            }))).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    }));
}, __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { arrayParser } from "../data/parser/array";

import { RenderModeEnum } from "../typings/spec/common";

import { ComponentTypeEnum } from "../component/interface/type";

import { DataSet, dataViewParser, DataView } from "@visactor/vdataset";

import { vglobal } from "@visactor/vrender-core";

import { isString, isValid, isNil, array, specTransform, functionTransform } from "../util";

import { createID } from "../util/id";

import { convertPoint } from "../util/space";

import { isTrueBrowser } from "../util/env";

import { warn } from "../util/debug";

import { getThemeObject } from "../util/theme/common";

import { mergeSpec, mergeSpecWithFilter } from "@visactor/vutils-extension";

import { Factory } from "./factory";

import { Event } from "../event/event";

import { EventDispatcher } from "../event/event-dispatcher";

import { getMapSource } from "../series/map/geo-source";

import { registerDataSetInstanceParser, registerDataSetInstanceTransform } from "../data/register";

import { dataToDataView } from "../data/initialize";

import { copyDataView } from "../data/transforms/copy-data-view";

import { AnimationStateEnum } from "../animation/interface";

import { ThemeManager } from "../theme/theme-manager";

import { Compiler } from "../compile/compiler";

import { getCanvasDataURL, URLToImage } from "../util/image";

import { ChartEvent, VGRAMMAR_HOOK_EVENT } from "../constant/event";

import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH } from "../constant/base";

import { isArray, isEmpty, Logger, isFunction, LoggerLevel, isEqual, get, cloneDeep, isObject, throttle } from "@visactor/vutils";

import { InstanceManager } from "./instance-manager";

import { setPoptipTheme } from "@visactor/vrender-components";

import { calculateChartSize, mergeUpdateResult } from "../chart/util";

import { Region } from "../region/region";

import { Layout } from "../layout/base-layout";

import { registerGroupMark } from "../mark/group";

import { View, registerGesturePlugin } from "@visactor/vgrammar-core";

import { VCHART_UTILS } from "./util";

import { ExpressionFunction } from "./expression-function";

import { registerBrowserEnv, registerNodeEnv } from "../env";

import { mergeTheme, preprocessTheme } from "../util/theme";

import { darkTheme, registerTheme } from "../theme/builtin";

import { ChartPluginService } from "../plugin/chart/plugin-service";

import { registerElementHighlight as registerHoverInteraction, registerElementSelect as registerSelectInteraction } from "../interaction";

import { getSVGSource } from "../series/pictogram/svg-source";

export class VChart {
    static useRegisters(comps) {
        comps.forEach((fn => {
            "function" == typeof fn ? fn() : console.error("Invalid function:", fn);
        }));
    }
    static useChart(charts) {
        charts.forEach((c => Factory.registerChart(c.type, c)));
    }
    static useSeries(series) {
        series.forEach((s => Factory.registerSeries(s.type, s)));
    }
    static useComponent(components) {
        components.forEach((c => Factory.registerComponent(c.type, c)));
    }
    static useMark(marks) {
        marks.forEach((m => {
            var _a;
            return Factory.registerMark(null !== (_a = m.constructorType) && void 0 !== _a ? _a : m.type, m);
        }));
    }
    static useLayout(layouts) {
        layouts.forEach((l => Factory.registerLayout(l.type, l)));
    }
    static registerDataSetTransform(name, transform) {
        Factory.registerTransform(name, transform);
    }
    static registerFunction(key, fun) {
        key && fun && ExpressionFunction.instance().registerFunction(key, fun);
    }
    static unregisterFunction(key) {
        key && ExpressionFunction.instance().unregisterFunction(key);
    }
    static getFunction(key) {
        return key ? ExpressionFunction.instance().getFunction(key) : null;
    }
    static getFunctionList() {
        return ExpressionFunction.instance().getFunctionNameList();
    }
    static registerMap(key, source, option) {
        const impl = Factory.getImplementInKey("registerMap");
        impl && impl(key, source, option);
    }
    static unregisterMap(key) {
        const impl = Factory.getImplementInKey("unregisterMap");
        impl && impl(key);
    }
    static getMap(key) {
        return getMapSource(key);
    }
    static registerSVG(key, source, option) {
        const impl = Factory.getImplementInKey("registerSVG");
        impl && impl(key, source, option);
    }
    static unregisterSVG(key) {
        const impl = Factory.getImplementInKey("unregisterSVG");
        impl && impl(key);
    }
    static getSVG(key) {
        return getSVGSource(key);
    }
    static hideTooltip(excludeId = []) {
        InstanceManager.forEach((instance => {
            var _a;
            return null === (_a = null == instance ? void 0 : instance.hideTooltip) || void 0 === _a ? void 0 : _a.call(instance);
        }), excludeId);
    }
    static getLogger() {
        return Logger.getInstance();
    }
    getSpec() {
        return this._spec;
    }
    getSpecInfo() {
        return this._specInfo;
    }
    getDataSet() {
        return this._dataSet;
    }
    constructor(spec, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.id = createID(), this._userEvents = [], this._autoSize = !0, this._option = {
            mode: RenderModeEnum["desktop-browser"],
            onError: msg => {
                throw new Error(msg);
            },
            optimize: {
                disableCheckGraphicWidthOutRange: !0
            }
        }, this._observer = null, this._context = {}, this._doResize = () => {
            const {width: width, height: height} = this.getCurrentSize();
            this._currentSize.width === width && this._currentSize.height === height || (this._currentSize = {
                width: width,
                height: height
            }, this.resizeSync(width, height));
        }, this._renderSync = (option = {}) => {
            var _a;
            const self = this;
            return this._beforeRender(option) ? (null === (_a = this._compiler) || void 0 === _a || _a.render(option.morphConfig), 
            this._afterRender(), self) : self;
        }, this._updateSpec = (spec, forceMerge = !1, userUpdateOptions) => {
            var _a, _b;
            const lastSpec = this._spec, result = {
                changeBackground: !1,
                reTransformSpec: !1,
                change: !1,
                reMake: !1,
                reCompile: !1,
                reSize: !1,
                changeTheme: !1
            };
            if (!this._setNewSpec(spec, forceMerge)) return;
            isEqual(lastSpec.theme, this._spec.theme) ? isEqual(this._spec.background, lastSpec.background) || (result.reMake = !0, 
            result.changeBackground = !0) : result.changeTheme = !0;
            const reSize = this._shouldChartResize(lastSpec);
            if (result.reSize = reSize, this._spec.type !== lastSpec.type) return null === (_b = null === (_a = this._compiler) || void 0 === _a ? void 0 : _a.getVGrammarView()) || void 0 === _b || _b.updateLayoutTag(), 
            result.reMake = !0, result.reTransformSpec = !0, result.change = !0, result.changeTheme = !0, 
            result;
            this._initChartSpec(this._spec, "updateSpec");
            const res = mergeUpdateResult(this._chart.updateSpec(this._spec), result);
            return userUpdateOptions ? Object.assign(Object.assign({}, res), userUpdateOptions) : res;
        }, this._option = Object.assign(Object.assign(Object.assign({}, this._option), {
            animation: !1 !== spec.animation
        }), options), (null == options ? void 0 : options.optimize) && (this._option.optimize = Object.assign(Object.assign({}, this._option.optimize), options.optimize)), 
        this._onError = null === (_a = this._option) || void 0 === _a ? void 0 : _a.onError;
        const _j = this._option, {dom: dom, renderCanvas: renderCanvas, mode: mode, stage: stage, poptip: poptip} = _j, restOptions = __rest(_j, [ "dom", "renderCanvas", "mode", "stage", "poptip" ]), isTrueBrowseEnv = isTrueBrowser(mode);
        if (isTrueBrowseEnv ? registerBrowserEnv() : "node" === mode && registerNodeEnv(), 
        isTrueBrowseEnv && dom && (this._container = isString(dom) ? vglobal.getElementById(dom) : dom), 
        renderCanvas && (this._canvas = renderCanvas), stage && (this._stage = stage), "node" !== mode && !this._container && !this._canvas && !this._stage) return void (null === (_b = this._option) || void 0 === _b || _b.onError("please specify container or renderCanvas!"));
        this._viewBox = this._option.viewBox, this._currentThemeName = ThemeManager.getCurrentThemeName(), 
        this._setNewSpec(spec), this._updateCurrentTheme(), this._currentSize = this.getCurrentSize();
        const pluginList = [];
        !1 != !poptip && pluginList.push("poptipForText"), "sankey" === spec.type && pluginList.push("scrollbar");
        const performanceHook = Object.assign({}, restOptions.performanceHook || {});
        Object.keys(performanceHook).forEach((hookKey => {
            restOptions.performanceHook[hookKey] = (...args) => {
                performanceHook[hookKey](...args, this);
            };
        })), this._compiler = new Compiler({
            dom: null !== (_c = this._container) && void 0 !== _c ? _c : "none",
            canvas: renderCanvas
        }, Object.assign(Object.assign({
            mode: this._option.mode,
            stage: stage,
            pluginList: pluginList
        }, restOptions), {
            background: this._getBackground(),
            onError: this._onError
        })), this._compiler.setSize(this._currentSize.width, this._currentSize.height), 
        this._eventDispatcher = new EventDispatcher(this, this._compiler), this._event = new Event(this._eventDispatcher, mode), 
        this._compiler.initView(), this._setFontFamilyTheme(null === (_d = this._currentTheme) || void 0 === _d ? void 0 : _d.fontFamily), 
        this._initDataSet(this._option.dataSet), this._autoSize = !!isTrueBrowseEnv && (null === (_f = null !== (_e = spec.autoFit) && void 0 !== _e ? _e : this._option.autoFit) || void 0 === _f || _f), 
        this._bindResizeEvent(), this._bindVGrammarViewEvent(), this._initChartPlugin(), 
        InstanceManager.registerInstance(this), null === (_h = null === (_g = this._option.performanceHook) || void 0 === _g ? void 0 : _g.afterCreateVChart) || void 0 === _h || _h.call(_g, this);
    }
    _setNewSpec(spec, forceMerge) {
        return !!spec && (isString(spec) && (spec = JSON.parse(spec)), forceMerge && this._originalSpec && (spec = mergeSpec({}, this._originalSpec, spec)), 
        this._originalSpec = spec, this._spec = this._getSpecFromOriginalSpec(), !0);
    }
    _getSpecFromOriginalSpec() {
        var _a;
        const spec = specTransform(this._originalSpec);
        return spec.data = null !== (_a = spec.data) && void 0 !== _a ? _a : [], spec;
    }
    _initChartSpec(spec, actionSource) {
        var _a, _b;
        VChart.getFunctionList() && VChart.getFunctionList().length && (spec = functionTransform(spec, VChart)), 
        this._spec = spec, this._chartSpecTransformer || (this._chartSpecTransformer = Factory.createChartSpecTransformer(this._spec.type, this._getChartOption(this._spec.type))), 
        null === (_a = this._chartSpecTransformer) || void 0 === _a || _a.transformSpec(this._spec), 
        this._chartPluginApply("onAfterChartSpecTransform", this._spec, actionSource), this._specInfo = null === (_b = this._chartSpecTransformer) || void 0 === _b ? void 0 : _b.transformModelSpec(this._spec), 
        this._chartPluginApply("onAfterModelSpecTransform", this._spec, this._specInfo, actionSource);
    }
    _updateSpecInfo() {
        var _a;
        this._chartSpecTransformer || (this._chartSpecTransformer = Factory.createChartSpecTransformer(this._spec.type, this._getChartOption(this._spec.type))), 
        this._specInfo = null === (_a = this._chartSpecTransformer) || void 0 === _a ? void 0 : _a.createSpecInfo(this._spec);
    }
    _initChart(spec) {
        var _a, _b, _c;
        if (!this._compiler) return void (null === (_a = this._option) || void 0 === _a || _a.onError("compiler is not initialized"));
        if (this._chart) return void (null === (_b = this._option) || void 0 === _b || _b.onError("chart is already initialized"));
        const chart = Factory.createChart(spec.type, spec, this._getChartOption(spec.type));
        chart ? (this._chart = chart, this._chart.setCanvasRect(this._currentSize.width, this._currentSize.height), 
        this._chart.created(this._chartSpecTransformer), this._chart.init(), this._event.emit(ChartEvent.initialized, {
            chart: chart,
            vchart: this
        })) : null === (_c = this._option) || void 0 === _c || _c.onError("init chart fail");
    }
    _releaseData() {
        this._dataSet && (this._dataSet.dataViewMap = {}, this._dataSet = null);
    }
    _bindVGrammarViewEvent() {
        if (!this._compiler) return;
        const view = this._compiler.getVGrammarView();
        view.addEventListener(VGRAMMAR_HOOK_EVENT.ALL_ANIMATION_END, (() => {
            this._event.emit(ChartEvent.animationFinished, {
                chart: this._chart,
                vchart: this
            });
        })), view.addEventListener(VGRAMMAR_HOOK_EVENT.AFTER_VRENDER_NEXT_RENDER, (() => {
            this._event.emit(ChartEvent.renderFinished, {
                chart: this._chart,
                vchart: this
            });
        }));
    }
    _bindResizeEvent() {
        var _a, _b;
        if (this._autoSize) {
            if (this._onResize = throttle(this._doResize, null !== (_a = this._option.resizeDelay) && void 0 !== _a ? _a : 100), 
            this._container) {
                const ResizeObserverWindow = window.ResizeObserver;
                ResizeObserverWindow && (this._observer = new ResizeObserverWindow(this._onResize), 
                null === (_b = this._observer) || void 0 === _b || _b.observe(this._container));
            }
            window.addEventListener("resize", this._onResize);
        }
    }
    _unBindResizeEvent() {
        this._autoSize && (window.removeEventListener("resize", this._onResize), this._observer && (this._observer.disconnect(), 
        this._observer = null));
    }
    getCurrentSize() {
        var _a, _b, _c, _d;
        return calculateChartSize(this._spec, {
            container: this._container,
            canvas: this._canvas,
            mode: this._getMode(),
            modeParams: this._option.modeParams
        }, {
            width: null !== (_b = null === (_a = this._currentSize) || void 0 === _a ? void 0 : _a.width) && void 0 !== _b ? _b : DEFAULT_CHART_WIDTH,
            height: null !== (_d = null === (_c = this._currentSize) || void 0 === _c ? void 0 : _c.height) && void 0 !== _d ? _d : DEFAULT_CHART_HEIGHT
        });
    }
    _initDataSet(dataSet) {
        this._dataSet = dataSet instanceof DataSet ? dataSet : new DataSet, registerDataSetInstanceParser(this._dataSet, "dataview", dataViewParser), 
        registerDataSetInstanceParser(this._dataSet, "array", arrayParser), registerDataSetInstanceTransform(this._dataSet, "copyDataView", copyDataView);
        for (const key in Factory.transforms) registerDataSetInstanceTransform(this._dataSet, key, Factory.transforms[key]);
        for (const key in Factory.dataParser) registerDataSetInstanceParser(this._dataSet, key, Factory.dataParser[key]);
    }
    updateCustomConfigAndRerender(updateSpecResult, sync, option = {}) {
        if (!this._isReleased && updateSpecResult) return isFunction(updateSpecResult) && (updateSpecResult = updateSpecResult()), 
        updateSpecResult.reAnimate && (this.stopAnimation(), this._updateAnimateState(!0)), 
        this._reCompile(updateSpecResult), sync ? this._renderSync(option) : this._renderAsync(option);
    }
    _updateCustomConfigAndRecompile(updateSpecResult, option = {}) {
        return !!updateSpecResult && (this._reCompile(updateSpecResult), this._beforeRender(option));
    }
    _reCompile(updateResult, morphConfig) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (updateResult.reMake && (this._releaseData(), this._initDataSet(), null === (_a = this._chart) || void 0 === _a || _a.release(), 
        this._chart = null), updateResult.reTransformSpec && (this._chartSpecTransformer = null), 
        updateResult.changeTheme ? (this._setCurrentTheme(), this._setFontFamilyTheme(null === (_b = this._currentTheme) || void 0 === _b ? void 0 : _b.fontFamily)) : updateResult.changeBackground && (null === (_c = this._compiler) || void 0 === _c || _c.setBackground(this._getBackground())), 
        updateResult.reMake) null === (_d = this._compiler) || void 0 === _d || _d.releaseGrammar(!1 === (null === (_e = this._option) || void 0 === _e ? void 0 : _e.animation) || !1 === (null === (_f = this._spec) || void 0 === _f ? void 0 : _f.animation)), 
        this._userEvents.forEach((e => {
            var _a;
            return null === (_a = this._event) || void 0 === _a ? void 0 : _a.on(e.eType, e.query, e.handler);
        })), updateResult.reSize && this._doResize(); else if (updateResult.reCompile && (null === (_g = this._compiler) || void 0 === _g || _g.clear({
            chart: this._chart,
            vChart: this
        }, !1 === (null === (_h = this._option) || void 0 === _h ? void 0 : _h.animation) || !1 === (null === (_j = this._spec) || void 0 === _j ? void 0 : _j.animation)), 
        null === (_k = this._compiler) || void 0 === _k || _k.compile({
            chart: this._chart,
            vChart: this
        }, {})), updateResult.reSize) {
            const {width: width, height: height} = this.getCurrentSize();
            this._chart.onResize(width, height, !1), this._compiler.resize(width, height, !1);
        }
    }
    _beforeRender(option = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this._isReleased) return !1;
        if (this._chart) return !0;
        const {transformSpec: transformSpec, actionSource: actionSource} = option;
        return transformSpec && this._initChartSpec(this._spec, "render"), this._chartPluginApply("onBeforeInitChart", this._spec, actionSource), 
        null === (_b = null === (_a = this._option.performanceHook) || void 0 === _a ? void 0 : _a.beforeInitializeChart) || void 0 === _b || _b.call(_a, this), 
        this._initChart(this._spec), null === (_d = null === (_c = this._option.performanceHook) || void 0 === _c ? void 0 : _c.afterInitializeChart) || void 0 === _d || _d.call(_c, this), 
        !(!this._chart || !this._compiler) && (null === (_f = null === (_e = this._option.performanceHook) || void 0 === _e ? void 0 : _e.beforeCompileToVGrammar) || void 0 === _f || _f.call(_e), 
        this._compiler.compile({
            chart: this._chart,
            vChart: this
        }, {
            performanceHook: this._option.performanceHook
        }), null === (_h = null === (_g = this._option.performanceHook) || void 0 === _g ? void 0 : _g.afterCompileToVGrammar) || void 0 === _h || _h.call(_g), 
        !0);
    }
    _afterRender() {
        return !this._isReleased && (this._updateAnimateState(), this._event.emit(ChartEvent.rendered, {
            chart: this._chart,
            vchart: this
        }), !0);
    }
    renderSync(morphConfig) {
        return this._renderSync({
            morphConfig: morphConfig,
            transformSpec: !0,
            actionSource: "render"
        });
    }
    renderAsync(morphConfig) {
        return __awaiter(this, void 0, void 0, (function*() {
            return this._renderAsync({
                morphConfig: morphConfig,
                transformSpec: !0,
                actionSource: "render"
            });
        }));
    }
    _renderAsync(option = {}) {
        return __awaiter(this, void 0, void 0, (function*() {
            return this._renderSync(option);
        }));
    }
    _updateAnimateState(initial) {
        var _a, _b;
        if (this._option.animation) {
            const animationState = initial ? AnimationStateEnum.appear : AnimationStateEnum.update;
            null === (_a = this._chart) || void 0 === _a || _a.getAllRegions().forEach((region => {
                var _a;
                null === (_a = region.animate) || void 0 === _a || _a.updateAnimateState(animationState, !0);
            })), null === (_b = this._chart) || void 0 === _b || _b.getAllComponents().forEach((component => {
                var _a;
                null === (_a = component.animate) || void 0 === _a || _a.updateAnimateState(animationState, !0);
            }));
        }
    }
    release() {
        var _a, _b, _c, _d;
        (null === (_a = this._onResize) || void 0 === _a ? void 0 : _a.cancel) && this._onResize.cancel(), 
        this._chartPluginApply("releaseAll"), this._chartPlugin = null, this._chartSpecTransformer = null, 
        null === (_b = this._chart) || void 0 === _b || _b.release(), null === (_c = this._eventDispatcher) || void 0 === _c || _c.release(), 
        null === (_d = this._compiler) || void 0 === _d || _d.release(), this._unBindResizeEvent(), 
        this._releaseData(), this._onError = null, this._onResize = null, this._container = null, 
        this._currentTheme = null, this._option = null, this._chart = null, this._compiler = null, 
        this._spec = null, this._specInfo = null, this._originalSpec = null, this._userEvents = null, 
        this._event = null, this._eventDispatcher = null, this._isReleased = !0, InstanceManager.unregisterInstance(this);
    }
    updateData(id, data, parserOptions, userUpdateOptions) {
        return __awaiter(this, void 0, void 0, (function*() {
            return this.updateDataSync(id, data, parserOptions, userUpdateOptions);
        }));
    }
    _updateDataById(id, data, parserOptions) {
        const preDV = this._spec.data.find((dv => dv.name === id || dv.id === id));
        preDV ? preDV.id === id ? preDV.values = data : preDV.name === id && preDV.parse(data, parserOptions) : isArray(data) ? this._spec.data.push({
            id: id,
            values: data
        }) : this._spec.data.push(data);
    }
    updateDataInBatches(list) {
        return __awaiter(this, void 0, void 0, (function*() {
            return this._chart ? (this._chart.updateFullData(list.map((({id: id, data: data, options: options}) => ({
                id: id,
                values: data,
                parser: options
            })))), this._chart.updateGlobalScaleDomain(), this._compiler.render(), this) : (this._spec.data = array(this._spec.data), 
            list.forEach((({id: id, data: data, options: options}) => {
                this._updateDataById(id, data, options);
            })), this);
        }));
    }
    updateDataSync(id, data, parserOptions, userUpdateOptions) {
        return isNil(this._dataSet) ? this : this._chart ? ((null == userUpdateOptions ? void 0 : userUpdateOptions.reAnimate) && (this.stopAnimation(), 
        this._updateAnimateState(!0)), this._chart.updateData(id, data, !0, parserOptions), 
        this._compiler.render(), this) : (this._spec.data = array(this._spec.data), this._updateDataById(id, data, parserOptions), 
        this);
    }
    updateFullDataSync(data, reRender = !0, userUpdateOptions) {
        if (this._chart) return (null == userUpdateOptions ? void 0 : userUpdateOptions.reAnimate) && (this.stopAnimation(), 
        this._updateAnimateState(!0)), this._chart.updateFullData(data), reRender && this._compiler.render(), 
        this;
        const prevData = array(this._spec.data);
        return array(data).forEach((d => {
            const {id: id, values: values, parser: parser, fields: fields} = d, preDV = prevData.find((dv => dv.name === id));
            if (preDV) preDV instanceof DataView ? (preDV.setFields(cloneDeep(fields)), preDV.parse(values, cloneDeep(parser))) : (preDV.values = values, 
            isValid(parser) && (preDV.parser = parser), isValid(fields) && (preDV.fields = fields)); else {
                const dataView = dataToDataView(d, this._dataSet, prevData);
                isArray(this._spec.data) && this._spec.data.push(dataView);
            }
        })), this;
    }
    updateFullData(data, reRender = !0) {
        return __awaiter(this, void 0, void 0, (function*() {
            return this.updateFullDataSync(data, reRender);
        }));
    }
    updateSpec(spec, forceMerge = !1, morphConfig, userUpdateOptions) {
        return __awaiter(this, void 0, void 0, (function*() {
            const result = this._updateSpec(spec, forceMerge, userUpdateOptions);
            return result ? (yield this.updateCustomConfigAndRerender(result, !1, {
                morphConfig: morphConfig,
                transformSpec: result.reTransformSpec,
                actionSource: "updateSpec"
            }), this) : this;
        }));
    }
    updateSpecSync(spec, forceMerge = !1, morphConfig, userUpdateOptions) {
        const result = this._updateSpec(spec, forceMerge, userUpdateOptions);
        return result ? (this.updateCustomConfigAndRerender(result, !0, {
            morphConfig: morphConfig,
            transformSpec: result.reTransformSpec,
            actionSource: "updateSpec"
        }), this) : this;
    }
    updateSpecAndRecompile(spec, forceMerge = !1, option = {}) {
        const result = this._updateSpec(spec, forceMerge);
        return this._updateCustomConfigAndRecompile(result, Object.assign({
            actionSource: "updateSpecAndRecompile"
        }, option));
    }
    updateModelSpec(filter, spec, forceMerge = !1, morphConfig) {
        return __awaiter(this, void 0, void 0, (function*() {
            return this.updateModelSpecSync(filter, spec, forceMerge, morphConfig);
        }));
    }
    updateModelSpecSync(filter, spec, forceMerge = !1, morphConfig) {
        if (!spec || !this._spec) return this;
        if (isString(spec) && (spec = JSON.parse(spec)), isFunction(filter) || mergeSpecWithFilter(this._spec, filter, spec, forceMerge), 
        this._chart) {
            const model = this._chart.getModelInFilter(filter);
            if (model) return this._updateModelSpec(model, spec, !0, forceMerge, morphConfig);
        }
        return this;
    }
    _updateModelSpec(model, spec, sync = !1, forceMerge = !1, morphConfig) {
        forceMerge && (spec = mergeSpec({}, model.getSpec(), spec));
        const result = model.updateSpec(spec);
        return model.reInit(spec), (result.change || result.reCompile || result.reMake || result.reSize || result.reRender) && this._chart.reDataFlow(), 
        this.updateCustomConfigAndRerender(result, sync, {
            morphConfig: morphConfig,
            transformSpec: !1,
            actionSource: "updateModelSpec"
        });
    }
    resize(width, height) {
        return __awaiter(this, void 0, void 0, (function*() {
            return this.resizeSync(width, height);
        }));
    }
    resizeSync(width, height) {
        var _a, _b;
        return this._beforeResize(width, height) ? (null === (_b = (_a = this._compiler).resize) || void 0 === _b || _b.call(_a, width, height), 
        this._afterResize()) : this;
    }
    _beforeResize(width, height) {
        var _a, _b, _c, _d;
        if (!this._chart || !this._compiler) return !1;
        const chartCanvasRect = this._chart.getCanvasRect();
        return (!chartCanvasRect || chartCanvasRect.width !== width || chartCanvasRect.height !== height) && (this._chartPluginApply("onBeforeResize", width, height), 
        null === (_b = null === (_a = this._option.performanceHook) || void 0 === _a ? void 0 : _a.beforeResizeWithUpdate) || void 0 === _b || _b.call(_a), 
        this._chart.onResize(width, height, !1), null === (_d = null === (_c = this._option.performanceHook) || void 0 === _c ? void 0 : _c.afterResizeWithUpdate) || void 0 === _d || _d.call(_c), 
        !0);
    }
    _afterResize() {
        return this._isReleased || this._event.emit(ChartEvent.afterResize, {
            chart: this._chart
        }), this;
    }
    updateViewBox(viewBox, reRender = !0, reLayout = !0) {
        return this._chart && this._compiler ? (this._viewBox = viewBox, this._chart.updateViewBox(viewBox, reLayout), 
        reLayout && (this._compiler.render(), this._chart.onEvaluateEnd()), this._compiler.updateViewBox(viewBox, reRender), 
        this) : this;
    }
    on(eType, query, handler) {
        var _a;
        this._userEvents && (this._userEvents.push({
            eType: eType,
            query: "function" == typeof query ? null : query,
            handler: "function" == typeof query ? query : handler
        }), null === (_a = this._event) || void 0 === _a || _a.on(eType, query, handler));
    }
    off(eType, handler) {
        var _a;
        if (this._userEvents && 0 !== this._userEvents.length) if (handler) {
            const index = this._userEvents.findIndex((e => e.eType === eType && e.handler === handler));
            index >= 0 && (this._userEvents.splice(index, 1), null === (_a = this._event) || void 0 === _a || _a.off(eType, handler));
        } else this._userEvents.forEach((e => {
            var _a;
            e.eType === eType && (null === (_a = this._event) || void 0 === _a || _a.off(eType, e.handler));
        })), this._userEvents = this._userEvents.filter((e => e.eType !== eType));
    }
    updateState(state, filter) {
        this._chart && this._chart.updateState(state, filter);
    }
    setSelected(datum, filter, region) {
        this._chart && this._chart.setSelected(datum, filter, region);
    }
    setHovered(datum, filter, region) {
        this._chart && this._chart.setHovered(datum, filter, region);
    }
    clearState(state) {
        this._chart && this._chart.clearState(state);
    }
    clearAllStates() {
        this._chart && this._chart.clearAllStates();
    }
    clearSelected() {
        this._chart && this._chart.clearSelected();
    }
    clearHovered() {
        this._chart && this._chart.clearHovered();
    }
    _updateCurrentTheme(nextThemeName) {
        var _a, _b, _c;
        const optionTheme = this._option.theme, specTheme = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.theme, chartType = null === (_b = this._spec) || void 0 === _b ? void 0 : _b.type;
        nextThemeName && (this._currentThemeName = nextThemeName);
        const processThemeByChartType = (type, theme) => {
            var _a;
            return (null === (_a = theme.chart) || void 0 === _a ? void 0 : _a[type]) && (theme = mergeTheme({}, theme, theme.chart[type])), 
            theme;
        };
        let currentTheme;
        if (isEmpty(optionTheme) && isEmpty(specTheme)) currentTheme = getThemeObject(this._currentThemeName, !0), 
        this._currentTheme = processThemeByChartType(chartType, currentTheme); else if (isString(optionTheme) && (!specTheme || isString(specTheme)) || isString(specTheme) && (!optionTheme || isString(optionTheme))) {
            const finalTheme = mergeTheme({}, getThemeObject(this._currentThemeName, !0), getThemeObject(optionTheme, !0), getThemeObject(specTheme, !0));
            this._currentTheme = processThemeByChartType(chartType, finalTheme);
        } else {
            const finalTheme = mergeTheme({}, getThemeObject(this._currentThemeName), getThemeObject(optionTheme), getThemeObject(specTheme));
            this._currentTheme = preprocessTheme(processThemeByChartType(chartType, finalTheme));
        }
        setPoptipTheme(get(this._currentTheme, "component.poptip")), null === (_c = this._compiler) || void 0 === _c || _c.setBackground(this._getBackground());
    }
    _shouldChartResize(oldSpec) {
        var _a, _b;
        let resize = !1;
        isNil(this._spec.width) ? !isNil(oldSpec.width) && (this._spec.width = oldSpec.width) : this._spec.width !== oldSpec.width && (resize = !0), 
        isNil(this._spec.height) ? !isNil(oldSpec.height) && (this._spec.height = oldSpec.height) : this._spec.height !== oldSpec.height && (resize = !0);
        const lasAutoSize = this._autoSize;
        return this._autoSize = !!isTrueBrowser(this._option.mode) && (null === (_b = null !== (_a = this._spec.autoFit) && void 0 !== _a ? _a : this._option.autoFit) || void 0 === _b || _b), 
        this._autoSize !== lasAutoSize && (resize = !0), resize;
    }
    _getBackground() {
        return ("string" == typeof this._spec.background || isObject(this._spec.background) && this._spec.background.gradient ? this._spec.background : null) || this._currentTheme.background || this._option.background;
    }
    getCurrentTheme() {
        return getThemeObject(this._currentThemeName);
    }
    getCurrentThemeName() {
        return this._currentThemeName;
    }
    setCurrentTheme(name) {
        return __awaiter(this, void 0, void 0, (function*() {
            return this.setCurrentThemeSync(name);
        }));
    }
    setCurrentThemeSync(name) {
        var _a;
        if (!ThemeManager.themeExist(name)) return this;
        const result = this._setCurrentTheme(name);
        return this._setFontFamilyTheme(null === (_a = this._currentTheme) || void 0 === _a ? void 0 : _a.fontFamily), 
        this.updateCustomConfigAndRerender(result, !0, {
            transformSpec: !1,
            actionSource: "setCurrentTheme"
        }), this;
    }
    _setCurrentTheme(name) {
        var _a;
        return this._updateCurrentTheme(name), this._initChartSpec(this._getSpecFromOriginalSpec(), "setCurrentTheme"), 
        null === (_a = this._chart) || void 0 === _a || _a.setCurrentTheme(), {
            change: !0,
            reMake: !1
        };
    }
    _setFontFamilyTheme(fontFamily) {
        var _a;
        fontFamily && (null === (_a = this.getStage()) || void 0 === _a || _a.setTheme({
            text: {
                fontFamily: fontFamily
            },
            richtext: {
                fontFamily: fontFamily
            }
        }));
    }
    _getTooltipComponent() {
        var _a;
        return null === (_a = this._chart) || void 0 === _a ? void 0 : _a.getComponentsByType(ComponentTypeEnum.tooltip)[0];
    }
    setTooltipHandler(tooltipHandler) {
        var _a, _b;
        this._context.tooltipHandler = tooltipHandler;
        const tooltip = this._getTooltipComponent();
        tooltip && (null === (_b = null === (_a = tooltip.tooltipHandler) || void 0 === _a ? void 0 : _a.release) || void 0 === _b || _b.call(_a), 
        tooltip.tooltipHandler = tooltipHandler);
    }
    getTooltipHandlerByUser() {
        var _a;
        return null === (_a = this._context) || void 0 === _a ? void 0 : _a.tooltipHandler;
    }
    getTooltipHandler() {
        const tooltip = this._getTooltipComponent();
        return tooltip ? tooltip.tooltipHandler : this._context.tooltipHandler;
    }
    showTooltip(datum, options) {
        var _a;
        const tooltip = this._getTooltipComponent();
        return null !== (_a = isValid(datum) && "none" !== (null == tooltip ? void 0 : tooltip.showTooltip(datum, options))) && void 0 !== _a && _a;
    }
    hideTooltip() {
        var _a;
        const tooltip = this._getTooltipComponent();
        return null !== (_a = null == tooltip ? void 0 : tooltip.hideTooltip()) && void 0 !== _a && _a;
    }
    getLegendDataById(id) {
        var _a;
        const legendComponent = null === (_a = this._chart) || void 0 === _a ? void 0 : _a.getComponentByUserId(id);
        return legendComponent ? legendComponent.getLegendData() : [];
    }
    getLegendDataByIndex(index = 0) {
        var _a;
        const legends = null === (_a = this._chart) || void 0 === _a ? void 0 : _a.getComponentsByType(ComponentTypeEnum.discreteLegend);
        return legends && legends[index] ? legends[index].getLegendData() : [];
    }
    getLegendSelectedDataById(id) {
        var _a;
        const legendComponent = null === (_a = this._chart) || void 0 === _a ? void 0 : _a.getComponentByUserId(id);
        return legendComponent ? legendComponent.getSelectedData() : [];
    }
    getLegendSelectedDataByIndex(index = 0) {
        var _a;
        const legends = null === (_a = this._chart) || void 0 === _a ? void 0 : _a.getComponentsByType(ComponentTypeEnum.discreteLegend);
        return legends && legends[index] ? legends[index].getSelectedData() : [];
    }
    setLegendSelectedDataById(id, selectedData) {
        var _a;
        const legendComponent = null === (_a = this._chart) || void 0 === _a ? void 0 : _a.getComponentByUserId(id);
        legendComponent && legendComponent.setSelectedData(selectedData);
    }
    setLegendSelectedDataByIndex(index = 0, selectedData) {
        var _a;
        const legends = null === (_a = this._chart) || void 0 === _a ? void 0 : _a.getComponentsByType(ComponentTypeEnum.discreteLegend);
        legends && legends[index] && legends[index].setSelectedData(selectedData);
    }
    getDataURL() {
        var _a;
        return __awaiter(this, void 0, void 0, (function*() {
            const stage = this.getStage();
            if (this._chart && stage) {
                stage.render();
                const canvas = this._chart.getCanvas();
                return yield getCanvasDataURL(canvas, {
                    onError: this._onError
                });
            }
            return null === (_a = this._option) || void 0 === _a || _a.onError(new ReferenceError("render is not defined")), 
            null;
        }));
    }
    exportImg(name) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, (function*() {
            if (!isTrueBrowser(this._option.mode)) return void (null === (_a = this._option) || void 0 === _a || _a.onError(new TypeError("non-browser environment can not export img")));
            const dataURL = yield this.getDataURL();
            dataURL ? URLToImage(name, dataURL) : null === (_b = this._option) || void 0 === _b || _b.onError(new ReferenceError("render is not defined"));
        }));
    }
    exportCanvas() {
        var _a;
        const stage = this.getStage();
        if (this._chart && stage) return stage.toCanvas();
        null === (_a = this._option) || void 0 === _a || _a.onError(new ReferenceError("render is not defined"));
    }
    getImageBuffer() {
        var _a, _b;
        if ("node" !== this._option.mode) return void (null === (_a = this._option) || void 0 === _a || _a.onError(new TypeError("getImageBuffer() now only support node environment.")));
        const stage = this.getStage();
        if (stage) {
            stage.render();
            return stage.window.getImageBuffer();
        }
        return null === (_b = this._option) || void 0 === _b || _b.onError(new ReferenceError("render is not defined")), 
        null;
    }
    setLayout(layout) {
        var _a;
        this._option.layout = layout, null === (_a = this._chart) || void 0 === _a || _a.setLayout(layout);
    }
    reLayout() {
        var _a;
        null === (_a = this._chart) || void 0 === _a || _a.setLayoutTag(!0);
    }
    getCompiler() {
        return this._compiler;
    }
    getChart() {
        return this._chart;
    }
    getStage() {
        return this._compiler.getStage();
    }
    getCanvas() {
        var _a;
        return null === (_a = this._compiler) || void 0 === _a ? void 0 : _a.getCanvas();
    }
    getContainer() {
        var _a;
        if (isValid(this._container)) return this._container;
        let canvasNode;
        return canvasNode = isString(this._canvas) ? vglobal.getElementById(this._canvas) : this._canvas, 
        isValid(canvasNode) ? canvasNode.parentElement : null === (_a = this.getCanvas()) || void 0 === _a ? void 0 : _a.parentElement;
    }
    getComponents() {
        return this._chart.getAllComponents();
    }
    getScale(scaleId) {
        var _a;
        const globalScale = null === (_a = this._chart) || void 0 === _a ? void 0 : _a.getGlobalScale();
        return null == globalScale ? void 0 : globalScale.getScale(scaleId);
    }
    setDimensionIndex(value, opt = {}) {
        var _a;
        return null === (_a = this._chart) || void 0 === _a ? void 0 : _a.setDimensionIndex(value, opt);
    }
    stopAnimation() {
        var _a, _b, _c;
        null === (_c = null === (_b = null === (_a = this._compiler) || void 0 === _a ? void 0 : _a.getVGrammarView()) || void 0 === _b ? void 0 : _b.animate) || void 0 === _c || _c.stop();
    }
    pauseAnimation() {
        var _a, _b, _c;
        null === (_c = null === (_b = null === (_a = this._compiler) || void 0 === _a ? void 0 : _a.getVGrammarView()) || void 0 === _b ? void 0 : _b.animate) || void 0 === _c || _c.pause();
    }
    resumeAnimation() {
        var _a, _b, _c;
        null === (_c = null === (_b = null === (_a = this._compiler) || void 0 === _a ? void 0 : _a.getVGrammarView()) || void 0 === _b ? void 0 : _b.animate) || void 0 === _c || _c.resume();
    }
    convertDatumToPosition(datum, dataLinkInfo = {}, isRelativeToCanvas = !1, checkInViewData) {
        var _a;
        if (!this._chart) return null;
        if (isEmpty(datum)) return null;
        const {seriesId: seriesId, seriesIndex: seriesIndex = 0} = dataLinkInfo;
        let series;
        if (isValid(seriesId) ? series = this._chart.getSeriesInUserId(seriesId) : isValid(seriesIndex) && (series = null === (_a = this._chart.getSeriesInIndex([ seriesIndex ])) || void 0 === _a ? void 0 : _a[0]), 
        series) {
            const keys = Object.keys(datum), handledDatum = series.getViewData().latestData.find((viewDatum => keys.every((k => viewDatum[k] == datum[k])))), seriesLayoutStartPoint = series.getRegion().getLayoutStartPoint();
            let point;
            return point = handledDatum ? series.dataToPosition(handledDatum, checkInViewData) : series.dataToPosition(datum, checkInViewData), 
            point ? convertPoint(point, seriesLayoutStartPoint, isRelativeToCanvas) : null;
        }
        return null;
    }
    convertValueToPosition(value, dataLinkInfo, isRelativeToCanvas = !1) {
        var _a, _b;
        if (!this._chart || isNil(value) || isEmpty(dataLinkInfo)) return null;
        if (!isArray(value)) {
            const {axisId: axisId, axisIndex: axisIndex} = dataLinkInfo;
            let axis;
            if (isValid(axisId) ? axis = this._chart.getComponentsByKey("axes").find((s => s.userId === axisId)) : isValid(axisIndex) && (axis = null === (_a = this._chart.getComponentsByKey("axes")) || void 0 === _a ? void 0 : _a[axisIndex]), 
            !axis) return warn("Please check whether the `axisId` or `axisIndex` is set!"), 
            null;
            const pointValue = null == axis ? void 0 : axis.valueToPosition(value);
            if (isRelativeToCanvas) {
                const axisLayoutStartPoint = axis.getLayoutStartPoint(), axisOrient = axis.getOrient();
                return pointValue + ("bottom" === axisOrient || "top" === axisOrient ? axisLayoutStartPoint.x : axisLayoutStartPoint.y);
            }
            return pointValue;
        }
        const {seriesId: seriesId, seriesIndex: seriesIndex} = dataLinkInfo;
        let series;
        return isValid(seriesId) ? series = this._chart.getSeriesInUserId(seriesId) : isValid(seriesIndex) && (series = null === (_b = this._chart.getSeriesInIndex([ seriesIndex ])) || void 0 === _b ? void 0 : _b[0]), 
        series ? convertPoint(series.valueToPosition(value[0], value[1]), series.getRegion().getLayoutStartPoint(), isRelativeToCanvas) : (warn("Please check whether the `seriesId` or `seriesIndex` is set!"), 
        null);
    }
    getFunction(key) {
        return ExpressionFunction.instance().getFunction(key);
    }
    registerFunction(key, fun) {
        key && fun && ExpressionFunction.instance().registerFunction(key, fun);
    }
    unregisterFunction(key) {
        key && ExpressionFunction.instance().unregisterFunction(key);
    }
    getFunctionList() {
        return ExpressionFunction.instance().getFunctionNameList();
    }
    setRuntimeSpec(spec) {
        this._spec = spec, this._updateSpecInfo();
    }
    updateIndicatorDataById(id, datum) {
        var _a;
        const indicator = null === (_a = this._chart) || void 0 === _a ? void 0 : _a.getComponentByUserId(id);
        indicator && indicator.updateDatum(datum);
    }
    updateIndicatorDataByIndex(index = 0, datum) {
        var _a;
        const indicators = null === (_a = this._chart) || void 0 === _a ? void 0 : _a.getComponentsByType(ComponentTypeEnum.indicator);
        indicators && indicators[index] && indicators[index].updateDatum(datum);
    }
    geoZoomByIndex(regionIndex = 0, zoom, center) {
        this._geoZoomByQuery({
            regionIndex: regionIndex
        }, zoom, center);
    }
    geoZoomById(regionId, zoom, center) {
        this._geoZoomByQuery({
            regionId: regionId
        }, zoom, center);
    }
    _geoZoomByQuery(query, zoom, center) {
        var _a, _b;
        const region = null === (_a = this._chart) || void 0 === _a ? void 0 : _a.getRegionsInQuerier(query)[0], geoCoordinates = null === (_b = this._chart) || void 0 === _b ? void 0 : _b.getComponentsByType(ComponentTypeEnum.geoCoordinate), coord = null == geoCoordinates ? void 0 : geoCoordinates.find((coord => {
            var _a;
            return null === (_a = coord.getRegions()) || void 0 === _a ? void 0 : _a.includes(region);
        }));
        coord && coord.dispatchZoom(zoom, center);
    }
    _initChartPlugin() {
        const pluginList = Factory.getChartPlugins();
        pluginList.length > 0 && (this._chartPlugin = new ChartPluginService(this), this._chartPlugin.load(pluginList.map((p => new p))), 
        this._chartPluginApply("onInit", this._spec));
    }
    _chartPluginApply(funcName, ...args) {
        this._chartPlugin && this._chartPlugin[funcName] && this._chartPlugin[funcName].apply(this._chartPlugin, args);
    }
    _getMode() {
        return this._option.mode || RenderModeEnum["desktop-browser"];
    }
    _getChartOption(type) {
        return {
            type: type,
            globalInstance: this,
            eventDispatcher: this._eventDispatcher,
            dataSet: this._dataSet,
            container: this._container,
            canvas: this._canvas,
            map: new Map,
            mode: this._getMode(),
            modeParams: this._option.modeParams,
            getCompiler: () => this._compiler,
            performanceHook: this._option.performanceHook,
            viewBox: this._viewBox,
            animation: this._option.animation,
            getTheme: () => {
                var _a;
                return null !== (_a = this._currentTheme) && void 0 !== _a ? _a : {};
            },
            getSpecInfo: () => {
                var _a;
                return null !== (_a = this._specInfo) && void 0 !== _a ? _a : {};
            },
            layout: this._option.layout,
            onError: this._onError,
            disableTriggerEvent: !0 === this._option.disableTriggerEvent
        };
    }
}

VChart.InstanceManager = InstanceManager, VChart.ThemeManager = ThemeManager, VChart.globalConfig = {
    uniqueTooltip: !0
}, VChart.Utils = VCHART_UTILS, VChart.vglobal = vglobal;

export const registerVChartCore = () => {
    Factory.registerRegion("region", Region), Factory.registerLayout("base", Layout), 
    registerGroupMark(), View.useRegisters([ registerGesturePlugin ]), registerHoverInteraction(), 
    registerSelectInteraction(), registerTheme(darkTheme.name, darkTheme), Logger.getInstance(LoggerLevel.Error);
};

Factory.registerRegion("region", Region), Factory.registerLayout("base", Layout), 
registerGroupMark(), View.useRegisters([ registerGesturePlugin ]), registerHoverInteraction(), 
registerSelectInteraction(), registerTheme(darkTheme.name, darkTheme), Logger.getInstance(LoggerLevel.Error);
//# sourceMappingURL=vchart.js.map