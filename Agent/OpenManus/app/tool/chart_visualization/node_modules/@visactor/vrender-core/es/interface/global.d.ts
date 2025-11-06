import type { Dict, IAABBBoundsLike, IPointLike } from '@visactor/vutils';
import type { ICanvasLike } from './canvas';
import type { IEventElement } from './common';
import type { IContribution } from './contribution';
import type { ISyncHook } from './sync-hook';
export interface ILoader {
    loadImage: (url: string) => HTMLImageElement | ImageData;
    loadJson: (url: string) => JSON;
}
export type EnvType = 'browser' | 'feishu' | 'tt' | 'taro' | 'node' | 'native' | 'lynx' | 'wx' | 'harmony';
export interface ICreateCanvasParams {
    id?: string;
    width?: number;
    height?: number;
    dpr?: number;
}
export interface ILoader {
    loadImage: (url: string) => HTMLImageElement | ImageData;
    loadJson: (url: string) => JSON;
}
export interface IEnvContribution extends IContribution<IGlobal>, Omit<IEventElement, 'on' | 'off' | 'once' | 'emit' | 'removeAllListeners'> {
    type: EnvType;
    supportEvent: boolean;
    configure: (global: IGlobal, ...p: any) => void;
    createCanvas: (params: ICreateCanvasParams) => ICanvasLike | any;
    createOffscreenCanvas: (params: ICreateCanvasParams) => ICanvasLike | any;
    releaseCanvas: (canvas: ICanvasLike | string | any) => void;
    getNativeAABBBounds: (dom: string | HTMLElement | any) => IAABBBoundsLike;
    removeDom: (dom: HTMLElement) => boolean;
    createDom: (params: CreateDOMParamsType) => HTMLElement | null;
    updateDom: (dom: HTMLElement, params: CreateDOMParamsType) => boolean;
    getElementTop: (dom: any, baseWindow?: boolean) => number;
    getElementLeft: (dom: any, baseWindow?: boolean) => number;
    getElementTopLeft: (dom: any, baseWindow?: boolean) => {
        top: number;
        left: number;
    };
    getDynamicCanvasCount: () => number;
    getStaticCanvasCount: () => number;
    getDevicePixelRatio: () => number;
    getRequestAnimationFrame: () => (callback: FrameRequestCallback) => number;
    getCancelAnimationFrame: () => (h: number) => void;
    getElementById?: (str: string) => HTMLElement | null;
    getRootElement?: () => HTMLElement | null;
    getDocument?: () => Document | null;
    supportsTouchEvents: boolean;
    supportsPointerEvents: boolean;
    supportsMouseEvents: boolean;
    applyStyles?: boolean;
    mapToCanvasPoint?: (event: any, domElement?: any) => IPointLike | null;
    loadImage: (url: string) => Promise<{
        loadState: 'success' | 'fail';
        data: HTMLImageElement | ImageData | null;
    }>;
    loadSvg: (url: string) => Promise<{
        loadState: 'success' | 'fail';
        data: HTMLImageElement | ImageData | null;
    }>;
    loadJson: (url: string) => Promise<{
        loadState: 'success' | 'fail';
        data: Record<string, unknown> | null;
    }>;
    loadArrayBuffer: (url: string) => Promise<{
        loadState: 'success' | 'fail';
        data: ArrayBuffer | null;
    }>;
    loadBlob: (url: string) => Promise<{
        loadState: 'success' | 'fail';
        data: Blob | null;
    }>;
    loadFont: (font: string, source: string | BinaryData, descriptors?: FontFaceDescriptors) => Promise<{
        loadState: 'success' | 'fail';
    }>;
    isMacOS: () => boolean;
    copyToClipBoard: (text: string) => Promise<void>;
}
export type IMiniAppEnvParams = {
    domref?: Dict<any>;
    force?: boolean;
    canvasIdLists?: (string | number)[];
    freeCanvasIdx?: string | number;
    taro?: any;
    pixelRatio?: number;
    [key: string]: any;
};
export interface IEnvParamsMap {
    readonly taro: IMiniAppEnvParams;
    readonly feishu: IMiniAppEnvParams;
    readonly tt: IMiniAppEnvParams;
    readonly browser: any;
    readonly node: any;
    readonly native: any;
    readonly lynx: any;
    readonly wx: any;
    readonly harmony: any;
}
export type CreateDOMParamsType = {
    tagName?: string;
    width?: number;
    height?: number;
    style?: string | Record<string, any>;
    parent?: string | HTMLElement;
};
export interface IGlobal extends Omit<IEventElement, 'on' | 'off' | 'once' | 'emit' | 'removeAllListeners'> {
    env: EnvType;
    devicePixelRatio: number;
    hooks: {
        onSetEnv: ISyncHook<[EnvType | undefined, EnvType, IGlobal]>;
    };
    envParams?: any;
    supportEvent: boolean;
    optimizeVisible: boolean;
    setEnv: (env: EnvType, params?: IEnvParamsMap[EnvType]) => void;
    setActiveEnvContribution: (contribution: IEnvContribution) => void;
    createCanvas: (params: ICreateCanvasParams) => HTMLCanvasElement | any;
    createOffscreenCanvas: (params: ICreateCanvasParams) => HTMLCanvasElement | any;
    releaseCanvas: (canvas: HTMLCanvasElement | string | any) => void;
    getDynamicCanvasCount: () => number;
    isChrome: () => boolean;
    isSafari: () => boolean;
    isMacOS: () => boolean;
    copyToClipBoard: (text: string) => Promise<void>;
    getStaticCanvasCount: () => number;
    getElementById: (str: string) => HTMLElement | null;
    getRootElement: () => HTMLElement | null;
    getDocument: () => Document | null;
    supportsTouchEvents: boolean;
    supportsPointerEvents: boolean;
    supportsMouseEvents: boolean;
    applyStyles?: boolean;
    measureTextMethod: 'native' | 'simple' | 'quick';
    getRequestAnimationFrame: () => null | ((callback: FrameRequestCallback) => number);
    getCancelAnimationFrame: () => null | ((h: number) => void);
    mapToCanvasPoint: (nativeEvent: any, domElement?: any) => IPointLike | null;
    loadImage: (url: string) => Promise<{
        loadState: 'success' | 'fail';
        data: HTMLImageElement | ImageData | null;
    }>;
    loadSvg: (url: string) => Promise<{
        loadState: 'success' | 'fail';
        data: HTMLImageElement | ImageData | null;
    }>;
    loadJson: (url: string) => Promise<{
        loadState: 'success' | 'fail';
        data: Record<string, unknown> | null;
    }>;
    loadArrayBuffer: (url: string) => Promise<{
        loadState: 'success' | 'fail';
        data: ArrayBuffer | null;
    }>;
    loadBlob: (url: string) => Promise<{
        loadState: 'success' | 'fail';
        data: Blob | null;
    }>;
    removeDom: (dom: HTMLElement) => boolean;
    createDom: (params: CreateDOMParamsType) => HTMLElement | null;
    updateDom: (dom: HTMLElement, params: CreateDOMParamsType) => boolean;
    getElementTop: (dom: any, baseWindow?: boolean) => number;
    getElementLeft: (dom: any, baseWindow?: boolean) => number;
    getElementTopLeft: (dom: any, baseWindow?: boolean) => {
        top: number;
        left: number;
    };
    isImageAnonymous: boolean;
}
