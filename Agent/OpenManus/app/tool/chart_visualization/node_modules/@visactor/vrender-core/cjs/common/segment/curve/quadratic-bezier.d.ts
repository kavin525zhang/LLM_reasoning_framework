import type { IDirection, IPath2D, IQuadraticBezierCurve } from '../../../interface';
import { Curve } from './base';
import { type IPoint, type IPointLike } from '@visactor/vutils';
export declare class QuadraticBezierCurve extends Curve implements IQuadraticBezierCurve {
    type: number;
    originP1?: IPointLike;
    originP2?: IPointLike;
    readonly p0: IPoint;
    readonly p1: IPoint;
    readonly p2: IPoint;
    constructor(p0: IPoint, p1: IPoint, p2: IPoint);
    protected _validPoint(): boolean;
    getPointAt(t: number): IPointLike;
    protected calcLength(): number;
    protected calcProjLength(direction: IDirection): number;
    getAngleAt(t: number): number;
    draw(path: IPath2D, x: number, y: number, sx: number, sy: number, percent: number): void;
    getYAt(x: number): number;
    includeX(x: number): boolean;
}
