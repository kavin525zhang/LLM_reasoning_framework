import { ContinuousScale } from './continuous-scale';
import { identity } from './utils/utils';
import type { ContinuousScaleType, NiceOptions } from './interface';
export interface LogScale extends ContinuousScale {
    nice: (count?: number, option?: NiceOptions) => this;
    niceMin: (count?: number) => this;
    niceMax: (count?: number) => this;
}
export declare class LogScale extends ContinuousScale {
    readonly type: ContinuousScaleType;
    _base: number;
    _logs: (x: number) => number;
    _pows: (x: number) => number;
    _limit: (x: number) => number;
    constructor();
    clone(): LogScale;
    rescale(slience?: boolean): this;
    scale(x: any): any;
    base(): number;
    base(_: number, slience?: boolean): this;
    tickFormat(): typeof identity;
    d3Ticks(count?: number, options?: {
        noDecimals?: boolean;
    }): number[];
    ticks(count?: number): number[];
    forceTicks(count?: number): any[];
    stepTicks(step: number): any[];
    protected getNiceConfig(): {
        floor: (x: number) => number;
        ceil: (x: number) => number;
    };
}
