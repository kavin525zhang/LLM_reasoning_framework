import type { IAABBBounds, IPoint, IPointLike } from '@visactor/vutils';
import type { ICurvePath, ICurve } from '../../../interface';
export declare class CurvePath implements ICurvePath<IPoint> {
    _curves: ICurve<IPoint>[];
    bounds: IAABBBounds;
    constructor();
    get curves(): ICurve<IPoint>[];
    getCurveLengths(): number[];
    getPointAt(t: number): IPointLike;
    getLength(): number;
    getBounds(): import("@visactor/vutils").IBounds;
}
