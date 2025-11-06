import type { IContext2d, SymbolType, ISymbolClass } from '../../interface';
import { BaseSymbol } from './base';
export declare function thinTriangle(ctx: IContext2d, r: number, x: number, y: number): boolean;
export declare class ThinTriangleSymbol extends BaseSymbol implements ISymbolClass {
    type: SymbolType;
    pathStr: string;
    draw(ctx: IContext2d, size: number, x: number, y: number): boolean;
    drawOffset(ctx: IContext2d, size: number, x: number, y: number, offset: number): boolean;
}
declare const _default: ThinTriangleSymbol;
export default _default;
