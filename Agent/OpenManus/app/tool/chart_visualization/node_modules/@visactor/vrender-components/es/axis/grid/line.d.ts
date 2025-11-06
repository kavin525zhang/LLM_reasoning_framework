import { BaseGrid } from './base';
import type { LineAxisGridAttributes } from './type';
import type { Point } from '../../core/type';
import { LineAxisMixin } from '../mixin/line';
import type { ComponentOptions } from '../../interface';
export interface LineAxisGrid extends Pick<LineAxisMixin, 'isInValidValue' | 'getTickCoord' | 'getVerticalVector'>, BaseGrid<LineAxisGridAttributes> {
}
export declare class LineAxisGrid extends BaseGrid<LineAxisGridAttributes> {
    constructor(attributes: LineAxisGridAttributes, options?: ComponentOptions);
    private _getGridPoint;
    protected getGridPointsByValue(value: number): Point[];
    protected getGridAttribute(isSubGrid: boolean): any;
}
