import type { IGraphicUtil } from '../../../interface/core';
import type { ICanvas, IContext2d, EnvType } from '../../../interface';
import { MeasureModeEnum } from '../../../interface';
import type { TextOptionsType, ITextMeasure } from '../../../interface/text';
export declare class ATextMeasure implements ITextMeasure {
    release: (...params: any) => void;
    protected canvas?: ICanvas;
    protected context?: IContext2d | null;
    configure(service: IGraphicUtil, env: EnvType): void;
    protected _measureTextWithoutAlignBaseline(text: string, options: TextOptionsType, compatible?: boolean): {
        width: number;
    } | TextMetrics;
    protected _measureTextWithAlignBaseline(text: string, options: TextOptionsType, compatible?: boolean): {
        width: number;
    } | TextMetrics;
    protected compatibleMetrics(metrics: TextMetrics | {
        width: number;
    }, options: TextOptionsType): TextMetrics | {
        width: number;
    };
    protected estimate(text: string, { fontSize }: TextOptionsType): {
        width: number;
        height: number;
    };
    measureTextWidth(text: string, options: TextOptionsType, textMeasure?: TextMetrics | {
        width: number;
    }): number;
    measureTextBoundsWidth(text: string, options: TextOptionsType, textMeasure?: TextMetrics | {
        width: number;
    }): number;
    measureTextBoundsLeftRight(text: string, options: TextOptionsType, textMeasure?: TextMetrics | {
        width: number;
    }): {
        left: any;
        right: any;
    };
    measureTextPixelHeight(text: string, options: TextOptionsType, textMeasure?: TextMetrics | {
        width: number;
    }): number;
    measureTextPixelADscent(text: string, options: TextOptionsType, textMeasure?: TextMetrics | {
        width: number;
    }): {
        ascent: any;
        descent: any;
    };
    measureTextBoundHieght(text: string, options: TextOptionsType, textMeasure?: TextMetrics | {
        width: number;
    }): number;
    measureTextBoundADscent(text: string, options: TextOptionsType, textMeasure?: TextMetrics | {
        width: number;
    }): {
        ascent: any;
        descent: any;
    };
    protected measureTextBoundADscentEstimate(options: TextOptionsType): {
        ascent: number;
        descent: number;
    };
    protected measureTextBoundLeftRightEstimate(options: TextOptionsType): {
        left: number;
        right: number;
    };
    measureTextPixelADscentAndWidth(text: string, options: TextOptionsType, mode: MeasureModeEnum): {
        width: number;
        ascent: number;
        descent: number;
    };
    measureText(text: string, options: TextOptionsType): TextMetrics | {
        width: number;
    };
    clipTextVertical(verticalList: {
        text: string;
        width?: number;
        direction: number;
    }[], options: TextOptionsType, width: number, wordBreak: boolean): {
        verticalList: {
            text: string;
            width?: number;
            direction: number;
        }[];
        width: number;
    };
    clipText(text: string, options: TextOptionsType, width: number, wordBreak: boolean, keepAllBreak?: boolean): {
        str: string;
        width: number;
        wordBreaked?: number;
    };
    private _clipText;
    private _clipTextEnd;
    private _clipTextStart;
    private _clipTextMiddle;
    clipTextWithSuffixVertical(verticalList: {
        text: string;
        width?: number;
        direction: number;
    }[], options: TextOptionsType, width: number, suffix: string, wordBreak: boolean, suffixPosition: 'start' | 'end' | 'middle'): {
        verticalList: {
            text: string;
            width?: number;
            direction: number;
        }[];
        width: number;
    };
    revertVerticalList(verticalList: {
        text: string;
        width?: number;
        direction: number;
    }[]): {
        text: string;
        width?: number;
        direction: number;
    }[];
    clipTextWithSuffix(text: string, options: TextOptionsType, width: number, suffix: string, wordBreak: boolean, position: 'start' | 'end' | 'middle', forceSuffix?: boolean): {
        str: string;
        width: number;
    };
}
