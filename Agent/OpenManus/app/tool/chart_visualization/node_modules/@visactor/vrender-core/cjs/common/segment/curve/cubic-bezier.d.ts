import type { IPoint, IPointLike } from '@visactor/vutils';
import type { ICubicBezierCurve, IDirection, IPath2D, IQuadraticBezierCurve } from '../../../interface';
import { Curve } from './base';
export declare function divideCubic(curve: ICubicBezierCurve, t: number): ICubicBezierCurve[];
export declare function divideQuad(curve: IQuadraticBezierCurve, t: number): IQuadraticBezierCurve[];
export declare class CubicBezierCurve extends Curve implements ICubicBezierCurve {
    type: number;
    originP1?: IPointLike;
    originP2?: IPointLike;
    readonly p0: IPoint;
    readonly p1: IPoint;
    readonly p2: IPoint;
    readonly p3: IPoint;
    constructor(p0: IPoint, p1: IPoint, p2: IPoint, p3: IPoint);
    protected _validPoint(): boolean;
    getPointAt(t: number): IPointLike;
    protected calcLength(): number;
    protected calcProjLength(direction: IDirection): number;
    getAngleAt(t: number): number;
    draw(path: IPath2D, x: number, y: number, sx: number, sy: number, percent: number): void;
    includeX(x: number): boolean;
    getYAt(x: number): number;
}
