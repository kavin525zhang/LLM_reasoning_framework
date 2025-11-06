"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.textAttributesToStyle = exports.textLayoutOffsetY = exports.textDrawOffsetX = exports.textDrawOffsetY = void 0;

const vutils_1 = require("@visactor/vutils");

function textDrawOffsetY(baseline, h) {
    return "top" === baseline ? Math.ceil(.79 * h) : "middle" === baseline ? Math.round(.3 * h) : "bottom" === baseline ? Math.round(-.21 * h) : 0;
}

function textDrawOffsetX(textAlign, width) {
    return "end" === textAlign || "right" === textAlign ? -width : "center" === textAlign ? -width / 2 : 0;
}

function textLayoutOffsetY(baseline, lineHeight, fontSize, buf = 0) {
    return "middle" === baseline ? -lineHeight / 2 : "top" === baseline ? 0 : "bottom" === baseline ? buf - lineHeight : baseline && "alphabetic" !== baseline ? 0 : (fontSize || (fontSize = lineHeight), 
    -(lineHeight - fontSize) / 2 - .79 * fontSize);
}

function textAttributesToStyle(attrs) {
    const style = {}, parsePxValue = value => /^\d+(\.\d+)?$/.test(`${value}`) ? `${value}px` : `${value}`;
    return [ "textAlign", "fontFamily", "fontVariant", "fontStyle", "fontWeight" ].forEach((key => {
        attrs[key] && (style[(0, vutils_1.lowerCamelCaseToMiddle)(key)] = attrs[key]);
    })), [ "fontSize", "lineHeight" ].forEach((key => {
        const styleKey = (0, vutils_1.lowerCamelCaseToMiddle)(key);
        (0, vutils_1.isNil)(attrs[key]) || (style[styleKey] = parsePxValue(attrs[key]));
    })), (0, vutils_1.isValid)(attrs.maxLineWidth) && (style["max-width"] = parsePxValue(attrs.maxLineWidth)), 
    attrs.underline ? style["text-decoration"] = "underline" : attrs.lineThrough && (style["text-decoration"] = "line-through"), 
    attrs.fill && (0, vutils_1.isString)(attrs.fill) && (style.color = attrs.fill), 
    style;
}

exports.textDrawOffsetY = textDrawOffsetY, exports.textDrawOffsetX = textDrawOffsetX, 
exports.textLayoutOffsetY = textLayoutOffsetY, exports.textAttributesToStyle = textAttributesToStyle;
//# sourceMappingURL=text.js.map
