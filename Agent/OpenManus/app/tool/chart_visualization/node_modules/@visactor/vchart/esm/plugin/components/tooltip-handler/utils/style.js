import { isArray, isValid, isValidNumber, normalizePadding } from "@visactor/vutils";

import { calcLayoutNumber } from "../../../../util/space";

const DEFAULT_SHAPE_SPACING = 8, DEFAULT_KEY_SPACING = 26, DEFAULT_VALUE_SPACING = 0;

export const getPixelPropertyStr = (num, defaultStr) => isValid(num) ? isArray(num) ? num.map((n => `${n}px`)).join(" ") : `${num}px` : null != defaultStr ? defaultStr : "initial";

export const getTextStyle = (style = {}, textStyle = {}) => {
    var _a, _b;
    isValid(style.fontFamily) && (textStyle.fontFamily = style.fontFamily);
    const color = null !== (_a = style.fill) && void 0 !== _a ? _a : style.fontColor;
    return isValid(color) && (textStyle.color = color), isValid(style.fontWeight) && (textStyle.fontWeight = style.fontWeight), 
    isValid(style.textAlign) && (textStyle.textAlign = style.textAlign), isValid(style.fontSize) && (textStyle.fontSize = getPixelPropertyStr(style.fontSize)), 
    isValid(style.maxWidth) && (textStyle.maxWidth = getPixelPropertyStr(style.maxWidth)), 
    style.multiLine || isValid(style.maxWidth) && !1 !== style.multiLine ? (textStyle.whiteSpace = "initial", 
    textStyle.wordBreak = null !== (_b = style.wordBreak) && void 0 !== _b ? _b : "break-word") : (textStyle.wordBreak = "normal", 
    textStyle.whiteSpace = "nowrap"), textStyle;
};

export const getLineHeight = (style = {}) => {
    const {lineHeight: lineHeight} = style;
    return style.fontSize ? calcLayoutNumber(lineHeight, style.fontSize) : 0;
};

export const getDomStyle = (spec = {}) => {
    var _a, _b, _c, _d;
    const {style: style = {}, enterable: enterable, transitionDuration: transitionDuration} = spec, {panel: panel = {}, titleLabel: titleLabel, shape: shape, keyLabel: keyLabel, valueLabel: valueLabel, spaceRow: commonSpaceRow, align: align} = style, {panelStyle: panelStyle, panelPadding: panelPadding} = getPanelStyle(panel), rowStyle = {
        marginTop: "0px",
        marginBottom: "0px"
    };
    panelStyle.pointerEvents = enterable ? "auto" : "none", transitionDuration && (panelStyle.transitionDuration = transitionDuration ? `${transitionDuration}ms` : "initial", 
    panelStyle.transitionProperty = transitionDuration ? "transform" : "initial", panelStyle.transitionTimingFunction = transitionDuration ? "ease-out" : "initial"), 
    isValidNumber(commonSpaceRow) && (rowStyle.marginBottom = `${commonSpaceRow}px`);
    const shapeStyle = {
        width: getPixelPropertyStr(null !== (_a = null == shape ? void 0 : shape.size) && void 0 !== _a ? _a : 8)
    }, titleStyle = getTextStyle(titleLabel), keyStyle = getTextStyle(keyLabel), valueStyle = getTextStyle(valueLabel), marginKey = "right" === align ? "marginLeft" : "marginRight";
    "right" === align ? (panelStyle.direction = "rtl", titleStyle.textAlign = "right", 
    keyStyle.textAlign = "right", valueStyle.textAlign = "left") : (titleStyle.textAlign = "left", 
    keyStyle.textAlign = "left", valueStyle.textAlign = "right"), shapeStyle[marginKey] = getPixelPropertyStr(null !== (_b = shape.spacing) && void 0 !== _b ? _b : 8), 
    keyStyle[marginKey] = getPixelPropertyStr(null !== (_c = keyLabel.spacing) && void 0 !== _c ? _c : 26), 
    valueStyle[marginKey] = getPixelPropertyStr(null !== (_d = valueLabel.spacing) && void 0 !== _d ? _d : 0);
    const lineHeight = Math.max(getLineHeight(valueLabel), getLineHeight(keyLabel));
    return rowStyle.lineHeight = lineHeight > 0 ? `${lineHeight}px` : "20px", {
        panelPadding: panelPadding,
        row: rowStyle,
        panel: panelStyle,
        title: titleStyle,
        shape: shapeStyle,
        key: keyStyle,
        value: valueStyle
    };
};

export const getPanelStyle = style => {
    var _a;
    const {backgroundColor: backgroundColor, border: border, shadow: shadow, padding: padding} = style, panelStyle = {
        borderWidth: `${null !== (_a = null == border ? void 0 : border.width) && void 0 !== _a ? _a : 0}px`
    };
    let panelPadding = null;
    (null == border ? void 0 : border.color) && (panelStyle.borderColor = border.color), 
    backgroundColor && (panelStyle.backgroundColor = backgroundColor), panelStyle.boxShadow = shadow ? `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}` : "initial";
    const {radius: radius} = null != border ? border : {};
    return isValid(radius) && (panelStyle.borderRadius = isValidNumber(radius) ? `${radius}px` : `${radius}`), 
    padding && (panelPadding = normalizePadding(padding), panelStyle.padding = getPixelPropertyStr(panelPadding)), 
    {
        panelStyle: panelStyle,
        panelPadding: panelPadding
    };
};

export function setStyleToDom(dom, style) {
    dom && dom.style && style && Object.keys(style).forEach((key => {
        dom.style[key] = style[key];
    }));
}
//# sourceMappingURL=style.js.map
