"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.alignTextInLine = exports.createTextGraphicByType = exports.reactAttributeTransform = exports.htmlAttributeTransform = exports.richTextAttributeTransform = exports.getTextType = exports.isRichText = exports.measureTextSize = exports.initTextMeasure = void 0;

const vrender_core_1 = require("@visactor/vrender-core"), vutils_1 = require("@visactor/vutils"), constant_1 = require("../constant"), initTextMeasure = (textSpec, option, useNaiveCanvas, defaultFontParams) => new vutils_1.TextMeasure(Object.assign({
    defaultFontParams: Object.assign({
        fontFamily: constant_1.DEFAULT_TEXT_FONT_FAMILY,
        fontSize: constant_1.DEFAULT_TEXT_FONT_SIZE
    }, defaultFontParams),
    getTextBounds: useNaiveCanvas ? void 0 : vrender_core_1.getTextBounds,
    specialCharSet: "-/: .,@%'\"~" + vutils_1.TextMeasure.ALPHABET_CHAR_SET + vutils_1.TextMeasure.ALPHABET_CHAR_SET.toUpperCase()
}, null != option ? option : {}), textSpec);

function measureTextSize(text, textSpec, defaultTextTheme = {}) {
    if (!text) return {
        width: 0,
        height: 0
    };
    const bounds = (0, vrender_core_1.getTextBounds)({
        text: text,
        fontFamily: textSpec.fontFamily || defaultTextTheme.fontFamily || constant_1.DEFAULT_TEXT_FONT_FAMILY,
        fontSize: textSpec.fontSize || defaultTextTheme.fontSize || 12,
        fontWeight: textSpec.fontWeight || defaultTextTheme.fontWeight,
        textAlign: textSpec.textAlign || "center",
        textBaseline: textSpec.textBaseline,
        ellipsis: !!textSpec.ellipsis,
        maxLineWidth: textSpec.maxLineWidth || 1 / 0,
        lineHeight: textSpec.fontSize || defaultTextTheme.fontSize || 12
    });
    return {
        width: bounds.width(),
        height: bounds.height()
    };
}

function isRichText(attributes, typeKey = "type") {
    return "rich" === getTextType(attributes, typeKey);
}

function getTextType(attributes, typeKey = "type") {
    var _a, _b;
    return (0, vutils_1.isObject)(attributes.text) && "type" in attributes.text ? null !== (_a = attributes.text.type) && void 0 !== _a ? _a : "text" : typeKey in attributes && null !== (_b = attributes[typeKey]) && void 0 !== _b ? _b : "text";
}

function richTextAttributeTransform(attributes) {
    var _a, _b;
    return (0, vutils_1.isValid)(attributes.maxLineWidth) && (attributes.maxWidth = attributes.maxLineWidth, 
    delete attributes.maxLineWidth), attributes.width = null !== (_a = attributes.width) && void 0 !== _a ? _a : 0, 
    attributes.height = null !== (_b = attributes.height) && void 0 !== _b ? _b : 0, 
    attributes.textConfig = attributes.text.text || attributes.text, attributes;
}

function htmlAttributeTransform(attributes) {
    const {text: text, _originText: _originText} = attributes, {text: html} = text;
    return attributes.html = html, attributes.text = _originText, attributes.renderable = !1, 
    attributes;
}

function reactAttributeTransform(attributes) {
    const {text: text, _originText: _originText} = attributes, {text: react} = text;
    return attributes.react = react, attributes.text = _originText, attributes.renderable = !1, 
    attributes;
}

function createTextGraphicByType(textAttributes, typeKey = "type") {
    const textType = getTextType(textAttributes, typeKey);
    return "rich" === textType ? vrender_core_1.graphicCreator.richtext(richTextAttributeTransform(textAttributes)) : ("html" === textType ? textAttributes = htmlAttributeTransform(textAttributes) : "react" === textType && (textAttributes = reactAttributeTransform(textAttributes)), 
    vrender_core_1.graphicCreator.text(textAttributes));
}

function alignTextInLine(layoutAlign, graphic, textAlign, pos, textWidth) {
    "right" === layoutAlign ? "center" === textAlign ? graphic.setAttribute("x", pos - textWidth / 2) : "right" === textAlign || "end" === textAlign ? graphic.setAttribute("x", pos) : graphic.setAttribute("x", pos - textWidth) : "center" === textAlign ? graphic.setAttribute("x", pos + textWidth / 2) : "right" === textAlign || "end" === textAlign ? graphic.setAttribute("x", pos + textWidth) : graphic.setAttribute("x", pos);
}

exports.initTextMeasure = initTextMeasure, exports.measureTextSize = measureTextSize, 
exports.isRichText = isRichText, exports.getTextType = getTextType, exports.richTextAttributeTransform = richTextAttributeTransform, 
exports.htmlAttributeTransform = htmlAttributeTransform, exports.reactAttributeTransform = reactAttributeTransform, 
exports.createTextGraphicByType = createTextGraphicByType, exports.alignTextInLine = alignTextInLine;
//# sourceMappingURL=text.js.map
