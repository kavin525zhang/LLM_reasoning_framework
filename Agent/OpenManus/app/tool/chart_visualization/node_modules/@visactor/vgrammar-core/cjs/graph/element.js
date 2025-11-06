"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Element = void 0;

const vutils_1 = require("@visactor/vutils"), constants_1 = require("./constants"), enums_1 = require("./enums"), encode_1 = require("./mark/encode"), graphic_1 = require("./util/graphic"), transform_1 = require("./attributes/transform"), helpers_1 = require("./attributes/helpers"), line_1 = require("./attributes/line"), vrender_core_1 = require("@visactor/vrender-core"), util_1 = require("../parse/util");

class Element {
    constructor(mark) {
        this.data = null, this.states = [], this.diffState = enums_1.DiffState.enter, this.isReserved = !1, 
        this.runtimeStatesEncoder = null, this.items = [], this.getStateAttrs = (stateName, nextStates) => {
            var _a, _b, _c, _d;
            const isRuntimeState = !(0, vutils_1.isNil)(null === (_a = this.runtimeStatesEncoder) || void 0 === _a ? void 0 : _a[stateName]), encoder = isRuntimeState ? Object.assign(Object.assign({}, null === (_b = this.mark.getSpec().encode) || void 0 === _b ? void 0 : _b[stateName]), this.runtimeStatesEncoder[stateName]) : null === (_c = this.mark.getSpec().encode) || void 0 === _c ? void 0 : _c[stateName];
            if (!encoder) return {};
            if ((0, vutils_1.isFunction)(encoder)) return encoder(this.getDatum(), this, stateName, nextStates);
            if (!isRuntimeState && (null === (_d = this.graphicItem.states) || void 0 === _d ? void 0 : _d[stateName])) return this.graphicItem.states[stateName];
            const stateItems = this.items.map((item => Object.assign({}, item, {
                nextAttrs: {}
            })));
            (0, encode_1.invokeEncoderToItems)(this, stateItems, encoder, this.mark.parameters());
            const graphicAttributes = this.transformElementItems(stateItems, this.mark.markType);
            return this.graphicItem.states ? this.graphicItem.states[stateName] || (this.graphicItem.states[stateName] = graphicAttributes) : this.graphicItem.states = {
                [stateName]: graphicAttributes
            }, graphicAttributes;
        }, this.mark = mark;
    }
    initGraphicItem(attributes = {}) {
        if (this.graphicItem) return;
        const attrTransforms = this.mark.getAttributeTransforms();
        if (this.graphicItem = this.mark.addGraphicItem(attrTransforms ? (0, transform_1.transformAttributes)(attrTransforms, attributes, this) : attributes, this.groupKey), 
        !this.graphicItem) return;
        const {graphicName: graphicName} = this.mark.getSpec();
        (0, vutils_1.isString)(graphicName) ? this.graphicItem.name = graphicName : (0, 
        vutils_1.isFunction)(graphicName) && (this.graphicItem.name = graphicName(this)), 
        this.graphicItem[constants_1.BridgeElementKey] = this, attrTransforms && (this.graphicItem.onBeforeAttributeUpdate = attributes => {
            if (!this.mark) return attributes;
            return (0, transform_1.transformAttributes)(attrTransforms, attributes, this);
        }), this.clearGraphicAttributes(), this.mark.needAnimate() && (this.setPrevGraphicAttributes(null), 
        this.setNextGraphicAttributes(Object.assign({}, attributes)), this.setFinalGraphicAttributes(Object.assign({}, attributes)));
    }
    updateGraphicItem() {
        var _a;
        if (!this.graphicItem) return;
        this.diffState === enums_1.DiffState.exit ? this.graphicItem.releaseStatus = "willRelease" : this.graphicItem.releaseStatus = void 0;
        const stateAnimation = null === (_a = this.mark.animate) || void 0 === _a ? void 0 : _a.getAnimationConfigs("state");
        stateAnimation && 0 !== stateAnimation.length && (this.graphicItem.stateAnimateConfig = stateAnimation[0].originConfig);
    }
    getGraphicItem() {
        return this.graphicItem;
    }
    removeGraphicItem() {
        var _a, _b;
        this.graphicItem && (null === (_b = null === (_a = this.graphicItem.animates) || void 0 === _a ? void 0 : _a.forEach) || void 0 === _b || _b.call(_a, (animate => animate.stop()))), 
        this.graphicItem && ((0, graphic_1.removeGraphicItem)(this.graphicItem), this.graphicItem[constants_1.BridgeElementKey] = null, 
        this.graphicItem = null);
    }
    resetGraphicItem() {
        this.graphicItem && (this.graphicItem = null);
    }
    getBounds() {
        var _a;
        return null === (_a = this.graphicItem) || void 0 === _a ? void 0 : _a.AABBBounds;
    }
    getStates() {
        return this.states;
    }
    updateData(groupKey, data, key) {
        var _a;
        this.mark.emit(enums_1.HOOK_EVENT.BEFORE_ELEMENT_UPDATE_DATA, {
            groupKey: groupKey,
            data: data,
            key: key
        }, this), this.data = data;
        const keyGetter = (0, util_1.parseField)(key);
        return this.items = data.map((datum => ({
            datum: datum,
            key: keyGetter(datum),
            view: this.mark.view,
            nextAttrs: {}
        }))), this.groupKey = groupKey, this.key = this.mark.isCollectionMark() ? groupKey : null === (_a = this.items) || void 0 === _a ? void 0 : _a[0].key, 
        this.mark.emit(enums_1.HOOK_EVENT.AFTER_ELEMENT_UPDATE_DATA, {
            groupKey: groupKey,
            data: data,
            key: key
        }, this), this.items;
    }
    state(markState, parameters) {
        var _a;
        const isCollectionMark = this.mark.isCollectionMark(), prevStateValues = this.states, newStateValues = (0, 
        vutils_1.array)((0, util_1.invokeFunctionType)(markState, parameters, this.getDatum(), this)), stateSort = null === (_a = this.mark.getSpec()) || void 0 === _a ? void 0 : _a.stateSort;
        stateSort && newStateValues.length && newStateValues.sort(stateSort);
        const isStateChanged = newStateValues.length !== prevStateValues.length || newStateValues.some(((newState, index) => newState !== prevStateValues[index]));
        this.states = newStateValues, !isCollectionMark && isStateChanged && this.diffState === enums_1.DiffState.unChange && (this.diffState = enums_1.DiffState.update);
    }
    encodeGraphic(attrs) {
        this.coordinateTransformEncode(this.items);
        const graphicAttributes = this.transformElementItems(this.items, this.mark.markType);
        attrs && Object.assign(graphicAttributes, attrs), this.graphicItem ? (this.graphicItem.clearStates(), 
        this.graphicItem.states = {}, this.graphicItem.stateProxy = null, constants_1.MARK_OVERLAP_HIDE_KEY in this.graphicItem.attribute && "visible" in graphicAttributes && delete this.graphicItem.attribute[constants_1.MARK_OVERLAP_HIDE_KEY], 
        this.applyGraphicAttributes(graphicAttributes)) : this.initGraphicItem(graphicAttributes), 
        this.diffState !== enums_1.DiffState.enter && this.diffState !== enums_1.DiffState.update || !this.states.length || this.useStates(this.states), 
        this.mark.markType === enums_1.GrammarMarkType.shape && (this.graphicItem.datum = this.items[0].datum), 
        this.items.forEach((item => {
            item.nextAttrs = {};
        })), this._setCustomizedShape();
    }
    _setCustomizedShape() {
        var _a;
        if (!this.graphicItem) return;
        const setCustomizedShape = null === (_a = this.mark.getSpec()) || void 0 === _a ? void 0 : _a.setCustomizedShape;
        setCustomizedShape && (this.graphicItem.pathProxy = attrs => setCustomizedShape(this.data, attrs, new vrender_core_1.CustomPath2D));
    }
    encodeItems(items, encoders, isReentered = !1, parameters) {
        const isCollectionMark = this.mark.isCollectionMark(), updateEncoder = encoders[enums_1.BuiltInEncodeNames.update], enterEncoder = encoders[enums_1.BuiltInEncodeNames.enter], exitEncoder = encoders[enums_1.BuiltInEncodeNames.exit], onlyFullEncodeFirst = this.mark.isLargeMode() || isCollectionMark && !this.mark.getSpec().enableSegments;
        this.diffState === enums_1.DiffState.enter ? (enterEncoder && (0, encode_1.invokeEncoderToItems)(this, items, enterEncoder, parameters, onlyFullEncodeFirst), 
        updateEncoder && (0, encode_1.invokeEncoderToItems)(this, items, updateEncoder, parameters, onlyFullEncodeFirst)) : this.diffState === enums_1.DiffState.update ? ((isCollectionMark && enterEncoder || isReentered) && (0, 
        encode_1.invokeEncoderToItems)(this, items, enterEncoder, parameters, onlyFullEncodeFirst), 
        updateEncoder && (0, encode_1.invokeEncoderToItems)(this, items, updateEncoder, parameters, onlyFullEncodeFirst)) : this.diffState === enums_1.DiffState.exit && exitEncoder && (isReentered && (0, 
        encode_1.invokeEncoderToItems)(this, items, enterEncoder, parameters, onlyFullEncodeFirst), 
        (0, encode_1.invokeEncoderToItems)(this, items, exitEncoder, parameters, onlyFullEncodeFirst));
    }
    coordinateTransformEncode(items) {
        if (!this.mark.coord || "arc" === this.mark.markType || !0 === this.mark.disableCoordinateTransform) return;
        const coord = this.mark.coord.output();
        items.forEach((item => {
            const nextAttrs = item.nextAttrs, convertedPoint = coord.convert(nextAttrs);
            Object.assign(nextAttrs, convertedPoint);
        }));
    }
    hasStateAnimation() {
        var _a;
        const stateAnimation = null === (_a = this.mark.animate) || void 0 === _a ? void 0 : _a.getAnimationConfigs("state");
        return stateAnimation && stateAnimation.length > 0;
    }
    clearStates(hasAnimation) {
        const stateAnimationEnable = (0, vutils_1.isBoolean)(hasAnimation) ? hasAnimation : this.hasStateAnimation();
        this.states = [], this.graphicItem && this.graphicItem.clearStates(stateAnimationEnable), 
        this.runtimeStatesEncoder && (this.runtimeStatesEncoder = {});
    }
    _updateRuntimeStates(state, attrs) {
        this.runtimeStatesEncoder || (this.runtimeStatesEncoder = {}), this.runtimeStatesEncoder[state] = attrs;
    }
    hasState(state) {
        return this.states && state && this.states.includes(state);
    }
    updateStates(states) {
        if (!this.graphicItem) return !1;
        let nextStates = this.states.slice();
        const encode = this.mark.getSpec().encode;
        let forceClearState = !1, hasUpdate = !1;
        return Object.keys(states).forEach((stateKey => {
            var _a;
            if (!stateKey) return;
            const stateValue = states[stateKey];
            if ((0, vutils_1.isObject)(stateValue) && !(0, vutils_1.isEqual)(stateValue, null === (_a = this.runtimeStatesEncoder) || void 0 === _a ? void 0 : _a[stateKey])) nextStates.includes(stateKey) ? forceClearState = !0 : nextStates.push(stateKey), 
            this._updateRuntimeStates(stateKey, stateValue), hasUpdate = !0; else if (stateValue) !nextStates.includes(stateKey) && (null == encode ? void 0 : encode[stateKey]) && (nextStates.push(stateKey), 
            hasUpdate = !0); else if (nextStates.length) {
                const newNextStates = nextStates.filter((state => state !== stateKey));
                newNextStates.length !== nextStates.length && (hasUpdate = !0, nextStates = newNextStates), 
                this.runtimeStatesEncoder && this.runtimeStatesEncoder[stateKey] && (this.runtimeStatesEncoder[stateKey] = null);
            }
        })), forceClearState && this.graphicItem.clearStates(), !!hasUpdate && (this.useStates(nextStates), 
        !0);
    }
    addState(state, attrs) {
        var _a;
        if (!this.graphicItem) return !1;
        if (attrs && (0, vutils_1.isString)(state) && !(0, vutils_1.isEqual)(attrs, null === (_a = this.runtimeStatesEncoder) || void 0 === _a ? void 0 : _a[state])) {
            const nextStates = this.states.slice();
            return nextStates.includes(state) ? this.graphicItem.clearStates() : nextStates.push(state), 
            this._updateRuntimeStates(state, attrs), this.useStates(nextStates), !0;
        }
        const encode = this.mark.getSpec().encode, nextStates = (0, vutils_1.array)(state).reduce(((nextStates, stateName) => (stateName && !nextStates.includes(stateName) && (null == encode ? void 0 : encode[stateName]) && nextStates.push(stateName), 
        nextStates)), this.states.slice());
        return nextStates.length !== this.states.length && (this.useStates(nextStates), 
        !0);
    }
    removeState(state) {
        if (!this.graphicItem) return !1;
        const states = (0, vutils_1.array)(state);
        if (!states.length) return !1;
        const nextStates = this.states.filter((state => !states.includes(state)));
        return nextStates.length !== this.states.length && (this.runtimeStatesEncoder && states.forEach((state => {
            this.runtimeStatesEncoder[state] = null;
        })), this.useStates(nextStates), !0);
    }
    useStates(states, hasAnimation) {
        var _a;
        if (!this.graphicItem) return !1;
        this.mark.emit(enums_1.HOOK_EVENT.BEFORE_ELEMENT_STATE, {
            states: states
        }, this);
        const stateSort = null === (_a = this.mark.getSpec()) || void 0 === _a ? void 0 : _a.stateSort;
        stateSort && states.sort(stateSort), this.states = states;
        const stateAnimationEnable = (0, vutils_1.isBoolean)(hasAnimation) ? hasAnimation : this.hasStateAnimation();
        return this.graphicItem.stateProxy = this.getStateAttrs, this.graphicItem.useStates(this.states, stateAnimationEnable), 
        this.mark.emit(enums_1.HOOK_EVENT.AFTER_ELEMENT_STATE, {
            states: states
        }, this), !0;
    }
    diffAttributes(graphicAttributes) {
        const diffResult = {}, finalGraphicAttributes = this.getFinalGraphicAttributes();
        for (const key in graphicAttributes) (0, vutils_1.has)(finalGraphicAttributes, key) && (0, 
        vutils_1.isEqual)(finalGraphicAttributes[key], graphicAttributes[key]) || (diffResult[key] = graphicAttributes[key]);
        return diffResult;
    }
    transformElementItems(items, markType, computePoints) {
        var _a, _b, _c, _d, _e;
        const item = items[0];
        if (!item.nextAttrs || 0 === Object.keys(item.nextAttrs).length) return {};
        let nextAttrs = item.nextAttrs;
        if ((0, helpers_1.isPointsMarkType)(markType) && items && items.length && (0, vutils_1.isNil)(null === (_a = item.nextAttrs) || void 0 === _a ? void 0 : _a.points) && (!0 === computePoints || (0, 
        helpers_1.isValidPointsChannel)(Object.keys(item.nextAttrs), this.mark.markType))) {
            const markSpec = this.mark.getSpec(), lastPoints = this.getGraphicAttribute("points", !1), lastSegments = this.getGraphicAttribute("segments", !1), enableSegments = markSpec.enableSegments, connectNullsEncoder = null === (_b = this.mark.getSpec().encode) || void 0 === _b ? void 0 : _b[enums_1.BuiltInEncodeNames.connectNulls], itemNextAttrs = items.map((item => item.nextAttrs)), isProgressive = this.mark.isProgressive();
            if (nextAttrs = (0, line_1.parseCollectionMarkAttributes)(nextAttrs), markType === enums_1.GrammarMarkType.line || markType === enums_1.GrammarMarkType.area) {
                const linePoints = (0, helpers_1.getLinePoints)(items, !0, lastPoints, markType === enums_1.GrammarMarkType.area);
                if (isProgressive) nextAttrs.segments = (null !== (_e = null === (_d = null === (_c = this.graphicItem) || void 0 === _c ? void 0 : _c.attribute) || void 0 === _d ? void 0 : _d.segments) && void 0 !== _e ? _e : []).concat([ {
                    points: linePoints
                } ]); else if (connectNullsEncoder) {
                    if (nextAttrs.segments = (0, line_1.getConnectLineSegmentConfigs)(itemNextAttrs, linePoints, this), 
                    nextAttrs.segments && nextAttrs.segments.some((seg => seg.isConnect))) {
                        const connectStyle = (0, encode_1.invokeEncoder)(connectNullsEncoder, this.getDatum(), this, this.mark.parameters());
                        connectStyle && nextAttrs.segments.forEach((seg => {
                            seg.isConnect && Object.assign(seg, connectStyle);
                        }));
                    }
                    nextAttrs.points = linePoints;
                } else if (enableSegments) {
                    const points = linePoints && 0 !== linePoints.length ? linePoints : (0, line_1.getLinePointsFromSegments)(lastSegments), segments = (0, 
                    line_1.getLineSegmentConfigs)(itemNextAttrs, points, this);
                    segments ? (nextAttrs.segments = segments, nextAttrs.points = null) : (nextAttrs.segments = null, 
                    nextAttrs.points = points), nextAttrs = (0, line_1.removeSegmentAttrs)(nextAttrs, this);
                } else nextAttrs.points = linePoints, nextAttrs.segments = null;
            } else markType === enums_1.GrammarMarkType.largeRects ? nextAttrs.points = (0, 
            helpers_1.getLargeRectsPoints)(items, !0, lastPoints) : markType === enums_1.GrammarMarkType.largeSymbols && (nextAttrs.points = (0, 
            helpers_1.getLargeSymbolsPoints)(items, !0, lastPoints));
        }
        return nextAttrs;
    }
    applyGraphicAttributes(graphicAttributes) {
        var _a, _b, _c;
        if (!(0, vutils_1.isEmpty)(graphicAttributes)) if (this.mark.needAnimate()) {
            const nextGraphicAttributes = this.diffAttributes(graphicAttributes), prevGraphicAttributes = null !== (_a = this.getPrevGraphicAttributes()) && void 0 !== _a ? _a : {}, finalGraphicAttributes = null !== (_b = this.getFinalGraphicAttributes()) && void 0 !== _b ? _b : {};
            Object.keys(nextGraphicAttributes).forEach((channel => {
                prevGraphicAttributes[channel] = this.getGraphicAttribute(channel), finalGraphicAttributes[channel] = nextGraphicAttributes[channel];
            })), this.setNextGraphicAttributes(nextGraphicAttributes), this.setPrevGraphicAttributes(prevGraphicAttributes), 
            this.setFinalGraphicAttributes(finalGraphicAttributes);
            const currentAnimators = null === (_c = this.mark.animate) || void 0 === _c ? void 0 : _c.getElementAnimators(this).filter((animator => {
                var _a;
                return !(null === (_a = animator.animationOptions.timeline.controlOptions) || void 0 === _a ? void 0 : _a.ignoreLoopFinalAttributes) || !animator.animationOptions.timeline.loop;
            })), animateGraphicAttributes = (currentAnimators || []).reduce(((attributes, animator) => Object.assign(attributes, animator.getEndAttributes())), {}), currentGraphicAttributes = Object.assign({}, animateGraphicAttributes, finalGraphicAttributes);
            this.graphicItem.setAttributes(currentGraphicAttributes);
        } else this.graphicItem.setAttributes(graphicAttributes);
    }
    getGraphicAttribute(channel, prev = !1) {
        var _a;
        if (!this.graphicItem) return;
        if (prev) {
            let value;
            const prevGraphicAttributes = this.getPrevGraphicAttributes();
            if (!(0, vutils_1.isNil)(value = (0, vutils_1.get)(prevGraphicAttributes, channel))) return value;
        }
        const trans = this.mark.getAttributeTransforms();
        let getKey = [ channel ];
        if (trans && trans.length) {
            const channelTransform = trans.find((entry => entry.storedAttrs && entry.channels.includes(channel)));
            channelTransform && (getKey = [ channelTransform.storedAttrs, channel ]);
        }
        return (0, vutils_1.get)(null === (_a = this.graphicItem) || void 0 === _a ? void 0 : _a.attribute, getKey);
    }
    setGraphicAttribute(channel, value, final = !0) {
        if (!this.graphicItem) return;
        const finalGraphicAttributes = this.getFinalGraphicAttributes(), prevGraphicAttributes = this.getPrevGraphicAttributes();
        final && finalGraphicAttributes && (finalGraphicAttributes[channel] = value), prevGraphicAttributes && !(0, 
        vutils_1.has)(prevGraphicAttributes, channel) && (prevGraphicAttributes[channel] = this.graphicItem.attribute[channel]), 
        this.graphicItem.setAttribute(channel, value);
    }
    setGraphicAttributes(attributes, final = !0) {
        if (!this.graphicItem) return;
        const finalGraphicAttributes = this.getFinalGraphicAttributes(), prevGraphicAttributes = this.getPrevGraphicAttributes();
        Object.keys(attributes).forEach((key => {
            finalGraphicAttributes && final && (finalGraphicAttributes[key] = attributes[key]), 
            prevGraphicAttributes && !(0, vutils_1.has)(prevGraphicAttributes, key) && (prevGraphicAttributes[key] = this.graphicItem.attribute[key]);
        })), this.graphicItem.setAttributes(attributes);
    }
    getFinalGraphicAttributes() {
        return this.graphicItem.finalAttrs;
    }
    setFinalGraphicAttributes(attributes) {
        this.graphicItem.finalAttrs = attributes;
    }
    getPrevGraphicAttributes() {
        return this.graphicItem.prevAttrs;
    }
    setPrevGraphicAttributes(attributes) {
        this.graphicItem.prevAttrs = attributes;
    }
    getNextGraphicAttributes() {
        return this.graphicItem.nextAttrs;
    }
    getFinalAnimationAttribute(channel) {
        var _a, _b;
        return null !== (_b = null === (_a = this.getFinalGraphicAttributes()) || void 0 === _a ? void 0 : _a[channel]) && void 0 !== _b ? _b : this.getGraphicAttribute(channel);
    }
    getFinalAnimationAttributes() {
        var _a;
        return null !== (_a = this.getFinalGraphicAttributes()) && void 0 !== _a ? _a : this.graphicItem.attribute;
    }
    setNextGraphicAttributes(attributes) {
        this.graphicItem.nextAttrs = attributes;
    }
    clearChangedGraphicAttributes() {
        this.graphicItem && (this.setPrevGraphicAttributes(null), this.setNextGraphicAttributes(null));
    }
    clearGraphicAttributes() {
        this.graphicItem && (this.graphicItem.prevAttrs && this.setPrevGraphicAttributes(null), 
        this.graphicItem.nextAttrs && this.setNextGraphicAttributes(null), this.graphicItem.finalAttrs && this.setFinalGraphicAttributes(null));
    }
    remove() {
        this.graphicItem && ((0, graphic_1.removeGraphicItem)(this.graphicItem), this.graphicItem = null);
    }
    release() {
        this.removeGraphicItem(), this.mark = null, this.data = null, this.items = null;
    }
    getItemAttribute(channel) {
        var _a, _b;
        if (null === (_a = this.items) || void 0 === _a ? void 0 : _a.length) return this.mark.isCollectionMark() ? (0, 
        vutils_1.isNil)(channel) ? this.items.map((item => item.nextAttrs)) : this.items.map((item => {
            var _a;
            return null === (_a = item.nextAttrs) || void 0 === _a ? void 0 : _a[channel];
        })) : (0, vutils_1.isNil)(channel) ? this.items[0].nextAttrs : null === (_b = this.items[0].nextAttrs) || void 0 === _b ? void 0 : _b[channel];
    }
    setItemAttributes(attributes) {
        var _a;
        (null === (_a = this.items) || void 0 === _a ? void 0 : _a.length) && (this.mark.isCollectionMark() ? (0, 
        vutils_1.isArray)(attributes) && this.items.forEach(((item, index) => {
            Object.assign(item.nextAttrs, attributes[index]);
        })) : Object.assign(this.items[0].nextAttrs, attributes));
    }
    getItem() {
        var _a, _b;
        return this.mark && this.mark.isCollectionMark() ? null !== (_a = this.items) && void 0 !== _a ? _a : [] : null === (_b = this.items) || void 0 === _b ? void 0 : _b[0];
    }
    getDatum() {
        var _a, _b;
        return this.mark && this.mark.isCollectionMark() ? null !== (_a = this.data) && void 0 !== _a ? _a : [] : null === (_b = this.data) || void 0 === _b ? void 0 : _b[0];
    }
}

exports.Element = Element;
//# sourceMappingURL=element.js.map