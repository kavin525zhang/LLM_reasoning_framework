import type { IVennCircle, IVennOverlapArc } from './interface';
export declare const getArcsFromCircles: (circles: IVennCircle[]) => IVennOverlapArc[];
export declare const getPathFromArcs: (arcs: IVennOverlapArc[]) => string;
export declare const getArcsFromPath: (path: string) => IVennOverlapArc[];
export declare const getCirclesFromArcs: (arcs: IVennOverlapArc[]) => IVennCircle[];
