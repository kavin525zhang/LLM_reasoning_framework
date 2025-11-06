import type { IContext2d, EnvType, ISetStrokeStyleParams, IStrokeStyleParams, ITextStyleParams } from '@visactor/vrender-core';
import { BrowserContext2d } from '../browser';
export declare class HarmonyContext2d extends BrowserContext2d implements IContext2d {
    static env: EnvType;
    drawPromise?: Promise<any>;
    _globalAlpha: number;
    get globalAlpha(): number;
    set globalAlpha(ga: number);
    setLineDash(segments: number[]): void;
    protected _setStrokeStyle(params: ISetStrokeStyleParams, attribute: IStrokeStyleParams, offsetX: number, offsetY: number, defaultParams?: IStrokeStyleParams): void;
    measureText(text: string, method?: 'native' | 'simple' | 'quick'): {
        width: number;
    };
    setTextStyleWithoutAlignBaseline(params: Partial<ITextStyleParams>, defaultParams?: ITextStyleParams, z?: number): void;
    setTextStyle(params: Partial<ITextStyleParams>, defaultParams?: ITextStyleParams, z?: number): void;
    createPattern(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, repetition: string): CanvasPattern;
    drawImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, dstX: number, dstY: number): void;
    drawImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, dstX: number, dstY: number, dstW: number, dstH: number): void;
    drawImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, srcX: number, srcY: number, srcW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
    draw(): void;
}
