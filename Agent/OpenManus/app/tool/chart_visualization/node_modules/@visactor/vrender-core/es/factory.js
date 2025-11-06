export class Factory {
    static registerPlugin(pluginKey, pluginClass) {
        Factory._pluginClasses[pluginKey] = pluginClass;
    }
    static getPlugin(pluginKey) {
        return Factory._pluginClasses[pluginKey];
    }
}

Factory._pluginClasses = {};
//# sourceMappingURL=factory.js.map