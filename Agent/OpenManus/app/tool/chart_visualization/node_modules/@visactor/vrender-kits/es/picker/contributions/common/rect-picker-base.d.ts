import type { IPoint } from '@visactor/vutils';
import type { IRect, IGraphicRender, IPickParams } from '@visactor/vrender-core';
export declare class RectPickerBase {
    type: string;
    numberType: number;
    canvasRenderer: IGraphicRender;
    contains(rect: IRect, point: IPoint, params?: IPickParams): boolean;
}
