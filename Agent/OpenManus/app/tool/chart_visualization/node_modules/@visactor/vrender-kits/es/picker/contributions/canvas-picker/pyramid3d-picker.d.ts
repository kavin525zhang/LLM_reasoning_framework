import type { IPyramid3d, IGraphicRender, IGraphicPicker } from '@visactor/vrender-core';
import { Base3dPicker } from '../common/base-3d-picker';
export declare class DefaultCanvasPyramid3dPicker extends Base3dPicker<IPyramid3d> implements IGraphicPicker {
    readonly canvasRenderer: IGraphicRender;
    type: string;
    numberType: number;
    themeType: string;
    constructor(canvasRenderer: IGraphicRender);
}
