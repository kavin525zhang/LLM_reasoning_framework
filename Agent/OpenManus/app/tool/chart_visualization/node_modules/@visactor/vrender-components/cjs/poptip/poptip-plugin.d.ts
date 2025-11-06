import type { FederatedPointerEvent, IGraphic, IPlugin, IPluginService } from '@visactor/vrender-core';
export declare abstract class PopTipPluginBase {
    activeEvent: 'onRegister';
    pluginService: IPluginService;
    _uid: number;
    activeGraphic: IGraphic;
    activate(context: IPluginService): void;
    needHide(graphic: IGraphic): boolean;
    needShow(graphic: IGraphic): boolean;
    poptip: (e: FederatedPointerEvent) => void;
    unpoptip: (e: FederatedPointerEvent) => void;
    setActiveGraphic(graphic: any | null, rerender?: boolean): void;
    deactivate(context: IPluginService): void;
}
export declare class PopTipPlugin extends PopTipPluginBase implements IPlugin {
    name: 'poptip';
    key: string;
}
export declare class PopTipForClipedTextPlugin extends PopTipPluginBase implements IPlugin {
    name: 'poptipForText';
    key: string;
    activate(context: IPluginService): void;
    pointerlave: (e: any) => void;
    needHide(graphic: IGraphic): any;
    needShow(graphic: IGraphic): boolean;
    deactivate(context: IPluginService): void;
}
