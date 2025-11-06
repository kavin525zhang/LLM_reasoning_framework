import type { IBounds, IBoundsLike, IMatrix, IPointLike } from '@visactor/vutils';
import type { ICanvas } from './canvas';
import type { IContext2d } from './context';
import type { IDomRectLike, IEventElement, Releaseable } from './common';
import type { ISyncHook } from './sync-hook';
import type { IContribution } from './contribution';
import type { IGlobal } from './global';
export interface IWindowParams {
    canvas?: string | HTMLCanvasElement;
    offscreen?: boolean;
    width?: number;
    height?: number;
    viewBox?: IBoundsLike;
    x?: number;
    y?: number;
    dpr: number;
    container?: string | HTMLElement;
    canvasControled: boolean;
    title: string;
    CreateWindow?: (w: number, h: number, title: string) => void;
}
export interface IWindow extends Releaseable, Omit<IEventElement, 'on' | 'off' | 'once' | 'emit' | 'removeAllListeners'> {
    hooks: {
        onChange: ISyncHook<[number, number, number, number]>;
    };
    width: number;
    height: number;
    resizable: boolean;
    minHeight: number;
    minWidth: number;
    maxHeight: number;
    maxWidth: number;
    title: string;
    dpr: number;
    style: CSSStyleDeclaration | Record<string, any>;
    create: (options: IWindowParams) => void;
    setWindowHandler: (handler: IWindowHandlerContribution) => void;
    setDpr: (dpr: number) => void;
    resize: (w: number, h: number) => void;
    configure: () => void;
    getContext: () => IContext2d;
    getNativeHandler: () => ICanvas;
    getContainer: () => HTMLElement | any;
    getImageBuffer: (type?: string) => any;
    clearViewBox: (color?: string) => void;
    setViewBox: (vb: IBoundsLike) => void;
    getViewBox: () => IBounds;
    setViewBoxTransform: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    getViewBoxTransform: () => IMatrix;
    hasSubView: () => boolean;
    pointTransform: (x: number, y: number) => IPointLike;
    getBoundingClientRect: () => IDomRectLike;
    isVisible: (bbox?: IBoundsLike) => boolean;
    onVisibleChange: (cb: (currentVisible: boolean) => void) => void;
    getTopLeft: (baseWindow?: boolean) => {
        top: number;
        left: number;
    };
}
export interface IWindowHandlerContribution extends IContribution<IWindow>, Omit<IEventElement, 'on' | 'off' | 'once' | 'emit' | 'removeAllListeners'> {
    container?: any;
    configure: (window: IWindow, global: IGlobal) => void;
    createWindow: (params: IWindowParams) => void;
    releaseWindow: () => void;
    resizeWindow: (width: number, height: number) => void;
    setDpr: (dpr: number) => void;
    getDpr: () => number;
    getWH: () => {
        width: number;
        height: number;
    };
    getXY: () => {
        x: number;
        y: number;
    };
    getTitle: () => string;
    getContext: () => IContext2d;
    getNativeHandler: () => ICanvas;
    getImageBuffer?: (type?: string) => any;
    release: (...params: any) => void;
    getStyle: () => CSSStyleDeclaration | Record<string, any>;
    setStyle: (s: CSSStyleDeclaration | Record<string, any>) => void;
    getBoundingClientRect: () => IDomRectLike;
    clearViewBox: (color?: string) => void;
    setViewBox: (vb: IBoundsLike) => void;
    getViewBox: () => IBounds;
    setViewBoxTransform: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    getViewBoxTransform: () => IMatrix;
    isVisible: (bbox?: IBoundsLike) => boolean;
    onVisibleChange: (cb: (currentVisible: boolean) => void) => void;
    getTopLeft: (baseWindow?: boolean) => {
        top: number;
        left: number;
    };
}
