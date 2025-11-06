import type { IAreaCacheItem, IDirection, IPath2D } from '../interface';
export declare function drawAreaSegments(path: IPath2D, segPath: IAreaCacheItem, percent: number, params?: {
    offsetX?: number;
    offsetY?: number;
    offsetZ?: number;
    direction?: IDirection;
}): void;
