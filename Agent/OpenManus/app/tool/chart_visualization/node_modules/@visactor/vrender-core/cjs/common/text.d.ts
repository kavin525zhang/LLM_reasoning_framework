import type { ITextGraphicAttribute, TextAlignType, TextBaselineType } from '../interface';
export declare function textDrawOffsetY(baseline: TextBaselineType, h: number): number;
export declare function textDrawOffsetX(textAlign: TextAlignType, width: number): number;
export declare function textLayoutOffsetY(baseline: TextBaselineType, lineHeight: number, fontSize: number, buf?: number): number;
export declare function textAttributesToStyle(attrs: ITextGraphicAttribute): any;
