"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getTooltipAttributes = exports.getPanelAttributes = exports.getTextAttributes = exports.measureTooltipText = void 0;

const vutils_1 = require("@visactor/vutils"), vutils_extension_1 = require("@visactor/vutils-extension"), space_1 = require("../../../../util/space"), token_1 = require("../../../../theme/token"), vrender_core_1 = require("@visactor/vrender-core"), DEFAULT_TEXT_ATTRIBUTES = {
    fontFamily: token_1.token.fontFamily,
    spacing: 10,
    wordBreak: "break-word"
}, measureTooltipText = (text, style) => {
    var _a;
    let textLines, textConfig;
    "rich" !== (null == text ? void 0 : text.type) && "html" !== (null == text ? void 0 : text.type) ? (text = (null != text ? text : "").toString(), 
    style.multiLine ? (textLines = text.split("\n"), textLines = textLines.map(((line, i) => i < textLines.length - 1 ? line + "\n" : line))) : textLines = [ text ], 
    textConfig = textLines.map((line => Object.assign(Object.assign({}, style), {
        text: line
    })))) : (textConfig = text.text, textLines = text);
    const bound = (0, vrender_core_1.getRichTextBounds)({
        wordBreak: null !== (_a = style.wordBreak) && void 0 !== _a ? _a : "break-word",
        maxWidth: style.maxWidth ? style.maxWidth : void 0,
        width: 0,
        height: 0,
        textConfig: textConfig
    });
    return {
        width: bound.width(),
        height: bound.height(),
        text: textLines
    };
};

function getTextAttributes(style = {}, globalTheme, defaultAttributes) {
    var _a, _b;
    return Object.assign(Object.assign({}, null != defaultAttributes ? defaultAttributes : DEFAULT_TEXT_ATTRIBUTES), {
        fill: null !== (_a = style.fill) && void 0 !== _a ? _a : style.fontColor,
        textAlign: style.textAlign,
        textBaseline: style.textBaseline,
        fontFamily: null !== (_b = style.fontFamily) && void 0 !== _b ? _b : null == globalTheme ? void 0 : globalTheme.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        spacing: style.spacing,
        multiLine: (0, vutils_1.isValid)(style.maxWidth) ? !1 !== style.multiLine : style.multiLine,
        maxWidth: style.maxWidth,
        wordBreak: style.wordBreak,
        autoWidth: style.autoWidth
    });
}

exports.measureTooltipText = measureTooltipText, exports.getTextAttributes = getTextAttributes;

const getPanelAttributes = style => {
    var _a;
    const {backgroundColor: backgroundColor, border: border, shadow: shadow} = style, panelAttrs = {
        lineWidth: null !== (_a = null == border ? void 0 : border.width) && void 0 !== _a ? _a : 0,
        shadow: !!shadow
    };
    (null == border ? void 0 : border.color) && (panelAttrs.stroke = border.color), 
    backgroundColor && (panelAttrs.fill = backgroundColor), shadow && (panelAttrs.shadowColor = shadow.color, 
    panelAttrs.shadowBlur = shadow.blur, panelAttrs.shadowOffsetX = shadow.x, panelAttrs.shadowOffsetY = shadow.y, 
    panelAttrs.shadowSpread = shadow.spread);
    const {radius: radius} = null != border ? border : {};
    return (0, vutils_1.isValid)(radius) && (panelAttrs.cornerRadius = [ radius, radius, radius, radius ]), 
    panelAttrs;
};

exports.getPanelAttributes = getPanelAttributes;

const getTooltipAttributes = (actualTooltip, spec, globalTheme) => {
    var _a, _b, _c, _d, _e;
    const {style: style = {}, enterable: enterable, transitionDuration: transitionDuration} = spec, {panel: panel = {}, titleLabel: titleLabel, shape: shape, keyLabel: keyLabel, valueLabel: valueLabel, spaceRow: commonSpaceRow, align: align} = style, padding = (0, 
    vutils_1.normalizePadding)(panel.padding), paddingSpec = (0, space_1.normalizeLayoutPaddingSpec)(panel.padding), titleStyle = getTextAttributes(Object.assign({
        textAlign: "right" === align ? "right" : "left"
    }, titleLabel), globalTheme), keyStyle = getTextAttributes(Object.assign({
        textAlign: "right" === align ? "right" : "left"
    }, keyLabel), globalTheme), valueStyle = getTextAttributes(valueLabel, globalTheme), shapeStyle = {
        fill: !0,
        size: null !== (_a = null == shape ? void 0 : shape.size) && void 0 !== _a ? _a : 8,
        spacing: null !== (_b = null == shape ? void 0 : shape.spacing) && void 0 !== _b ? _b : 6
    }, attributes = {
        panel: (0, exports.getPanelAttributes)(panel),
        padding: padding,
        title: {},
        content: [],
        titleStyle: {
            value: titleStyle,
            spaceRow: commonSpaceRow
        },
        contentStyle: {
            shape: shapeStyle,
            key: keyStyle,
            value: valueStyle,
            spaceRow: commonSpaceRow
        },
        hasContentShape: !1,
        keyWidth: 0,
        valueWidth: 0,
        enterable: enterable,
        transitionDuration: transitionDuration,
        align: align
    }, {title: title = {}, content: content = []} = actualTooltip;
    let panelWidth = paddingSpec.left + paddingSpec.right, panelHeight = paddingSpec.top + paddingSpec.bottom, contentMaxWidth = 0;
    const hasContent = !!content.length;
    let maxKeyWidth = 0, maxAdaptiveKeyWidth = 0, maxValueWidth = 0, maxShapeWidth = 0;
    if (hasContent) {
        const keyWidths = [], adaptiveKeyWidths = [], valueWidths = [], shapeWidths = [];
        let contentHeight = 0;
        attributes.content = content.map(((item, i) => {
            let itemHeight = 0;
            const {hasShape: actualHasShape, key: actualKey, shapeType: actualShapeType = "", shapeFill: actualShapeFill, shapeStroke: actualShapeStroke, shapeLineWidth: actualShapeLineWidth, shapeSize: actualShapeSize, value: actualValue, isKeyAdaptive: actualIsKeyAdaptive, spaceRow: actualSpaceRow, keyStyle: actualKeyStyle, valueStyle: actualValueStyle, shapeHollow: actualShapeHollow} = item, itemAttrs = {
                height: 0,
                spaceRow: null != actualSpaceRow ? actualSpaceRow : commonSpaceRow
            };
            if ((0, vutils_1.isValid)(actualKey)) {
                const itemKeyStyle = (0, vutils_extension_1.mergeSpec)({}, keyStyle, getTextAttributes(actualKeyStyle, void 0, {})), {width: width, height: height, text: text} = (0, 
                exports.measureTooltipText)(actualKey, itemKeyStyle);
                itemAttrs.key = Object.assign(Object.assign({
                    width: width,
                    height: height
                }, itemKeyStyle), {
                    text: text
                }), actualIsKeyAdaptive ? adaptiveKeyWidths.push(width) : keyWidths.push(width), 
                itemHeight = Math.max(itemHeight, height);
            }
            if ((0, vutils_1.isValid)(actualValue)) {
                const itemValueStyle = (0, vutils_extension_1.mergeSpec)({}, valueStyle, getTextAttributes(actualValueStyle, void 0, {})), {width: width, height: height, text: text} = (0, 
                exports.measureTooltipText)(actualValue, itemValueStyle);
                itemAttrs.value = Object.assign(Object.assign({
                    width: width,
                    height: height
                }, itemValueStyle), {
                    text: text
                }), valueWidths.push(width), itemHeight = Math.max(itemHeight, height);
            }
            if (actualHasShape) {
                const shape = {
                    visible: !0,
                    symbolType: actualShapeType
                };
                actualShapeHollow ? shape.stroke = actualShapeFill : shape.fill = actualShapeFill, 
                shape.stroke = null != actualShapeStroke ? actualShapeStroke : actualShapeFill, 
                shape.lineWidth = actualShapeLineWidth, itemAttrs.shape = shape;
                const shapeWidth = null != actualShapeSize ? actualShapeSize : shapeStyle.size;
                itemHeight = Math.max(shapeWidth, itemHeight), shapeWidths.push(shapeWidth);
            } else itemAttrs.shape = {
                visible: !1
            };
            return itemAttrs.height = itemHeight, contentHeight += itemHeight, i < content.length - 1 && (contentHeight += itemAttrs.spaceRow), 
            itemAttrs;
        })), panelHeight += contentHeight, maxKeyWidth = keyWidths.length ? (0, vutils_1.maxInArray)(keyWidths) : 0, 
        maxAdaptiveKeyWidth = adaptiveKeyWidths.length ? (0, vutils_1.maxInArray)(adaptiveKeyWidths) : 0, 
        maxValueWidth = valueWidths.length ? (0, vutils_1.maxInArray)(valueWidths) : 0, 
        maxShapeWidth = shapeWidths.length ? (0, vutils_1.maxInArray)(shapeWidths) + shapeStyle.spacing : 0, 
        contentMaxWidth = Math.max(maxShapeWidth + maxKeyWidth + keyStyle.spacing + maxValueWidth + valueStyle.spacing, maxShapeWidth + maxAdaptiveKeyWidth, contentMaxWidth), 
        attributes.hasContentShape = !!shapeWidths.length, attributes.keyWidth = maxKeyWidth, 
        attributes.valueWidth = maxValueWidth;
    }
    let titleMaxWidth = 0, titleMaxHeight = 0, titleHeightWithSpace = 0;
    const {visible: actualTitleVisible = !0, value: actualTitleValue = "", valueStyle: actualTitleValueStyle, spaceRow: actualTitleSpaceRow} = title;
    attributes.title.visible = actualTitleVisible, attributes.title.spaceRow = null != actualTitleSpaceRow ? actualTitleSpaceRow : commonSpaceRow;
    let titleValueStyle = {};
    const isAutoWidthMode = () => titleValueStyle.autoWidth && !1 !== titleValueStyle.multiLine;
    if (actualTitleVisible) {
        titleValueStyle = (0, vutils_extension_1.mergeSpec)({}, titleStyle, getTextAttributes(actualTitleValueStyle, void 0, {})), 
        isAutoWidthMode() && (titleValueStyle.multiLine = null === (_c = titleValueStyle.multiLine) || void 0 === _c || _c, 
        titleValueStyle.maxWidth = null !== (_d = titleValueStyle.maxWidth) && void 0 !== _d ? _d : hasContent ? Math.ceil(contentMaxWidth) : void 0);
        const {text: text, width: width, height: height} = (0, exports.measureTooltipText)(actualTitleValue, titleValueStyle);
        attributes.title.value = Object.assign(Object.assign({
            width: isAutoWidthMode() ? Math.min(width, null !== (_e = titleValueStyle.maxWidth) && void 0 !== _e ? _e : Number.MAX_VALUE) : width,
            height: height
        }, titleValueStyle), {
            text: text
        }), titleMaxWidth = attributes.title.value.width, titleMaxHeight = attributes.title.value.height, 
        titleHeightWithSpace = titleMaxHeight + (hasContent ? attributes.title.spaceRow : 0);
    }
    return panelHeight += titleHeightWithSpace, attributes.title.width = titleMaxWidth, 
    attributes.title.height = titleMaxHeight, isAutoWidthMode() ? panelWidth += contentMaxWidth || titleMaxWidth : panelWidth += Math.max(titleMaxWidth, contentMaxWidth), 
    hasContent && attributes.content.forEach((item => {
        var _a;
        const value = item.value;
        value && (null === (_a = value.autoWidth) || void 0 === _a || _a) && (value.width = panelWidth - paddingSpec.left - paddingSpec.right - maxShapeWidth - maxKeyWidth - keyStyle.spacing - valueStyle.spacing, 
        value.maxWidth || (value.maxWidth = Math.ceil(value.width)), attributes.valueWidth = Math.max(attributes.valueWidth, value.width));
    })), attributes.panel.width = panelWidth, attributes.panel.height = panelHeight, 
    attributes;
};

exports.getTooltipAttributes = getTooltipAttributes;
//# sourceMappingURL=attribute.js.map
