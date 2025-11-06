import { isNil, isString, isValid, lowerCamelCaseToMiddle } from "@visactor/vutils";

export function textDrawOffsetY(baseline, h) {
    return "top" === baseline ? Math.ceil(.79 * h) : "middle" === baseline ? Math.round(.3 * h) : "bottom" === baseline ? Math.round(-.21 * h) : 0;
}

export function textDrawOffsetX(textAlign, width) {
    return "end" === textAlign || "right" === textAlign ? -width : "center" === textAlign ? -width / 2 : 0;
}

export function textLayoutOffsetY(baseline, lineHeight, fontSize, buf = 0) {
    return "middle" === baseline ? -lineHeight / 2 : "top" === baseline ? 0 : "bottom" === baseline ? buf - lineHeight : baseline && "alphabetic" !== baseline ? 0 : (fontSize || (fontSize = lineHeight), 
    -(lineHeight - fontSize) / 2 - .79 * fontSize);
}

export function textAttributesToStyle(attrs) {
    const style = {}, parsePxValue = value => /^\d+(\.\d+)?$/.test(`${value}`) ? `${value}px` : `${value}`;
    return [ "textAlign", "fontFamily", "fontVariant", "fontStyle", "fontWeight" ].forEach((key => {
        attrs[key] && (style[lowerCamelCaseToMiddle(key)] = attrs[key]);
    })), [ "fontSize", "lineHeight" ].forEach((key => {
        const styleKey = lowerCamelCaseToMiddle(key);
        isNil(attrs[key]) || (style[styleKey] = parsePxValue(attrs[key]));
    })), isValid(attrs.maxLineWidth) && (style["max-width"] = parsePxValue(attrs.maxLineWidth)), 
    attrs.underline ? style["text-decoration"] = "underline" : attrs.lineThrough && (style["text-decoration"] = "line-through"), 
    attrs.fill && isString(attrs.fill) && (style.color = attrs.fill), style;
}
//# sourceMappingURL=text.js.map
