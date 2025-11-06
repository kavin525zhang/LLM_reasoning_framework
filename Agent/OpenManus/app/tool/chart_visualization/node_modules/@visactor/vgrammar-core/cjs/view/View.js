"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

const vutils_1 = require("@visactor/vutils"), vrender_core_1 = require("@visactor/vrender-core"), data_1 = require("./data"), dataflow_1 = __importDefault(require("./dataflow")), mark_tree_1 = require("../graph/mark-tree"), canvas_renderer_1 = __importDefault(require("../graph/canvas-renderer")), events_extend_1 = __importDefault(require("../graph/util/events-extend")), constants_1 = require("./constants"), signal_1 = require("./signal"), view_1 = require("../parse/view"), util_1 = require("../parse/util"), env_1 = require("../graph/util/env"), group_1 = require("./group"), mark_1 = require("./mark"), grammar_record_1 = require("./grammar-record"), enums_1 = require("../graph/enums"), text_1 = require("../semantic-marks/text"), theme_manager_1 = require("../theme/theme-manager"), factory_1 = require("../core/factory"), component_1 = require("./component"), graphic_1 = require("../graph/util/graphic"), view_diff_1 = require("../graph/view-diff");

class View extends vutils_1.EventEmitter {
    static useRegisters(comps) {
        comps.forEach((fn => {
            fn();
        }));
    }
    constructor(options = {}, config = {}) {
        super(), this._observer = null, this._onResize = (0, vutils_1.debounce)(((...args) => {
            const size = this._getContainerSize();
            size && this.resize(size.width, size.height);
        }), 100), this.delegateEvent = (event, type) => {
            const extendedEvt = (0, events_extend_1.default)(this, event, type, constants_1.EVENT_SOURCE_VIEW);
            this.emit(type, extendedEvt, event.element);
        }, this.handleProgressiveFrame = () => {
            this._progressiveMarks.length && this._progressiveMarks.forEach((mark => {
                mark.isDoingProgressive() && mark.evaluateProgressive();
            })), this.doPreProgressive();
        }, this._config = config, this._options = Object.assign({
            mode: constants_1.BROWSER
        }, options), this.initialize();
    }
    getGrammarById(id) {
        return this.grammars.getGrammar(id);
    }
    getSignalById(id) {
        return this.grammars.getSignal(id);
    }
    getDataById(id) {
        return this.grammars.getData(id);
    }
    getScaleById(id) {
        return this.grammars.getScale(id);
    }
    getCoordinateById(id) {
        return this.grammars.getCoordinate(id);
    }
    getMarkById(id) {
        return this.grammars.getMark(id);
    }
    getCustomizedById(id) {
        return this.grammars.getCustomized(id);
    }
    getGrammarsByName(name) {
        return this.grammars.filter((grammar => grammar.name() === name));
    }
    getGrammarsByType(grammarType) {
        return this.grammars.filter((grammar => grammar.grammarType === grammarType));
    }
    getMarksByType(markType) {
        return this.grammars.getAllMarks().filter((mark => mark.markType === markType));
    }
    getMarksByName(name) {
        return this.grammars.getAllMarks().filter((mark => mark.name() === name));
    }
    getMarksBySelector(selector) {
        if (!selector) return null;
        const selectors = (0, vutils_1.array)(selector), res = [];
        return selectors.forEach((selectorStr => {
            if ((0, util_1.isGrammar)(selectorStr)) return void res.push(selectorStr);
            if (selectorStr[0] === constants_1.ID_PREFIX) {
                const mark = this.getMarkById(selectorStr.slice(1));
                return void (mark && res.push(mark));
            }
            const marks = selectorStr[0] === constants_1.NAME_PREFIX ? this.getMarksByName(selectorStr.slice(1)) : (0, 
            graphic_1.isMarkType)(selectorStr) ? this.getMarksByType(selectorStr) : null;
            marks && marks.length && marks.forEach((mark => {
                res.push(mark);
            }));
        })), res;
    }
    updateSignal(signal, value) {
        (0, vutils_1.isString)(signal) && (signal = this.getSignalById(signal)), signal.set(value), 
        this.commit(signal);
    }
    signal(value, update) {
        const signal = new signal_1.Signal(this);
        return arguments.length >= 1 && signal.value(value), arguments.length >= 2 && signal.update(update), 
        this.grammars.record(signal), this._dataflow.add(signal), signal;
    }
    data(values) {
        const data = new data_1.Data(this, values);
        return this.grammars.record(data), this._dataflow.add(data), data;
    }
    scale(type) {
        const scale = factory_1.Factory.createGrammar("scale", this, type);
        return scale && (this.grammars.record(scale), this._dataflow.add(scale)), scale;
    }
    coordinate(type) {
        const coordinate = factory_1.Factory.createGrammar("coordinate", this, type);
        return coordinate && (this.grammars.record(coordinate), this._dataflow.add(coordinate)), 
        coordinate;
    }
    mark(type, group, markOptions) {
        const groupMark = (0, vutils_1.isString)(group) ? this.getMarkById(group) : group;
        let mark;
        switch (type) {
          case enums_1.GrammarMarkType.group:
            mark = new group_1.GroupMark(this, groupMark);
            break;

          case enums_1.GrammarMarkType.glyph:
            const GlyphMark = factory_1.Factory.getMark(enums_1.GrammarMarkType.glyph);
            GlyphMark && (mark = new GlyphMark(this, null == markOptions ? void 0 : markOptions.glyphType, groupMark));
            break;

          case enums_1.GrammarMarkType.component:
            mark = factory_1.Factory.hasComponent(null == markOptions ? void 0 : markOptions.componentType) ? factory_1.Factory.createComponent(null == markOptions ? void 0 : markOptions.componentType, this, groupMark, null == markOptions ? void 0 : markOptions.mode) : new component_1.Component(this, null == markOptions ? void 0 : markOptions.componentType, groupMark, null == markOptions ? void 0 : markOptions.mode);
            break;

          case enums_1.GrammarMarkType.text:
            mark = new text_1.Text(this, type, groupMark);
            break;

          default:
            mark = factory_1.Factory.hasMark(type) ? factory_1.Factory.createMark(type, this, groupMark) : new mark_1.Mark(this, type, groupMark);
        }
        return this.grammars.record(mark), this._dataflow.add(mark), mark;
    }
    group(group) {
        return this.mark(enums_1.GrammarMarkType.group, group);
    }
    glyph(glyphType, group) {
        return this.mark(enums_1.GrammarMarkType.glyph, group, {
            glyphType: glyphType
        });
    }
    component(componentType, group, mode = "2d") {
        return this.mark(enums_1.GrammarMarkType.component, group, {
            componentType: componentType,
            mode: mode
        });
    }
    axis(group, mode = "2d") {
        return this.mark(enums_1.GrammarMarkType.component, group, {
            componentType: enums_1.ComponentEnum.axis,
            mode: mode
        });
    }
    grid(group, mode = "2d") {
        return this.mark(enums_1.GrammarMarkType.component, group, {
            componentType: enums_1.ComponentEnum.grid,
            mode: mode
        });
    }
    legend(group) {
        return this.mark(enums_1.GrammarMarkType.component, group, {
            componentType: enums_1.ComponentEnum.legend
        });
    }
    slider(group) {
        return this.mark(enums_1.GrammarMarkType.component, group, {
            componentType: enums_1.ComponentEnum.slider
        });
    }
    label(group) {
        return this.mark(enums_1.GrammarMarkType.component, group, {
            componentType: enums_1.ComponentEnum.label
        });
    }
    datazoom(group) {
        return this.mark(enums_1.GrammarMarkType.component, group, {
            componentType: enums_1.ComponentEnum.datazoom
        });
    }
    player(group) {
        return this.mark(enums_1.GrammarMarkType.component, group, {
            componentType: enums_1.ComponentEnum.player
        });
    }
    title(group) {
        return this.mark(enums_1.GrammarMarkType.component, group, {
            componentType: enums_1.ComponentEnum.title
        });
    }
    scrollbar(group) {
        return this.mark(enums_1.GrammarMarkType.component, group, {
            componentType: enums_1.ComponentEnum.scrollbar
        });
    }
    customized(type, spec) {
        const grammar = factory_1.Factory.createGrammar(type, this, null == spec ? void 0 : spec.type);
        if (grammar) return grammar.parse(spec), this.grammars.record(grammar), this._dataflow.add(grammar), 
        grammar;
    }
    addGrammar(grammar) {
        return this.grammars.find((storedGrammar => storedGrammar.uid === grammar.uid)) || (this.grammars.record(grammar), 
        this._dataflow.add(grammar), grammar.parse(grammar.getSpec()), this._needBuildLayoutTree = !0), 
        this;
    }
    removeGrammar(grammar) {
        const recordedGrammar = (0, vutils_1.isString)(grammar) ? this.getGrammarById(grammar) : grammar;
        return recordedGrammar && this.grammars.find((storedGrammar => storedGrammar.uid === recordedGrammar.uid)) ? ("mark" === recordedGrammar.grammarType && recordedGrammar.prepareRelease(), 
        this._cachedGrammars.record(recordedGrammar), this._dataflow.remove(recordedGrammar), 
        this.grammars.unrecord(recordedGrammar), this._needBuildLayoutTree = !0, this) : this;
    }
    removeAllGrammars() {
        return this.grammars.traverse((grammar => {
            "signal" === grammar.grammarType && view_1.BuiltInSignalID.includes(grammar.id()) || "mark" === grammar.grammarType && "root" === grammar.id() || this.removeGrammar(grammar);
        })), this;
    }
    removeAllGraphicItems() {
        return this.traverseMarkTree((mark => {
            mark.graphicItem && ((0, graphic_1.removeGraphicItem)(mark.graphicItem), mark.elementMap.forEach((element => {
                element.resetGraphicItem();
            })), mark.graphicItem = null);
        })), this;
    }
    parseSpec(spec) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.emit(enums_1.HOOK_EVENT.BEFORE_PARSE_VIEW), this._spec = spec, (0, view_1.normalizeMarkTree)(spec), 
        spec.theme ? this.theme(spec.theme) : this.theme(theme_manager_1.ThemeManager.getDefaultTheme()), 
        spec.width && this.width(spec.width), spec.height && this.height(spec.height), this.padding(null !== (_b = null !== (_a = spec.padding) && void 0 !== _a ? _a : this._options.padding) && void 0 !== _b ? _b : this._theme.padding), 
        !this.width() || !this.height()) {
            const size = this._getContainerSize();
            size && (this.updateSignal(constants_1.SIGNAL_WIDTH, size.width), this.updateSignal(constants_1.SIGNAL_HEIGHT, size.height));
        }
        (null === (_c = spec.signals) || void 0 === _c ? void 0 : _c.length) && spec.signals.forEach((signal => {
            this.signal().parse(signal);
        })), (null === (_d = spec.data) || void 0 === _d ? void 0 : _d.length) && spec.data.forEach((data => {
            this.data(null).parse(data);
        })), (null === (_e = spec.coordinates) || void 0 === _e ? void 0 : _e.length) && spec.coordinates.forEach((coordinate => {
            var _a;
            null === (_a = this.coordinate(coordinate.type)) || void 0 === _a || _a.parse(coordinate);
        })), (null === (_f = spec.scales) || void 0 === _f ? void 0 : _f.length) && spec.scales.forEach((scale => {
            var _a;
            null === (_a = this.scale(scale.type)) || void 0 === _a || _a.parse(scale);
        }));
        const customizedGrammars = factory_1.Factory.getGrammars();
        return Object.keys(customizedGrammars).forEach((key => {
            const {specKey: specKey} = customizedGrammars[key];
            spec[specKey] && spec[specKey].length && spec[specKey].forEach((specValue => {
                this.customized(key, specValue);
            }));
        })), spec.marks && spec.marks.length && spec.marks.forEach((mark => {
            this.parseMarkSpec(mark);
        })), spec.events && spec.events.length && spec.events.forEach((eventConfig => {
            var _b;
            null === (_b = this.event) || void 0 === _b || _b.call(this, eventConfig);
        })), spec.interactions && spec.interactions.length && spec.interactions.forEach((interaction => {
            this.interaction(interaction.type, interaction);
        })), !1 === spec.animation ? null === (_g = this.animate) || void 0 === _g || _g.disable() : null === (_h = this.animate) || void 0 === _h || _h.enable(), 
        this.emit(enums_1.HOOK_EVENT.AFTER_PARSE_VIEW), this._needBuildLayoutTree = !0, 
        this._layoutState = enums_1.LayoutState.before, this;
    }
    updateSpec(spec) {
        return this.removeAllInteractions(), this.removeAllGrammars(), this.parseSpec(spec);
    }
    parseBuiltIn() {
        (0, view_1.builtInSignals)(this._options, this._config, this.getCurrentTheme()).forEach((signalSpec => {
            const signal = this.signal().parse(signalSpec);
            signalSpec.value && signal.set(signalSpec.value);
        }));
        this.parseMarkSpec({
            id: "root",
            type: "group",
            encode: {
                enter: {
                    x: 0,
                    y: 0
                },
                update: {
                    width: {
                        signal: "width"
                    },
                    height: {
                        signal: "height"
                    }
                }
            }
        }), this.rootMark = this.getMarkById("root");
    }
    parseMarkSpec(spec) {
        var _a;
        const markOptions = spec.type === enums_1.GrammarMarkType.glyph ? {
            glyphType: spec.glyphType
        } : spec.type === enums_1.GrammarMarkType.component ? {
            componentType: spec.componentType,
            mode: spec.mode
        } : null;
        this.mark(spec.type, spec.group, markOptions).parse(spec), null === (_a = spec.marks) || void 0 === _a || _a.forEach((childSpec => {
            this.parseMarkSpec(childSpec);
        }));
    }
    theme(theme) {
        var _a, _b, _c, _d, _e, _f;
        (0, vutils_1.isString)(theme) ? this._theme = null !== (_a = theme_manager_1.ThemeManager.getTheme(theme)) && void 0 !== _a ? _a : theme_manager_1.ThemeManager.getDefaultTheme() : this._theme = theme;
        const {background: background, padding: padding} = null !== (_b = this._spec) && void 0 !== _b ? _b : {};
        return this._theme ? (this.background(null !== (_c = null != background ? background : this._options.background) && void 0 !== _c ? _c : this._theme.background), 
        this.padding(null !== (_d = null != padding ? padding : this._options.padding) && void 0 !== _d ? _d : this._theme.padding), 
        null === (_f = null === (_e = this.renderer.stage()) || void 0 === _e ? void 0 : _e.setTheme) || void 0 === _f || _f.call(_e, Object.assign({}, this._theme.marks))) : (this.background(null != background ? background : this._options.background), 
        this.padding(null != padding ? padding : this._options.padding)), this;
    }
    getCurrentTheme() {
        return this._theme;
    }
    setCurrentTheme(theme, render = !0) {
        return this.theme(theme), this.grammars.getAllMarks().forEach((mark => {
            mark.commit();
        })), render ? (this.evaluate(), this.renderer.render(!0)) : this._dataflow.evaluate(), 
        this;
    }
    background(value) {
        return arguments.length ? (this._background = value, this.renderer.background(value), 
        value) : this._background;
    }
    width(value) {
        const signal = this.getSignalById(constants_1.SIGNAL_WIDTH);
        return arguments.length ? (this._options.width = value, this.updateSignal(signal, value), 
        value) : signal.output();
    }
    height(value) {
        const signal = this.getSignalById(constants_1.SIGNAL_HEIGHT);
        return arguments.length ? (this._options.height = value, this.updateSignal(signal, value), 
        value) : signal.output();
    }
    viewWidth(value) {
        const signal = this.getSignalById(constants_1.SIGNAL_VIEW_WIDTH);
        if (arguments.length) {
            const padding = this.padding();
            return this.width(value + padding.left + padding.right), value;
        }
        return signal.output();
    }
    viewHeight(value) {
        const signal = this.getSignalById(constants_1.SIGNAL_VIEW_HEIGHT);
        if (arguments.length) {
            const padding = this.padding();
            return this.height(value + padding.top + padding.bottom), value;
        }
        return signal.output();
    }
    padding(value) {
        const signal = this.getSignalById(constants_1.SIGNAL_PADDING);
        if (arguments.length) {
            const padding = (0, view_1.normalizePadding)(value);
            return this.updateSignal(signal, padding), padding;
        }
        return (0, view_1.normalizePadding)(signal.output());
    }
    autoFit(value) {
        const signal = this.getSignalById(constants_1.SIGNAL_AUTOFIT);
        return arguments.length ? (this.updateSignal(signal, value), value) : signal.output();
    }
    getViewBox() {
        const signal = this.getSignalById(constants_1.SIGNAL_VIEW_BOX);
        return null == signal ? void 0 : signal.output();
    }
    updateLayoutTag() {
        return this._layoutState = enums_1.LayoutState.before, this;
    }
    getLayoutState() {
        return this._layoutState;
    }
    buildLayoutTree() {
        const markMap = {}, rootMarks = [];
        this.traverseMarkTree((mark => {
            markMap[mark.id()] = !0, mark.group && markMap[mark.group.id()] || rootMarks.push(mark), 
            mark.markType === enums_1.GrammarMarkType.group && mark.updateLayoutChildren();
        }), (mark => mark.needLayout())), this._layoutMarks = rootMarks;
    }
    doLayout() {
        var _a;
        const doLayout = this._options.doLayout || factory_1.Factory.getDefaultLayout();
        doLayout && (null === (_a = this._layoutMarks) || void 0 === _a ? void 0 : _a.length) && (this.emit(enums_1.HOOK_EVENT.BEFORE_DO_LAYOUT), 
        doLayout(this._layoutMarks, this._options, this), this.emit(enums_1.HOOK_EVENT.AFTER_DO_LAYOUT));
    }
    handleLayoutEnd() {
        this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_LAYOUT_END), this._layoutMarks.forEach((layoutMark => {
            (0, mark_tree_1.traverseMarkTree)(layoutMark, "layoutChildren", (mark => {
                mark.handleLayoutEnd();
            }), (mark => mark !== layoutMark));
        })), this.emit(enums_1.HOOK_EVENT.AFTER_MARK_LAYOUT_END);
    }
    handleRenderEnd() {
        this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_RENDER_END), (0, mark_tree_1.traverseMarkTree)(this.rootMark, "children", (mark => {
            mark.handleRenderEnd();
        })), this.emit(enums_1.HOOK_EVENT.AFTER_MARK_RENDER_END);
    }
    commit(grammar) {
        return this._dataflow.commit(grammar), this;
    }
    run(runningConfig) {
        return this.evaluate(runningConfig), this;
    }
    doRender(immediately) {
        this.emit(enums_1.HOOK_EVENT.BEFORE_DO_RENDER), this.renderer && (!this._progressiveMarks && this.animate ? this.animate.animate() : this.traverseMarkTree((mark => {
            mark.cleanExitElements();
        }), null, !0), this.renderer.render(immediately), this.handleRenderEnd()), this.emit(enums_1.HOOK_EVENT.AFTER_DO_RENDER);
    }
    evaluate(runningConfig) {
        var _a, _c;
        const normalizedRunningConfig = (0, view_1.normalizeRunningConfig)(runningConfig), grammarWillDetach = this._cachedGrammars.size() > 0;
        grammarWillDetach && (this.reuseCachedGrammars(normalizedRunningConfig), this.detachCachedGrammar());
        const hasResize = this._resizeRenderer(), hasUpdate = this._dataflow.hasCommitted();
        return grammarWillDetach || hasUpdate || this._layoutState || hasResize ? (this.clearProgressive(), 
        this._dataflow.evaluate(), this._needBuildLayoutTree && (this.buildLayoutTree(), 
        this._needBuildLayoutTree = !1), this._layoutState && (this._layoutState = enums_1.LayoutState.layouting, 
        this.doLayout(), this._dataflow.hasCommitted() && (this._layoutState = enums_1.LayoutState.reevaluate, 
        this._dataflow.evaluate()), this._layoutState = enums_1.LayoutState.after, (null === (_a = this._layoutMarks) || void 0 === _a ? void 0 : _a.length) && this.handleLayoutEnd()), 
        this._layoutState = null, this.findProgressiveMarks(), this._resizeRenderer(), null === (_c = this.morph) || void 0 === _c || _c.call(this, normalizedRunningConfig), 
        this.releaseCachedGrammars(normalizedRunningConfig), this.doRender(!0), this.doPreProgressive(), 
        this) : this;
    }
    reuseCachedGrammars(runningConfig) {
        if (runningConfig.reuse) {
            const reuseDiffUpdate = diff => {
                diff.next.reuse(diff.prev), diff.prev.detachAll(), diff.prev.clear(), this._cachedGrammars.unrecord(diff.prev);
            };
            this._differ.diffGrammar(this._cachedGrammars.getAllSignals(), this.grammars.getAllSignals().filter((signal => !view_1.BuiltInSignalID.includes(signal.id())))).update.forEach(reuseDiffUpdate);
            this._differ.diffGrammar(this._cachedGrammars.getAllData(), this.grammars.getAllData()).update.forEach(reuseDiffUpdate);
            this._differ.diffGrammar(this._cachedGrammars.getAllScales(), this.grammars.getAllScales()).update.forEach(reuseDiffUpdate);
            this._differ.diffGrammar(this._cachedGrammars.getAllCoordinates(), this.grammars.getAllCoordinates()).update.forEach(reuseDiffUpdate);
        }
        this._differ.diffMark(this._cachedGrammars.getAllMarks(), this.grammars.getAllMarks().filter((mark => "root" !== mark.id())), runningConfig).update.forEach((diff => {
            var _b;
            const matched = 1 === diff.prev.length && 1 === diff.next.length && diff.prev[0].markType === diff.next[0].markType, enableMarkMorphConfig = diff.prev.every((mark => mark.getMorphConfig().morph)) && diff.next.every((mark => mark.getMorphConfig().morph));
            this.morph && (runningConfig.morph && enableMarkMorphConfig || runningConfig.morphAll) ? null === (_b = this.addMorphMarks) || void 0 === _b || _b.call(this, {
                prev: diff.prev,
                next: diff.next
            }) : matched && runningConfig.reuse && (diff.next[0].reuse(diff.prev[0]), diff.prev[0].detachAll(), 
            diff.prev[0].clear(), this._cachedGrammars.unrecord(diff.prev[0]));
        }));
    }
    detachCachedGrammar() {
        this._cachedGrammars.traverse((grammar => {
            var _a, _b;
            if (grammar.detachAll(), "mark" === grammar.grammarType) {
                const mark = grammar;
                null === (_b = null === (_a = mark.group) || void 0 === _a ? void 0 : _a.removeChild) || void 0 === _b || _b.call(_a, mark);
            }
        }));
    }
    releaseCachedGrammars(runningConfig) {
        this._cachedGrammars.traverse((grammar => {
            "mark" !== grammar.grammarType && grammar.release();
        }));
        const markNodes = this._cachedGrammars.getAllMarkNodes();
        markNodes.forEach((node => {
            var _a;
            null === (_a = node.mark.animate) || void 0 === _a || _a.stop(), runningConfig.enableExitAnimation && this.animate && this.animate.animateAddition(node.mark);
        }));
        const releaseUp = node => {
            if (node.mark.view && (!node.mark.animate || 0 === node.mark.animate.getAnimatorCount()) && (!node.children || 0 === node.children.length)) {
                node.mark.release();
                const parent = node.parent;
                parent && (node.parent.children = node.parent.children.filter((n => n !== node)), 
                node.parent = null, releaseUp(parent));
            }
        };
        markNodes.forEach((node => {
            const mark = node.mark;
            mark.animate && 0 !== mark.animate.getAnimatorCount() ? mark.addEventListener("animationEnd", (() => {
                mark.animate && 0 === mark.animate.getAnimatorCount() && releaseUp(node);
            })) : releaseUp(node);
        })), this._cachedGrammars.clear();
    }
    runAfter(callback) {
        return this._dataflow.runAfter((() => {
            callback.call(null, this);
        })), this;
    }
    runBefore(callback) {
        return this._dataflow.runBefore((() => {
            callback.call(null, this);
        })), this;
    }
    getImageBuffer() {
        var _a, _b;
        if ("node" !== this._options.mode) return void this.logger.error(new TypeError("getImageBuffer() now only support node environment."));
        const stage = null === (_b = null === (_a = this.renderer) || void 0 === _a ? void 0 : _a.stage) || void 0 === _b ? void 0 : _b.call(_a);
        if (stage) {
            stage.render();
            return stage.window.getImageBuffer();
        }
        return this.logger.error(new ReferenceError("render is not defined")), null;
    }
    traverseMarkTree(apply, filter, leafFirst) {
        return (0, mark_tree_1.traverseMarkTree)(this.rootMark, "children", apply, filter, leafFirst), 
        this;
    }
    _bindResizeEvent() {
        var _a, _b, _c, _d, _e, _f;
        if (this.autoFit()) {
            const container = null === (_e = null === (_d = null === (_c = null === (_b = null === (_a = this.renderer) || void 0 === _a ? void 0 : _a.stage) || void 0 === _b ? void 0 : _b.call(_a)) || void 0 === _c ? void 0 : _c.window) || void 0 === _d ? void 0 : _d.getContainer) || void 0 === _e ? void 0 : _e.call(_d);
            if (container) {
                const ResizeObserverWindow = window.ResizeObserver;
                this._observer = new ResizeObserverWindow(this._onResize), null === (_f = this._observer) || void 0 === _f || _f.observe(container);
            }
            window.addEventListener("resize", this._onResize);
        }
    }
    _unBindResizeEvent() {
        this.autoFit() && (window.removeEventListener("resize", this._onResize), this._observer && (this._observer.disconnect(), 
        this._observer = null));
    }
    _getContainerSize() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const container = null === (_e = null === (_d = null === (_c = null === (_b = null === (_a = this.renderer) || void 0 === _a ? void 0 : _a.stage) || void 0 === _b ? void 0 : _b.call(_a)) || void 0 === _c ? void 0 : _c.window) || void 0 === _d ? void 0 : _d.getContainer) || void 0 === _e ? void 0 : _e.call(_d);
        if (container) {
            const {width: containerWidth, height: containerHeight} = (0, vutils_1.getContainerSize)(container);
            return {
                width: null !== (_h = null !== (_g = null === (_f = this._spec) || void 0 === _f ? void 0 : _f.width) && void 0 !== _g ? _g : this._options.width) && void 0 !== _h ? _h : containerWidth,
                height: null !== (_l = null !== (_k = null === (_j = this._spec) || void 0 === _j ? void 0 : _j.height) && void 0 !== _k ? _k : this._options.height) && void 0 !== _l ? _l : containerHeight
            };
        }
        return null;
    }
    resize(width, height, render = !0) {
        let needDataflow = !1;
        return width !== this.width() && (needDataflow = !0, this.updateSignal(constants_1.SIGNAL_WIDTH, width)), 
        height !== this.height() && (needDataflow = !0, this.updateSignal(constants_1.SIGNAL_HEIGHT, height)), 
        needDataflow && (render ? this.evaluate({
            morph: !1
        }) : this._dataflow.evaluate()), this;
    }
    _resizeRenderer() {
        const width = this.width(), height = this.height();
        return !!this.renderer.shouldResize(width, height) && (this.renderer.resize(width, height), 
        this.emit("resize", {}, {
            width: width,
            height: height
        }), !0);
    }
    interaction(type, spec) {
        const interaction = factory_1.Factory.createInteraction(type, this, spec);
        return interaction && (interaction.bind(), this._boundInteractions || (this._boundInteractions = []), 
        this._boundInteractions.push(interaction)), interaction;
    }
    removeInteraction(type, id) {
        if (this._boundInteractions) {
            const instances = this._boundInteractions.filter((interaction => {
                var _a;
                return (0, vutils_1.isNil)(id) ? (0, vutils_1.isString)(type) ? interaction.type === type : type ? interaction === type : void 0 : (null === (_a = interaction.options) || void 0 === _a ? void 0 : _a.id) === id;
            }));
            instances.length && instances.forEach((instance => {
                instance.unbind();
            }));
        }
        return this;
    }
    removeAllInteractions() {
        return this._boundInteractions && (this._boundInteractions.forEach((instance => {
            instance.unbind();
        })), this._boundInteractions = null), this;
    }
    initializeEventConfig(config) {
        const eventsConfig = Object.assign({
            defaults: {}
        }, config), unpack = (obj, keys) => {
            keys.forEach((k => {
                (0, vutils_1.isArray)(obj[k]) && (obj[k] = obj[k].reduce(((set, key) => (set[key] = !0, 
                set)), {}));
            }));
        };
        return unpack(eventsConfig.defaults, [ "prevent", "allow" ]), unpack(eventsConfig, [ constants_1.EVENT_SOURCE_VIEW, constants_1.EVENT_SOURCE_WINDOW ]), 
        eventsConfig;
    }
    initEvent() {
        const stage = this.renderer.stage();
        stage && stage.on("*", this.delegateEvent);
    }
    releaseStageEvent() {
        const stage = this.renderer.stage();
        stage && stage.off("*", this.delegateEvent);
    }
    addEventListener(type, handler, options) {
        let callback = handler;
        return options && !1 === options.trap || (callback = handler, callback.raw = handler), 
        options && options.target && (callback.target = options.target), this.on(type, callback), 
        this;
    }
    removeEventListener(type, handler) {
        return handler ? this.off(type, handler) : this.off(type), this;
    }
    initializeRenderer() {
        const width = this._options.width, height = this._options.height;
        this.renderer = new canvas_renderer_1.default(this), this.renderer.initialize(width, height, this._options, this._eventConfig).background(this._background);
    }
    initialize() {
        var _a, _c;
        this.grammars = new grammar_record_1.RecordedGrammars((grammar => grammar.id()), ((key, grammar) => this.logger.warn(`Grammar id '${key}' has been occupied`, grammar))), 
        this._cachedGrammars = new grammar_record_1.RecordedTreeGrammars((grammar => grammar.id())), 
        this._options.logger && vutils_1.Logger.setInstance(this._options.logger), this.logger = vutils_1.Logger.getInstance(null !== (_a = this._options.logLevel) && void 0 !== _a ? _a : 0), 
        this._dataflow = new dataflow_1.default, this.animate = null === (_c = this.initAnimate) || void 0 === _c ? void 0 : _c.call(this, this), 
        this._differ = new view_diff_1.ViewDiff, this._options.hooks && (Object.keys(this._options.hooks).forEach((key => {
            this.on(key, this._options.hooks[key]);
        })), this.hooks = this._options.hooks), this.container = null, this.renderer = null, 
        this._eventListeners = [], this._eventConfig = this.initializeEventConfig(this._options.eventConfig), 
        this._theme = this._options.disableTheme ? null : theme_manager_1.ThemeManager.getDefaultTheme(), 
        this.parseBuiltIn(), (0, env_1.configureEnvironment)(this._options), this.initializeRenderer(), 
        this._eventConfig.disable || this.initEvent(), this._bindResizeEvent(), this._needBuildLayoutTree = !0, 
        this._layoutState = enums_1.LayoutState.before, this.theme(this._theme);
    }
    pauseProgressive() {
        return !1;
    }
    resumeProgressive() {
        return !1;
    }
    restartProgressive() {
        return !1;
    }
    findProgressiveMarks() {
        const marks = [];
        return this.traverseMarkTree((mark => {
            marks.push(mark);
        }), (mark => mark.markType !== enums_1.GrammarMarkType.group && mark.isProgressive())), 
        marks.length ? (this._progressiveMarks = marks, this.renderer && this.renderer.combineIncrementalLayers(), 
        marks) : (this._progressiveMarks = null, null);
    }
    doPreProgressive() {
        if (this._progressiveMarks && this._progressiveMarks.some((mark => mark.isDoingProgressive()))) {
            const raf = vrender_core_1.vglobal.getRequestAnimationFrame();
            this._progressiveRafId = raf(this.handleProgressiveFrame);
        } else this._progressiveMarks && this.animate && this._progressiveMarks.every((mark => mark.canAnimateAfterProgressive())) ? this.animate.animate() : this._progressiveMarks && (this._progressiveMarks = null);
    }
    clearProgressive() {
        if (this._progressiveRafId) {
            vrender_core_1.vglobal.getCancelAnimationFrame()(this._progressiveRafId);
        }
        this._progressiveMarks && this._progressiveMarks.length && (this._progressiveMarks.forEach((entry => {
            entry.clearProgressive();
        })), this._progressiveMarks = null);
    }
    release() {
        var _a, _b, _c, _d;
        this.removeAllInteractions(), this.releaseStageEvent(), this._unBindResizeEvent(), 
        this.clearProgressive(), factory_1.Factory.unregisterRuntimeTransforms(), vutils_1.Logger.setInstance(null), 
        null === (_a = this.animate) || void 0 === _a || _a.stop(), this.grammars.release(), 
        this._cachedGrammars.release(), this._dataflow.release(), this._dataflow = null, 
        null === (_c = null === (_b = this.renderer) || void 0 === _b ? void 0 : _b.release) || void 0 === _c || _c.call(_b), 
        this.renderer = null, this._boundInteractions = null, this.removeAllListeners(), 
        null === (_d = this._eventListeners) || void 0 === _d || _d.forEach((listener => {
            listener.source.removeEventListener(listener.type, listener.handler);
        })), this._eventListeners = null;
    }
}

exports.default = View;
//# sourceMappingURL=View.js.map
