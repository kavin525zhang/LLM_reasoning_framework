"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Indicator = void 0;

const vutils_1 = require("@visactor/vutils"), base_1 = require("../core/base"), util_1 = require("../util"), config_1 = require("./config"), register_1 = require("./register");

(0, register_1.loadIndicatorComponent)();

class Indicator extends base_1.AbstractComponent {
    constructor() {
        super(...arguments), this.name = "indicator";
    }
    _renderText(group, title, limit, limitRatio, themePath, graphicName) {
        if (!1 !== title.visible) {
            const titleStyle = (0, vutils_1.merge)({}, (0, vutils_1.get)(config_1.DEFAULT_INDICATOR_THEME, themePath), title.style, {
                visible: title.visible
            });
            titleStyle.lineHeight = (0, vutils_1.isValid)(titleStyle.lineHeight) ? titleStyle.lineHeight : titleStyle.fontSize, 
            title.formatMethod && (titleStyle._originText = titleStyle.text, titleStyle.text = title.formatMethod(titleStyle.text, titleStyle));
            const textGraphic = (0, util_1.createTextGraphicByType)(titleStyle);
            return textGraphic.name = graphicName, group.appendChild(textGraphic), title.autoFit && (0, 
            vutils_1.isValidNumber)(limit) && this._setLocalAutoFit(limit, textGraphic, title), 
            title.autoLimit && (0, vutils_1.isValidNumber)(limitRatio) && textGraphic.setAttribute("maxLineWidth", limit), 
            textGraphic;
        }
    }
    render() {
        var _a, _b;
        if (this.removeAllChild(!0), !0 !== this.attribute.visible) return;
        const {title: title = {}, content: content, size: size, limitRatio: limitRatio = 1 / 0} = this.attribute, limit = Math.min(size.width, size.height) * limitRatio, group = this.createOrUpdateChild("indicator-container", {
            x: 0,
            y: 0,
            zIndex: 1,
            pickable: null === (_a = this.attribute.pickable) || void 0 === _a || _a
        }, "group");
        if ((0, vutils_1.isValid)(title) && (this._title = this._renderText(group, title, limit, limitRatio, "title.style", "indicator-title")), 
        (0, vutils_1.isValid)(content)) {
            const contents = (0, vutils_1.array)(content), contentComponents = [];
            contents.forEach(((contentItem, i) => {
                !1 !== contentItem.visible && contentComponents.push(this._renderText(group, contentItem, limit, limitRatio, "content.style", "indicator-content-" + i));
            })), this._content = contentComponents;
        }
        this._setGlobalAutoFit(limit), this._setYPosition();
        const totalHeight = null !== (_b = null == group ? void 0 : group.AABBBounds.height()) && void 0 !== _b ? _b : 0;
        group.setAttribute("y", size.height / 2 - totalHeight / 2), group.setAttribute("x", size.width / 2);
    }
    _setLocalAutoFit(limit, indicatorItem, indicatorItemSpec) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if ("default" !== (null !== (_a = indicatorItemSpec.fitStrategy) && void 0 !== _a ? _a : "default")) return;
        const originWidth = (0, util_1.measureTextSize)(null !== (_c = null === (_b = indicatorItemSpec.style) || void 0 === _b ? void 0 : _b.text) && void 0 !== _c ? _c : "", null !== (_d = indicatorItemSpec.style) && void 0 !== _d ? _d : {}, null === (_f = null === (_e = this.stage) || void 0 === _e ? void 0 : _e.getTheme()) || void 0 === _f ? void 0 : _f.text).width;
        if (originWidth > 0) {
            const ratio = limit * (null !== (_g = indicatorItemSpec.fitPercent) && void 0 !== _g ? _g : .5) / originWidth, fontSize = Math.floor((null !== (_j = null === (_h = indicatorItemSpec.style) || void 0 === _h ? void 0 : _h.fontSize) && void 0 !== _j ? _j : 20) * ratio);
            indicatorItem.setAttribute("fontSize", fontSize), indicatorItem.setAttribute("lineHeight", (0, 
            vutils_1.isValid)(indicatorItemSpec.style.lineHeight) ? indicatorItemSpec.style.lineHeight : fontSize);
        }
    }
    _setGlobalAutoFit(limit) {
        var _a, _b, _c, _d, _e, _f, _g;
        const r = limit / 2, autoFitTexts = [];
        let otherHeight = 0;
        const titleSpec = null !== (_a = this.attribute.title) && void 0 !== _a ? _a : {};
        titleSpec.autoFit && "inscribed" === titleSpec.fitStrategy ? (this._title.setAttribute("fontSize", 12), 
        autoFitTexts.push({
            text: this._title,
            spec: null !== (_b = this.attribute.title) && void 0 !== _b ? _b : {}
        })) : otherHeight += null !== (_f = null === (_e = null === (_d = null === (_c = this._title) || void 0 === _c ? void 0 : _c.AABBBounds) || void 0 === _d ? void 0 : _d.height) || void 0 === _e ? void 0 : _e.call(_d)) && void 0 !== _f ? _f : 0;
        const titleSpace = null !== (_g = titleSpec.space) && void 0 !== _g ? _g : 0;
        if (otherHeight += titleSpace, (0, vutils_1.array)(this.attribute.content).filter((contentSpec => !1 !== contentSpec.visible)).forEach(((contentSpec, index) => {
            var _a, _b, _c, _d;
            const contentText = this._content[index];
            contentSpec.autoFit && "inscribed" === contentSpec.fitStrategy ? (contentText.setAttribute("fontSize", 12), 
            autoFitTexts.push({
                text: contentText,
                spec: contentSpec
            })) : otherHeight += null !== (_c = null === (_b = null === (_a = null == contentText ? void 0 : contentText.AABBBounds) || void 0 === _a ? void 0 : _a.height) || void 0 === _b ? void 0 : _b.call(_a)) && void 0 !== _c ? _c : 0;
            const contentSpace = null !== (_d = contentSpec.space) && void 0 !== _d ? _d : 0;
            otherHeight += contentSpace;
        })), autoFitTexts.length <= 0) return;
        const ra = 12 / autoFitTexts.reduce(((width, textItem) => Math.max(width, textItem.text.AABBBounds.width())), 0) * autoFitTexts.length, h = otherHeight / 2, a = ra ** 2 + 1, b = 2 * h * ra, c = h ** 2 - r ** 2, y = 2 * (ra * ((-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a)) + h), lineHeight = (y - otherHeight) / autoFitTexts.length;
        (0, vutils_1.isValidNumber)(y) && autoFitTexts.forEach((textItem => {
            var _a;
            const specLineHeight = null === (_a = textItem.spec.style) || void 0 === _a ? void 0 : _a.lineHeight;
            textItem.text.setAttribute("fontSize", lineHeight), textItem.text.setAttribute("lineHeight", (0, 
            vutils_1.isValid)(specLineHeight) ? specLineHeight : lineHeight);
        }));
    }
    _setYPosition() {
        var _a, _b, _c, _d, _e, _f;
        let lastContentHeight = 0;
        const titleHeight = null !== (_d = null === (_c = null === (_b = null === (_a = this._title) || void 0 === _a ? void 0 : _a.AABBBounds) || void 0 === _b ? void 0 : _b.height) || void 0 === _c ? void 0 : _c.call(_b)) && void 0 !== _d ? _d : 0, titleSpace = null !== (_f = null === (_e = this.attribute.title) || void 0 === _e ? void 0 : _e.space) && void 0 !== _f ? _f : 0;
        (0, vutils_1.array)(this.attribute.content).filter((contentSpec => !1 !== contentSpec.visible)).forEach(((contentSpec, index) => {
            var _a;
            const contentText = this._content[index];
            contentText.setAttribute("y", titleHeight + titleSpace + lastContentHeight);
            const contentSpace = null !== (_a = contentSpec.space) && void 0 !== _a ? _a : 0;
            lastContentHeight += contentText.AABBBounds.height() + contentSpace;
        }));
    }
}

exports.Indicator = Indicator;
//# sourceMappingURL=indicator.js.map