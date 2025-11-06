import type { ITextMeasure, TextOptionsType } from '../../../interface/text';
import type { TextLayoutBBox, LayoutItemType, LayoutType, TextAlignType, TextBaselineType } from '../../../interface';
import { MeasureModeEnum } from '../../../interface';
export declare class CanvasTextLayout {
    private fontFamily;
    private textOptions;
    private textMeasure;
    constructor(fontFamily: string, options: TextOptionsType, textMeasure: ITextMeasure);
    LayoutBBox(bbox: TextLayoutBBox, textAlign: TextAlignType, textBaseline: TextBaselineType, linesLayout: LayoutItemType[]): TextLayoutBBox;
    GetLayoutByLines(lines: (string | number)[], textAlign: TextAlignType, textBaseline: TextBaselineType, lineHeight: number, suffix: string, wordBreak: boolean, params?: {
        lineWidth?: number;
        suffixPosition?: 'start' | 'end' | 'middle';
        measureMode?: MeasureModeEnum;
        keepCenterInLine?: boolean;
    }): LayoutType;
    layoutWithBBox(bbox: TextLayoutBBox, lines: LayoutItemType[], textAlign: TextAlignType, textBaseline: TextBaselineType, lineHeight: number): LayoutType;
    private lineOffset;
}
