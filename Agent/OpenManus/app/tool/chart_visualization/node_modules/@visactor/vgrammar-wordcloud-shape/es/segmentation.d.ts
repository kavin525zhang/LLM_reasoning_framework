import type { CloudWordType, SegmentationInputType, SegmentationOutputType } from './interface';
export declare function segmentation(segmentationInput: SegmentationInputType): SegmentationInputType & {
    segmentation: {
        regions: {
            label: number;
            boundary: any;
            area: any;
            center: any;
            maxPoint: any;
            maxR: any;
            ratio: any;
        }[];
        labels: any[];
        labelNumber: number;
    };
    shapeBounds: {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
        width: number;
        height: number;
    };
    shapeMaxR: number;
    shapeRatio: number;
    shapeCenter: number[];
    shapeArea: number;
};
export declare function removeBorder(image: any, canvas: HTMLCanvasElement | any, isEmptyPixel: (imageData: ImageData, i: number, j: number) => boolean): any;
export declare function scaleAndMiddleShape(image: any, size: [number, number]): {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
};
export declare function allocateWords(words: CloudWordType[], segmentationOutput: SegmentationOutputType): void;
