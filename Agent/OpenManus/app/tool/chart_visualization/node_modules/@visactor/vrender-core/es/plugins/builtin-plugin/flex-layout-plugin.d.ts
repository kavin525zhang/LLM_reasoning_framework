import type { IGraphic, IGroup, IGroupAttribute } from '../../interface';
import type { IPlugin, IPluginService } from '../../interface';
import { AABBBounds } from '@visactor/vutils';
type IAnchorPosMap = {
    'flex-start': number;
    'flex-end': number;
    center: number;
};
export declare class FlexLayoutPlugin implements IPlugin {
    name: 'FlexLayoutPlugin';
    activeEvent: 'onRegister';
    pluginService: IPluginService;
    id: number;
    key: string;
    tempBounds: AABBBounds;
    pause: boolean;
    skipBoundsTrigger: boolean;
    pauseLayout(p: boolean): void;
    tryLayoutChildren(graphic: IGraphic): void;
    tryLayout(graphic: IGraphic, force?: boolean): void;
    getAABBBounds(graphic: IGraphic): import("@visactor/vutils").IBounds;
    private updateChildPos;
    layoutMain(p: IGroup, children: IGraphic[], justifyContent: IGroupAttribute['justifyContent'], main: {
        len: number;
        field: string;
    }, mianLenArray: {
        mainLen: number;
        crossLen: number;
    }[], lastIdx: number, currSeg: {
        idx: number;
        mainLen: number;
        crossLen: number;
    }): void;
    layoutCross(children: IGraphic[], alignItem: IGroupAttribute['alignItems'], cross: {
        len: number;
        field: string;
    }, anchorPosMap: IAnchorPosMap, lenArray: {
        mainLen: number;
        crossLen: number;
    }[], currSeg: {
        idx: number;
        mainLen: number;
        crossLen: number;
    }, lastIdx: number): void;
    activate(context: IPluginService): void;
    deactivate(context: IPluginService): void;
}
export declare const registerFlexLayoutPlugin: () => void;
export {};
