import type { IPointLike } from './data-structure/point';
export declare function degreeToRadian(degree: number): number;
export declare function radianToDegree(radian: number): number;
export declare const clampRadian: (angle?: number) => number;
export declare const clampAngleByRadian: (angle?: number) => number;
export declare const clampDegree: (a?: number) => number;
export declare const clampAngleByDegree: (a?: number) => number;
export declare function polarToCartesian(center: IPointLike, radius: number, angleInRadian: number): {
    x: number;
    y: number;
};
export declare function cartesianToPolar(point: IPointLike, center?: IPointLike, startAngle?: number, endAngle?: number): {
    radius: number;
    angle: number;
};
export declare function getAngleByPoint(center: IPointLike, point: IPointLike): number;
export declare function normalizeAngle(angle: number): number;
export declare function findBoundaryAngles(startAngle: number, endAngle: number): number[];
export declare function calculateMaxRadius(rect: {
    width: number;
    height: number;
}, center: {
    x: number;
    y: number;
}, startAngle: number, endAngle: number): number;
export type Quadrant = 1 | 2 | 3 | 4;
export declare function computeQuadrant(angle: number): Quadrant;
