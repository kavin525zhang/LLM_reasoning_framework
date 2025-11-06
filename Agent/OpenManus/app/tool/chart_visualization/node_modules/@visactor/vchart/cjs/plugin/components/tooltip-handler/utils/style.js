"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setStyleToDom = exports.getPanelStyle = exports.getDomStyle = exports.getLineHeight = exports.getTextStyle = exports.getPixelPropertyStr = void 0;

const vutils_1 = require("@visactor/vutils"), space_1 = require("../../../../util/space"), DEFAULT_SHAPE_SPACING = 8, DEFAULT_KEY_SPACING = 26, DEFAULT_VALUE_SPACING = 0, getPixelPropertyStr = (num, defaultStr) => (0, 
vutils_1.isValid)(num) ? (0, vutils_1.isArray)(num) ? num.map((n => `${n}px`)).join(" ") : `${num}px` : null != defaultStr ? defaultStr : "initial";

exports.getPixelPropertyStr = getPixelPropertyStr;

const getTextStyle = (style = {}, textStyle = {}) => {
    var _a, _b;
    (0, vutils_1.isValid)(style.fontFamily) && (textStyle.fontFamily = style.fontFamily);
    const color = null !== (_a = style.fill) && void 0 !== _a ? _a : style.fontColor;
    return (0, vutils_1.isValid)(color) && (textStyle.color = color), (0, vutils_1.isValid)(style.fontWeight) && (textStyle.fontWeight = style.fontWeight), 
    (0, vutils_1.isValid)(style.textAlign) && (textStyle.textAlign = style.textAlign), 
    (0, vutils_1.isValid)(style.fontSize) && (textStyle.fontSize = (0, exports.getPixelPropertyStr)(style.fontSize)), 
    (0, vutils_1.isValid)(style.maxWidth) && (textStyle.maxWidth = (0, exports.getPixelPropertyStr)(style.maxWidth)), 
    style.multiLine || (0, vutils_1.isValid)(style.maxWidth) && !1 !== style.multiLine ? (textStyle.whiteSpace = "initial", 
    textStyle.wordBreak = null !== (_b = style.wordBreak) && void 0 !== _b ? _b : "break-word") : (textStyle.wordBreak = "normal", 
    textStyle.whiteSpace = "nowrap"), textStyle;
};

exports.getTextStyle = getTextStyle;

const getLineHeight = (style = {}) => {
    const {lineHeight: lineHeight} = style;
    return style.fontSize ? (0, space_1.calcLayoutNumber)(lineHeight, style.fontSize) : 0;
};

exports.getLineHeight = getLineHeight;

const getDomStyle = (spec = {}) => {
    var _a, _b, _c, _d;
    const {style: style = {}, enterable: enterable, transitionDuration: transitionDuration} = spec, {panel: panel = {}, titleLabel: titleLabel, shape: shape, keyLabel: keyLabel, valueLabel: valueLabel, spaceRow: commonSpaceRow, align: align} = style, {panelStyle: panelStyle, panelPadding: panelPadding} = (0, 
    exports.getPanelStyle)(panel), rowStyle = {
        marginTop: "0px",
        marginBottom: "0px"
    };
    panelStyle.pointerEvents = enterable ? "auto" : "none", transitionDuration && (panelStyle.transitionDuration = transitionDuration ? `${transitionDuration}ms` : "initial", 
    panelStyle.transitionProperty = transitionDuration ? "transform" : "initial", panelStyle.transitionTimingFunction = transitionDuration ? "ease-out" : "initial"), 
    (0, vutils_1.isValidNumber)(commonSpaceRow) && (rowStyle.marginBottom = `${commonSpaceRow}px`);
    const shapeStyle = {
        width: (0, exports.getPixelPropertyStr)(null !== (_a = null == shape ? void 0 : shape.size) && void 0 !== _a ? _a : 8)
    }, titleStyle = (0, exports.getTextStyle)(titleLabel), keyStyle = (0, exports.getTextStyle)(keyLabel), valueStyle = (0, 
    exports.getTextStyle)(valueLabel), marginKey = "right" === align ? "marginLeft" : "marginRight";
    "right" === align ? (panelStyle.direction = "rtl", titleStyle.textAlign = "right", 
    keyStyle.textAlign = "right", valueStyle.textAlign = "left") : (titleStyle.textAlign = "left", 
    keyStyle.textAlign = "left", valueStyle.textAlign = "right"), shapeStyle[marginKey] = (0, 
    exports.getPixelPropertyStr)(null !== (_b = shape.spacing) && void 0 !== _b ? _b : 8), 
    keyStyle[marginKey] = (0, exports.getPixelPropertyStr)(null !== (_c = keyLabel.spacing) && void 0 !== _c ? _c : 26), 
    valueStyle[marginKey] = (0, exports.getPixelPropertyStr)(null !== (_d = valueLabel.spacing) && void 0 !== _d ? _d : 0);
    const lineHeight = Math.max((0, exports.getLineHeight)(valueLabel), (0, exports.getLineHeight)(keyLabel));
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

exports.getDomStyle = getDomStyle;

const getPanelStyle = style => {
    var _a;
    const {backgroundColor: backgroundColor, border: border, shadow: shadow, padding: padding} = style, panelStyle = {
        borderWidth: `${null !== (_a = null == border ? void 0 : border.width) && void 0 !== _a ? _a : 0}px`
    };
    let panelPadding = null;
    (null == border ? void 0 : border.color) && (panelStyle.borderColor = border.color), 
    backgroundColor && (panelStyle.backgroundColor = backgroundColor), panelStyle.boxShadow = shadow ? `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}` : "initial";
    const {radius: radius} = null != border ? border : {};
    return (0, vutils_1.isValid)(radius) && (panelStyle.borderRadius = (0, vutils_1.isValidNumber)(radius) ? `${radius}px` : `${radius}`), 
    padding && (panelPadding = (0, vutils_1.normalizePadding)(padding), panelStyle.padding = (0, 
    exports.getPixelPropertyStr)(panelPadding)), {
        panelStyle: panelStyle,
        panelPadding: panelPadding
    };
};

function setStyleToDom(dom, style) {
    dom && dom.style && style && Object.keys(style).forEach((key => {
        dom.style[key] = style[key];
    }));
}

exports.getPanelStyle = getPanelStyle, exports.setStyleToDom = setStyleToDom;
//# sourceMappingURL=style.js.map
