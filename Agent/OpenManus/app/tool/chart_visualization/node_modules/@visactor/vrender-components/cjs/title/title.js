"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Title = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("../core/base"), constant_1 = require("../constant"), register_1 = require("./register");

(0, register_1.loadTitleComponent)();

class Title extends base_1.AbstractComponent {
    constructor(attributes, options) {
        super((null == options ? void 0 : options.skipDefault) ? attributes : (0, vutils_1.merge)({}, Title.defaultAttributes, attributes)), 
        this.name = "title";
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const {textType: textType, text: text, subtextType: subtextType, textStyle: textStyle = {}, subtext: subtext, subtextStyle: subtextStyle = {}, width: width, height: height, minWidth: minWidth, maxWidth: maxWidth, minHeight: minHeight, maxHeight: maxHeight, align: align, verticalAlign: verticalAlign, padding: padding = 0} = this.attribute, parsedPadding = (0, 
        vutils_1.normalizePadding)(padding), group = this.createOrUpdateChild("title-container", {
            x: parsedPadding[3],
            y: parsedPadding[0],
            zIndex: 1
        }, "group"), fixedMainTitleHeight = null !== (_a = textStyle.height) && void 0 !== _a ? _a : height;
        if (!1 !== this.attribute.visible && !1 !== textStyle.visible) {
            const {width: mainTitleWidth, maxHeight: mainTitleMaxHeight, maxWidth: mainTitleMaxWidth, x: x = 0, y: y = 0, ellipsis: ellipsis = !0, wordBreak: wordBreak = "break-word", maxWidth: maxWidth, lineClamp: lineClamp} = textStyle;
            if ("rich" === textType || (0, vutils_1.isValid)(textStyle.character)) {
                const attr = Object.assign({
                    x: x,
                    y: y,
                    width: null !== (_b = null != mainTitleWidth ? mainTitleWidth : width) && void 0 !== _b ? _b : 0,
                    height: null != fixedMainTitleHeight ? fixedMainTitleHeight : 0,
                    ellipsis: null == ellipsis || ellipsis,
                    wordBreak: null != wordBreak ? wordBreak : "break-word",
                    maxHeight: null != mainTitleMaxHeight ? mainTitleMaxHeight : maxHeight,
                    maxWidth: null != mainTitleMaxWidth ? mainTitleMaxWidth : maxWidth,
                    textConfig: null !== (_c = textStyle.character) && void 0 !== _c ? _c : text
                }, textStyle);
                this._mainTitle = group.createOrUpdateChild("mainTitle", attr, "richtext");
            } else if ("html" === textType) {
                const attr = Object.assign({
                    html: Object.assign(Object.assign({
                        dom: text
                    }, constant_1.DEFAULT_HTML_TEXT_SPEC), textStyle),
                    x: x,
                    y: y,
                    width: null !== (_d = null != mainTitleWidth ? mainTitleWidth : width) && void 0 !== _d ? _d : 0,
                    height: null != fixedMainTitleHeight ? fixedMainTitleHeight : 0,
                    ellipsis: ellipsis,
                    wordBreak: wordBreak,
                    maxHeight: null != mainTitleMaxHeight ? mainTitleMaxHeight : maxHeight,
                    maxWidth: null != mainTitleMaxWidth ? mainTitleMaxWidth : maxWidth,
                    textConfig: []
                }, textStyle);
                this._mainTitle = group.createOrUpdateChild("mainTitle", attr, "richtext");
            } else (0, vutils_1.isValid)(text) && (this._mainTitle = group.createOrUpdateChild("mainTitle", Object.assign(Object.assign({
                text: (0, vutils_1.isArray)(text) ? text : [ text ],
                whiteSpace: "normal"
            }, textStyle), {
                maxLineWidth: null !== (_f = null !== (_e = textStyle.maxLineWidth) && void 0 !== _e ? _e : mainTitleWidth) && void 0 !== _f ? _f : width,
                heightLimit: null !== (_g = textStyle.height) && void 0 !== _g ? _g : maxHeight,
                lineClamp: lineClamp,
                ellipsis: ellipsis,
                x: x,
                y: y
            }), "text"));
        }
        const mainTextBoundsHeight = this._mainTitle ? this._mainTitle.AABBBounds.height() : 0, mainTextBoundsWidth = this._mainTitle ? this._mainTitle.AABBBounds.width() : 0;
        if (!1 !== this.attribute.visible && !1 !== subtextStyle.visible) {
            const {width: subTitleWidth, height: subTitleHeight, maxWidth: subTitleMaxWidth, maxHeight: subTitleMaxHeight, x: x = 0, y: y = 0, ellipsis: ellipsis = !0, wordBreak: wordBreak = "break-word", lineClamp: lineClamp} = subtextStyle, maxSubTextHeight = Math.max(Number.MIN_VALUE, maxHeight - mainTextBoundsHeight);
            if ("rich" === subtextType || (0, vutils_1.isValid)(subtextStyle.character)) {
                const attr = Object.assign({
                    x: x,
                    y: y,
                    width: null !== (_h = null != subTitleWidth ? subTitleWidth : width) && void 0 !== _h ? _h : 0,
                    height: null !== (_j = null != subTitleHeight ? subTitleHeight : height) && void 0 !== _j ? _j : 0,
                    ellipsis: ellipsis,
                    wordBreak: wordBreak,
                    maxHeight: null != subTitleMaxHeight ? subTitleMaxHeight : maxSubTextHeight,
                    maxWidth: null != subTitleMaxWidth ? subTitleMaxWidth : maxWidth,
                    textConfig: null !== (_k = subtextStyle.character) && void 0 !== _k ? _k : subtext
                }, subtextStyle);
                this._subTitle = group.createOrUpdateChild("subTitle", attr, "richtext");
            } else if ("html" === subtextType) {
                const attr = Object.assign({
                    html: Object.assign(Object.assign({
                        dom: subtext
                    }, constant_1.DEFAULT_HTML_TEXT_SPEC), subtextStyle),
                    x: x,
                    y: y,
                    width: null !== (_l = null != subTitleWidth ? subTitleWidth : width) && void 0 !== _l ? _l : 0,
                    height: null !== (_m = null != subTitleHeight ? subTitleHeight : height) && void 0 !== _m ? _m : 0,
                    ellipsis: ellipsis,
                    wordBreak: wordBreak,
                    maxHeight: null != subTitleMaxHeight ? subTitleMaxHeight : maxSubTextHeight,
                    maxWidth: null != subTitleMaxWidth ? subTitleMaxWidth : maxWidth,
                    textConfig: []
                }, subtextStyle);
                this._subTitle = group.createOrUpdateChild("subTitle", attr, "richtext");
            } else (0, vutils_1.isValid)(subtext) && (this._subTitle = group.createOrUpdateChild("subTitle", Object.assign(Object.assign({
                text: (0, vutils_1.isArray)(subtext) ? subtext : [ subtext ],
                whiteSpace: "normal"
            }, subtextStyle), {
                maxLineWidth: null !== (_o = subtextStyle.maxLineWidth) && void 0 !== _o ? _o : width,
                heightLimit: null !== (_p = subtextStyle.heightLimit) && void 0 !== _p ? _p : maxSubTextHeight,
                lineClamp: lineClamp,
                ellipsis: ellipsis,
                x: 0,
                y: mainTextBoundsHeight
            }), "text"));
        }
        const subTextBoundsHeight = this._subTitle ? this._subTitle.AABBBounds.height() : 0, subTextBoundsWidth = this._subTitle ? this._subTitle.AABBBounds.width() : 0;
        let totalWidth = Math.max(mainTextBoundsWidth, subTextBoundsWidth), totalHeight = mainTextBoundsHeight + (null !== (_q = subtextStyle.height) && void 0 !== _q ? _q : subTextBoundsHeight);
        if ((0, vutils_1.isValid)(width) && (totalWidth = width), (0, vutils_1.isValid)(height) && (totalHeight = height), 
        (0, vutils_1.isValid)(minWidth) && totalWidth < minWidth && (totalWidth = minWidth), 
        (0, vutils_1.isValid)(maxWidth) && totalWidth > maxWidth && (totalWidth = maxWidth), 
        (0, vutils_1.isValid)(minHeight) && totalHeight < minHeight && (totalHeight = minHeight), 
        (0, vutils_1.isValid)(maxHeight) && totalHeight > maxHeight && (totalHeight = maxHeight), 
        group.attribute.width = totalWidth, group.attribute.height = totalHeight, group.attribute.boundsPadding = parsedPadding, 
        this._mainTitle) {
            if ((0, vutils_1.isValid)(align) || (0, vutils_1.isValid)(textStyle.align)) {
                const mainTitleAlign = textStyle.align ? textStyle.align : align, mainTitleWidth = null !== (_r = textStyle.width) && void 0 !== _r ? _r : totalWidth;
                "center" === mainTitleAlign ? (this._mainTitle.setAttribute("x", mainTitleWidth / 2), 
                this._mainTitle.setAttribute("textAlign", "center")) : "right" === mainTitleAlign ? (this._mainTitle.setAttribute("x", mainTitleWidth), 
                this._mainTitle.setAttribute("textAlign", "right")) : (this._mainTitle.setAttribute("x", 0), 
                this._mainTitle.setAttribute("textAlign", "left"));
            }
            const mainTitleVerticalAlign = textStyle.verticalAlign ? textStyle.verticalAlign : verticalAlign, mainTitleHeight = null != fixedMainTitleHeight ? fixedMainTitleHeight : this._mainTitle.AABBBounds.empty() ? 0 : this._mainTitle.AABBBounds.height();
            "middle" === mainTitleVerticalAlign ? (this._mainTitle.setAttribute("y", mainTitleHeight / 2), 
            this._mainTitle.setAttribute("textBaseline", "middle")) : "bottom" === mainTitleVerticalAlign ? (this._mainTitle.setAttribute("y", mainTitleHeight), 
            this._mainTitle.setAttribute("textBaseline", "bottom")) : (this._mainTitle.setAttribute("y", 0), 
            this._mainTitle.setAttribute("textBaseline", "top"));
        }
        if (this._subTitle) {
            if ((0, vutils_1.isValid)(align) || (0, vutils_1.isValid)(subtextStyle.align)) {
                const subTitleAlign = subtextStyle.align ? subtextStyle.align : align, subTitleWidth = null !== (_t = null !== (_s = subtextStyle.width) && void 0 !== _s ? _s : textStyle.width) && void 0 !== _t ? _t : totalWidth;
                "center" === subTitleAlign ? (this._subTitle.setAttribute("x", subTitleWidth / 2), 
                this._subTitle.setAttribute("textAlign", "center")) : "right" === subTitleAlign ? (this._subTitle.setAttribute("x", subTitleWidth), 
                this._subTitle.setAttribute("textAlign", "right")) : (this._subTitle.setAttribute("x", 0), 
                this._subTitle.setAttribute("textAlign", "left"));
            }
            const subTitleVerticalAlign = subtextStyle.verticalAlign ? subtextStyle.verticalAlign : verticalAlign, subTitleYStart = this._mainTitle ? (0, 
            vutils_1.isValid)(fixedMainTitleHeight) ? this._mainTitle.AABBBounds.y1 + Math.max(this._mainTitle.AABBBounds.empty() ? 0 : this._mainTitle.AABBBounds.height(), fixedMainTitleHeight) : this._mainTitle.AABBBounds.y2 : 0, subTitleHeight = null !== (_v = null !== (_u = subtextStyle.height) && void 0 !== _u ? _u : height) && void 0 !== _v ? _v : this._subTitle.AABBBounds.empty() ? 0 : this._subTitle.AABBBounds.height();
            "middle" === subTitleVerticalAlign ? (this._subTitle.setAttribute("y", subTitleYStart + subTitleHeight / 2), 
            this._subTitle.setAttribute("textBaseline", "middle")) : "bottom" === subTitleVerticalAlign ? (this._subTitle.setAttribute("y", subTitleYStart + subTitleHeight), 
            this._subTitle.setAttribute("textBaseline", "bottom")) : (this._subTitle.setAttribute("y", subTitleYStart), 
            this._subTitle.setAttribute("textBaseline", "top"));
        }
    }
}

exports.Title = Title, Title.defaultAttributes = {
    textStyle: {
        ellipsis: "...",
        fill: "#333",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        textBaseline: "top"
    },
    subtextStyle: {
        ellipsis: "...",
        fill: "#6F6F6F",
        fontSize: 16,
        fontWeight: "normal",
        textAlign: "left",
        textBaseline: "top"
    }
};
//# sourceMappingURL=title.js.map
