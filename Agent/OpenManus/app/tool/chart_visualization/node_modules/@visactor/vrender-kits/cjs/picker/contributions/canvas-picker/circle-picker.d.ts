import type { IGraphicPicker, IGraphicRender } from '@visactor/vrender-core';
import { PickerBase } from '../common/base';
export declare class DefaultCanvasCirclePicker extends PickerBase implements IGraphicPicker {
    readonly canvasRenderer: IGraphicRender;
    type: string;
    numberType: number;
    constructor(canvasRenderer: IGraphicRender);
}
