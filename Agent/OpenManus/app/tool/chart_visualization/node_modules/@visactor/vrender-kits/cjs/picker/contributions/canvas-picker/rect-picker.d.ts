import type { IGraphicPicker, IGraphicRender } from '@visactor/vrender-core';
import { RectPickerBase } from '../common/rect-picker-base';
export declare class DefaultCanvasRectPicker extends RectPickerBase implements IGraphicPicker {
    readonly canvasRenderer: IGraphicRender;
    constructor(canvasRenderer: IGraphicRender);
}
