import type { ILine, IGraphicPicker, IGraphicRender } from '@visactor/vrender-core';
import { BaseLinePicker } from '../common/base-line-picker';
export declare class DefaultCanvasLinePicker extends BaseLinePicker<ILine> implements IGraphicPicker {
    readonly canvasRenderer: IGraphicRender;
    type: string;
    numberType: number;
    constructor(canvasRenderer: IGraphicRender);
}
