import type { IContext2d, SymbolType, ISymbolClass, ICustomPath2D, IPath2D } from '../../interface';
import { BaseSymbol } from './base';
export declare function rectSizeArray(ctx: IContext2d, size: [number, number], x: number, y: number): boolean;
export declare function rectSize(ctx: IContext2d, size: number, x: number, y: number): boolean;
export declare class RectSymbol extends BaseSymbol implements ISymbolClass {
    type: SymbolType;
    pathStr: string;
    draw(ctx: IContext2d, size: number | [number, number], x: number, y: number): boolean;
    drawWithClipRange(ctx: IPath2D, size: number | [number, number], x: number, y: number, clipRange: number, z?: number, cb?: (p: ICustomPath2D, a: any) => void): boolean;
    drawOffset(ctx: IContext2d, size: number | [number, number], x: number, y: number, offset: number): boolean;
}
declare const _default: RectSymbol;
export default _default;
