var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { graphicCreator, AttributeUpdateType, IContainPointMode, CustomPath2D } from "@visactor/vrender-core";

import { isFunction, isEmpty, isValid, isString, merge, isRectIntersect, isNil, isArray, isObject, pointInRect } from "@visactor/vutils";

import { AbstractComponent } from "../core/base";

import { labelSmartInvert, contrastAccessibilityChecker, smartInvertStrategy } from "../util/label-smartInvert";

import { createTextGraphicByType, getMarksByName, getNoneGroupMarksByName, traverseGroup } from "../util";

import { StateValue } from "../constant";

import { bitmapTool, boundToRange, canPlace, clampText, place } from "./overlap";

import { DefaultLabelAnimation, getAnimationAttributes, updateAnimation } from "./animate/animate";

import { connectLineBetweenBounds, getPointsOfLineArea } from "./util";

import { loadLabelComponent } from "./register";

import { shiftY } from "./overlap/shiftY";

loadLabelComponent();

export class LabelBase extends AbstractComponent {
    setBitmap(bitmap) {
        this._bitmap = bitmap;
    }
    setBitmapTool(bmpTool) {
        this._bmpTool = bmpTool;
    }
    constructor(attributes, options) {
        const {data: data} = attributes, restAttributes = __rest(attributes, [ "data" ]);
        super((null == options ? void 0 : options.skipDefault) ? attributes : Object.assign({
            data: data
        }, merge({}, LabelBase.defaultAttributes, restAttributes))), this.name = "label", 
        this._onHover = e => {
            const target = e.target;
            target === this._lastHover || isEmpty(target.states) || (target.addState(StateValue.hover, !0), 
            traverseGroup(this, (node => {
                node === target || isEmpty(node.states) || node.addState(StateValue.hoverReverse, !0);
            })), this._lastHover = target);
        }, this._onUnHover = e => {
            this._lastHover && (traverseGroup(this, (node => {
                isEmpty(node.states) || (node.removeState(StateValue.hoverReverse), node.removeState(StateValue.hover));
            })), this._lastHover = null);
        }, this._onClick = e => {
            const target = e.target;
            if (this._lastSelect === target && target.hasState("selected")) return this._lastSelect = null, 
            void traverseGroup(this, (node => {
                isEmpty(node.states) || (node.removeState(StateValue.selectedReverse), node.removeState(StateValue.selected));
            }));
            isEmpty(target.states) || (target.addState(StateValue.selected, !0), traverseGroup(this, (node => {
                node === target || isEmpty(node.states) || node.addState(StateValue.selectedReverse, !0);
            })), this._lastSelect = target);
        }, this._handleRelatedGraphicSetState = e => {
            var _a, _b, _c, _d, _e;
            if ((null === (_a = e.detail) || void 0 === _a ? void 0 : _a.type) === AttributeUpdateType.STATE || (null === (_b = e.detail) || void 0 === _b ? void 0 : _b.type) === AttributeUpdateType.ANIMATE_UPDATE && (null === (_c = e.detail.animationState) || void 0 === _c ? void 0 : _c.isFirstFrameOfStep)) {
                const currentStates = null !== (_e = null === (_d = e.target) || void 0 === _d ? void 0 : _d.currentStates) && void 0 !== _e ? _e : [], labels = this._isCollectionBase ? [ ...this._graphicToText.values() ] : [ this._graphicToText.get(e.target) ];
                this.updateStatesOfLabels(labels, currentStates);
            }
        };
    }
    labeling(textBounds, graphicBounds, position, offset) {}
    _getLabelLinePoints(text, baseMark) {
        return connectLineBetweenBounds(text.AABBBounds, null == baseMark ? void 0 : baseMark.AABBBounds);
    }
    _createLabelLine(text, baseMark) {
        const points = this._getLabelLinePoints(text, baseMark);
        if (points) {
            const lineGraphic = graphicCreator.line({
                points: points
            }), {line: line = {}} = text.attribute;
            if (line.customShape) {
                const customShape = line.customShape;
                lineGraphic.pathProxy = attrs => customShape({
                    text: text,
                    baseMark: baseMark
                }, attrs, new CustomPath2D);
            }
            return baseMark && baseMark.attribute.fill && lineGraphic.setAttribute("stroke", baseMark.attribute.fill), 
            this.attribute.line && !isEmpty(this.attribute.line.style) && lineGraphic.setAttributes(this.attribute.line.style), 
            this._setStatesOfLabelLine(lineGraphic), lineGraphic;
        }
    }
    render() {
        if (this._prepare(), isNil(this._idToGraphic) || this._isCollectionBase && isNil(this._idToPoint)) return;
        const {overlap: overlap, smartInvert: smartInvert, dataFilter: dataFilter, customLayoutFunc: customLayoutFunc, customOverlapFunc: customOverlapFunc} = this.attribute;
        let data = this.attribute.data;
        if (isFunction(dataFilter) && (data = dataFilter(data)), data && data.length) {
            const seenIds = new Set;
            data = data.filter((d => !seenIds.has(d.id) && seenIds.add(d.id)));
        }
        let labels = this._initText(data);
        labels = isFunction(customLayoutFunc) ? customLayoutFunc(data, labels, this.getRelatedGraphic.bind(this), this._isCollectionBase ? d => this._idToPoint.get(d.id) : null, this) : this._layout(labels), 
        isFunction(customOverlapFunc) ? labels = customOverlapFunc(labels, this.getRelatedGraphic.bind(this), this._isCollectionBase ? d => this._idToPoint.get(d.id) : null, this) : !1 !== overlap && (labels = this._overlapping(labels)), 
        isFunction(this.attribute.onAfterOverlapping) && this.attribute.onAfterOverlapping(labels, this.getRelatedGraphic.bind(this), this._isCollectionBase ? d => this._idToPoint.get(d.id) : null, this), 
        labels && labels.length && labels.forEach((label => {
            this._bindEvent(label), this._setStatesOfText(label);
        })), !1 !== smartInvert && this._smartInvert(labels), this._renderLabels(labels);
    }
    _bindEvent(target) {
        if (this.attribute.disableTriggerEvent) return;
        if (!target) return;
        const {hover: hover, select: select} = this.attribute;
        hover && (target.addEventListener("pointermove", this._onHover), target.addEventListener("pointerout", this._onUnHover)), 
        select && target.addEventListener("pointerdown", this._onClick);
    }
    _setStatesOfText(target) {
        if (!target) return;
        const state = this.attribute.state;
        state && !isEmpty(state) && (target.states = state);
    }
    _setStatesOfLabelLine(target) {
        if (!target) return;
        const state = this.attribute.labelLineState;
        state && !isEmpty(state) && (target.states = state);
    }
    _createLabelText(attributes) {
        var _a, _b;
        const textAttrs = Object.assign(Object.assign({}, null === (_b = null === (_a = this.stage) || void 0 === _a ? void 0 : _a.getTheme()) || void 0 === _b ? void 0 : _b.text), attributes);
        return createTextGraphicByType(textAttrs, "textType");
    }
    _prepare() {
        var _a, _b;
        const currentBaseMarks = [];
        let baseMarks;
        if (baseMarks = isFunction(this.attribute.getBaseMarks) ? this.attribute.getBaseMarks() : getMarksByName(this.getRootNode(), this.attribute.baseMarkGroupName), 
        baseMarks.forEach((mark => {
            "willRelease" !== mark.releaseStatus && currentBaseMarks.push(mark);
        })), null === (_a = this._idToGraphic) || void 0 === _a || _a.clear(), null === (_b = this._idToPoint) || void 0 === _b || _b.clear(), 
        this._baseMarks = currentBaseMarks, this._isCollectionBase = "line-data" === this.attribute.type, 
        !currentBaseMarks || 0 === currentBaseMarks.length) return;
        const {data: data} = this.attribute;
        if (data && 0 !== data.length) {
            if (this._idToGraphic || (this._idToGraphic = new Map), this._isCollectionBase) {
                this._idToPoint || (this._idToPoint = new Map);
                let cur = 0;
                for (let i = 0; i < currentBaseMarks.length; i++) {
                    const baseMark = currentBaseMarks[i], points = getPointsOfLineArea(baseMark);
                    if (points && points.length) for (let j = 0; j < points.length; j++) {
                        const textData = data[cur];
                        textData && points[j] && (isValid(textData.id) || (textData.id = `vrender-component-${this.name}-${cur}`), 
                        this._idToPoint.set(textData.id, points[j]), this._idToGraphic.set(textData.id, baseMark)), 
                        cur++;
                    }
                }
            } else for (let i = 0; i < currentBaseMarks.length; i++) {
                const textData = data[i], baseMark = currentBaseMarks[i];
                textData && baseMark && (isValid(textData.id) || (textData.id = `vrender-component-${this.name}-${i}`), 
                this._idToGraphic.set(textData.id, baseMark));
            }
            if (!1 !== this.attribute.animation) {
                const {animation: animation, animationEnter: animationEnter, animationExit: animationExit, animationUpdate: animationUpdate} = this.attribute, animationCfg = isObject(animation) ? animation : {};
                this._animationConfig = {
                    enter: !1 !== animationEnter && merge({}, DefaultLabelAnimation, animationCfg, null != animationEnter ? animationEnter : {}),
                    exit: !1 !== animationExit && merge({}, DefaultLabelAnimation, animationCfg, null != animationExit ? animationExit : {}),
                    update: !1 !== animationUpdate && (isArray(animationUpdate) ? animationUpdate : merge({}, DefaultLabelAnimation, animationCfg, null != animationUpdate ? animationUpdate : {}))
                };
            } else this._animationConfig = {
                enter: !1,
                exit: !1,
                update: !1
            };
        }
    }
    getRelatedGraphic(item) {
        return this._idToGraphic.get(item.id);
    }
    _initText(data = []) {
        const {textStyle: textStyle = {}} = this.attribute, labels = [];
        for (let i = 0; i < data.length; i++) {
            const textData = data[i], baseMark = this.getRelatedGraphic(textData);
            if (!baseMark) continue;
            const labelAttribute = Object.assign(Object.assign({
                fill: this._isCollectionBase ? isArray(baseMark.attribute.stroke) ? baseMark.attribute.stroke.find((entry => !!entry && !0 !== entry)) : baseMark.attribute.stroke : baseMark.attribute.fill
            }, textStyle), textData), text = this._createLabelText(labelAttribute);
            labels.push(text);
        }
        return labels;
    }
    _layout(texts) {
        const {position: position, offset: offset} = this.attribute;
        for (let i = 0; i < texts.length; i++) {
            const text = texts[i];
            if (!text) return;
            const textData = text.attribute, baseMark = this.getRelatedGraphic(textData);
            if (!baseMark) continue;
            text.attachedThemeGraphic = this;
            const textBounds = this.getGraphicBounds(text);
            text.attachedThemeGraphic = null;
            const actualPosition = isFunction(position) ? position(textData) : position, graphicBounds = this._isCollectionBase ? this.getGraphicBounds(null, this._idToPoint.get(textData.id), actualPosition) : this.getGraphicBounds(baseMark, {
                x: textData.x,
                y: textData.y
            }, actualPosition), textLocation = this.labeling(textBounds, graphicBounds, actualPosition, offset);
            textLocation && text.setAttributes(textLocation);
        }
        return texts;
    }
    _overlapping(labels) {
        var _a, _b, _c;
        if (0 === labels.length) return [];
        const option = isObject(this.attribute.overlap) ? this.attribute.overlap : {}, baseMarkGroup = this.getBaseMarkGroup(), size = null !== (_a = option.size) && void 0 !== _a ? _a : {
            width: null !== (_b = null == baseMarkGroup ? void 0 : baseMarkGroup.AABBBounds.width()) && void 0 !== _b ? _b : 0,
            height: null !== (_c = null == baseMarkGroup ? void 0 : baseMarkGroup.AABBBounds.height()) && void 0 !== _c ? _c : 0
        };
        if (0 === size.width || 0 === size.height) return labels;
        const {strategy: strategy, priority: priority} = option, bmpTool = this._bmpTool || bitmapTool(size.width, size.height), bitmap = this._bitmap || bmpTool.bitmap();
        return priority && (labels = labels.sort(((a, b) => priority(b.attribute.data) - priority(a.attribute.data)))), 
        "shiftY" === (null == strategy ? void 0 : strategy.type) ? this._overlapGlobal(labels, option, bmpTool, bitmap) : this._overlapByStrategy(labels, option, bmpTool, bitmap);
    }
    _overlapGlobal(labels, option, bmpTool, bitmap) {
        let result = labels.filter((label => label.attribute.visible && 0 !== label.attribute.opacity && this.isMarkInsideRect(this.getRelatedGraphic(label.attribute), bmpTool)));
        const {clampForce: clampForce = !0, hideOnHit: hideOnHit = !0, overlapPadding: overlapPadding, strategy: strategy} = option;
        if (clampForce) for (let i = 0; i < result.length; i++) {
            const text = labels[i], {dx: dx = 0, dy: dy = 0} = clampText(text, bmpTool.width, bmpTool.height, bmpTool.padding);
            0 === dx && 0 === dy || (text.setAttributes({
                x: text.attribute.x + dx,
                y: text.attribute.y + dy
            }), text._isClamped = !0);
        }
        result = shiftY(result, Object.assign(Object.assign({
            maxY: bmpTool.height
        }, strategy), {
            labelling: text => {
                const baseMark = this.getRelatedGraphic(text.attribute), graphicBound = this._isCollectionBase ? this.getGraphicBounds(null, this._idToPoint.get(text.attribute.id)) : this.getGraphicBounds(baseMark, text);
                return this.labeling(text.AABBBounds, graphicBound, "bottom", this.attribute.offset);
            }
        }));
        for (let i = 0; i < result.length; i++) {
            const text = result[i], bounds = text.AABBBounds, range = boundToRange(bmpTool, bounds, !0);
            if (canPlace(bmpTool, bitmap, bounds, clampForce, overlapPadding)) bitmap.setRange(range); else {
                if (clampForce) {
                    if (this._processClampForce(text, bmpTool, bitmap, overlapPadding)) continue;
                }
                hideOnHit ? text.setAttributes({
                    visible: !1
                }) : bitmap.setRange(range);
            }
        }
        return result;
    }
    _processClampForce(text, bmpTool, bitmap, overlapPadding = 0) {
        const {dy: dy = 0, dx: dx = 0} = clampText(text, bmpTool.width, bmpTool.height, bmpTool.padding);
        if (0 === dx && 0 === dy) {
            if (canPlace(bmpTool, bitmap, text.AABBBounds, !1, overlapPadding)) return bitmap.setRange(boundToRange(bmpTool, text.AABBBounds, !0)), 
            !0;
        } else if (canPlace(bmpTool, bitmap, {
            x1: text.AABBBounds.x1 + dx,
            x2: text.AABBBounds.x2 + dx,
            y1: text.AABBBounds.y1 + dy,
            y2: text.AABBBounds.y2 + dy
        })) return text.setAttributes({
            x: text.attribute.x + dx,
            y: text.attribute.y + dy
        }), bitmap.setRange(boundToRange(bmpTool, text.AABBBounds, !0)), !0;
        return !1;
    }
    _overlapByStrategy(labels, option, bmpTool, bitmap) {
        var _a;
        const {avoidBaseMark: avoidBaseMark, strategy: strategy = [], hideOnHit: hideOnHit = !0, clampForce: clampForce = !0, avoidMarks: avoidMarks = [], overlapPadding: overlapPadding} = option, result = [], checkBounds = strategy.some((s => "bound" === s.type));
        avoidBaseMark && (null === (_a = this._baseMarks) || void 0 === _a || _a.forEach((mark => {
            mark.AABBBounds && bitmap.setRange(boundToRange(bmpTool, mark.AABBBounds, !0));
        }))), avoidMarks.length > 0 && avoidMarks.forEach((avoid => {
            isString(avoid) ? getNoneGroupMarksByName(this.getRootNode(), avoid).forEach((avoidMark => {
                avoidMark.AABBBounds && bitmap.setRange(boundToRange(bmpTool, avoidMark.AABBBounds, !0));
            })) : avoid.AABBBounds && bitmap.setRange(boundToRange(bmpTool, avoid.AABBBounds, !0));
        }));
        for (let i = 0; i < labels.length; i++) {
            if (!1 === labels[i].attribute.visible) continue;
            const text = labels[i], baseMark = this.getRelatedGraphic(text.attribute);
            if (text.update(), !this.isMarkInsideRect(baseMark, bmpTool)) continue;
            if (canPlace(bmpTool, bitmap, text.AABBBounds, clampForce, overlapPadding)) {
                if (!checkBounds) {
                    bitmap.setRange(boundToRange(bmpTool, text.AABBBounds, !0)), result.push(text);
                    continue;
                }
                if (checkBounds && baseMark && baseMark.AABBBounds && this._canPlaceInside(text.AABBBounds, baseMark.AABBBounds)) {
                    bitmap.setRange(boundToRange(bmpTool, text.AABBBounds, !0)), result.push(text);
                    continue;
                }
            }
            let hasPlace = !1;
            for (let j = 0; j < strategy.length; j++) if (hasPlace = place(bmpTool, bitmap, strategy[j], this.attribute, text, this._isCollectionBase ? this.getGraphicBounds(null, this._idToPoint.get(labels[i].attribute.id)) : this.getGraphicBounds(baseMark, labels[i].attribute), this.labeling), 
            !1 !== hasPlace) {
                text.setAttributes({
                    x: hasPlace.x,
                    y: hasPlace.y
                }), result.push(text);
                break;
            }
            if (!hasPlace && clampForce) {
                if (this._processClampForce(text, bmpTool, bitmap, overlapPadding)) {
                    result.push(text);
                    continue;
                }
            }
            !hasPlace && !hideOnHit && result.push(text);
        }
        return result;
    }
    isMarkInsideRect(baseMark, bmpTool) {
        const {left: left, right: right, top: top, bottom: bottom} = bmpTool.padding, rect = {
            x1: -left,
            x2: bmpTool.width + right,
            y1: -top,
            y2: bmpTool.height + bottom
        }, bounds = baseMark.AABBBounds;
        if (0 !== bounds.width() && 0 !== bounds.height()) return isRectIntersect(baseMark.AABBBounds, rect, !0);
        const {attribute: attribute} = baseMark;
        if ("rect" === baseMark.type) {
            const {x: x, x1: x1, y: y, y1: y1} = attribute;
            return pointInRect({
                x: null != x ? x : x1,
                y: null != y ? y : y1
            }, rect, !0);
        }
        return "x" in attribute && "y" in attribute && pointInRect({
            x: attribute.x,
            y: attribute.y
        }, rect, !0);
    }
    getBaseMarkGroup() {
        const {baseMarkGroupName: baseMarkGroupName} = this.attribute;
        if (baseMarkGroupName) return this.getRootNode().find((node => node.name === baseMarkGroupName), !0);
    }
    getGraphicBounds(graphic, point = {}, position) {
        if (graphic) {
            if (!1 !== graphic.attribute.visible) return graphic.AABBBounds;
            const {x: x, y: y} = graphic.attribute;
            return {
                x1: x,
                x2: x,
                y1: y,
                y2: y
            };
        }
        if (point && position && "inside-middle" === position) {
            const {x: x, y: y, x1: x1 = x, y1: y1 = y} = point;
            return {
                x1: (x + x1) / 2,
                x2: (x + x1) / 2,
                y1: (y + y1) / 2,
                y2: (y + y1) / 2
            };
        }
        const {x: x, y: y} = point;
        return {
            x1: x,
            x2: x,
            y1: y,
            y2: y
        };
    }
    _renderLabels(labels) {
        var _a;
        const {syncState: syncState} = this.attribute, currentTextMap = new Map, prevTextMap = this._graphicToText || new Map, texts = [], labelLines = [], {visible: showLabelLine} = null !== (_a = this.attribute.line) && void 0 !== _a ? _a : {};
        labels && labels.forEach(((text, index) => {
            var _a;
            const relatedGraphic = this.getRelatedGraphic(text.attribute), textKey = this._isCollectionBase ? text.attribute.id : relatedGraphic, state = (null == prevTextMap ? void 0 : prevTextMap.get(textKey)) ? "update" : "enter";
            let labelLine;
            if (showLabelLine && (labelLine = this._createLabelLine(text, relatedGraphic)), 
            syncState && this.updateStatesOfLabels([ labelLine ? {
                text: text,
                labelLine: labelLine
            } : {
                text: text
            } ], null !== (_a = relatedGraphic.currentStates) && void 0 !== _a ? _a : []), "enter" === state) texts.push(text), 
            currentTextMap.set(textKey, labelLine ? {
                text: text,
                labelLine: labelLine
            } : {
                text: text
            }), this._addLabel({
                text: text,
                labelLine: labelLine
            }, texts, labelLines, index); else if ("update" === state) {
                const prevLabel = prevTextMap.get(textKey);
                prevTextMap.delete(textKey), currentTextMap.set(textKey, prevLabel), this._updateLabel(prevLabel, {
                    text: text,
                    labelLine: labelLine
                });
            }
        })), this._removeLabel(prevTextMap), this._graphicToText = currentTextMap;
    }
    _addLabel(label, texts, labelLines, index) {
        const {text: text, labelLine: labelLine} = label, relatedGraphic = this.getRelatedGraphic(text.attribute);
        if (this._syncStateWithRelatedGraphic(relatedGraphic), !1 !== this._enableAnimation && !1 !== this._animationConfig.enter) {
            if (relatedGraphic) {
                const {from: from, to: to} = getAnimationAttributes(text.attribute, "fadeIn");
                text && this.add(text), labelLine && (labelLines.push(labelLine), this.add(labelLine)), 
                this._animationConfig.enter.duration > 0 && relatedGraphic.once("animate-bind", (a => {
                    text.setAttributes(from), labelLine && labelLine.setAttributes(from);
                    const listener = this._afterRelatedGraphicAttributeUpdate(text, texts, labelLine, labelLines, index, relatedGraphic, to, this._animationConfig.enter);
                    relatedGraphic.on("afterAttributeUpdate", listener);
                }));
            }
        } else text && this.add(text), labelLine && this.add(labelLine);
    }
    _updateLabel(prevLabel, currentLabel) {
        const {text: prevText, labelLine: prevLabelLine} = prevLabel, {text: curText, labelLine: curLabelLine} = currentLabel;
        if (!1 !== this._enableAnimation && !1 !== this._animationConfig.update) {
            const {duration: duration, easing: easing} = this._animationConfig.update;
            updateAnimation(prevText, curText, this._animationConfig.update), prevLabelLine && curLabelLine && prevLabel.labelLine.animate().to(curLabelLine.attribute, duration, easing);
        } else prevLabel.text.setAttributes(curText.attribute), prevLabelLine && curLabelLine && prevLabel.labelLine.setAttributes(curLabelLine.attribute);
    }
    _removeLabel(textMap) {
        const removeLabelAndLine = label => {
            this.removeChild(label.text), label.labelLine && this.removeChild(label.labelLine);
        };
        if (!1 !== this._enableAnimation && !1 !== this._animationConfig.exit) {
            const {duration: duration, easing: easing} = this._animationConfig.exit;
            textMap.forEach((label => {
                var _a;
                null === (_a = label.text) || void 0 === _a || _a.animate().to(getAnimationAttributes(label.text.attribute, "fadeOut").to, duration, easing).onEnd((() => {
                    removeLabelAndLine(label);
                }));
            }));
        } else textMap.forEach((label => {
            removeLabelAndLine(label);
        }));
    }
    updateStatesOfLabels(labels, currentStates) {
        labels.forEach((label => {
            label && (label.text && label.text.useStates(currentStates), label.labelLine && label.labelLine.useStates(currentStates));
        }));
    }
    _syncStateWithRelatedGraphic(relatedGraphic) {
        this.attribute.syncState && relatedGraphic && relatedGraphic.on("afterAttributeUpdate", this._handleRelatedGraphicSetState);
    }
    _afterRelatedGraphicAttributeUpdate(text, texts, labelLine, labelLines, index, relatedGraphic, to, {mode: mode, duration: duration, easing: easing, delay: delay}) {
        const listener = event => {
            var _a, _b, _c;
            const {detail: detail} = event;
            if (!detail) return {};
            const step = null === (_a = detail.animationState) || void 0 === _a ? void 0 : _a.step;
            if (!(detail.type === AttributeUpdateType.ANIMATE_UPDATE && step && !("wait" === step.type && null == (null === (_b = step.prev) || void 0 === _b ? void 0 : _b.type)))) return {};
            if (detail.type === AttributeUpdateType.ANIMATE_END) return text.setAttributes(to), 
            void (labelLine && labelLine.setAttributes(to));
            const onStart = () => {
                relatedGraphic && (relatedGraphic.onAnimateBind = void 0, relatedGraphic.removeEventListener("afterAttributeUpdate", listener));
            };
            switch (mode) {
              case "after":
                detail.animationState.end && (text.animate({
                    onStart: onStart
                }).wait(delay).to(to, duration, easing), labelLine && labelLine.animate().wait(delay).to(to, duration, easing));
                break;

              case "after-all":
                index === texts.length - 1 && detail.animationState.end && (texts.forEach((t => {
                    t.animate({
                        onStart: onStart
                    }).wait(delay).to(to, duration, easing);
                })), labelLines.forEach((t => {
                    t.animate().wait(delay).to(to, duration, easing);
                })));
                break;

              default:
                if (this._isCollectionBase) {
                    const point = this._idToPoint.get(text.attribute.id);
                    !point || text.animates && text.animates.has("label-animate") || !relatedGraphic.containsPoint(point.x, point.y, IContainPointMode.LOCAL, null === (_c = this.stage) || void 0 === _c ? void 0 : _c.getPickerService()) || (text.animate({
                        onStart: onStart
                    }).wait(delay).to(to, duration, easing), labelLine && labelLine.animate().wait(delay).to(to, duration, easing));
                } else detail.animationState.isFirstFrameOfStep && (text.animate({
                    onStart: onStart
                }).wait(delay).to(to, duration, easing), labelLine && labelLine.animate().wait(delay).to(to, duration, easing));
            }
        };
        return listener;
    }
    _smartInvert(labels) {
        var _a, _b, _c, _d, _e, _f, _g;
        const option = isObject(this.attribute.smartInvert) ? this.attribute.smartInvert : {}, {textType: textType, contrastRatiosThreshold: contrastRatiosThreshold, alternativeColors: alternativeColors, mode: mode, interactInvertType: interactInvertType} = option, fillStrategy = null !== (_a = option.fillStrategy) && void 0 !== _a ? _a : "invertBase", strokeStrategy = null !== (_b = option.strokeStrategy) && void 0 !== _b ? _b : "base", brightColor = null !== (_c = option.brightColor) && void 0 !== _c ? _c : "#ffffff", darkColor = null !== (_d = option.darkColor) && void 0 !== _d ? _d : "#000000", outsideEnable = null !== (_e = option.outsideEnable) && void 0 !== _e && _e;
        if ("null" !== fillStrategy || "null" !== strokeStrategy) for (let i = 0; i < labels.length; i++) {
            const label = labels[i];
            if (!label) continue;
            const baseMark = this.getRelatedGraphic(label.attribute);
            let backgroundColor = baseMark.attribute.fill, foregroundColor = label.attribute.fill;
            if (isObject(backgroundColor) && backgroundColor.gradient) {
                const firstStopColor = null === (_g = null === (_f = backgroundColor.stops) || void 0 === _f ? void 0 : _f[0]) || void 0 === _g ? void 0 : _g.color;
                firstStopColor && (backgroundColor = firstStopColor, foregroundColor = firstStopColor);
            }
            const invertColor = labelSmartInvert(foregroundColor, backgroundColor, textType, contrastRatiosThreshold, alternativeColors, mode), similarColor = contrastAccessibilityChecker(invertColor, brightColor) ? brightColor : darkColor, isInside = this._canPlaceInside(label.AABBBounds, baseMark.AABBBounds), isIntersect = !isInside && label.AABBBounds && baseMark.AABBBounds && baseMark.AABBBounds.intersects(label.AABBBounds);
            if (isInside || outsideEnable || isIntersect && "inside" === interactInvertType) {
                const fill = smartInvertStrategy(fillStrategy, backgroundColor, invertColor, similarColor);
                if (fill && label.setAttributes({
                    fill: fill
                }), 0 === label.attribute.lineWidth || 0 === label.attribute.strokeOpacity) continue;
                const stroke = smartInvertStrategy(strokeStrategy, backgroundColor, invertColor, similarColor);
                stroke && label.setAttributes({
                    stroke: stroke
                });
            } else if (isIntersect && "none" !== interactInvertType) {
                if (0 === label.attribute.lineWidth || 0 === label.attribute.strokeOpacity) continue;
                if (label.attribute.stroke) {
                    label.setAttributes({
                        fill: labelSmartInvert(label.attribute.fill, label.attribute.stroke, textType, contrastRatiosThreshold, alternativeColors, mode)
                    });
                    continue;
                }
                const fill = smartInvertStrategy(fillStrategy, backgroundColor, invertColor, similarColor);
                fill && label.setAttributes({
                    fill: fill
                });
                const stroke = smartInvertStrategy(strokeStrategy, backgroundColor, invertColor, similarColor);
                stroke && label.setAttributes({
                    stroke: stroke
                });
            }
        }
    }
    _canPlaceInside(textBound, shapeBound) {
        return !(!textBound || !shapeBound) && shapeBound.encloses(textBound);
    }
    setLocation(point) {
        this.translateTo(point.x, point.y);
    }
    disableAnimation() {
        this._enableAnimation = !1;
    }
    enableAnimation() {
        this._enableAnimation = !0;
    }
}

LabelBase.defaultAttributes = {
    textStyle: {
        fontSize: 12,
        textAlign: "center",
        textBaseline: "middle",
        boundsPadding: [ -2, -1, -2, -1 ]
    },
    offset: 0,
    pickable: !1
};
//# sourceMappingURL=base.js.map