import { getTextBounds, graphicCreator } from "@visactor/vrender-core";

import { TextMeasure, isObject, isValid } from "@visactor/vutils";

import { DEFAULT_TEXT_FONT_FAMILY, DEFAULT_TEXT_FONT_SIZE } from "../constant";

export const initTextMeasure = (textSpec, option, useNaiveCanvas, defaultFontParams) => new TextMeasure(Object.assign({
    defaultFontParams: Object.assign({
        fontFamily: DEFAULT_TEXT_FONT_FAMILY,
        fontSize: DEFAULT_TEXT_FONT_SIZE
    }, defaultFontParams),
    getTextBounds: useNaiveCanvas ? void 0 : getTextBounds,
    specialCharSet: "-/: .,@%'\"~" + TextMeasure.ALPHABET_CHAR_SET + TextMeasure.ALPHABET_CHAR_SET.toUpperCase()
}, null != option ? option : {}), textSpec);

export function measureTextSize(text, textSpec, defaultTextTheme = {}) {
    if (!text) return {
        width: 0,
        height: 0
    };
    const bounds = getTextBounds({
        text: text,
        fontFamily: textSpec.fontFamily || defaultTextTheme.fontFamily || DEFAULT_TEXT_FONT_FAMILY,
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

export function isRichText(attributes, typeKey = "type") {
    return "rich" === getTextType(attributes, typeKey);
}

export function getTextType(attributes, typeKey = "type") {
    var _a, _b;
    return isObject(attributes.text) && "type" in attributes.text ? null !== (_a = attributes.text.type) && void 0 !== _a ? _a : "text" : typeKey in attributes && null !== (_b = attributes[typeKey]) && void 0 !== _b ? _b : "text";
}

export function richTextAttributeTransform(attributes) {
    var _a, _b;
    return isValid(attributes.maxLineWidth) && (attributes.maxWidth = attributes.maxLineWidth, 
    delete attributes.maxLineWidth), attributes.width = null !== (_a = attributes.width) && void 0 !== _a ? _a : 0, 
    attributes.height = null !== (_b = attributes.height) && void 0 !== _b ? _b : 0, 
    attributes.textConfig = attributes.text.text || attributes.text, attributes;
}

export function htmlAttributeTransform(attributes) {
    const {text: text, _originText: _originText} = attributes, {text: html} = text;
    return attributes.html = html, attributes.text = _originText, attributes.renderable = !1, 
    attributes;
}

export function reactAttributeTransform(attributes) {
    const {text: text, _originText: _originText} = attributes, {text: react} = text;
    return attributes.react = react, attributes.text = _originText, attributes.renderable = !1, 
    attributes;
}

export function createTextGraphicByType(textAttributes, typeKey = "type") {
    const textType = getTextType(textAttributes, typeKey);
    return "rich" === textType ? graphicCreator.richtext(richTextAttributeTransform(textAttributes)) : ("html" === textType ? textAttributes = htmlAttributeTransform(textAttributes) : "react" === textType && (textAttributes = reactAttributeTransform(textAttributes)), 
    graphicCreator.text(textAttributes));
}

export function alignTextInLine(layoutAlign, graphic, textAlign, pos, textWidth) {
    "right" === layoutAlign ? "center" === textAlign ? graphic.setAttribute("x", pos - textWidth / 2) : "right" === textAlign || "end" === textAlign ? graphic.setAttribute("x", pos) : graphic.setAttribute("x", pos - textWidth) : "center" === textAlign ? graphic.setAttribute("x", pos + textWidth / 2) : "right" === textAlign || "end" === textAlign ? graphic.setAttribute("x", pos + textWidth) : graphic.setAttribute("x", pos);
}
//# sourceMappingURL=text.js.map
