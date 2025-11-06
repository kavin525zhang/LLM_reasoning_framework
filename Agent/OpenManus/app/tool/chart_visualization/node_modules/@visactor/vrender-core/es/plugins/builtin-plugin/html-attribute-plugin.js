import { Generator } from "../../common/generator";

import { application } from "../../application";

import { getTheme } from "../../graphic/theme";

import { DefaultAttribute } from "../../graphic/config";

import { textAttributesToStyle } from "../../common/text";

import { isFunction, isNil, isObject, isString, styleStringToObject, calculateAnchorOfBounds } from "@visactor/vutils";

import { Factory } from "../../factory";

export class HtmlAttributePlugin {
    constructor() {
        this.name = "HtmlAttributePlugin", this.activeEvent = "onRegister", this._uid = Generator.GenAutoIncrementId(), 
        this.key = this.name + this._uid, this.htmlMap = {}, this.renderId = 0, this.onWheel = ev => {
            try {
                const newEvent = new ev.constructor(ev.type, ev);
                this.pluginService.stage.window.getContext().getCanvas().nativeCanvas.dispatchEvent(newEvent);
            } catch (err) {
                return;
            }
        };
    }
    activate(context) {
        this.pluginService = context, context.stage.hooks.afterRender.tap(this.key, (stage => {
            stage && stage === this.pluginService.stage && this.drawHTML([ ...context.stage.getChildren() ]);
        }));
    }
    deactivate(context) {
        context.stage.hooks.afterRender.taps = context.stage.hooks.afterRender.taps.filter((item => item.name !== this.key)), 
        application.graphicService.hooks.onRemove.unTap(this.key), application.graphicService.hooks.onRelease.unTap(this.key), 
        this.release();
    }
    getWrapContainer(stage, userContainer, domParams) {
        let nativeContainer;
        return nativeContainer = userContainer ? "string" == typeof userContainer ? application.global.getElementById(userContainer) : userContainer : stage.window.getContainer(), 
        {
            wrapContainer: application.global.createDom(Object.assign({
                tagName: "div",
                parent: nativeContainer
            }, domParams)),
            nativeContainer: nativeContainer
        };
    }
    parseDefaultStyleFromGraphic(graphic) {
        const attrs = "text" === graphic.type && graphic.attribute ? graphic.attribute : getTheme(graphic).text;
        return textAttributesToStyle(attrs);
    }
    getTransformOfText(graphic) {
        const textTheme = getTheme(graphic).text, {textAlign: textAlign = textTheme.textAlign, textBaseline: textBaseline = textTheme.textBaseline} = graphic.attribute, cssAttrs = graphic.globalTransMatrix.toTransformAttrs(), {rotateDeg: rotateDeg, scaleX: scaleX, scaleY: scaleY} = cssAttrs, translateMap = {
            left: "0",
            start: "0",
            end: "-100%",
            center: "-50%",
            right: "-100%",
            top: "0",
            middle: "-50%",
            bottom: "-100%",
            alphabetic: "-79%"
        }, originMap = {
            left: "0",
            start: "0",
            end: "100%",
            center: "50%",
            right: "100%",
            top: "0",
            middle: "50%",
            bottom: "100%",
            alphabetic: "79%"
        };
        return {
            textAlign: textAlign,
            transform: `translate(${translateMap[textAlign]},${translateMap[textBaseline]}) rotate(${rotateDeg}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
            transformOrigin: `${originMap[textAlign]} ${originMap[textBaseline]}`
        };
    }
    updateStyleOfWrapContainer(graphic, stage, wrapContainer, nativeContainer, options) {
        const {pointerEvents: pointerEvents, penetrateEventList: penetrateEventList = []} = options;
        let calculateStyle = this.parseDefaultStyleFromGraphic(graphic);
        calculateStyle.display = !1 !== graphic.attribute.visible ? "block" : "none", calculateStyle.pointerEvents = !0 === pointerEvents ? "all" : pointerEvents || "none", 
        "none" !== calculateStyle.pointerEvents && (this.removeWrapContainerEventListener(wrapContainer), 
        penetrateEventList.forEach((event => {
            "wheel" === event && wrapContainer.addEventListener("wheel", this.onWheel);
        }))), wrapContainer.style.position || (wrapContainer.style.position = "absolute", 
        nativeContainer.style.position = "relative");
        let left = 0, top = 0;
        const b = graphic.globalAABBBounds;
        let anchorType = options.anchorType;
        if (isNil(anchorType) && (anchorType = "text" === graphic.type ? "position" : "boundsLeftTop"), 
        "boundsLeftTop" === anchorType && (anchorType = "top-left"), "position" === anchorType || b.empty()) {
            const matrix = graphic.globalTransMatrix;
            left = matrix.e, top = matrix.f;
        } else {
            const anchor = calculateAnchorOfBounds(b, anchorType);
            left = anchor.x, top = anchor.y;
        }
        const containerTL = application.global.getElementTopLeft(nativeContainer, !1), windowTL = stage.window.getTopLeft(!1), viewBox = stage.viewBox, offsetX = left + windowTL.left - containerTL.left + viewBox.x1, offsetTop = top + windowTL.top - containerTL.top + viewBox.y1;
        if (calculateStyle.left = `${offsetX}px`, calculateStyle.top = `${offsetTop}px`, 
        "text" === graphic.type && "position" === anchorType && (calculateStyle = Object.assign(Object.assign({}, calculateStyle), this.getTransformOfText(graphic))), 
        isFunction(options.style)) {
            const userStyle = options.style({
                top: offsetTop,
                left: offsetX,
                width: b.width(),
                height: b.height()
            }, graphic, wrapContainer);
            userStyle && (calculateStyle = Object.assign(Object.assign({}, calculateStyle), userStyle));
        } else isObject(options.style) ? calculateStyle = Object.assign(Object.assign({}, calculateStyle), options.style) : isString(options.style) && options.style && (calculateStyle = Object.assign(Object.assign({}, calculateStyle), styleStringToObject(options.style)));
        application.global.updateDom(wrapContainer, {
            width: options.width,
            height: options.height,
            style: calculateStyle
        });
    }
    clearCacheContainer() {
        this.htmlMap && Object.keys(this.htmlMap).forEach((key => {
            this.htmlMap[key] && this.htmlMap[key].renderId !== this.renderId && this.removeElement(key);
        })), this.renderId += 1;
    }
    drawHTML(layers) {
        "browser" === application.global.env && (layers.sort(((a, b) => {
            var _a, _b;
            return (null !== (_a = a.attribute.zIndex) && void 0 !== _a ? _a : DefaultAttribute.zIndex) - (null !== (_b = b.attribute.zIndex) && void 0 !== _b ? _b : DefaultAttribute.zIndex);
        })).forEach((group => {
            this.renderGroupHTML(group);
        })), this.clearCacheContainer());
    }
    renderGroupHTML(group) {
        this.renderGraphicHTML(group), group.forEachChildren((g => {
            g.isContainer ? this.renderGroupHTML(g) : this.renderGraphicHTML(g);
        }));
    }
    removeElement(id) {
        if (!this.htmlMap || !this.htmlMap[id]) return;
        const {wrapContainer: wrapContainer} = this.htmlMap[id];
        wrapContainer && application.global.removeDom(wrapContainer), this.htmlMap[id] = null;
    }
    removeWrapContainerEventListener(wrapContainer) {
        wrapContainer.removeEventListener("wheel", this.onWheel);
    }
    renderGraphicHTML(graphic) {
        var _a;
        const {html: html} = graphic.attribute;
        if (!html) return;
        const stage = graphic.stage;
        if (!stage) return;
        const {dom: dom, container: container} = html;
        if (!dom) return;
        const id = isNil(html.id) ? `${null !== (_a = graphic.id) && void 0 !== _a ? _a : graphic._uid}_react` : html.id;
        if (this.htmlMap && this.htmlMap[id] && container && container !== this.htmlMap[id].container && this.removeElement(id), 
        this.htmlMap && this.htmlMap[id]) "string" == typeof dom ? this.htmlMap[id].wrapContainer.innerHTML = dom : dom !== this.htmlMap[id].wrapContainer.firstChild && (this.htmlMap[id].wrapContainer.removeChild(this.htmlMap[id].wrapContainer.firstChild), 
        this.htmlMap[id].wrapContainer.appendChild(dom)); else {
            const {wrapContainer: wrapContainer, nativeContainer: nativeContainer} = this.getWrapContainer(stage, container);
            wrapContainer && ("string" == typeof dom ? wrapContainer.innerHTML = dom : wrapContainer.appendChild(dom), 
            this.htmlMap || (this.htmlMap = {}), this.htmlMap[id] = {
                wrapContainer: wrapContainer,
                nativeContainer: nativeContainer,
                container: container,
                renderId: this.renderId
            });
        }
        if (!this.htmlMap || !this.htmlMap[id]) return;
        const {wrapContainer: wrapContainer, nativeContainer: nativeContainer} = this.htmlMap[id];
        this.updateStyleOfWrapContainer(graphic, stage, wrapContainer, nativeContainer, html), 
        this.htmlMap[id].renderId = this.renderId;
    }
    release() {
        "browser" === application.global.env && this.removeAllDom(this.pluginService.stage.defaultLayer);
    }
    removeAllDom(g) {
        this.htmlMap && (Object.keys(this.htmlMap).forEach((key => {
            this.removeElement(key);
        })), this.htmlMap = null);
    }
}

export const registerHtmlAttributePlugin = () => {
    Factory.registerPlugin("HtmlAttributePlugin", HtmlAttributePlugin);
};
//# sourceMappingURL=html-attribute-plugin.js.map
