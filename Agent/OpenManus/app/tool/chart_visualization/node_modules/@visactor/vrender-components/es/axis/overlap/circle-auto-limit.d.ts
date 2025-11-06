import type { IText } from '@visactor/vrender-core';
import type { Point } from '../../core/type';
type WrapConfig = {
    center: Point;
    inside?: boolean;
    ellipsis?: string;
    bounds: {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };
    autoWrap?: boolean;
};
export declare function circleAutoLimit(labels: IText[], config: WrapConfig): void;
export {};
