import type { EasingType, IGraphic, IGroupGraphicAttribute, ITextGraphicAttribute, IRichTextGraphicAttribute, IText, TextAlignType, TextBaselineType, ILineGraphicAttribute, IRichTextCharacter, IRichText, ILine, ICustomPath2D, IArc, IGroup } from '@visactor/vrender-core';
import type { BoundsAnchorType, IPointLike, InsideBoundsAnchorType } from '@visactor/vutils';
export type LabelItemStateStyle<T> = {
    hover?: T;
    hover_reverse?: T;
    selected?: T;
    selected_reverse?: T;
    [key: string]: T;
};
export type LabelItem = {
    id?: string;
    data?: any;
    [key: string]: any;
    textType?: string;
    text?: string | string[] | number | number[] | IRichTextCharacter[];
    textAlign?: 'left' | 'right' | 'center' | 'start' | 'end';
    textBaseline?: 'top' | 'middle' | 'bottom' | 'alphabetic';
} & (Omit<Partial<ITextGraphicAttribute>, 'textAlign' | 'textBaseline'> | Omit<Partial<IRichTextGraphicAttribute>, 'textAlign' | 'textBaseline'>);
export interface BaseLabelAttrs extends IGroupGraphicAttribute {
    type: string;
    baseMarkGroupName: string;
    getBaseMarks?: () => IGraphic[];
    select?: boolean;
    hover?: boolean;
    data: LabelItem[];
    textStyle?: Partial<ITextGraphicAttribute>;
    state?: LabelItemStateStyle<ITextGraphicAttribute>;
    line?: ILabelLineSpec;
    labelLineState?: LabelItemStateStyle<ILineGraphicAttribute>;
    syncState?: boolean;
    position?: Functional<string>;
    offset?: number;
    overlap?: OverlapAttrs | boolean;
    smartInvert?: SmartInvertAttrs | boolean;
    animation?: ILabelAnimation | boolean;
    animationEnter?: ILabelUpdateAnimation | boolean;
    animationUpdate?: ILabelUpdateAnimation | ILabelUpdateChannelAnimation[] | boolean;
    animationExit?: ILabelExitAnimation | boolean;
    dataFilter?: (data: LabelItem[]) => LabelItem[];
    customLayoutFunc?: (item: LabelItem[], labels: (IText | IRichText)[], getRelatedGraphic: (data: LabelItem) => IGraphic, getRelatedPoint: ((data: LabelItem) => IPointLike) | null | undefined, labelComponent: IGroup) => (IText | IRichText)[];
    customOverlapFunc?: (label: (IText | IRichText)[], getRelatedGraphic: (data: LabelItem) => IGraphic, getRelatedPoint: ((data: LabelItem) => IPointLike) | null | undefined, labelComponent: IGroup) => (IText | IRichText)[];
    onAfterOverlapping?: (labels: (IText | IRichText)[], getRelatedGraphic: (data: LabelItem) => IGraphic, getRelatedPoint: ((data: LabelItem) => IPointLike) | null | undefined, labelComponent: IGroup) => void;
    disableTriggerEvent?: boolean;
    id?: string;
}
export interface OverlapAttrs {
    size?: {
        width: number;
        height: number;
    };
    hideOnHit?: boolean;
    clampForce?: boolean;
    avoidBaseMark?: boolean;
    avoidMarks?: string[] | IGraphic[];
    strategy?: Strategy[] | ShiftYStrategy;
    overlapPadding?: number;
    priority?: (labelItem: LabelItem) => number;
}
export interface SmartInvertAttrs {
    mode?: string;
    textType?: string;
    contrastRatiosThreshold?: number;
    alternativeColors?: string | string[];
    fillStrategy?: 'base' | 'invertBase' | 'similarBase' | 'null';
    strokeStrategy?: 'base' | 'invertBase' | 'similarBase' | 'null';
    brightColor?: string;
    darkColor?: string;
    outsideEnable?: boolean;
    interactInvertType?: 'none' | 'stroked' | 'inside';
}
export type ShiftYStrategy = {
    type: 'shiftY';
    iteration?: number;
    maxError?: number;
    padding?: number;
};
export type PositionStrategy = {
    type: 'position';
    position?: Functional<LabelPosition[]>;
    restorePosition?: boolean;
};
export type BoundStrategy = {
    type: 'bound';
    position?: Functional<LabelPosition[]>;
    restorePosition?: boolean;
};
export type MoveYStrategy = {
    type: 'moveY';
    offset: Functional<number[]>;
};
export type MoveXStrategy = {
    type: 'moveX';
    offset: Functional<number[]>;
};
export type Strategy = PositionStrategy | BoundStrategy | MoveYStrategy | MoveXStrategy;
export type LabelPosition = SymbolLabelAttrs['position'] | RectLabelAttrs['position'];
export interface SymbolLabelAttrs extends BaseLabelAttrs {
    type: 'symbol';
    position?: Functional<BoundsAnchorType>;
}
export interface RectLabelAttrs extends BaseLabelAttrs {
    type: 'rect';
    position?: Functional<InsideBoundsAnchorType | BoundsAnchorType>;
}
export interface LineLabelAttrs extends BaseLabelAttrs {
    type: 'line';
    position?: Functional<'start' | 'end'>;
}
export interface AreaLabelAttrs extends BaseLabelAttrs {
    type: 'area';
    position?: Functional<'start' | 'end'>;
}
export interface LineDataLabelAttrs extends BaseLabelAttrs {
    type: 'line-data';
    position?: Functional<BoundsAnchorType | 'inside-middle'>;
}
export interface PolygonLabelAttrs extends BaseLabelAttrs {
    type: 'polygon';
    position?: Functional<'center'>;
}
export interface ArcLabelAttrs extends BaseLabelAttrs {
    type: 'arc';
    baseMarkGroupName: string;
    position?: 'inside' | 'outside' | 'inside-inner' | 'inside-outer' | 'inside-center';
    width?: number;
    height?: number;
    coverEnable?: boolean;
    rotate?: boolean;
    spaceWidth?: number;
    angle?: number;
    offsetAngle?: number;
    offsetRadius?: number;
    textAlign?: TextAlignType;
    textBaseline?: TextBaselineType;
    layoutArcGap?: number;
    line?: IArcLabelLineSpec;
    layout?: IArcLabelLayoutSpec;
    points?: IPoint[];
    centerOffset?: number;
}
export interface ILabelLineSpec {
    visible?: boolean;
    customShape?: (container: IGroup, attrs: Partial<ILineGraphicAttribute>, path: ICustomPath2D) => ICustomPath2D;
    style?: Partial<ILineGraphicAttribute>;
}
export interface IArcLabelLineSpec extends ILabelLineSpec {
    line1MinLength?: number;
    line2MinLength?: number | ((texts: IGraphic[], arcs: IArc[], attrs: Partial<ArcLabelAttrs>) => number);
    smooth?: boolean;
}
export type ArcLabelAlignType = 'arc' | 'labelLine' | 'edge';
export type ArcLabelStrategyType = 'priority' | 'vertical' | 'none';
export interface IArcLabelLayoutSpec {
    textAlign?: ArcLabelAlignType;
    align?: ArcLabelAlignType;
    alignOffset?: number | ((texts: IGraphic[], arcs: IArc[], attrs: Partial<ArcLabelAttrs>) => number);
    strategy?: ArcLabelStrategyType;
    tangentConstraint?: boolean;
}
export interface DataLabelAttrs extends IGroupGraphicAttribute {
    dataLabels: (RectLabelAttrs | SymbolLabelAttrs | ArcLabelAttrs | LineDataLabelAttrs)[];
    size: {
        width: number;
        height: number;
        padding?: {
            top?: number;
            left?: number;
            right?: number;
            bottom?: number;
        };
    };
}
export type Functional<T> = T | ((data: any) => T);
export interface ILabelExitAnimation {
    duration?: number;
    delay?: number;
    easing?: EasingType;
}
export interface ILabelEnterAnimation extends ILabelExitAnimation {
    mode?: 'same-time' | 'after' | 'after-all';
}
export interface ILabelUpdateAnimation extends ILabelExitAnimation {
    increaseEffect?: boolean;
}
export interface ILabelUpdateChannelAnimation extends ILabelUpdateAnimation {
    channel?: string[];
    options?: {
        excludeChannels?: string[];
    };
}
export interface ILabelAnimation extends ILabelEnterAnimation, ILabelExitAnimation, ILabelUpdateAnimation {
}
export interface IPoint {
    x: number;
    y: number;
}
export interface IPolarPoint {
    radius: number;
    angle: number;
}
export type Quadrant = 1 | 2 | 3 | 4;
export type TextAlign = 'left' | 'right' | 'center';
export type LabelContent = {
    text: IText | IRichText;
    labelLine?: ILine;
};
