import type { IPoint } from '@visactor/vutils';
import type { IPickParams, IGraphicRender, IGraphic } from '@visactor/vrender-core';
export declare abstract class PickerBase {
    canvasRenderer?: IGraphicRender;
    contains(graphic: IGraphic, point: IPoint, params?: IPickParams): boolean;
}
