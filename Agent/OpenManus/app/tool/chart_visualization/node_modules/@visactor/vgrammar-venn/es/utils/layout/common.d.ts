import type { IVennArea } from '../interface';
export declare function distanceFromIntersectArea(r1: number, r2: number, overlap: number): number;
export declare function getDistanceMatrices(areas: IVennArea[], sets: IVennArea[], setIds: Record<number, number>): {
    distances: number[][];
    constraints: number[][];
};
