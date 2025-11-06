import type { IArc3d, IGraphicPicker, IGraphicRender } from '@visactor/vrender-core';
import { Base3dPicker } from '../common/base-3d-picker';
export declare class DefaultCanvasArc3dPicker extends Base3dPicker<IArc3d> implements IGraphicPicker {
    readonly canvasRenderer: IGraphicRender;
    type: string;
    numberType: number;
    themeType: string;
    constructor(canvasRenderer: IGraphicRender);
}
