"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerMorph = exports.registerGesturePlugin = exports.registerDragPlugin = exports.registerHtmlAttributePlugin = exports.registerReactAttributePlugin = exports.registerAnimate = exports.register3DPlugin = void 0;

const vrender_core_1 = require("@visactor/vrender-core");

Object.defineProperty(exports, "registerHtmlAttributePlugin", {
    enumerable: !0,
    get: function() {
        return vrender_core_1.registerHtmlAttributePlugin;
    }
}), Object.defineProperty(exports, "registerReactAttributePlugin", {
    enumerable: !0,
    get: function() {
        return vrender_core_1.registerReactAttributePlugin;
    }
});

const vgrammar_core_1 = require("@visactor/vgrammar-core");

Object.defineProperty(exports, "registerDragPlugin", {
    enumerable: !0,
    get: function() {
        return vgrammar_core_1.registerDragPlugin;
    }
}), Object.defineProperty(exports, "registerGesturePlugin", {
    enumerable: !0,
    get: function() {
        return vgrammar_core_1.registerGesturePlugin;
    }
});

const config_1 = require("../animation/config"), register3DPlugin = () => {
    (0, vrender_core_1.registerDirectionalLight)(), (0, vrender_core_1.registerOrthoCamera)(), 
    (0, vrender_core_1.registerViewTransform3dPlugin)();
};

exports.register3DPlugin = register3DPlugin;

const registerAnimate = () => {
    (0, vgrammar_core_1.registerAnimate)(), (0, config_1.registerVGrammarCommonAnimation)();
};

exports.registerAnimate = registerAnimate, exports.registerMorph = vgrammar_core_1.registerViewMorphAPI;
//# sourceMappingURL=other.js.map
