var __rest = this && this.__rest || function(s, e) {
    var t = {};
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
    if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
    }
    return t;
};

import { CustomPath2D } from "@visactor/vrender-core";

import { array, isBoolean, isEmpty, isNil, isNumber, isObject, isValid, merge, normalizePadding } from "@visactor/vutils";

import { AbstractComponent } from "../core/base";

import { isRichText, measureTextSize, richTextAttributeTransform } from "../util";

import { loadTagComponent } from "./register";

loadTagComponent();

export class Tag extends AbstractComponent {
    getBgRect() {
        return this._bgRect;
    }
    getTextShape() {
        return this._textShape;
    }
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : merge({}, Tag.defaultAttributes, attributes)), 
        this.name = "tag", this._tagStates = [], this._rectStates = [], this._symbolStates = [], 
        this._textStates = [];
    }
    render() {
        var _a, _b, _c;
        this.cacheStates();
        const {text: text = "", textStyle: textStyle = {}, shape: shape = {}, panel: panel = {}, space: space = 4, minWidth: minWidth, maxWidth: maxWidth, padding: padding = 4, visible: visible, state: state, type: type, textAlwaysCenter: textAlwaysCenter, containerTextAlign: containerTextAlign} = this.attribute, parsedPadding = normalizePadding(padding), group = this.createOrUpdateChild("tag-content", {
            x: 0,
            y: 0,
            zIndex: 1
        }, "group");
        let symbol, tagX = -parsedPadding[3], tagY = -parsedPadding[0], tagWidth = parsedPadding[1] + parsedPadding[3], tagHeight = parsedPadding[0] + parsedPadding[2], textX = 0, symbolPlaceWidth = 0;
        const {visible: shapeVisible} = shape, shapeStyle = __rest(shape, [ "visible" ]);
        if (isBoolean(shapeVisible)) {
            const size = (null == shapeStyle ? void 0 : shapeStyle.size) || 10, maxSize = isNumber(size) ? size : Math.max(size[0], size[1]);
            symbol = group.createOrUpdateChild("tag-shape", Object.assign(Object.assign({
                symbolType: "circle",
                size: size,
                strokeBoundsBuffer: 0
            }, shapeStyle), {
                visible: shapeVisible,
                x: maxSize / 2,
                y: maxSize / 2
            }), "symbol"), isEmpty(null == state ? void 0 : state.shape) || (symbol.states = state.shape), 
            shapeVisible && (symbolPlaceWidth = maxSize + space);
        }
        let textShape, textWidth, textHeight;
        tagWidth += symbolPlaceWidth, textX += symbolPlaceWidth;
        if (isRichText({
            text: text
        }) || "rich" === type) {
            const richTextAttrs = Object.assign(Object.assign(Object.assign({}, richTextAttributeTransform(Object.assign({
                type: type,
                text: text
            }, textStyle))), textStyle), {
                visible: isValid(text) && !1 !== visible,
                x: textX,
                y: 0
            });
            isNil(richTextAttrs.lineHeight) && (richTextAttrs.lineHeight = textStyle.fontSize), 
            textShape = group.createOrUpdateChild("tag-text", richTextAttrs, "richtext"), textWidth = textShape.AABBBounds.width(), 
            textHeight = textShape.AABBBounds.height();
        } else {
            const textAttrs = Object.assign(Object.assign({
                text: isObject(text) && "type" in text && "text" === text.type ? text.text : text,
                visible: isValid(text) && !1 !== visible,
                lineHeight: null == textStyle ? void 0 : textStyle.fontSize
            }, textStyle), {
                x: textX,
                y: 0
            });
            isNil(textAttrs.lineHeight) && (textAttrs.lineHeight = textStyle.fontSize), textShape = group.createOrUpdateChild("tag-text", textAttrs, "text");
            const textBounds = measureTextSize(textAttrs.text, textStyle, null === (_b = null === (_a = this.stage) || void 0 === _a ? void 0 : _a.getTheme()) || void 0 === _b ? void 0 : _b.text);
            textWidth = textBounds.width, textHeight = textBounds.height;
        }
        tagWidth += textWidth;
        const size = null !== (_c = shape.size) && void 0 !== _c ? _c : 10, maxSize = isNumber(size) ? size : Math.max(size[0], size[1]);
        tagHeight += Math.max(textHeight, shape.visible ? maxSize : 0);
        const {textAlign: textAlign, textBaseline: textBaseline} = textStyle;
        (isValid(minWidth) || isValid(maxWidth)) && (isValid(minWidth) && tagWidth < minWidth && (tagWidth = minWidth), 
        isValid(maxWidth) && tagWidth > maxWidth && (tagWidth = maxWidth, textShape.setAttribute("maxLineWidth", maxWidth - parsedPadding[1] - parsedPadding[2]))), 
        tagX = 0, tagY = 0;
        let flag = 0;
        "left" === textAlign || "start" === textAlign ? flag = 1 : "right" === textAlign || "end" === textAlign ? flag = -1 : "center" === textAlign && (flag = 0), 
        flag ? flag < 0 ? (tagX -= tagWidth, symbol && symbol.setAttribute("x", (symbol.attribute.x || 0) - textWidth), 
        group.setAttribute("x", -parsedPadding[1] - symbolPlaceWidth)) : flag > 0 && group.setAttribute("x", parsedPadding[3]) : (tagX -= tagWidth / 2, 
        symbol && symbol.setAttribute("x", (symbol.attribute.x || 0) - textWidth / 2), group.setAttribute("x", -symbolPlaceWidth / 2));
        const shouldRight = "right" === containerTextAlign || "end" === containerTextAlign, shouldLeft = "left" === containerTextAlign || "start" === containerTextAlign, updateTextAttrs = (textX, textAlign) => {
            "richtext" === textShape.type ? textShape.setAttributes({
                x: textX,
                textAlign: textAlign,
                textConfig: array(textShape.attribute.textConfig).map((t => Object.assign(Object.assign({}, t), {
                    textAlign: textAlign
                })))
            }) : textShape.setAttributes({
                x: textX,
                textAlign: textAlign
            });
        };
        if ((containerTextAlign ? "center" === containerTextAlign : textAlwaysCenter) && flag) {
            const containerWidth = tagWidth - parsedPadding[1] - parsedPadding[3], tsWidth = textWidth + symbolPlaceWidth, textX = 1 === flag ? (containerWidth - tsWidth) / 2 + symbolPlaceWidth + textWidth / 2 : parsedPadding[0] + symbolPlaceWidth - (tagWidth / 2 + tsWidth / 2 - symbolPlaceWidth) + textWidth / 2;
            if (updateTextAttrs(textX, "center"), symbol) {
                const symbolX = textX - textWidth / 2 - symbolPlaceWidth + maxSize / 2;
                symbol.setAttributes({
                    x: symbolX
                });
            }
        }
        if (shouldLeft && 1 !== flag) {
            const containerWidth = tagWidth - parsedPadding[1] - parsedPadding[3], offset = 0 === flag ? -containerWidth / 2 + symbolPlaceWidth / 2 : -tagWidth + parsedPadding[3] + parsedPadding[1] + symbolPlaceWidth;
            if (updateTextAttrs(offset + symbolPlaceWidth, "left"), symbol) {
                const symbolX = offset + maxSize / 2;
                symbol.setAttributes({
                    x: symbolX
                });
            }
        }
        if (shouldRight && -1 !== flag) {
            const containerWidth = tagWidth - parsedPadding[1] - parsedPadding[3], textX = 0 === flag ? containerWidth / 2 + symbolPlaceWidth / 2 : containerWidth;
            if (updateTextAttrs(textX, "right"), symbol) {
                const symbolX = textX - textWidth - symbolPlaceWidth + maxSize / 2;
                symbol.setAttributes({
                    x: symbolX
                });
            }
        }
        "middle" === textBaseline ? (tagY -= tagHeight / 2, symbol && symbol.setAttribute("y", 0)) : "bottom" === textBaseline ? (tagY -= tagHeight, 
        symbol && symbol.setAttribute("y", -textHeight / 2), group.setAttribute("y", -parsedPadding[2])) : "top" === textBaseline && (group.setAttribute("y", parsedPadding[0]), 
        symbol && symbol.setAttribute("y", textHeight / 2)), isEmpty(null == state ? void 0 : state.text) || (textShape.states = state.text);
        const {visible: bgVisible} = panel, backgroundStyle = __rest(panel, [ "visible" ]);
        if (visible && isBoolean(bgVisible)) {
            const bgRect = this.createOrUpdateChild("tag-panel", Object.assign(Object.assign({}, backgroundStyle), {
                visible: bgVisible && !!text,
                width: tagWidth,
                height: tagHeight,
                x: tagX,
                y: tagY
            }), "rect");
            if (isEmpty(null == state ? void 0 : state.panel) || (bgRect.states = state.panel), 
            backgroundStyle.customShape) {
                const customShape = backgroundStyle.customShape;
                bgRect.pathProxy = attrs => customShape(this, attrs, new CustomPath2D);
            }
            this._bgRect = bgRect;
        }
        this._textShape = textShape, this._symbol = symbol, this.resetStates();
    }
    initAttributes(params, options) {
        params = (null == options ? void 0 : options.skipDefault) ? params : merge({}, Tag.defaultAttributes, params), 
        super.initAttributes(params), this.render();
    }
    addState(stateName, keepCurrentStates, hasAnimation) {
        super.addState(stateName, keepCurrentStates, hasAnimation), this._textShape && this._textShape.addState(stateName, keepCurrentStates, hasAnimation), 
        this._bgRect && this._bgRect.addState(stateName, keepCurrentStates, hasAnimation), 
        this._symbol && this._symbol.addState(stateName, keepCurrentStates, hasAnimation);
    }
    removeState(stateName, hasAnimation) {
        super.removeState(stateName, hasAnimation), this._textShape && this._textShape.removeState(stateName, hasAnimation), 
        this._bgRect && this._bgRect.removeState(stateName, hasAnimation), this._symbol && this._symbol.removeState(stateName, hasAnimation);
    }
    cacheStates() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        this._tagStates = null !== (_b = null === (_a = this.currentStates) || void 0 === _a ? void 0 : _a.slice()) && void 0 !== _b ? _b : [], 
        this._rectStates = null !== (_e = null === (_d = null === (_c = this._bgRect) || void 0 === _c ? void 0 : _c.currentStates) || void 0 === _d ? void 0 : _d.slice()) && void 0 !== _e ? _e : [], 
        this._symbolStates = null !== (_h = null === (_g = null === (_f = this._symbol) || void 0 === _f ? void 0 : _f.currentStates) || void 0 === _g ? void 0 : _g.slice()) && void 0 !== _h ? _h : [], 
        this._textStates = null !== (_l = null === (_k = null === (_j = this._textShape) || void 0 === _j ? void 0 : _j.currentStates) || void 0 === _k ? void 0 : _k.slice()) && void 0 !== _l ? _l : [], 
        this.clearStates(), null === (_m = this._bgRect) || void 0 === _m || _m.clearStates(), 
        null === (_o = this._symbol) || void 0 === _o || _o.clearStates(), null === (_p = this._textShape) || void 0 === _p || _p.clearStates();
    }
    resetStates() {
        var _a, _b, _c;
        this._tagStates.length && this.useStates(this._tagStates), this._rectStates.length && (null === (_a = this._bgRect) || void 0 === _a || _a.useStates(this._rectStates)), 
        this._symbolStates.length && (null === (_b = this._symbol) || void 0 === _b || _b.useStates(this._symbolStates)), 
        this._textStates.length && (null === (_c = this._textShape) || void 0 === _c || _c.useStates(this._textStates));
    }
}

Tag.defaultAttributes = {
    visible: !0,
    textStyle: {
        fontSize: 12,
        fill: "#000",
        textAlign: "left",
        textBaseline: "top"
    },
    space: 4,
    padding: 4,
    shape: {
        fill: "#000"
    }
};
//# sourceMappingURL=tag.js.map
