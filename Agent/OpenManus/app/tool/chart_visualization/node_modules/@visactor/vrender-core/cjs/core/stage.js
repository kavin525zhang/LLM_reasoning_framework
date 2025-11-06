"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Stage = void 0;

const vutils_1 = require("@visactor/vutils"), window_1 = require("./window"), event_1 = require("../event"), container_1 = require("../container"), render_1 = require("../render"), group_1 = require("../graphic/group"), theme_1 = require("../graphic/theme"), constants_1 = require("../picker/constants"), constants_2 = require("../plugins/constants"), auto_render_plugin_1 = require("../plugins/builtin-plugin/auto-render-plugin"), auto_refresh_plugin_1 = require("../plugins/builtin-plugin/auto-refresh-plugin"), incremental_auto_render_plugin_1 = require("../plugins/builtin-plugin/incremental-auto-render-plugin"), dirty_bounds_plugin_1 = require("../plugins/builtin-plugin/dirty-bounds-plugin"), default_ticker_1 = require("../animate/default-ticker"), tapable_1 = require("../tapable"), constants_3 = require("./constants"), animate_1 = require("../animate"), application_1 = require("../application"), env_check_1 = require("../env-check"), factory_1 = require("../factory"), DefaultConfig = {
    WIDTH: 500,
    HEIGHT: 500,
    X: 0,
    Y: 0,
    BACKGROUND: "white"
};

class Stage extends group_1.Group {
    set viewBox(b) {
        this.window.setViewBox(b);
    }
    get viewBox() {
        return this.window.getViewBox();
    }
    get x() {
        return this.window.getViewBox().x1;
    }
    set x(x) {
        const b = this.window.getViewBox();
        b.translate(x - b.x1, 0), this.window.setViewBox(b);
    }
    get y() {
        return this.window.getViewBox().y1;
    }
    set y(y) {
        const b = this.window.getViewBox();
        b.translate(0, y - b.y1), this.window.setViewBox(b);
    }
    get width() {
        return this.window.width;
    }
    set width(w) {
        this.resize(w, this.height);
    }
    get viewWidth() {
        return this.window.getViewBox().width();
    }
    set viewWidth(w) {
        this.resizeView(w, this.viewHeight);
    }
    get viewHeight() {
        return this.window.getViewBox().height();
    }
    set viewHeight(h) {
        this.resizeView(this.viewWidth, h);
    }
    get height() {
        return this.window.height;
    }
    set height(h) {
        this.resize(this.width, h);
    }
    get dpr() {
        return this.window.dpr;
    }
    set dpr(r) {
        this.setDpr(r);
    }
    get background() {
        var _a;
        return null !== (_a = this._background) && void 0 !== _a ? _a : DefaultConfig.BACKGROUND;
    }
    set background(b) {
        this._background = b;
    }
    get defaultLayer() {
        return this.at(0);
    }
    get eventSystem() {
        return this._eventSystem;
    }
    constructor(params = {}) {
        var _a;
        super({}), this.tickedBeforeRender = !0, this._onVisibleChange = visible => {
            if (!(this._skipRender < 0)) if (visible) {
                if (this.dirtyBounds) {
                    const b = this.window.getViewBox();
                    this.dirtyBounds.setValue(b.x1, b.y1, b.width(), b.height());
                }
                this._skipRender > 1 && this.renderNextFrame(), this._skipRender = 0;
            } else this._skipRender = 1;
        }, this.beforeRender = stage => {
            this._beforeRender && this._beforeRender(stage);
        }, this.afterRender = stage => {
            this.renderCount++, this._afterRender && this._afterRender(stage), this._afterNextRenderCbs && this._afterNextRenderCbs.forEach((cb => cb(stage))), 
            this._afterNextRenderCbs = null, this.tickedBeforeRender = !1;
        }, this.afterTickCb = () => {
            var _a;
            this.tickedBeforeRender = !0, "performance" === (null === (_a = this.params.optimize) || void 0 === _a ? void 0 : _a.tickRenderMode) || "rendering" !== this.state && this.render();
        }, this.params = params, this.theme = new theme_1.Theme, this.hooks = {
            beforeRender: new tapable_1.SyncHook([ "stage" ]),
            afterRender: new tapable_1.SyncHook([ "stage" ])
        }, this.global = application_1.application.global, !this.global.env && (0, env_check_1.isBrowserEnv)() && this.global.setEnv("browser"), 
        this.window = container_1.container.get(window_1.VWindow), this.renderService = container_1.container.get(render_1.RenderService), 
        this.pluginService = container_1.container.get(constants_2.PluginService), this.layerService = container_1.container.get(constants_3.LayerService), 
        this.pluginService.active(this, params), this.window.create({
            width: params.width,
            height: params.height,
            viewBox: params.viewBox,
            container: params.container,
            dpr: params.dpr || this.global.devicePixelRatio,
            canvasControled: !1 !== params.canvasControled,
            title: params.title || "",
            canvas: params.canvas
        }), this.state = "normal", this.renderCount = 0, this.tryInitEventSystem(), this._background = null !== (_a = params.background) && void 0 !== _a ? _a : DefaultConfig.BACKGROUND, 
        this.appendChild(this.layerService.createLayer(this, {
            main: !0
        })), this.nextFrameRenderLayerSet = new Set, this.willNextFrameRender = !1, this.stage = this, 
        this.renderStyle = params.renderStyle, params.autoRender && this.enableAutoRender(), 
        params.autoRefresh && this.enableAutoRefresh(), !1 === params.disableDirtyBounds && this.enableDirtyBounds(), 
        params.enableHtmlAttribute && this.enableHtmlAttribute(params.enableHtmlAttribute), 
        params.ReactDOM && this.enableReactAttribute(params.ReactDOM), params.enableLayout && this.enableLayout(), 
        this.hooks.beforeRender.tap("constructor", this.beforeRender), this.hooks.afterRender.tap("constructor", this.afterRender), 
        this._beforeRender = params.beforeRender, this._afterRender = params.afterRender, 
        this.ticker = params.ticker || default_ticker_1.defaultTicker, this.supportInteractiveLayer = !1 !== params.interactiveLayer, 
        this.timeline = new animate_1.DefaultTimeline, this.ticker.addTimeline(this.timeline), 
        this.timeline.pause(), params.optimize || (params.optimize = {}), this.optmize(params.optimize), 
        params.background && (0, vutils_1.isString)(this._background) && this._background.includes("/") && this.setAttributes({
            background: this._background
        }), this.ticker.on("afterTick", this.afterTickCb);
    }
    pauseRender(sr = -1) {
        this._skipRender = sr;
    }
    resumeRender() {
        this._skipRender = 0;
    }
    tryInitEventSystem() {
        this.global.supportEvent && !this._eventSystem && (this._eventSystem = new event_1.EventSystem(Object.assign({
            targetElement: this.window,
            resolution: this.window.dpr || this.global.devicePixelRatio,
            rootNode: this,
            global: this.global,
            supportsPointerEvents: this.params.supportsPointerEvents,
            supportsTouchEvents: this.params.supportsTouchEvents
        }, this.params.event)));
    }
    preventRender(prevent) {
        prevent ? this._skipRender = -1 / 0 : !1 !== this.params.optimize.skipRenderWithOutRange ? this._skipRender = this.window.isVisible() ? 0 : 1 : this._skipRender = 0;
    }
    optmize(params) {
        this.optmizeRender(params.skipRenderWithOutRange), this.params.optimize = params;
    }
    optmizeRender(skipRenderWithOutRange = !1) {
        skipRenderWithOutRange && (this._skipRender = this._skipRender < 0 ? this._skipRender : this.window.isVisible() ? 0 : 1, 
        this.window.onVisibleChange(this._onVisibleChange));
    }
    getTimeline() {
        return this.timeline;
    }
    get3dOptions(options) {
        const {center: center = {
            x: this.width / 2,
            y: this.height / 2,
            z: 0,
            dx: 0,
            dy: 0,
            dz: 0
        }, light: light = {}, alpha: alpha = 0, beta: beta = 0, camera: camera, fieldRatio: fieldRatio = 1, fieldDepth: fieldDepth} = options;
        return Object.assign(Object.assign({}, options), {
            center: center,
            light: light,
            alpha: alpha,
            beta: beta,
            camera: camera,
            fieldRatio: fieldRatio,
            fieldDepth: fieldDepth
        });
    }
    set3dOptions(options) {
        var _a, _b, _d, _e, _f, _g;
        this.option3d = options;
        const options3d = this.get3dOptions(options), {light: light, center: center, camera: camera, alpha: alpha, beta: beta, fieldRatio: fieldRatio, fieldDepth: fieldDepth} = options3d, {dir: dir = [ 1, 1, -1 ], color: color = "white", ambient: ambient} = light, centerX = (null !== (_a = center.x) && void 0 !== _a ? _a : this.width / 2) + (null !== (_b = center.dx) && void 0 !== _b ? _b : 0), centerY = (null !== (_d = center.y) && void 0 !== _d ? _d : this.height / 2) + (null !== (_e = center.dy) && void 0 !== _e ? _e : 0), centerVec3 = [ centerX, centerY, (null !== (_f = center.z) && void 0 !== _f ? _f : 0) + (null !== (_g = center.dz) && void 0 !== _g ? _g : 0) ];
        let cameraX = 0, cameraY = 0, cameraZ = 0;
        camera || (cameraX = Math.sin(alpha) + centerX, cameraY = Math.sin(beta) + centerY, 
        cameraZ = Math.cos(alpha) * Math.cos(beta) * 1);
        const DirectionalLight = factory_1.Factory.getPlugin("DirectionalLight");
        DirectionalLight && (this.light = new DirectionalLight(dir, color, ambient));
        const cameraParams = {
            left: 0,
            right: this.width,
            top: 0,
            bottom: this.height,
            fieldRatio: fieldRatio,
            fieldDepth: fieldDepth,
            viewParams: {
                pos: [ cameraX, cameraY, cameraZ ],
                center: centerVec3,
                up: [ 0, 1, 0 ]
            }
        };
        if (this.camera) this.camera.params = cameraParams; else {
            const OrthoCamera = factory_1.Factory.getPlugin("OrthoCamera");
            OrthoCamera && (this.camera = new OrthoCamera(cameraParams));
        }
        options.enableView3dTransform && this.enableView3dTransform();
    }
    setBeforeRender(cb) {
        this._beforeRender = cb;
    }
    setAfterRender(cb) {
        this._afterRender = cb;
    }
    afterNextRender(cb) {
        this._afterNextRenderCbs || (this._afterNextRenderCbs = []), this._afterNextRenderCbs.push(cb);
    }
    enableView3dTransform() {
        if (this.view3dTranform) return;
        this.view3dTranform = !0;
        const ViewTransform3dPlugin = factory_1.Factory.getPlugin("ViewTransform3dPlugin");
        ViewTransform3dPlugin && this.pluginService.register(new ViewTransform3dPlugin);
    }
    disableView3dTranform() {
        this.view3dTranform && (this.view3dTranform = !1, this.pluginService.findPluginsByName("ViewTransform3dPlugin").forEach((plugin => {
            this.pluginService.unRegister(plugin);
        })));
    }
    enableAutoRender() {
        this.autoRender || (this.autoRender = !0, this.pluginService.register(new auto_render_plugin_1.AutoRenderPlugin));
    }
    disableAutoRender() {
        this.autoRender && (this.autoRender = !1, this.pluginService.findPluginsByName("AutoRenderPlugin").forEach((plugin => {
            this.pluginService.unRegister(plugin);
        })));
    }
    enableAutoRefresh() {
        this.autoRefresh || (this.autoRefresh = !0, this.pluginService.register(new auto_refresh_plugin_1.AutoRefreshPlugin));
    }
    disableAutoRefresh() {
        this.autoRefresh && (this.autoRefresh = !1, this.pluginService.findPluginsByName("AutoRefreshPlugin").forEach((plugin => {
            this.pluginService.unRegister(plugin);
        })));
    }
    enableIncrementalAutoRender() {
        this.increaseAutoRender || (this.increaseAutoRender = !0, this.pluginService.register(new incremental_auto_render_plugin_1.IncrementalAutoRenderPlugin));
    }
    disableIncrementalAutoRender() {
        this.increaseAutoRender && (this.increaseAutoRender = !1, this.pluginService.findPluginsByName("IncrementalAutoRenderPlugin").forEach((plugin => {
            this.pluginService.unRegister(plugin);
        })));
    }
    enableDirtyBounds() {
        if (this.dirtyBounds) return;
        this.dirtyBounds = new vutils_1.Bounds;
        let plugin = this.pluginService.findPluginsByName("DirtyBoundsPlugin")[0];
        plugin ? plugin.activate(this.pluginService) : (plugin = new dirty_bounds_plugin_1.DirtyBoundsPlugin, 
        this.pluginService.register(plugin));
    }
    disableDirtyBounds() {
        this.dirtyBounds && (this.dirtyBounds = null, this.pluginService.findPluginsByName("DirtyBoundsPlugin").forEach((plugin => {
            this.pluginService.unRegister(plugin);
        })));
    }
    enableLayout() {
        if (this._enableLayout) return;
        this._enableLayout = !0;
        const FlexLayoutPlugin = factory_1.Factory.getPlugin("FlexLayoutPlugin");
        FlexLayoutPlugin && this.pluginService.register(new FlexLayoutPlugin);
    }
    disableLayout() {
        this._enableLayout && (this._enableLayout = !1, this.pluginService.findPluginsByName("FlexLayoutPlugin").forEach((plugin => {
            this.pluginService.unRegister(plugin);
        })));
    }
    enableHtmlAttribute(container) {
        if (this.htmlAttribute) return;
        const HtmlAttributePlugin = factory_1.Factory.getPlugin("HtmlAttributePlugin");
        HtmlAttributePlugin && (this.htmlAttribute = container, this.pluginService.register(new HtmlAttributePlugin));
    }
    disableHtmlAttribute() {
        this.htmlAttribute && (this.htmlAttribute = !1, this.pluginService.findPluginsByName("HtmlAttributePlugin").forEach((plugin => {
            this.pluginService.unRegister(plugin);
        })));
    }
    enableReactAttribute(container) {
        if (this.reactAttribute) return;
        const ReactAttributePlugin = factory_1.Factory.getPlugin("ReactAttributePlugin");
        ReactAttributePlugin && (this.reactAttribute = container, this.pluginService.register(new ReactAttributePlugin));
    }
    disableReactAttribute() {
        this.reactAttribute && (this.reactAttribute = !1, this.pluginService.findPluginsByName("ReactAttributePlugin").forEach((plugin => {
            this.pluginService.unRegister(plugin);
        })));
    }
    getPluginsByName(name) {
        return this.pluginService.findPluginsByName(name);
    }
    tryUpdateAABBBounds() {
        const viewBox = this.window.getViewBox();
        return this._AABBBounds.setValue(viewBox.x1, viewBox.y1, viewBox.x2, viewBox.y2), 
        this._AABBBounds;
    }
    combineLayer(ILayer1, ILayer2) {
        throw new Error("暂不支持");
    }
    createLayer(canvasId, layerMode) {
        if ("released" === this.releaseStatus) return;
        const layer = this.layerService.createLayer(this, {
            main: !1,
            layerMode: layerMode,
            canvasId: canvasId
        });
        return this.appendChild(layer), layer;
    }
    sortLayer(cb) {
        const children = this.children;
        children.sort(cb), this.removeAllChild(), children.forEach((c => {
            this.appendChild(c);
        }));
    }
    removeLayer(ILayerId) {
        return this.removeChild(this.findChildByUid(ILayerId));
    }
    tryInitInteractiveLayer() {
        "released" !== this.releaseStatus && this.supportInteractiveLayer && !this.interactiveLayer && (this.interactiveLayer = this.createLayer(), 
        this.interactiveLayer.name = "_builtin_interactive", this.interactiveLayer.attribute.pickable = !1, 
        this.nextFrameRenderLayerSet.add(this.interactiveLayer));
    }
    clearViewBox(color) {
        this.window.clearViewBox(color);
    }
    render(layers, params) {
        if ("released" === this.releaseStatus) return;
        this.ticker.start(), this.timeline.resume();
        const state = this.state;
        this.state = "rendering", this.tickedBeforeRender || this.ticker.trySyncTickStatus(), 
        this.layerService.prepareStageLayer(this), this._skipRender || (this.lastRenderparams = params, 
        this.hooks.beforeRender.call(this), this._skipRender || (this.renderLayerList(this.children), 
        this.combineLayersToWindow(), this.nextFrameRenderLayerSet.clear()), this.hooks.afterRender.call(this)), 
        this.state = state, this._skipRender && this._skipRender++;
    }
    combineLayersToWindow() {
        if ("harmony" === this.global.env) {
            const ctx = this.window.getContext().nativeContext;
            this.forEachChildren(((layer, i) => {
                if (i > 0) {
                    const image = layer.getNativeHandler().getContext().canvas.nativeCanvas.nativeCanvas._c.transferToImageBitmap();
                    ctx.transferFromImageBitmap(image);
                }
            }));
        }
    }
    renderNextFrame(layers, force) {
        this.nextFrameRenderLayerSet.size !== this.childrenCount && (layers || this).forEach((layer => {
            this.nextFrameRenderLayerSet.add(layer);
        })), this.willNextFrameRender || (this.willNextFrameRender = !0, this.global.getRequestAnimationFrame()((() => {
            this._doRenderInThisFrame(), this.willNextFrameRender = !1;
        })));
    }
    _doRenderInThisFrame() {
        if ("released" === this.releaseStatus) return;
        this.timeline.resume(), this.ticker.start();
        const state = this.state;
        this.state = "rendering", this.layerService.prepareStageLayer(this), this.nextFrameRenderLayerSet.size && !this._skipRender && (this.hooks.beforeRender.call(this), 
        this._skipRender || (this.renderLayerList(Array.from(this.nextFrameRenderLayerSet.values()), this.lastRenderparams || {}), 
        this.combineLayersToWindow(), this.nextFrameRenderLayerSet.clear()), this.hooks.afterRender.call(this)), 
        this.state = state, this._skipRender && this._skipRender++;
    }
    renderLayerList(layerList, params) {
        const list = [];
        for (let i = 0; i < layerList.length; i++) {
            let l = layerList[i];
            "virtual" === l.layerMode && (l = l.getNativeHandler().mainHandler.layer), list.includes(l) || list.push(l);
        }
        list.forEach((layer => {
            layer.renderCount > this.renderCount || (layer.renderCount = this.renderCount + 1, 
            layer === this.interactiveLayer && this.dirtyBounds && this.dirtyBounds.clear(), 
            layer.render({
                renderService: this.renderService,
                background: layer === this.defaultLayer ? this.background : void 0,
                updateBounds: !(!this.dirtyBounds || this.dirtyBounds.empty()),
                viewBox: this.window.getViewBox(),
                transMatrix: this.window.getViewBoxTransform()
            }, Object.assign({
                renderStyle: this.renderStyle
            }, params)));
        })), this.interactiveLayer && !layerList.includes(this.interactiveLayer) && (this.dirtyBounds && this.dirtyBounds.clear(), 
        this.interactiveLayer.render({
            renderService: this.renderService,
            updateBounds: !(!this.dirtyBounds || this.dirtyBounds.empty()),
            viewBox: this.window.getViewBox(),
            transMatrix: this.window.getViewBoxTransform()
        }, Object.assign({
            renderStyle: this.renderStyle
        }, params)));
    }
    resizeWindow(w, h, rerender = !0) {
        this.window.resize(w, h), rerender && this.render();
    }
    resize(w, h, rerender = !0) {
        "released" !== this.releaseStatus && (this.window.hasSubView() || this.viewBox.setValue(this.viewBox.x1, this.viewBox.y1, this.viewBox.x1 + w, this.viewBox.y1 + h), 
        this.window.resize(w, h), this.forEachChildren((c => {
            c.resize(w, h);
        })), this.camera && this.option3d && this.set3dOptions(this.option3d), rerender && this.render());
    }
    resizeView(w, h, rerender = !0) {
        "released" !== this.releaseStatus && (this.viewBox.setValue(this.viewBox.x1, this.viewBox.y1, this.viewBox.x1 + w, this.viewBox.y1 + h), 
        this.forEachChildren((c => {
            c.resizeView(w, h);
        })), this.camera && (this.camera.params = Object.assign(Object.assign({}, this.camera.params), {
            right: this.width,
            bottom: this.height
        })), rerender && this.render());
    }
    setViewBox(x, y, w, h, rerender) {
        let isRerender = !0;
        "object" == typeof x ? (this.viewBox.setValue(x.x1, x.y1, x.x2, x.y2), !1 === y && (isRerender = !1)) : (this.viewBox.setValue(x, y, x + w, y + h), 
        !1 === rerender && (isRerender = !1)), this.forEachChildren((c => {
            c.resizeView(this.viewBox.width(), this.viewBox.height());
        })), isRerender && this.render();
    }
    setDpr(dpr, rerender = !0) {
        this.forEachChildren((c => {
            c.setDpr(dpr);
        })), rerender && this.render();
    }
    setOrigin(x, y) {
        throw new Error("暂不支持");
    }
    export(type) {
        throw new Error("暂不支持");
    }
    pick(x, y) {
        if ("released" === this.releaseStatus) return;
        const result = this.getPickerService().pick(this.children, new vutils_1.Point(x, y), {
            bounds: this.AABBBounds
        });
        return !(!(null == result ? void 0 : result.graphic) && !(null == result ? void 0 : result.group)) && result;
    }
    startAnimate(t) {
        throw new Error("暂不支持");
    }
    setToFrame(t) {
        throw new Error("暂不支持");
    }
    release() {
        super.release(), this.hooks.beforeRender.unTap("constructor", this.beforeRender), 
        this.hooks.afterRender.unTap("constructor", this.afterRender), this.eventSystem && this.eventSystem.release(), 
        this.layerService.releaseStage(this), this.pluginService.release(), this.forEach((layer => {
            layer.release();
        })), this.interactiveLayer && (this.interactiveLayer.forEachChildren((item => {
            item.setStage && item.setStage(null, null), this.interactiveLayer.removeChild(item);
        })), this.interactiveLayer.release()), this.window.release(), this.ticker.remTimeline(this.timeline), 
        this.ticker.removeListener("afterTick", this.afterTickCb), this.renderService.renderTreeRoots = [];
    }
    setStage(stage) {}
    dirty(b, matrix) {
        "released" !== this.releaseStatus && (matrix && b.transformWithMatrix(matrix), this.dirtyBounds.empty() && this.dirtyBounds.setValue(b.x1, b.y1, b.x2, b.y2), 
        this.dirtyBounds.union(b));
    }
    getLayer(name) {
        return this.children.filter((layer => layer.name === name))[0];
    }
    renderTo(window) {
        "released" !== this.releaseStatus && this.forEachChildren(((layer, i) => {
            layer.drawTo(window, {
                renderService: this.renderService,
                viewBox: window.getViewBox(),
                transMatrix: window.getViewBoxTransform(),
                background: layer === this.defaultLayer ? this.background : void 0,
                clear: 0 === i,
                updateBounds: !(!this.dirtyBounds || this.dirtyBounds.empty())
            });
        }));
    }
    renderToNewWindow(fullImage = !0, viewBox) {
        if ("released" === this.releaseStatus) return;
        const window = container_1.container.get(window_1.VWindow), x1 = viewBox ? -viewBox.x1 : 0, y1 = viewBox ? -viewBox.y1 : 0, x2 = viewBox ? viewBox.x2 : this.viewWidth, y2 = viewBox ? viewBox.y2 : this.viewHeight, width = viewBox ? viewBox.width() : this.viewWidth, height = viewBox ? viewBox.height() : this.viewHeight;
        return window.create({
            viewBox: {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            },
            width: width,
            height: height,
            dpr: this.window.dpr,
            canvasControled: !0,
            offscreen: !0,
            title: ""
        }), this.renderTo(window), window;
    }
    toCanvas(fullImage = !0, viewBox) {
        if ("released" === this.releaseStatus) return;
        const c = this.renderToNewWindow(fullImage, viewBox).getNativeHandler();
        return c.nativeCanvas ? c.nativeCanvas : null;
    }
    setCursor(mode) {
        this._cursor = mode, this.eventSystem.setCursor(mode, "ignore");
    }
    getCursor() {
        return this._cursor;
    }
    eventPointTransform(e) {
        const point = this.global.mapToCanvasPoint(e, this.window.getContext().canvas.nativeCanvas);
        return this.stage.window.pointTransform(point.x, point.y);
    }
    pauseTriggerEvent() {
        this._eventSystem && this._eventSystem.pauseTriggerEvent();
    }
    resumeTriggerEvent() {
        this._eventSystem && this._eventSystem.resumeTriggerEvent();
    }
    getPickerService() {
        return this.pickerService || (this.pickerService = container_1.container.get(constants_1.PickerService)), 
        this.pickerService;
    }
}

exports.Stage = Stage;
//# sourceMappingURL=stage.js.map
