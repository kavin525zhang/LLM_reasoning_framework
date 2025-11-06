import type { IPointLike } from './data-structure';
export declare function getContainerSize(el: HTMLElement | null, defaultWidth?: number, defaultHeight?: number): {
    width: number;
    height: number;
};
export declare function getElementAbsolutePosition(element: HTMLElement): IPointLike;
export declare function getElementRelativePosition(element: HTMLElement, base: HTMLElement): IPointLike;
export declare const getScrollLeft: (element: HTMLElement) => number;
export declare const getScrollTop: (element: HTMLElement) => number;
export declare const getScaleX: (element: HTMLElement) => number;
export declare const getScaleY: (element: HTMLElement) => number;
export declare const getScale: (element: HTMLElement) => number;
export declare function hasParentElement(element: HTMLElement, target: HTMLElement): boolean;
export declare const styleStringToObject: (styleStr?: string) => any;
export declare const lowerCamelCaseToMiddle: (str: string) => string;
export declare function toCamelCase(str: string): string;
export declare function isHTMLElement(obj: any): obj is Element;
