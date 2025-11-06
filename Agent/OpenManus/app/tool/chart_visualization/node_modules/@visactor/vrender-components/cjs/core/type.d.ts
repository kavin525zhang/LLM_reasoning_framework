import type { IGraphicStyle, IRichTextCharacter } from '@visactor/vrender-core';
export type Point = {
    x: number;
    y: number;
};
export interface LocationCfg {
    [key: string]: any;
}
export interface PointLocationCfg extends LocationCfg {
    x: number;
    y: number;
}
export interface RegionLocationCfg extends LocationCfg {
    start: Point;
    end: Point;
}
export type State<T> = {
    [key: string]: T;
};
export type BaseGraphicAttributes<T> = {
    style?: T;
    state?: State<T>;
};
export type Padding = number | number[] | {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
};
type CommonTextContent = {
    text?: string | string[] | number | number[] | {
        type?: 'text';
        text: string | string[] | number | number[];
    };
};
export type RichTextContent = {
    text?: {
        type: 'rich';
        text: IRichTextCharacter[];
    };
};
export type HTMLTextContent = {
    text: {
        type: 'html';
        text: IGraphicStyle['html'];
    };
    _originText: string;
};
export type ReactTextContent = {
    text: {
        type: 'react';
        text: IGraphicStyle['react'];
    };
    _originText: string;
};
export type TextContent = (CommonTextContent | RichTextContent | HTMLTextContent | ReactTextContent) & {
    type?: 'text' | 'rich';
};
export {};
