import type { IGraphicAttribute, IGraphic } from '../graphic';
export interface TextLayoutBBox {
    width: number;
    height: number;
    xOffset: number;
    yOffset: number;
}
export interface LayoutItemType {
    str: string;
    leftOffset?: number;
    topOffset?: number;
    width: number;
    ascent: number;
    descent: number;
    keepCenterInLine: boolean;
}
export interface SimplifyLayoutType {
    lines: LayoutItemType[];
}
export interface LayoutType {
    bbox: TextLayoutBBox;
    lines: LayoutItemType[];
    fontFamily: string;
    fontSize: number;
    fontWeight?: string | number;
    lineHeight: number;
    textAlign: TextAlignType;
    textBaseline: TextBaselineType;
}
export declare enum MeasureModeEnum {
    estimate = 0,
    actualBounding = 1,
    fontBounding = 2
}
export type ITextAttribute = {
    text: string | number | string[] | number[];
    maxLineWidth: number;
    maxWidth: number;
    textAlign: TextAlignType;
    textBaseline: TextBaselineType;
    fontSize: number;
    fontFamily: string;
    fontWeight: string | number;
    ellipsis: boolean | string;
    fontVariant: string;
    fontStyle: string;
    lineHeight: number | string;
    underline: number;
    lineThrough: number;
    scaleIn3d: boolean;
    direction: 'horizontal' | 'vertical';
    verticalMode: number;
    wordBreak: 'break-word' | 'break-all' | 'keep-all';
    ignoreBuf: boolean;
    heightLimit: number;
    lineClamp: number;
    wrap: boolean;
    whiteSpace: 'normal' | 'no-wrap';
    suffixPosition: 'start' | 'end' | 'middle';
    underlineDash: number[];
    underlineOffset: number;
    disableAutoClipedPoptip?: boolean;
    measureMode?: MeasureModeEnum;
    keepCenterInLine?: boolean;
};
export type ITextCache = {
    clipedText?: string;
    clipedWidth?: number;
    layoutData?: LayoutType;
    verticalList?: {
        text: string;
        width?: number;
        direction: number;
    }[][];
};
export type ITextGraphicAttribute = Partial<IGraphicAttribute> & Partial<ITextAttribute>;
export type IWrapTextGraphicAttribute = ITextGraphicAttribute & {
    heightLimit?: number;
    lineClamp?: number;
};
export interface IText extends IGraphic<ITextGraphicAttribute> {
    clipedText?: string;
    clipedWidth?: number;
    cliped?: boolean;
    multilineLayout?: LayoutType;
    font?: string;
    isMultiLine: boolean;
    cache?: ITextCache;
    getBaselineMapAlign: () => Record<string, string>;
    getAlignMapBaseline: () => Record<string, string>;
}
export type TextAlignType = 'left' | 'right' | 'center' | 'start' | 'end';
export type TextBaselineType = 'top' | 'middle' | 'bottom' | 'alphabetic';
