import { BaseRender } from '@visactor/vrender-core';
import type { IGraphicAttribute, IGraphic, IPickParams, IGraphicRender } from '@visactor/vrender-core';
import type { IPoint } from '@visactor/vutils';
export declare abstract class BaseLinePicker<T extends IGraphic<Partial<IGraphicAttribute>>> extends BaseRender<T> {
    canvasRenderer: IGraphicRender;
    contains(graphic: IGraphic, point: IPoint, params?: IPickParams): boolean;
}
