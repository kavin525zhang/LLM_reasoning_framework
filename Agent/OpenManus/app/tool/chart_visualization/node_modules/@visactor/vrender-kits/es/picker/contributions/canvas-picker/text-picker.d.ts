import type { IPoint } from '@visactor/vutils';
import type { IText, IGraphicPicker, IGraphicRender, IPickParams } from '@visactor/vrender-core';
import { Base3dPicker } from '../common/base-3d-picker';
export declare class DefaultCanvasTextPicker extends Base3dPicker<IText> implements IGraphicPicker {
    readonly canvasRenderer: IGraphicRender;
    type: string;
    numberType: number;
    constructor(canvasRenderer: IGraphicRender);
    contains(text: IText, point: IPoint, params?: IPickParams): boolean;
}
