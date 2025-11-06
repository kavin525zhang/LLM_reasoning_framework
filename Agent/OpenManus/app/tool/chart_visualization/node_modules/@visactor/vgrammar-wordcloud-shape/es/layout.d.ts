import type { WordCloudShapeOptions } from './interface';
import { type IProgressiveTransformResult, type IView } from '@visactor/vgrammar-core';
export declare class Layout implements IProgressiveTransformResult<any[]> {
    options: WordCloudShapeOptions;
    data: any[];
    view?: IView;
    private isImageFinished?;
    private isLayoutFinished?;
    private progressiveResult?;
    private segmentationInput?;
    constructor(options: WordCloudShapeOptions, view?: IView);
    layout(data: any[]): void;
    canAnimate(): boolean;
    unfinished(): boolean;
    output(): any[];
    progressiveRun(): void;
    progressiveOutput(): any[];
    doLayout(): void;
    release(): void;
}
