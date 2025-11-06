import type { IBoundsLike } from '@visactor/vutils';
export declare function bitmapTool(width: number, height: number, padding?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}): {
    (_: number): number;
    bitmap(): {
        array: Uint32Array;
        get: (x: number, y: number) => number;
        set: (x: number, y: number) => void;
        clear: (x: number, y: number) => void;
        getRange: ({ x1, y1, x2, y2 }: IBoundsLike) => boolean;
        setRange: ({ x1, y1, x2, y2 }: IBoundsLike) => void;
        clearRange: ({ x1, y1, x2, y2 }: IBoundsLike) => void;
        outOfBounds: ({ x1, y1, x2, y2 }: IBoundsLike) => boolean;
        toImageData: (ctx: CanvasRenderingContext2D) => ImageData;
    };
    x(_: number): number;
    y(_: number): number;
    ratio: number;
    padding: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
    width: number;
    height: number;
};
export declare function clampRangeByBitmap($: BitmapTool, range: IBoundsLike): {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
};
export declare function boundToRange($: BitmapTool, bound: IBoundsLike, clamp?: boolean): {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
};
export type BitmapTool = ReturnType<typeof bitmapTool>;
