import type { IDirection, IArcCurve, IPath2D } from '../../../interface';
import { Curve } from './base';
import type { IPoint, IPointLike } from '@visactor/vutils';
export declare class ArcCurve extends Curve implements IArcCurve {
    type: number;
    readonly p0: IPoint;
    readonly p1: IPoint;
    radius: number;
    constructor(p0: IPoint, p1: IPoint, radius: number);
    getPointAt(t: number): IPointLike;
    protected calcLength(): number;
    protected calcProjLength(direction: IDirection): number;
    getAngleAt(t: number): number;
    draw(path: IPath2D, percent: number): void;
    getYAt(x: number): number;
    includeX(x: number): boolean;
}
