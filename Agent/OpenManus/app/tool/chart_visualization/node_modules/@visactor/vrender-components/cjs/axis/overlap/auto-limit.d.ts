import type { IText } from '@visactor/vrender-core';
import type { AxisLabelOverlap } from '../type';
type LimitConfig = {
    orient: string;
    limitLength: number;
    axisLength: number;
    verticalLimitLength?: number;
    ellipsis?: string;
    overflowLimitLength?: AxisLabelOverlap['overflowLimitLength'];
};
export declare function autoLimit(labels: IText[], config: LimitConfig): void;
export {};
