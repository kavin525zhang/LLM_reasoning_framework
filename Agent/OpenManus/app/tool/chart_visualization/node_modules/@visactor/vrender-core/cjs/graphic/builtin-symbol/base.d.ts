import type { IBoundsLike } from '@visactor/vutils';
export declare class BaseSymbol {
    bounds(size: number | [number, number], bounds: IBoundsLike): void;
    protected parseSize(size: number | [number, number]): number;
}
