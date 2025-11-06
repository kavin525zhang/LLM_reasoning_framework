import type { IGraphic, IPlugin, IPluginService } from '../../interface';
import { HtmlAttributePlugin } from './html-attribute-plugin';
export declare class ReactAttributePlugin extends HtmlAttributePlugin implements IPlugin {
    name: 'ReactAttributePlugin';
    activeEvent: 'onRegister';
    pluginService: IPluginService;
    _uid: number;
    key: string;
    htmlMap: Record<string, {
        root?: any;
        unmount?: () => void;
        wrapContainer: HTMLElement;
        nativeContainer: HTMLElement;
        container: string | HTMLElement | null;
        renderId: number;
    }>;
    removeElement(id: string): void;
    renderGraphicHTML(graphic: IGraphic): void;
}
export declare const registerReactAttributePlugin: () => void;
