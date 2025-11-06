import type { ILineGraphicAttribute, ITextGraphicAttribute, ISymbolGraphicAttribute, IRectGraphicAttribute, IGroupGraphicAttribute, IText, IGroup, IGraphic } from '@visactor/vrender-core';
import type { Dict } from '@visactor/vutils';
import type { ContinuousScale, CustomTicksFunc } from '@visactor/vscale';
import type { Point, TextContent } from '../core/type';
import type { SegmentAttributes } from '../segment/type';
import type { TagAttributes } from '../tag/type';
export type AxisItemStateStyle<T> = {
    hover?: T;
    hover_reverse?: T;
    selected?: T;
    selected_reverse?: T;
};
export type callbackFunc<T> = (datum: Dict<any>, index: number, data?: Dict<any>[], layer?: number) => T;
export type TickLineItem = {
    start: Point;
    end: Point;
    value: number;
    anchor?: [number, number];
    alpha?: number;
    beta?: number;
    [key: string]: any;
};
export type TransformedAxisItem = AxisItem & {
    point: Point;
};
export type AxisItem = {
    id?: string | number;
    label: string | number;
    value: number;
    rawValue: any;
    [key: string]: any;
};
export interface AxisBaseAttributes extends IGroupGraphicAttribute {
    select?: boolean;
    hover?: boolean;
    verticalFactor?: number;
    orient?: string;
    items: AxisItem[][];
    title?: TitleAttributes;
    label?: LabelAttributes;
    tick?: TickAttributes;
    subTick?: SubTickAttributes;
    line?: LineAttributes;
    disableTriggerEvent?: boolean;
}
export interface ILine3dType {
    alpha: number;
    anchor3d?: [number, number];
}
export interface BreakSymbol {
    visible?: boolean;
    angle?: number;
    style?: Partial<ISymbolGraphicAttribute>;
}
export interface AxisBreakProps {
    range: [number, number];
    breakSymbol?: BreakSymbol;
    rawRange?: [number, number];
}
export interface TransformedAxisBreak extends AxisBreakProps {
    startPoint: Point;
    endPoint: Point;
}
export interface LineAxisAttributes extends Omit<AxisBaseAttributes, 'label'> {
    start: Point;
    end: Point;
    verticalLimitSize?: number;
    verticalMinSize?: number;
    label?: LabelAttributes & {
        containerAlign?: 'left' | 'right' | 'center' | 'top' | 'bottom' | 'middle';
        flush?: boolean;
        lastVisible?: boolean;
        firstVisible?: boolean;
    };
    panel?: {
        visible?: boolean;
        style?: Partial<IRectGraphicAttribute>;
        state?: AxisItemStateStyle<Partial<IRectGraphicAttribute>>;
    };
    breaks?: AxisBreakProps[];
}
export interface CircleAxisAttributes extends AxisBaseAttributes {
    size?: {
        width: number;
        height: number;
    };
    inside?: boolean;
    center: Point;
    startAngle?: number;
    endAngle?: number;
    radius: number;
    innerRadius?: number;
    sides?: number;
}
export type TitleAttributes = Omit<TagAttributes, 'shape' | 'space' | 'panel' | 'state'> & {
    visible?: boolean;
    position?: 'start' | 'middle' | 'end';
    space?: number;
    autoRotate?: boolean;
    shape?: {
        visible?: boolean;
        space?: number;
        style?: Omit<Partial<ISymbolGraphicAttribute>, 'visible'>;
    };
    background?: {
        visible?: boolean;
        style?: Omit<Partial<IRectGraphicAttribute>, 'visible' | 'width' | 'height'>;
    };
    state?: {
        text?: AxisItemStateStyle<Partial<ITextGraphicAttribute>>;
        shape?: AxisItemStateStyle<Partial<ISymbolGraphicAttribute>>;
        background?: AxisItemStateStyle<Partial<IRectGraphicAttribute>>;
    };
};
export interface LineAttributes extends Pick<SegmentAttributes, 'startSymbol' | 'endSymbol'> {
    visible?: boolean;
    style?: Partial<ILineGraphicAttribute>;
    state?: AxisItemStateStyle<Partial<ILineGraphicAttribute>>;
}
export interface TickAttributes {
    visible: boolean;
    inside?: boolean;
    alignWithLabel?: boolean;
    length?: number;
    style?: Partial<ILineGraphicAttribute> | callbackFunc<Partial<ILineGraphicAttribute> | undefined>;
    state?: AxisItemStateStyle<Partial<ILineGraphicAttribute> | callbackFunc<Partial<ILineGraphicAttribute> | undefined>>;
    dataFilter?: (data: AxisItem[]) => AxisItem[];
}
export interface SubTickAttributes {
    visible: boolean;
    count?: number;
    inside?: boolean;
    length?: number;
    style?: Partial<ILineGraphicAttribute> | callbackFunc<Partial<ILineGraphicAttribute> | undefined>;
    state?: AxisItemStateStyle<Partial<ILineGraphicAttribute> | callbackFunc<Partial<ILineGraphicAttribute> | undefined>>;
}
export type CustomMethod = (items: IText[], separation: number) => IText[];
export interface AxisLabelOverlap {
    autoRotate?: boolean;
    autoRotateAngle?: number[];
    autoHide?: boolean;
    autoHideMethod?: 'parity' | 'greedy' | CustomMethod;
    autoHideSeparation?: number;
    autoLimit?: boolean;
    limitEllipsis?: string;
    overflowLimitLength?: number | {
        left?: number;
        right?: number;
    };
    layoutFunc?: (labels: IText[], labelData: AxisItem[], layer: number, axis: IGroup) => void;
    autoWrap?: boolean;
}
export type LabelAttributes = Omit<AxisLabelOverlap, 'text'> & TextContent & {
    visible: boolean;
    inside?: boolean;
    space?: number;
    formatMethod?: (value: string, datum: Dict<any>, index: number, data?: Dict<any>[], layer?: number) => string;
    style?: Partial<ITextGraphicAttribute> | callbackFunc<Partial<ITextGraphicAttribute> | undefined>;
    state?: AxisItemStateStyle<Partial<ITextGraphicAttribute> | callbackFunc<Partial<ITextGraphicAttribute> | undefined>>;
    dataFilter?: (data: AxisItem[], layer: number) => AxisItem[];
};
export type CoordinateType = 'cartesian' | 'polar' | 'geo' | 'none';
export type IOrientType = 'left' | 'top' | 'right' | 'bottom' | 'z';
export type IPolarOrientType = 'radius' | 'angle';
type breakData = {
    domain?: [number, number][];
    scope?: [number, number][];
    breakDomains: [number, number][];
};
export interface ITickDataOpt {
    sampling?: boolean;
    tickCount?: number | ((option: ITickCallbackOption) => number);
    forceTickCount?: number;
    tickStep?: number;
    tickMode?: 'average' | 'd3' | string | CustomTicksFunc<ContinuousScale>;
    noDecimals?: boolean;
    coordinateType: CoordinateType;
    axisOrientType: IOrientType | IPolarOrientType;
    startAngle?: number;
    labelFormatter?: (value: any) => string;
    labelStyle: ITextGraphicAttribute;
    labelGap?: number;
    labelFirstVisible?: boolean;
    labelLastVisible?: boolean;
    breakData?: () => breakData;
}
export interface ICartesianTickDataOpt extends ITickDataOpt {
    axisOrientType: IOrientType;
    labelFlush: boolean;
    breakData?: () => breakData;
}
export interface IPolarTickDataOpt extends ITickDataOpt {
    axisOrientType: IPolarOrientType;
    getRadius: () => number;
    labelOffset: number;
    inside: boolean;
}
export interface ITickData {
    index: number;
    value: number | string;
}
export type ITickCallbackOption = {
    axisLength?: number;
    labelStyle?: ITextGraphicAttribute;
};
export interface ILabelItem<T> extends Pick<IGraphic, 'AABBBounds'> {
    value?: T;
}
export {};
