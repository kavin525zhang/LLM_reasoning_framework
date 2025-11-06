"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Factory = void 0;

class Factory {
    static registerPlugin(pluginKey, pluginClass) {
        Factory._pluginClasses[pluginKey] = pluginClass;
    }
    static getPlugin(pluginKey) {
        return Factory._pluginClasses[pluginKey];
    }
}

exports.Factory = Factory, Factory._pluginClasses = {};
//# sourceMappingURL=factory.js.map