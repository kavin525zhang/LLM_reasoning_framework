import { BaseEnvContribution } from '@visactor/vrender-core';
import type { ICanvasLike, EnvType, ICreateCanvasParams, IEnvContribution, CreateDOMParamsType } from '@visactor/vrender-core';
import type { IBoundsLike, IPointLike } from '@visactor/vutils';
export declare function createImageElement(src: string, isSvg?: boolean): Promise<HTMLImageElement>;
export declare class BrowserEnvContribution extends BaseEnvContribution implements IEnvContribution {
    type: EnvType;
    supportEvent: boolean;
    _isMacOS?: boolean;
    constructor();
    mapToCanvasPoint(nativeEvent: PointerEvent | WheelEvent | TouchEvent, domElement?: any): IPointLike;
    getNativeAABBBounds(_dom: any): IBoundsLike;
    removeDom(dom: HTMLElement): boolean;
    updateDom(dom: HTMLElement, params: CreateDOMParamsType): boolean;
    createDom(params: CreateDOMParamsType): HTMLElement | null;
    loadImage(url: string): Promise<{
        loadState: 'success' | 'fail';
        data: HTMLImageElement | ImageData | null;
    }>;
    loadSvg(url: string): Promise<{
        loadState: 'success' | 'fail';
        data: HTMLImageElement | ImageData | null;
    }>;
    createCanvas(params: ICreateCanvasParams): HTMLCanvasElement;
    createOffscreenCanvas(params: ICreateCanvasParams): OffscreenCanvas;
    releaseCanvas(canvas: ICanvasLike | string): void;
    getDevicePixelRatio(): number;
    getRequestAnimationFrame(): (callback: FrameRequestCallback) => number;
    getCancelAnimationFrame(): (h: number) => void;
    addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
    removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
    dispatchEvent(event: any): boolean;
    getElementById(str: string): HTMLElement | null;
    getRootElement(): HTMLElement | null;
    getDocument(): Document | null;
    release(...params: any): void;
    getElementTop(element: HTMLElement, baseWindow?: boolean): number;
    getElementLeft(element: HTMLElement, baseWindow?: boolean): number;
    getElementTopLeft(element: HTMLElement, baseWindow?: boolean): {
        top: number;
        left: number;
    };
    loadFont(font: string, source: string | BinaryData, descriptors?: FontFaceDescriptors): Promise<{
        loadState: 'success' | 'fail';
    }>;
    isMacOS(): boolean;
    copyToClipBoard(text: string): Promise<void>;
}
