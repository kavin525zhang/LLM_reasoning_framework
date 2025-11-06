import type { IText } from '@visactor/vrender-core';
export interface IShiftYOption {
    labelling: (...args: any[]) => any;
    maxY?: number;
    globalShiftY?: {
        enable?: boolean;
        maxIterations?: number;
        maxError?: number;
        padding?: number;
        maxAttempts?: number;
        deltaYTolerance?: number;
    };
}
export declare function shiftY(texts: IText[], option: IShiftYOption): IText[];
