import type { WordCloudShapeOptions } from './interface';
import type { IProgressiveTransformResult, IView } from '@visactor/vgrammar-core';
export declare const transform: (options: WordCloudShapeOptions, upstreamData: any[], parameters?: any, view?: IView) => any[] | IProgressiveTransformResult<any[]>;
