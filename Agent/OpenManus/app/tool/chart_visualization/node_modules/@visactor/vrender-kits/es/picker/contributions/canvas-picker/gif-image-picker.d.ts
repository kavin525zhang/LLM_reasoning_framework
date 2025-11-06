import type { IPoint } from '@visactor/vutils';
import type { IGraphicPicker, IPickParams } from '@visactor/vrender-core';
import type { IGifImage } from '../../../interface/gif-image';
export declare class DefaultCanvasGifImagePicker implements IGraphicPicker {
    type: string;
    numberType: number;
    contains(gifImage: IGifImage, point: IPoint, params?: IPickParams): boolean;
}
