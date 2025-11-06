import type { GeometricMaskShape, TextShapeMask } from './types/wordcloud';
import type { IPointLike } from '@visactor/vutils';
export declare const generateIsEmptyPixel: (backgroundColor?: string) => (imageData: ImageData, y: number, x: number) => boolean;
export declare const generateMaskCanvas: (shape: TextShapeMask | GeometricMaskShape, width: number, height: number, cacheCanvas?: HTMLCanvasElement) => any;
export declare const generatePoints: (center: IPointLike, radius: number, startAngle: number, count: number) => {
    x: number;
    y: number;
}[];
export declare const generateCardioidPoints: (center: IPointLike, radius: number, startAngle: number, count: number) => {
    x: number;
    y: number;
}[];
export declare const drawRegularPolygon: (ctx: CanvasRenderingContext2D, points: IPointLike[]) => void;
export declare const drawCardioid: (ctx: CanvasRenderingContext2D, points: IPointLike[]) => void;
