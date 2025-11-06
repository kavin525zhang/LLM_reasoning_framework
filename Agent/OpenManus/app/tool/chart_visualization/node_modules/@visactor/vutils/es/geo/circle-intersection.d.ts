import type { IPointLike } from '../data-structure';
import type { ICircle, IIntersectPoint, IOverlapAreaStats } from './interface';
export declare function intersectionArea(circles: ICircle[], stats?: IOverlapAreaStats): number;
export declare function containedInCircles(point: IPointLike, circles: ICircle[]): boolean;
export declare function circleArea(r: number, width: number): number;
export declare function circleOverlap(r1: number, r2: number, d: number): number;
export declare function circleCircleIntersection(p1: ICircle, p2: ICircle): IIntersectPoint[];
export declare function getCenter(points: IPointLike[]): {
    x: number;
    y: number;
};
