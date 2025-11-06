"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.registerComponentPlugin = void 0;

const factory_1 = require("../../core/factory"), registerComponentPlugin = plugin => {
    factory_1.Factory.registerComponentPlugin(plugin.type, plugin);
};

exports.registerComponentPlugin = registerComponentPlugin;
//# sourceMappingURL=register.js.map
