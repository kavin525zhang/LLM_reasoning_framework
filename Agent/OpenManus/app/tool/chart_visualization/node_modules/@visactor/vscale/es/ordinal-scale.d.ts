import type { DiscreteScaleType, IOrdinalScale } from './interface';
import { BaseScale } from './base-scale';
export declare const implicit: unique symbol;
export declare class OrdinalScale extends BaseScale implements IOrdinalScale {
    readonly type: DiscreteScaleType;
    protected _index: Map<string, number>;
    protected _domain: Array<number>;
    protected _ordinalRange: Array<number>;
    protected _specified: Record<string, unknown>;
    specified(): Record<string, unknown>;
    specified(_: Record<string, unknown>): this;
    protected _getSpecifiedValue(input: string): undefined | any;
    constructor();
    clone(): IOrdinalScale;
    calculateVisibleDomain(range: any[]): any[];
    scale(d: any): any;
    invert(d: any): any;
    domain(): any[];
    domain(_: any[]): this;
    range(): any[];
    range(_: any[]): this;
    index(x: any): number;
}
