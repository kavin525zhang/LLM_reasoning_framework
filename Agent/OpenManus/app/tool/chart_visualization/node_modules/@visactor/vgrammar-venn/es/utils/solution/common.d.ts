import type { IVennCircle, ICluster } from '../interface';
export declare function orientateCircles(circles: IVennCircle[], orientation: number, orientationOrder: any): void;
export declare function disjointCluster(circles: IVennCircle[]): ICluster[];
export declare function getBoundingBox(circles: IVennCircle[]): {
    xRange: {
        max: number;
        min: number;
    };
    yRange: {
        max: number;
        min: number;
    };
};
