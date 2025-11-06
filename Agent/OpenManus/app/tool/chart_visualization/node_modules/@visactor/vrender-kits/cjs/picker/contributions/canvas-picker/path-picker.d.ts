import type { IPath, IGraphicRender, IGraphicPicker } from '@visactor/vrender-core';
import { BaseLinePicker } from '../common/base-line-picker';
export declare class DefaultCanvasPathPicker extends BaseLinePicker<IPath> implements IGraphicPicker {
    readonly canvasRenderer: IGraphicRender;
    type: string;
    numberType: number;
    constructor(canvasRenderer: IGraphicRender);
}
