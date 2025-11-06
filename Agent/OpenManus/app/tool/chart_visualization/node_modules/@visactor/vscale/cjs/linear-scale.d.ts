import { ContinuousScale } from './continuous-scale';
import type { ContinuousScaleType, CustomTicksFunc, NiceOptions } from './interface';
export declare class LinearScale extends ContinuousScale {
    readonly type: ContinuousScaleType;
    clone(): LinearScale;
    tickFormat(): () => void;
    d3Ticks(count?: number, options?: {
        noDecimals?: boolean;
    }): number[];
    ticks(count?: number, options?: {
        noDecimals?: boolean;
        customTicks?: CustomTicksFunc<ContinuousScale>;
    }): number[];
    forceTicks(count?: number): any[];
    stepTicks(step: number): any[];
    nice(count?: number, option?: NiceOptions): this;
    niceMin(count?: number): this;
    niceMax(count?: number): this;
}
