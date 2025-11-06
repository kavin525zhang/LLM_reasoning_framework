export declare class Factory {
    private static _pluginClasses;
    static registerPlugin(pluginKey: string, pluginClass: any): void;
    static getPlugin(pluginKey: string): any;
}
