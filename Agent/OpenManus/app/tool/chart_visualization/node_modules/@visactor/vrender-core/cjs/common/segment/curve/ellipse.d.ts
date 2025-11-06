import type { IPoint, IPointLike } from '@visactor/vutils';
import type { IEllipseCurve, IDirection, IPath2D } from '../../../interface';
import { Curve } from './base';
export declare class EllipseCurve extends Curve implements IEllipseCurve {
    type: number;
    p0: IPoint;
    radiusX: number;
    radiusY: number;
    rotation: number;
    startAngle: number;
    endAngle: number;
    anticlockwise?: boolean;
    constructor(p0: IPoint, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean);
    getPointAt(t: number): IPointLike;
    getAngleAt(t: number): number;
    protected calcLength(): number;
    protected calcProjLength(direction: IDirection): number;
    draw(path: IPath2D, percent: number): void;
    getYAt(x: number): number;
    includeX(x: number): boolean;
}
