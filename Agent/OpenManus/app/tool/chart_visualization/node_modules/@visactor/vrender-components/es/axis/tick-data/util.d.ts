import type { IBaseScale } from '@visactor/vscale';
import { AABBBounds } from '@visactor/vutils';
import type { ICartesianTickDataOpt, IOrientType, ITickData } from '../type';
export declare const convertDomainToTickData: (domain: any[]) => ITickData[];
export declare const labelOverlap: (prevLabel: AABBBounds, nextLabel: AABBBounds, gap?: number) => boolean;
export declare const labelDistance: (prevLabel: AABBBounds, nextLabel: AABBBounds) => [number, number];
export declare const MIN_TICK_GAP = 12;
export declare const getCartesianLabelBounds: (scale: IBaseScale, domain: any[], op: ICartesianTickDataOpt) => AABBBounds[];
export declare const isAxisHorizontal: (axisOrientType: IOrientType) => boolean;
