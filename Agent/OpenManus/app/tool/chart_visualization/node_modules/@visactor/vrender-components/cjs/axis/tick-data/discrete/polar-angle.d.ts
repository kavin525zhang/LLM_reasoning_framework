import type { BandScale, IBaseScale } from '@visactor/vscale';
import type { IPolarTickDataOpt, ITickData } from '../../type';
import { AABBBounds } from '@visactor/vutils';
export declare const getPolarAngleLabelBounds: (scale: IBaseScale, domain: any[], op: IPolarTickDataOpt) => AABBBounds[];
export declare const polarAngleAxisDiscreteTicks: (scale: BandScale, op: IPolarTickDataOpt) => ITickData[];
