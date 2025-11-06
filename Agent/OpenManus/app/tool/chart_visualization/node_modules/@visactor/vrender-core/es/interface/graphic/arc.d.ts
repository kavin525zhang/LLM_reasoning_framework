import type { IGraphicAttribute, IGraphic } from '../graphic';
import type { ICustomPath2D } from '../path';
export type IArcAttribute = {
    innerRadius: number;
    outerRadius: number;
    innerPadding: number;
    outerPadding: number;
    startAngle: number;
    endAngle: number;
    cornerRadius: number | string | Array<number | string>;
    padAngle: number;
    padRadius: number;
    cap: boolean | [boolean, boolean];
    forceShowCap: boolean;
};
export type IArcCache = {
    cornerRadius?: [number, number, number, number];
    startAngle?: number;
    endAngle?: number;
};
export type IArcGraphicAttribute = Partial<IGraphicAttribute> & Partial<IArcAttribute>;
export interface IArc extends IGraphic<IArcGraphicAttribute> {
    cache?: ICustomPath2D;
    getParsedCornerRadius: () => number | number[];
    getParsedAngle: () => {
        startAngle: number;
        endAngle: number;
        sc?: number;
        ec?: number;
    };
    getParsePadAngle: (startAngle: number, endAngle: number) => {
        outerStartAngle: number;
        outerEndAngle: number;
        innerStartAngle: number;
        innerEndAngle: number;
        outerDeltaAngle: number;
        innerDeltaAngle: number;
    };
}
