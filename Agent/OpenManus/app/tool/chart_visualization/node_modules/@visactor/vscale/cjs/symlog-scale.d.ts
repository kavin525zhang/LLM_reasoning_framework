import type { ContinuousScaleType, NiceOptions } from './interface';
import { LinearScale } from './linear-scale';
export interface SymlogScale extends LinearScale {
    nice: (count?: number, option?: NiceOptions) => this;
    niceMin: (count?: number) => this;
    niceMax: (count?: number) => this;
}
export declare class SymlogScale extends LinearScale {
    readonly type: ContinuousScaleType;
    _const: number;
    constructor();
    clone(): SymlogScale;
    constant(): number;
    constant(_: number, slience?: boolean): this;
    d3Ticks(count?: number, options?: {
        noDecimals?: boolean;
    }): number[];
    ticks(count?: number): number[];
    forceTicks(count?: number): any[];
    stepTicks(step: number): any[];
}
