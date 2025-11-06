import type { IPoint, IPointLike } from '@visactor/vutils';
import type { IMoveCurve, IDirection, IPath2D } from '../../../interface';
import { Curve } from './base';
export declare class MoveCurve extends Curve implements IMoveCurve {
    type: number;
    p0: IPoint;
    p1: IPoint;
    constructor(p0: IPoint, p1: IPoint);
    getAngleAt(t: number): number;
    getPointAt(t: number): IPointLike;
    protected calcLength(): number;
    protected calcProjLength(direction: IDirection): number;
    draw(path: IPath2D, x: number, y: number, sx: number, sy: number, percent: number): void;
    includeX(x: number): boolean;
    getYAt(x: number): number;
}
