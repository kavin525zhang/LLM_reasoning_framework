import type { IRichText, IRichTextAttribute, IText, ITextGraphicAttribute, TextAlignType } from '@visactor/vrender-core';
import type { ITextMeasureOption } from '@visactor/vutils';
import { TextMeasure } from '@visactor/vutils';
import type { TextContent } from '../core/type';
export declare const initTextMeasure: (textSpec?: Partial<ITextGraphicAttribute>, option?: Partial<ITextMeasureOption>, useNaiveCanvas?: boolean, defaultFontParams?: Partial<ITextGraphicAttribute>) => TextMeasure<ITextGraphicAttribute>;
export declare function measureTextSize(text: string | number | string[] | number[], textSpec: Partial<ITextGraphicAttribute>, defaultTextTheme?: Partial<ITextGraphicAttribute>): {
    width: any;
    height: any;
};
export declare function isRichText(attributes: TextContent, typeKey?: string): boolean;
export declare function getTextType(attributes: TextContent, typeKey?: string): any;
export declare function richTextAttributeTransform(attributes: ITextGraphicAttribute & IRichTextAttribute & TextContent): Partial<import("@visactor/vrender-core").IGraphicAttribute> & Partial<import("@visactor/vrender-core").ITextAttribute> & IRichTextAttribute & TextContent;
export declare function htmlAttributeTransform(attributes: ITextGraphicAttribute): ITextGraphicAttribute;
export declare function reactAttributeTransform(attributes: ITextGraphicAttribute): ITextGraphicAttribute;
export declare function createTextGraphicByType(textAttributes: ITextGraphicAttribute, typeKey?: string): IRichText | IText;
export declare function alignTextInLine(layoutAlign: 'left' | 'right', graphic: IText | IRichText, textAlign: TextAlignType, pos: number, textWidth: number): void;
