import type { IArea, ILine } from '@visactor/vrender-core';
import type { IPoint, Quadrant } from './type';
import type { IBoundsLike, IPointLike } from '@visactor/vutils';
export declare function isQuadrantLeft(quadrant: Quadrant): boolean;
export declare function isQuadrantRight(quadrant: Quadrant): boolean;
export declare function lineCirclePoints(a: number, b: number, c: number, x0: number, y0: number, r: number): IPoint[];
export declare function connectLineRadian(radius: number, length: number): number;
export declare function checkBoundsOverlap(boundsA: IBoundsLike, boundsB: IBoundsLike): boolean;
export declare const degrees: (angle?: number) => number;
export declare const labelingPoint: (textBounds: IBoundsLike, graphicBounds: IBoundsLike, position?: string, offset?: number) => {
    x: number;
    y: number;
};
export declare const getPointsOfLineArea: (graphic: ILine | IArea) => IPointLike[];
export declare function labelingLineOrArea(textBounds: IBoundsLike, graphicBounds: IBoundsLike, position?: string, offset?: number): {
    x: number;
    y: number;
};
export declare function connectLineBetweenBounds(boundA: IBoundsLike, boundB: IBoundsLike): {
    x: number;
    y: number;
}[];
export declare function getAlignOffset(align: 'left' | 'right' | 'center'): 0.5 | 0 | 1;
