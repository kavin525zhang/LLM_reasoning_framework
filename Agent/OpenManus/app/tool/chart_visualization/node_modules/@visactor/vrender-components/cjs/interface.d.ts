import type { ICustomPath2D, IGraphicAttribute, IGroup, IRectGraphicAttribute, ITimeline } from '@visactor/vrender-core';
export type Direction = 'horizontal' | 'vertical';
export type OrientType = 'top' | 'right' | 'bottom' | 'left';
export type BackgroundAttributes = {
    visible: boolean;
    customShape?: (container: IGroup, attrs: Partial<IGraphicAttribute>, path: ICustomPath2D) => ICustomPath2D;
} & Partial<IRectGraphicAttribute>;
export type IDelayType = 'debounce' | 'throttle';
export interface ComponentOptions {
    skipDefault?: boolean;
    mode?: '2d' | '3d';
    timeline?: ITimeline;
}
