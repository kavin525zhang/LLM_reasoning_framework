import type { IRect3d, IGraphicPicker, IGraphicRender } from '@visactor/vrender-core';
import { Base3dPicker } from '../common/base-3d-picker';
export declare class DefaultCanvasRect3dPicker extends Base3dPicker<IRect3d> implements IGraphicPicker {
    readonly canvasRenderer: IGraphicRender;
    type: string;
    numberType: number;
    themeType: string;
    constructor(canvasRenderer: IGraphicRender);
}
