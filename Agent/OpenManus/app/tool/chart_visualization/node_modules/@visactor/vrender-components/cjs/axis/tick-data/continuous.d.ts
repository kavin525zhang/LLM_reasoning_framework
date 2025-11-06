import type { ContinuousScale } from '@visactor/vscale';
import type { ITickData, ITickDataOpt } from '../type';
export declare const DEFAULT_CONTINUOUS_TICK_COUNT = 5;
export declare const continuousTicks: (scale: ContinuousScale, op: ITickDataOpt) => ITickData[];
