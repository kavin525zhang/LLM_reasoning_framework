import type { IGraphic, IPlugin, IPluginService } from '../../interface';
export declare class AutoRenderPlugin implements IPlugin {
    name: 'AutoRenderPlugin';
    activeEvent: 'onRegister';
    pluginService: IPluginService;
    _uid: number;
    key: string;
    handleChange: (graphic: IGraphic) => void;
    activate(context: IPluginService): void;
    deactivate(context: IPluginService): void;
}
