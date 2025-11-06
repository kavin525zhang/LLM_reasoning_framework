import type { IGraphicPicker, IGraphicRender } from '@visactor/vrender-core';
import { GlyphPickerBase } from '../common/glyph-picker-base';
export declare class DefaultCanvasGlyphPicker extends GlyphPickerBase implements IGraphicPicker {
    readonly canvasRenderer: IGraphicRender;
    constructor(canvasRenderer: IGraphicRender);
}
