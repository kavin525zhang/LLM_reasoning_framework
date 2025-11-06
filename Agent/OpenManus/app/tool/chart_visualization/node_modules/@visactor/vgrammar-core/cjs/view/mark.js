"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Mark = void 0;

const vutils_1 = require("@visactor/vutils"), constants_1 = require("../graph/constants"), enums_1 = require("../graph/enums"), differ_1 = require("../graph/mark/differ"), graphic_1 = require("../graph/util/graphic"), grammar_base_1 = require("./grammar-base"), mark_1 = require("../parse/mark"), util_1 = require("../parse/util"), transform_1 = require("../parse/transform"), encode_1 = require("../graph/mark/encode"), attributes_1 = require("../graph/attributes"), events_extend_1 = __importDefault(require("../graph/util/events-extend")), constants_2 = require("./constants"), element_1 = require("../graph/element");

class Mark extends grammar_base_1.GrammarBase {
    constructor(view, markType, group) {
        super(view), this.grammarType = "mark", this.elements = [], this.elementMap = new Map, 
        this.isUpdated = !0, this._isReentered = !1, this.differ = new differ_1.Differ([]), 
        this.markType = markType, this.spec.type = markType, this.spec.encode = {
            update: {}
        }, this.spec.group = group, group && (this.group = group, this.attach(group), group.appendChild(this));
    }
    parse(spec) {
        var _a, _b, _c;
        if (super.parse(spec), this.spec.group) {
            const groupMark = (0, vutils_1.isString)(this.spec.group) ? this.view.getMarkById(this.spec.group) : this.spec.group;
            this.detach(groupMark);
        }
        const groupMark = (0, vutils_1.isString)(spec.group) ? this.view.getMarkById(spec.group) : spec.group;
        return this.attach(groupMark), this.join(null === (_a = spec.from) || void 0 === _a ? void 0 : _a.data, spec.key, spec.sort, spec.groupBy, spec.groupSort), 
        this.coordinate(spec.coordinate), this.state(spec.state, this.spec.stateSort), Object.keys(null !== (_b = this.spec.encode) && void 0 !== _b ? _b : {}).forEach((state => {
            this.encodeState(state, {}, !0);
        })), Object.keys(null !== (_c = spec.encode) && void 0 !== _c ? _c : {}).forEach((state => {
            this.encodeState(state, spec.encode[state]);
        })), this.animation(spec.animation), this.animationState(spec.animationState), this.morph(spec.morph, spec.morphKey, spec.morphElementKey), 
        this.layout(spec.layout), this.configure(spec), this.transform(spec.transform), 
        this.parseAddition(spec), this.spec = spec, this.markType = spec.type, this.commit(), 
        this;
    }
    parameters() {
        var _a;
        return null !== (_a = this._finalParameters) && void 0 !== _a ? _a : super.parameters();
    }
    parseAddition(spec) {
        return this;
    }
    reuse(grammar) {
        var _b;
        if (grammar.grammarType !== this.grammarType) return this;
        const mark = grammar;
        return this.markType = mark.markType, this.coord = mark.coord, this.elementMap = mark.elementMap, 
        this.elements = mark.elements, this.elementMap.forEach((element => element.mark = this)), 
        this.differ = mark.differ, null === (_b = this.reuseAnimate) || void 0 === _b || _b.call(this, mark), 
        this._context = mark._context, this.graphicItem = mark.graphicItem, this.graphicIndex = mark.graphicIndex, 
        this.graphicParent = mark.graphicParent, this.needClear = mark.needClear, this.isUpdated = mark.isUpdated, 
        this;
    }
    needLayout() {
        return !(0, vutils_1.isNil)(this.spec.layout);
    }
    handleLayoutEnd() {}
    handleRenderEnd() {
        this.needClear && (this.cleanExitElements(), this.elementMap.forEach((element => {
            element.diffState === enums_1.DiffState.exit ? element.clearGraphicAttributes() : element.clearChangedGraphicAttributes();
        })), this.differ.updateToCurrent(), this.needClear = !1);
    }
    evaluateMainTasks(data, parameters) {
        var _a, _b;
        if (this.needSkipBeforeLayout() && this.view.getLayoutState() === enums_1.LayoutState.before) return this;
        const stage = null === (_a = this.view.renderer) || void 0 === _a ? void 0 : _a.stage();
        this.init(stage, parameters);
        const transformData = this.evaluateTransform(this._getTransformsBeforeJoin(), null != data ? data : constants_1.DefaultMarkData, parameters), progressiveTransform = null == transformData ? void 0 : transformData.progressive;
        if (progressiveTransform ? this.renderContext = {
            large: !1
        } : (this.evaluateGroup(transformData), this.renderContext = this.parseRenderContext(transformData, parameters)), 
        null === (_b = this.renderContext) || void 0 === _b ? void 0 : _b.progressive) this.differ.reset(), 
        this.elementMap.clear(), this.evaluateProgressive(); else {
            let inputData = null;
            if (progressiveTransform) {
                if (this.renderContext.parameters = parameters, this.renderContext.beforeTransformProgressive = transformData.progressive, 
                inputData = transformData.progressive.output(), transformData.progressive.canAnimate && transformData.progressive.unfinished()) return this.update(this.spec), 
                this;
            } else inputData = transformData;
            this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_JOIN), this.evaluateJoin(inputData), this.emit(enums_1.HOOK_EVENT.AFTER_MARK_JOIN), 
            this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_STATE), this.evaluateState(this.elements, this.spec.state, parameters), 
            this.emit(enums_1.HOOK_EVENT.AFTER_MARK_STATE), this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_ENCODE), 
            this.evaluateEncode(this.elements, this._getEncoders(), parameters), this.emit(enums_1.HOOK_EVENT.AFTER_MARK_ENCODE);
        }
        return this.update(this.spec), this;
    }
    evaluateGroup(data) {
        if (this.markType === enums_1.GrammarMarkType.group) return;
        const currentData = null != data ? data : constants_1.DefaultMarkData, res = (0, 
        differ_1.groupData)(currentData, this.spec.groupBy, this.spec.groupSort);
        this._groupEncodeResult = null, this._groupedData = res;
    }
    _getTransformsAfterEncodeItems() {
        return this.transforms && this.transforms.filter((entry => "afterEncodeItems" === entry.markPhase));
    }
    _getTransformsAfterEncode() {
        return this.transforms && this.transforms.filter((entry => (0, vutils_1.isNil)(entry.markPhase) || "afterEncode" === entry.markPhase));
    }
    _getTransformsBeforeJoin() {
        return this.transforms ? this.transforms.filter((entry => "beforeJoin" === entry.markPhase)) : [];
    }
    evaluate(data, parameters) {
        var _a;
        return this.evaluateMainTasks(data, parameters), (null === (_a = this.renderContext) || void 0 === _a ? void 0 : _a.progressive) || this.evaluateTransform(this._getTransformsAfterEncode(), this.elements, parameters), 
        this;
    }
    output() {
        return this;
    }
    join(data, key, sort, groupBy, groupSort) {
        return this.grammarSource && (this.detach(this.grammarSource), this.grammarSource = null), 
        this.spec.from = null, (0, vutils_1.isNil)(data) || ((0, vutils_1.isString)(data) ? this.grammarSource = this.view.getDataById(data) : this.grammarSource = data, 
        this.spec.from = {
            data: data
        }, this.attach(this.grammarSource)), this.spec.key = key, this.spec.sort = sort, 
        this.spec.groupBy = groupBy, this.spec.groupSort = groupSort, this.commit(), this;
    }
    coordinate(coordinate) {
        return (0, vutils_1.isString)(coordinate) ? this.coord = this.view.getCoordinateById(coordinate) : this.coord = coordinate, 
        this.attach(this.coord), this.commit(), this;
    }
    state(state, stateSort) {
        return this.spec.stateSort = stateSort, this.setFunctionSpec(state, "state");
    }
    encode(channel, value, clear) {
        return this.encodeState(enums_1.DiffState.update, channel, value, clear);
    }
    encodeState(state, channel, value, clear) {
        if (state === enums_1.DiffState.enter && (this._isReentered = !0), this.spec.encode[state]) {
            const lastEncoder = this.spec.encode[state];
            if ((0, util_1.isFunctionType)(lastEncoder)) this.detach((0, mark_1.parseEncodeType)(lastEncoder, this.view)); else {
                const isSingleChannel = (0, vutils_1.isString)(channel);
                isSingleChannel && clear || !isSingleChannel && value ? (Object.keys(lastEncoder).forEach((c => {
                    this.detach((0, mark_1.parseEncodeType)(lastEncoder[c], this.view));
                })), this.spec.encode[state] = {}) : isSingleChannel ? this.detach((0, mark_1.parseEncodeType)(lastEncoder[channel], this.view)) : Object.keys(channel).forEach((c => {
                    this.detach((0, mark_1.parseEncodeType)(lastEncoder[c], this.view));
                }));
            }
        }
        return channel && (this.spec.encode[state] || (this.spec.encode[state] = {}), (0, 
        vutils_1.isString)(channel) ? (this.spec.encode[state][channel] = value, this.attach((0, 
        mark_1.parseEncodeType)(value, this.view))) : (0, util_1.isFunctionType)(channel) ? (this.spec.encode[state] = channel, 
        this.attach((0, mark_1.parseEncodeType)(channel, this.view))) : channel && (Object.assign(this.spec.encode[state], channel), 
        Object.values(channel).forEach((channelEncoder => {
            this.attach((0, mark_1.parseEncodeType)(channelEncoder, this.view));
        })))), this.commit(), this;
    }
    _getEncoders() {
        var _a;
        return null !== (_a = this.spec.encode) && void 0 !== _a ? _a : {};
    }
    animation(animationConfig) {
        return this.spec.animation = animationConfig, this;
    }
    animationState(animationState) {
        return this.setFunctionSpec(animationState, "animationState");
    }
    layout(layout) {
        return this.spec.layout = layout, this.commit(), this;
    }
    morph(enableMorph, morphKey, morphElementKey) {
        return this.spec.morph = enableMorph, this.spec.morphKey = morphKey, this.spec.morphElementKey = morphElementKey, 
        this;
    }
    transform(transforms) {
        const prevTransforms = (0, transform_1.parseTransformSpec)(this.spec.transform, this.view);
        prevTransforms && (this.detach(prevTransforms.refs), this.transforms = []);
        const nextTransforms = (0, transform_1.parseTransformSpec)(transforms, this.view);
        return nextTransforms && (this.attach(nextTransforms.refs), this.transforms = nextTransforms.transforms), 
        this.spec.transform = transforms, this.commit(), this;
    }
    configure(config) {
        const keys = [ "clip", "clipPath", "zIndex", "interactive", "context", "setCustomizedShape", "large", "largeThreshold", "progressiveStep", "progressiveThreshold", "support3d", "morph", "morphKey", "morphElementKey", "attributeTransforms", "skipTheme", "enableSegments", "stateSort", "graphicName", "overflow" ];
        return null === config ? (keys.forEach((key => {
            (0, vutils_1.isNil)(this.spec[key]) || (this.spec[key] = void 0);
        })), this) : (keys.forEach((key => {
            (0, vutils_1.isNil)(config[key]) || (this.spec[key] = config[key]);
        })), this);
    }
    context(context) {
        return this.spec.context = context, this._context = context, this;
    }
    isCollectionMark() {
        return constants_1.CollectionMarkType.includes(this.markType);
    }
    needAnimate() {
        var _a;
        return !(null === (_a = this.renderContext) || void 0 === _a ? void 0 : _a.progressive) && !(0, 
        vutils_1.isNil)(this.spec.animation);
    }
    getAllElements() {
        const elements = this.elements.slice();
        return this.elementMap.forEach((element => {
            element.diffState !== enums_1.DiffState.exit || elements.includes(element) || elements.push(element);
        })), this.spec.sort && elements.sort(((elementA, elementB) => this.spec.sort(elementA.getDatum(), elementB.getDatum()))), 
        elements;
    }
    getScales() {
        const scales = {};
        return this.references.forEach(((count, ref) => {
            ref.grammarType === enums_1.GrammarTypeEnum.scale && (scales[ref.id()] = ref.output());
        })), scales;
    }
    getScalesByChannel() {
        const encoders = this.spec.encode;
        if (!encoders) return {};
        const res = {}, params = this.parameters();
        return Object.keys(encoders).forEach((state => {
            const useEncoders = encoders[state];
            useEncoders && !(0, util_1.isFunctionType)(useEncoders) && Object.keys(useEncoders).forEach((channel => {
                (0, mark_1.isScaleEncode)(useEncoders[channel]) && (res[channel] = (0, util_1.getGrammarOutput)(useEncoders[channel].scale, params));
            }));
        })), res;
    }
    getFieldsByChannel() {
        const encoders = this.spec.encode;
        if (!encoders) return {};
        const res = {};
        return Object.keys(encoders).forEach((state => {
            const useEncoders = encoders[state];
            (0, util_1.isFunctionType)(useEncoders) || Object.keys(useEncoders).forEach((channel => {
                (0, mark_1.isFieldEncode)(useEncoders[channel]) && (res[channel] = useEncoders[channel].field);
            }));
        })), res;
    }
    init(stage, parameters) {
        var _b, _c, _d, _e, _f;
        if (this._delegateEvent || (this._delegateEvent = (event, type) => {
            const extendedEvt = (0, events_extend_1.default)(this.view, event, type, constants_2.EVENT_SOURCE_VIEW), activeElement = event.element;
            (null == activeElement ? void 0 : activeElement.mark) === this && this.emitGrammarEvent(type, extendedEvt, activeElement);
        }, this.initEvent()), null === (_b = this.initAnimate) || void 0 === _b || _b.call(this, this.spec), 
        !this.group) {
            const group = (0, util_1.getGrammarOutput)(this.spec.group, parameters);
            this.group = group, group && group.appendChild(this);
        }
        const groupGraphicItem = this.group ? this.group.getGroupGraphicItem() : stage.defaultLayer, markIndex = null !== (_e = null === (_d = null === (_c = this.group) || void 0 === _c ? void 0 : _c.children) || void 0 === _d ? void 0 : _d.indexOf(this)) && void 0 !== _e ? _e : 0;
        if (this.markType !== enums_1.GrammarMarkType.group) {
            if (!this.graphicItem) {
                const graphicItem = (0, graphic_1.createGraphicItem)(this, enums_1.GrammarMarkType.group, {
                    pickable: !1,
                    zIndex: null !== (_f = this.spec.zIndex) && void 0 !== _f ? _f : 0,
                    overflow: this.spec.overflow
                });
                (this.spec.support3d || constants_1.Mark3DType.includes(this.markType)) && graphicItem.setMode("3d"), 
                graphicItem.name = `${this.id() || this.markType}`, this.graphicItem = graphicItem;
            }
            this.graphicParent = this.graphicItem, !groupGraphicItem || this.graphicIndex === markIndex && this.graphicItem.parent === groupGraphicItem || groupGraphicItem.insertIntoKeepIdx(this.graphicItem, markIndex);
        } else this.graphicParent = groupGraphicItem, this.graphicParent.setAttributes({
            overflow: this.spec.overflow
        });
        this.graphicIndex = markIndex;
    }
    update(spec) {
        var _b;
        if (this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_UPDATE), this._context = this.spec.context, 
        this.isUpdated = !0, this.renderContext.progressive || null === (_b = this.updateAnimate) || void 0 === _b || _b.call(this, spec), 
        this.markType !== enums_1.GrammarMarkType.group) {
            if ((0, vutils_1.isNil)(spec.zIndex) || this.graphicItem.setAttribute("zIndex", spec.zIndex), 
            (0, vutils_1.isNil)(spec.clip) || this.graphicItem.setAttribute("clip", spec.clip), 
            !(0, vutils_1.isNil)(spec.clipPath)) {
                const paths = (0, vutils_1.isArray)(spec.clipPath) ? spec.clipPath : spec.clipPath(this.elements);
                paths && paths.length ? this.graphicItem.setAttribute("path", paths) : this.graphicItem.setAttributes({
                    path: paths,
                    clip: !1
                });
            }
            (0, vutils_1.isNil)(spec.overflow) || this.graphicItem.setAttribute("overflow", spec.overflow), 
            this.elementMap.forEach((element => {
                element.updateGraphicItem();
            }));
        } else this.elementMap.forEach((element => {
            element.updateGraphicItem();
        }));
        this.emit(enums_1.HOOK_EVENT.AFTER_MARK_UPDATE);
    }
    createElement() {
        return new element_1.Element(this);
    }
    evaluateJoin(data) {
        var _a, _b, _c, _d;
        this.needClear = !0;
        const keyGetter = (0, util_1.parseField)(null !== (_c = null !== (_a = this.spec.key) && void 0 !== _a ? _a : null === (_b = this.grammarSource) || void 0 === _b ? void 0 : _b.getDataIDKey()) && void 0 !== _c ? _c : () => constants_1.DefaultKey), groupKeyGetter = (0, 
        util_1.parseField)(null !== (_d = this.spec.groupBy) && void 0 !== _d ? _d : () => constants_1.DefaultKey), sort = this.spec.sort, isCollectionMark = this.isCollectionMark(), enterElements = new Set(this.elements.filter((element => element.diffState === enums_1.DiffState.enter))), elements = [];
        this.differ.setCallback(((key, data, prevData) => {
            var _a;
            const elementKey = key;
            let element;
            if ((0, vutils_1.isNil)(data)) element = this.elementMap.get(elementKey), element && (element.diffState = enums_1.DiffState.exit); else if ((0, 
            vutils_1.isNil)(prevData)) {
                if (element = this.elementMap.has(elementKey) ? this.elementMap.get(elementKey) : this.createElement(), 
                element.diffState === enums_1.DiffState.exit) {
                    element.diffState = enums_1.DiffState.enter;
                    const animators = null === (_a = this.animate) || void 0 === _a ? void 0 : _a.getElementAnimators(element, enums_1.DiffState.exit);
                    animators && animators.forEach((animator => animator.stop("start")));
                }
                element.diffState = enums_1.DiffState.enter;
                const groupKey = isCollectionMark ? key : groupKeyGetter(data[0]);
                element.updateData(groupKey, data, keyGetter), this.elementMap.set(elementKey, element), 
                elements.push(element);
            } else if (element = this.elementMap.get(elementKey), element) {
                element.diffState = enums_1.DiffState.update;
                const groupKey = isCollectionMark ? key : groupKeyGetter(data[0]);
                element.updateData(groupKey, data, keyGetter), elements.push(element);
            }
            enterElements.delete(element);
        }));
        const currentData = null != data ? data : constants_1.DefaultMarkData;
        isCollectionMark ? this.differ.setCurrentData(this._groupedData) : this.differ.setCurrentData((0, 
        differ_1.groupData)(currentData, (datum => `${groupKeyGetter(datum)}-${keyGetter(datum)}`), void 0)), 
        this.differ.doDiff(), enterElements.forEach((element => {
            this.elementMap.delete(isCollectionMark ? element.groupKey : `${element.groupKey}-${element.key}`), 
            element.remove(), element.release();
        })), this.elements = elements, sort && this.elements.length >= 2 && this.elements.sort(((elementA, elementB) => sort(elementA.getDatum(), elementB.getDatum())));
    }
    evaluateState(elements, stateSpec, parameters) {
        stateSpec && elements.forEach((element => {
            element.state(stateSpec, parameters);
        }));
    }
    evaluateGroupEncode(elements, groupEncode, parameters) {
        if (!this._groupedData || !groupEncode) return;
        const res = {};
        return this._groupedData.keys.forEach((key => {
            const el = elements.find((el => el.groupKey === key));
            el && (res[key] = (0, encode_1.invokeEncoder)(groupEncode, el.items && el.items[0] && el.items[0].datum, el, parameters));
        })), this._groupEncodeResult = res, res;
    }
    getChannelsFromConfig(element) {
        const spec = this.spec;
        return (0, vutils_1.isNil)(spec.interactive) ? null : {
            pickable: spec.interactive
        };
    }
    evaluateEncode(elements, encoders, parameters, noGroupEncode) {
        const initAttrs = this.getChannelsFromConfig();
        if (encoders) {
            this.emit(enums_1.HOOK_EVENT.BEFORE_ELEMENT_ENCODE, {
                encoders: encoders,
                parameters: parameters
            }, this);
            const groupEncodeAttrs = noGroupEncode ? null : this.evaluateGroupEncode(elements, encoders[enums_1.BuiltInEncodeNames.group], parameters);
            elements.forEach((element => {
                this.markType === enums_1.GrammarMarkType.glyph && this._groupEncodeResult ? element.items.forEach((item => {
                    item.nextAttrs = Object.assign(item.nextAttrs, initAttrs, this._groupEncodeResult[element.groupKey]);
                })) : (null == groupEncodeAttrs ? void 0 : groupEncodeAttrs[element.groupKey]) && !this.isCollectionMark() ? element.items.forEach((item => {
                    item.nextAttrs = Object.assign(item.nextAttrs, initAttrs, groupEncodeAttrs[element.groupKey]);
                })) : initAttrs && element.items.forEach((item => {
                    item.nextAttrs = Object.assign(item.nextAttrs, initAttrs);
                })), element.encodeItems(element.items, encoders, this._isReentered, parameters), 
                this.isCollectionMark() && (null == groupEncodeAttrs ? void 0 : groupEncodeAttrs[element.groupKey]) && (0, 
                vutils_1.isValid)(groupEncodeAttrs[element.groupKey].defined) && (element.items.forEach((item => {
                    item.nextAttrs.defined = groupEncodeAttrs[element.groupKey].defined;
                })), delete groupEncodeAttrs[element.groupKey].defined);
            })), this._isReentered = !1, this.evaluateTransform(this._getTransformsAfterEncodeItems(), elements, parameters), 
            elements.forEach((element => {
                element.encodeGraphic(this.isCollectionMark() ? null == groupEncodeAttrs ? void 0 : groupEncodeAttrs[element.groupKey] : null);
            })), this.emit(enums_1.HOOK_EVENT.AFTER_ELEMENT_ENCODE, {
                encoders: encoders,
                parameters: parameters
            }, this);
        } else elements.forEach((element => {
            element.initGraphicItem(initAttrs);
        }));
    }
    addGraphicItem(attrs, groupKey, newGraphicItem) {
        var _a;
        const graphicItem = null != newGraphicItem ? newGraphicItem : (0, graphic_1.createGraphicItem)(this, this.markType, attrs);
        if (graphicItem) {
            if (null === (_a = this.renderContext) || void 0 === _a ? void 0 : _a.progressive) {
                let group;
                if (this._groupedData) {
                    const index = this._groupedData.keys.indexOf(groupKey);
                    index >= 0 && (group = this.graphicParent.getChildAt(index));
                } else group = this.graphicParent.at(0);
                this.isCollectionMark() ? (graphicItem.incremental = 1, group.appendChild(graphicItem)) : group.incrementalAppendChild(graphicItem);
            } else this.graphicParent.appendChild(graphicItem);
            return graphicItem;
        }
    }
    parseRenderContext(data, parameters) {
        const enableProgressive = this.markType !== enums_1.GrammarMarkType.group && this.spec.progressiveStep > 0 && this.spec.progressiveThreshold > 0 && this.spec.progressiveStep < this.spec.progressiveThreshold, large = this.spec.large && this.spec.largeThreshold > 0 && data.length >= this.spec.largeThreshold;
        if (enableProgressive) {
            const groupedData = this._groupedData;
            return groupedData && groupedData.keys && groupedData.keys.some((key => groupedData.data.get(key).length > this.spec.progressiveThreshold)) ? {
                large: large,
                parameters: parameters,
                progressive: {
                    data: data,
                    step: this.spec.progressiveStep,
                    currentIndex: 0,
                    totalStep: groupedData.keys.reduce(((total, key) => Math.max(Math.ceil(groupedData.data.get(key).length / this.spec.progressiveStep), total)), 1),
                    groupedData: groupedData.data
                }
            } : {
                large: large
            };
        }
        return {
            large: large
        };
    }
    isProgressive() {
        return this.renderContext && (!!this.renderContext.progressive || !!this.renderContext.beforeTransformProgressive);
    }
    canAnimateAfterProgressive() {
        return this.renderContext && this.renderContext.beforeTransformProgressive && this.renderContext.beforeTransformProgressive.canAnimate();
    }
    isDoingProgressive() {
        return this.renderContext && (this.renderContext.progressive && this.renderContext.progressive.currentIndex < this.renderContext.progressive.totalStep || this.renderContext.beforeTransformProgressive && this.renderContext.beforeTransformProgressive.unfinished());
    }
    clearProgressive() {
        this.renderContext && this.renderContext.progressive && (this.elements = [], this.graphicParent.children.forEach((group => {
            group.incrementalClearChild();
        })), this.graphicParent.removeAllChild()), this.renderContext && this.renderContext.beforeTransformProgressive && this.renderContext.beforeTransformProgressive.release(), 
        this.renderContext = null;
    }
    restartProgressive() {
        this.renderContext && this.renderContext.progressive && (this.renderContext.progressive.currentIndex = 0);
    }
    evaluateJoinProgressive() {
        var _a, _b, _c;
        const currentIndex = this.renderContext.progressive.currentIndex, keyGetter = (0, 
        util_1.parseField)(null !== (_c = null !== (_a = this.spec.key) && void 0 !== _a ? _a : null === (_b = this.grammarSource) || void 0 === _b ? void 0 : _b.getDataIDKey()) && void 0 !== _c ? _c : () => constants_1.DefaultKey), elements = [];
        if (this.isCollectionMark()) return this._groupedData.keys.forEach(((key, index) => {
            const data = this.renderContext.progressive.groupedData.get(key), groupStep = this.renderContext.progressive.step, dataSlice = data.slice(currentIndex * groupStep, (currentIndex + 1) * groupStep);
            if (0 === currentIndex) {
                const element = this.createElement();
                element.diffState = enums_1.DiffState.enter, element.updateData(key, dataSlice, keyGetter), 
                elements.push(element);
            } else {
                const element = this.elements[index];
                element.updateData(key, dataSlice, keyGetter), elements.push(element);
            }
        })), elements;
        const groupElements = {};
        return this._groupedData.keys.forEach((key => {
            const data = this.renderContext.progressive.groupedData.get(key), groupStep = this.renderContext.progressive.step, dataSlice = data.slice(currentIndex * groupStep, (currentIndex + 1) * groupStep), group = [];
            dataSlice.forEach((entry => {
                const element = this.createElement();
                element.diffState = enums_1.DiffState.enter, element.updateData(key, [ entry ], keyGetter), 
                group.push(element), elements.push(element);
            })), groupElements[key] = group;
        })), {
            groupElements: groupElements,
            elements: elements
        };
    }
    evaluateEncodeProgressive(elements, encoders, parameters) {
        const progressiveIndex = this.renderContext.progressive.currentIndex;
        if (0 === progressiveIndex) {
            if (this.evaluateEncode(elements, encoders, parameters), 0 === progressiveIndex && this._groupEncodeResult && !this.isCollectionMark() && this.markType !== enums_1.GrammarMarkType.glyph) {
                const firstElement = elements[0], firstChild = firstElement.getGraphicItem(), group = null == firstChild ? void 0 : firstChild.parent;
                group && this._groupEncodeResult[firstElement.groupKey] && group.setTheme({
                    common: this._groupEncodeResult[firstElement.groupKey]
                });
            }
        } else this.evaluateEncode(elements, encoders, parameters, !0);
    }
    evaluateProgressive() {
        var _a, _b, _c;
        if (null === (_a = this.renderContext) || void 0 === _a ? void 0 : _a.beforeTransformProgressive) {
            const transform = this.renderContext.beforeTransformProgressive;
            transform.progressiveRun();
            const output = transform.output();
            if (transform.canAnimate) {
                if (transform.unfinished()) return;
                this.evaluateGroup(output);
            }
            return this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_JOIN), this.evaluateJoin(output), 
            this.emit(enums_1.HOOK_EVENT.AFTER_MARK_JOIN), this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_STATE), 
            this.evaluateState(this.elements, this.spec.state, this.renderContext.parameters), 
            this.emit(enums_1.HOOK_EVENT.AFTER_MARK_STATE), this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_ENCODE), 
            this.evaluateEncode(this.elements, this._getEncoders(), this.renderContext.parameters), 
            void this.emit(enums_1.HOOK_EVENT.AFTER_MARK_ENCODE);
        }
        if (!(null === (_b = this.renderContext) || void 0 === _b ? void 0 : _b.progressive)) return;
        const parameters = this.renderContext.parameters;
        this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_JOIN);
        const result = this.evaluateJoinProgressive(), elements = Array.isArray(result) ? result : result.elements;
        if (this.emit(enums_1.HOOK_EVENT.AFTER_MARK_JOIN), 0 === this.renderContext.progressive.currentIndex ? (this.graphicParent.removeAllChild(), 
        this._groupedData.keys.forEach((key => {
            const graphicItem = (0, graphic_1.createGraphicItem)(this, enums_1.GrammarMarkType.group, {
                pickable: !1,
                zIndex: this.spec.zIndex
            });
            graphicItem.incremental = this.renderContext.progressive.step, this.graphicParent.appendChild(graphicItem);
        })), this.elements = elements) : this.elements = this.elements.concat(elements), 
        this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_STATE), this.evaluateState(elements, this.spec.state, parameters), 
        this.emit(enums_1.HOOK_EVENT.AFTER_MARK_STATE), this.emit(enums_1.HOOK_EVENT.BEFORE_MARK_ENCODE), 
        Array.isArray(result)) this.evaluateEncodeProgressive(elements, this._getEncoders(), parameters); else {
            const groupElements = result.groupElements;
            Object.keys(groupElements).forEach((key => {
                this.evaluateEncodeProgressive(groupElements[key], this._getEncoders(), parameters);
            }));
        }
        this.emit(enums_1.HOOK_EVENT.AFTER_MARK_ENCODE);
        const progressiveTransforms = null === (_c = this._getTransformsAfterEncode()) || void 0 === _c ? void 0 : _c.filter((entry => !0 === entry.canProgressive));
        (null == progressiveTransforms ? void 0 : progressiveTransforms.length) && this.evaluateTransform(progressiveTransforms, this.elements, parameters), 
        this.renderContext.progressive.currentIndex += 1;
    }
    isLargeMode() {
        return this.renderContext && this.renderContext.large;
    }
    cleanExitElements() {
        this.elementMap.forEach(((element, key) => {
            element.diffState !== enums_1.DiffState.exit || element.isReserved || (this.elementMap.delete(key), 
            element.remove(), element.release());
        }));
    }
    getGroupGraphicItem() {
        if (this.elements && this.elements[0] && this.elements[0].getGraphicItem) return this.elements[0].getGraphicItem();
    }
    getBounds() {
        var _a;
        return this.graphicItem ? this.graphicItem.AABBBounds : null === (_a = this.getGroupGraphicItem()) || void 0 === _a ? void 0 : _a.AABBBounds;
    }
    getMorphConfig() {
        var _a;
        return {
            morph: null !== (_a = this.spec.morph) && void 0 !== _a && _a,
            morphKey: this.spec.morphKey,
            morphElementKey: this.spec.morphElementKey
        };
    }
    getAttributeTransforms() {
        var _a;
        return null !== (_a = this.spec.attributeTransforms) && void 0 !== _a ? _a : attributes_1.transformsByType[this.markType];
    }
    getContext() {
        return this._context;
    }
    needSkipBeforeLayout() {
        var _a, _b;
        if (!0 === (null === (_a = this.spec.layout) || void 0 === _a ? void 0 : _a.skipBeforeLayouted)) return !0;
        let group = this.group;
        for (;group; ) {
            if (!0 === (null === (_b = group.getSpec().layout) || void 0 === _b ? void 0 : _b.skipBeforeLayouted)) return !0;
            group = group.group;
        }
        return !1;
    }
    initEvent() {
        if (this._delegateEvent) {
            const stage = this.view.renderer.stage();
            stage && stage.on("*", this._delegateEvent);
        }
    }
    releaseEvent() {
        if (this._delegateEvent) {
            const stage = this.view.renderer.stage();
            stage && stage.off("*", this._delegateEvent);
        }
    }
    clear() {
        var _a;
        this.releaseEvent(), this.transforms = null, this.elementMap = null, this.elements = null, 
        this.graphicItem = null, this.animate = null, null === (_a = this.group) || void 0 === _a || _a.removeChild(this), 
        this.group = null, super.clear();
    }
    prepareRelease() {
        var _a;
        this.differ.setCurrentData(null), null === (_a = this.animate) || void 0 === _a || _a.stop(), 
        this.elementMap.forEach((element => element.diffState = enums_1.DiffState.exit)), 
        this._finalParameters = this.parameters();
    }
    release() {
        this.releaseEvent(), this.elements.forEach((element => element.release())), this.differ = null, 
        this.elements = [], this.elementMap.clear(), this._finalParameters = null, this.animate && this.animate.release(), 
        this.graphicItem && (0, graphic_1.removeGraphicItem)(this.graphicItem), this.detachAll(), 
        super.release();
    }
}

exports.Mark = Mark;
//# sourceMappingURL=mark.js.map
