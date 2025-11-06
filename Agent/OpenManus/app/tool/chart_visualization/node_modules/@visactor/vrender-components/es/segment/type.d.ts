import type { IArcGraphicAttribute, IGraphicAttribute, IGroupGraphicAttribute, ILineGraphicAttribute, ISymbolGraphicAttribute, SymbolType } from '@visactor/vrender-core';
import type { Point, State } from '../core/type';
export type SymbolAttributes = {
    visible: boolean;
    symbolType?: SymbolType;
    size?: number;
    autoRotate?: boolean;
    refX?: number;
    refY?: number;
    refAngle?: number;
    clip?: boolean;
    style?: Partial<IGraphicAttribute>;
};
export interface CommonSegmentAttributes extends IGroupGraphicAttribute {
    visible?: boolean;
    startSymbol?: SymbolAttributes;
    endSymbol?: SymbolAttributes;
}
export interface SegmentAttributes extends CommonSegmentAttributes {
    multiSegment?: boolean;
    mainSegmentIndex?: number;
    points: Point[] | Point[][];
    lineStyle?: ILineGraphicWithCornerRadius | Partial<ILineGraphicAttribute>[];
    state?: {
        line?: State<ILineGraphicWithCornerRadius | Partial<ILineGraphicAttribute>[]>;
        symbol?: State<Partial<ISymbolGraphicAttribute>>;
        startSymbol?: State<Partial<ISymbolGraphicAttribute>>;
        endSymbol?: State<Partial<ISymbolGraphicAttribute>>;
    };
}
export interface ArcSegmentAttributes extends CommonSegmentAttributes {
    center: {
        x: number;
        y: number;
    };
    radius: number;
    startAngle: number;
    endAngle: number;
    lineStyle?: IArcGraphicAttribute;
    state?: {
        line?: State<IArcGraphicAttribute>;
        symbol?: State<Partial<ISymbolGraphicAttribute>>;
        startSymbol?: State<Partial<ISymbolGraphicAttribute>>;
        endSymbol?: State<Partial<ISymbolGraphicAttribute>>;
    };
}
export interface ILineGraphicWithCornerRadius extends Partial<ILineGraphicAttribute> {
    cornerRadius?: number;
}
