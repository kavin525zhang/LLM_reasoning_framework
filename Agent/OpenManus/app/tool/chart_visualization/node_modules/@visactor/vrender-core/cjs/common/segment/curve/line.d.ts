import type { IPoint, IPointLike } from '@visactor/vutils';
import type { ILineCurve, IDirection, IPath2D } from '../../../interface';
import { Curve } from './base';
export declare function divideLinear(curve: ILineCurve, t: number): ILineCurve[];
export declare class LineCurve extends Curve implements ILineCurve {
    type: number;
    originP1?: IPointLike;
    originP2?: IPointLike;
    p0: IPoint;
    p1: IPoint;
    angle: number;
    constructor(p0: IPoint, p1: IPoint);
    getPointAt(t: number): IPointLike;
    getAngleAt(t: number): number;
    protected _validPoint(): boolean;
    protected calcLength(): number;
    protected calcProjLength(direction: IDirection): number;
    draw(path: IPath2D, x: number, y: number, sx: number, sy: number, percent: number): void;
    includeX(x: number): boolean;
    getYAt(x: number): number;
}
