import type { IGraphic, IPlugin, IPluginService, IGroup, IStage, CreateDOMParamsType, CommonDomOptions, SimpleDomStyleOptions, IText, ILayer } from '../../interface';
export declare class HtmlAttributePlugin implements IPlugin {
    name: string;
    activeEvent: 'onRegister';
    pluginService: IPluginService;
    _uid: number;
    key: string;
    htmlMap: Record<string, {
        wrapContainer: HTMLElement;
        nativeContainer: HTMLElement;
        container: string | HTMLElement | null;
        renderId: number;
    }>;
    renderId: number;
    activate(context: IPluginService): void;
    deactivate(context: IPluginService): void;
    getWrapContainer(stage: IStage, userContainer?: string | HTMLElement | null, domParams?: CreateDOMParamsType): {
        wrapContainer: HTMLElement;
        nativeContainer: any;
    };
    parseDefaultStyleFromGraphic(graphic: IGraphic): any;
    getTransformOfText(graphic: IText): {
        textAlign: import("../../interface").TextAlignType;
        transform: string;
        transformOrigin: string;
    };
    onWheel: (ev: Event) => void;
    updateStyleOfWrapContainer(graphic: IGraphic, stage: IStage, wrapContainer: HTMLElement, nativeContainer: HTMLElement, options: SimpleDomStyleOptions & CommonDomOptions): void;
    protected clearCacheContainer(): void;
    protected drawHTML(layers: ILayer[]): void;
    renderGroupHTML(group: IGroup): void;
    removeElement(id: string): void;
    removeWrapContainerEventListener(wrapContainer: HTMLElement): void;
    renderGraphicHTML(graphic: IGraphic): void;
    release(): void;
    removeAllDom(g: IGraphic): void;
}
export declare const registerHtmlAttributePlugin: () => void;
