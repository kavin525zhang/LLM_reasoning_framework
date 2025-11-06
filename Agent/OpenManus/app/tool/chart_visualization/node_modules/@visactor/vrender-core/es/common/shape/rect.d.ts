import type { IContext2d, ICustomPath2D } from '../../interface';
type IEdgeCb = (x1: number, y1: number, x2: number, y2: number) => void;
export declare function createRectPath(path: ICustomPath2D | IContext2d, x: number, y: number, width: number, height: number, rectCornerRadius: number | number[], roundCorner?: boolean, edgeCb?: IEdgeCb[]): void | ICustomPath2D | IContext2d;
export {};
