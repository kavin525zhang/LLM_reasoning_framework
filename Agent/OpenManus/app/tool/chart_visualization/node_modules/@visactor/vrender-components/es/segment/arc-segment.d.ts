import type { IArc } from '@visactor/vrender-core';
import type { ArcSegmentAttributes } from './type';
import type { Point } from '../core/type';
import type { ComponentOptions } from '../interface';
import { Segment } from './segment';
export declare class ArcSegment extends Segment {
    name: string;
    key: string;
    line?: IArc;
    isReverseArc: boolean;
    constructor(attributes: ArcSegmentAttributes, options?: ComponentOptions);
    getStartAngle(): number;
    getEndAngle(): number;
    getMainSegmentPoints(): Point[];
    protected _computeStartRotate(angle: number): number;
    protected _computeEndRotate(angle: number): number;
    protected render(): void;
}
