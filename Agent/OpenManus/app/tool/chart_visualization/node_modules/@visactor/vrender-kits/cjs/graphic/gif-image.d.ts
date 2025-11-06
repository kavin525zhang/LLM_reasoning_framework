import type { ISetAttributeContext } from '@visactor/vrender-core';
import { Image } from '@visactor/vrender-core';
import type { ParsedFrame } from 'gifuct-js';
import type { IGifImage, IGifImageGraphicAttribute } from '../interface/gif-image';
export declare class GifImage extends Image implements IGifImage {
    type: any;
    attribute: IGifImageGraphicAttribute;
    frameImageData?: ImageData;
    tempCanvas?: HTMLCanvasElement;
    tempCtx?: CanvasRenderingContext2D;
    gifCanvas?: HTMLCanvasElement;
    gifCtx?: CanvasRenderingContext2D;
    loadedFrames?: ParsedFrame[];
    frameIndex?: number;
    playing?: boolean;
    lastTime?: number;
    constructor(params: IGifImageGraphicAttribute);
    loadGif(): void;
    renderGIF(frames: ParsedFrame[]): void;
    renderFrame(context: CanvasRenderingContext2D, x: number, y: number): void;
    drawPatch(frame: ParsedFrame): void;
    manipulate(context: CanvasRenderingContext2D, x: number, y: number): void;
    setAttribute(key: string, value: any, forceUpdateTag?: boolean, context?: ISetAttributeContext): void;
    setAttributes(params: Partial<IGifImageGraphicAttribute>, forceUpdateTag?: boolean, context?: ISetAttributeContext): void;
}
export declare function createGifImage(attributes: IGifImageGraphicAttribute): IGifImage;
