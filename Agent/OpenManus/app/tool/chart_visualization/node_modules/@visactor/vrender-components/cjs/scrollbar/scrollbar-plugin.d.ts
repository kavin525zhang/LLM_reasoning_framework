import type { IGraphic, IGroup, IPlugin, IPluginService } from '@visactor/vrender-core';
import { ScrollBar } from './scrollbar';
import type { IAABBBounds } from '@visactor/vutils';
type IParams = {
    timeout?: number;
    bufferV?: number;
    bufferH?: number;
};
export declare class ScrollBarPlugin implements IPlugin {
    name: 'scrollbar';
    activeEvent: 'onRegister';
    pluginService: IPluginService;
    _uid: number;
    key: string;
    scrollContainer?: {
        g: IGroup;
        showH: boolean;
        showV: boolean;
    };
    scrollContainerBounds: IAABBBounds;
    childrenBounds: IAABBBounds;
    static defaultParams: IParams;
    params: IParams;
    activate(context: IPluginService): void;
    scroll: (e: {
        deltaX: number;
        deltaY: number;
        target: IGraphic;
    }) => void;
    handleScrollBarChange: (params: any) => void;
    initEventOfScrollbar(scrollContainer: IGroup, scrollbar: IGroup, isHorozntal?: boolean): void;
    addOrUpdateScroll(showH: boolean, showV: boolean, container: IGroup, scrollContainer: IGroup): void;
    getDirection(isHorozntal?: boolean): "horizontal" | "vertical";
    addOrUpdateHScroll(scrollContainer: IGroup, container: IGroup, isHorozntal?: boolean): {
        scrollBar: ScrollBar;
        isUpdate: boolean;
    };
    clearScrollbar(scrollContainer: IGroup, type: 'horizontal' | 'vertical' | 'all'): void;
    formatScrollContainer(g: IGraphic): {
        g: IGroup;
        showH: boolean;
        showV: boolean;
    };
    getScrollContainer(graphic: IGraphic): {
        g: IGroup;
        showH: boolean;
        showV: boolean;
    } | null;
    deactivate(context: IPluginService): void;
}
export {};
