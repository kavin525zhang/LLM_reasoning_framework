import { createID } from "../../util/id";

import { warn } from "../../util/debug";

export class BasePluginService {
    constructor() {
        this.id = createID(), this._plugins = [];
    }
    add(plugins) {
        if (!plugins || 0 === plugins.length) return null;
        const unloadedPlugins = [];
        return plugins.forEach((plugin => {
            this._plugins.find((p => p.id === plugin.id)) ? warn("不要重复添加相同的plugin") : (this._plugins.push(plugin), 
            unloadedPlugins.push(plugin), plugin.onAdd && plugin.onAdd(this));
        })), unloadedPlugins;
    }
    load(plugins) {
        const unloadedPlugins = this.add(plugins);
        unloadedPlugins && unloadedPlugins.length && this.activate(plugins);
    }
    activate(plugins) {
        plugins.length && plugins.forEach((plugin => {
            plugin.init && plugin.init();
        }));
    }
    get(id) {
        return this._plugins.find((p => p.id === id));
    }
    getAll() {
        return this._plugins.slice();
    }
    release(pluginsId) {
        const plugin = this.get(pluginsId);
        plugin && (plugin.release(this), this._plugins = this._plugins.filter((entry => entry !== plugin)));
    }
    releaseAll() {
        this._plugins.forEach((plugin => {
            plugin.release(this);
        })), this._plugins = [];
    }
    clear(pluginsId) {
        const plugin = this.get(pluginsId);
        plugin && plugin.clear(this);
    }
    clearAll() {
        this._plugins.forEach((plugin => {
            var _a;
            null === (_a = plugin.clear) || void 0 === _a || _a.call(plugin, this);
        }));
    }
}
//# sourceMappingURL=base-plugin-service.js.map
