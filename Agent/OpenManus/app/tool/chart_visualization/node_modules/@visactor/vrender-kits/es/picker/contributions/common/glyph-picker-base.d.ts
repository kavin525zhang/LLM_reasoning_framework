import type { IPoint } from '@visactor/vutils';
import type { IGlyph, IPickParams } from '@visactor/vrender-core';
export declare class GlyphPickerBase {
    type: string;
    numberType: number;
    contains(glyph: IGlyph, point: IPoint, params?: IPickParams): boolean;
}
