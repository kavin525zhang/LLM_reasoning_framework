import { ACustomAnimate } from '@visactor/vrender-core';
import type { IVennCircle, IVennOverlapArc, VennCircleName } from './utils/interface';
export declare class VennOverlapAnimation extends ACustomAnimate<{
    path: string;
    arcs: IVennOverlapArc[];
}> {
    protected fromCircles: Record<VennCircleName, IVennCircle>;
    protected toCircles: Record<VennCircleName, IVennCircle>;
    onBind(): void;
    onUpdate(end: boolean, ratio: number, out: Record<string, any>): void;
}
