import type { Datum } from '@visactor/vgrammar-core';
import type { IVennCircleDatum, IVennOverlapDatum, IVennTransformMarkOptions, IVennTransformOptions } from './interface';
export declare const transform: (options: IVennTransformOptions, upstreamData: Datum[]) => Array<IVennCircleDatum | IVennOverlapDatum>;
export declare const transformMark: (options: IVennTransformMarkOptions, upstreamData: Array<IVennCircleDatum | IVennOverlapDatum>) => (IVennCircleDatum<any> | IVennOverlapDatum<any>)[];
