import type { IGraphic, IPlugin, IPluginService } from '../../interface';
export declare class AutoRefreshPlugin implements IPlugin {
    name: 'AutoRefreshPlugin';
    activeEvent: 'onRegister';
    pluginService: IPluginService;
    _uid: number;
    key: string;
    dpr: number;
    rafId: number;
    autoRefreshCbs?: (() => void)[];
    handleChange: (graphic: IGraphic) => void;
    activate(context: IPluginService): void;
    refresh(): void;
    protected _refreshByRaf(): void;
    protected _refreshByMediaQuery(): boolean;
    deactivate(context: IPluginService): void;
}
