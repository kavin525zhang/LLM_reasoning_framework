"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerReactAttributePlugin = exports.ReactAttributePlugin = void 0;

const generator_1 = require("../../common/generator"), application_1 = require("../../application"), html_attribute_plugin_1 = require("./html-attribute-plugin"), vutils_1 = require("@visactor/vutils"), factory_1 = require("../../factory");

class ReactAttributePlugin extends html_attribute_plugin_1.HtmlAttributePlugin {
    constructor() {
        super(...arguments), this.name = "ReactAttributePlugin", this.activeEvent = "onRegister", 
        this._uid = generator_1.Generator.GenAutoIncrementId(), this.key = this.name + this._uid, 
        this.htmlMap = {};
    }
    removeElement(id) {
        if (!this.htmlMap || !this.htmlMap[id]) return;
        const {root: root, wrapContainer: wrapContainer, unmount: unmount} = this.htmlMap[id];
        if (root) {
            application_1.application.global.getRequestAnimationFrame()((() => {
                root.unmount();
            }));
        } else unmount && unmount();
        wrapContainer && application_1.application.global.removeDom(wrapContainer), this.htmlMap[id] = null;
    }
    renderGraphicHTML(graphic) {
        var _a;
        const {react: react} = graphic.attribute;
        if (!react) return;
        const stage = graphic.stage;
        if (!stage) return;
        const ReactDOM = stage.params.ReactDOM, {element: element, container: container} = react;
        if (!element || !ReactDOM || !ReactDOM.createRoot && !ReactDOM.render) return;
        const id = (0, vutils_1.isNil)(react.id) ? `${null !== (_a = graphic.id) && void 0 !== _a ? _a : graphic._uid}_react` : react.id;
        if (this.htmlMap && this.htmlMap[id] && container && container !== this.htmlMap[id].container && this.removeElement(id), 
        this.htmlMap && this.htmlMap[id]) ReactDOM.createRoot ? this.htmlMap[id].root.render(element) : ReactDOM.render(element, this.htmlMap[id].wrapContainer); else {
            const {wrapContainer: wrapContainer, nativeContainer: nativeContainer} = this.getWrapContainer(stage, container);
            if (wrapContainer) if (this.htmlMap || (this.htmlMap = {}), ReactDOM.createRoot) {
                const root = ReactDOM.createRoot(wrapContainer);
                root.render(element), this.htmlMap[id] = {
                    root: root,
                    wrapContainer: wrapContainer,
                    nativeContainer: nativeContainer,
                    container: container,
                    renderId: this.renderId
                };
            } else ReactDOM.render(element, wrapContainer), this.htmlMap[id] = {
                wrapContainer: wrapContainer,
                nativeContainer: nativeContainer,
                container: container,
                renderId: this.renderId,
                unmount: () => {
                    ReactDOM.unmountComponentAtNode(wrapContainer);
                }
            };
        }
        if (!this.htmlMap || !this.htmlMap[id]) return;
        const {wrapContainer: wrapContainer, nativeContainer: nativeContainer} = this.htmlMap[id];
        this.updateStyleOfWrapContainer(graphic, stage, wrapContainer, nativeContainer, react), 
        this.htmlMap[id].renderId = this.renderId;
    }
}

exports.ReactAttributePlugin = ReactAttributePlugin;

const registerReactAttributePlugin = () => {
    factory_1.Factory.registerPlugin("ReactAttributePlugin", ReactAttributePlugin);
};

exports.registerReactAttributePlugin = registerReactAttributePlugin;
//# sourceMappingURL=react-attribute-plugin.js.map
