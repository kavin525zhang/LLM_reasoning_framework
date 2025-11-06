import type { IGraphic, IGroup, IText } from '@visactor/vrender-core';
import type { Dict } from '@visactor/vutils';
import type { Vector2 } from '../util';
import type { BreakSymbol } from './type';
import type { Point } from '../core/type';
export declare const clampRadian: (angle?: number) => number;
export declare function isInRange(a: number, min: number, max: number): boolean;
export declare function getCircleLabelPosition(tickPosition: Point, tickVector: [number, number]): {
    x: number;
    y: number;
};
export declare function getAxisBreakSymbolAttrs(props?: BreakSymbol): any;
export declare function getElMap(g: IGroup): Dict<IGraphic<Partial<import("@visactor/vrender-core").IGraphicAttribute>>>;
export declare function getVerticalCoord(point: Point, vector: Vector2): Point;
export declare function getCircleVerticalVector(offset: number, point: Point, center: Point, inside?: boolean, axisInside?: boolean): Vector2;
export declare function angleLabelOrientAttribute(angle: number): {
    align: "right" | "left" | "center";
    baseline: "top" | "bottom" | "middle";
};
export declare function getPolarAngleLabelPosition(angle: number, center: {
    x: number;
    y: number;
}, radius: number, labelOffset: number, inside: boolean): {
    x: number;
    y: number;
};
export declare function getCirclePoints(center: Point, count: number, radius: number, startAngle: number, endAngle: number): Point[];
export declare function getPolygonPath(points: Point[], closed: boolean): string;
export declare function textIntersect(textA: IText, textB: IText, sep: number): boolean;
export declare function hasOverlap<T>(items: IText[], pad: number): boolean;
