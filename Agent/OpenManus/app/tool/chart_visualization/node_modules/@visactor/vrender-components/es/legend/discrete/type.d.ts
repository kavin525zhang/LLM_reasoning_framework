import type { EasingType, IGroupGraphicAttribute, ILinearGradient, ISymbolGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import type { BaseGraphicAttributes, Padding } from '../../core/type';
import type { PagerAttributes } from '../../pager/type';
import type { LegendBaseAttributes } from '../type';
import type { ScrollBarAttributes } from '../../scrollbar/type';
import type { GraphicEventType } from '@visactor/vrender-core';
export interface LegendSwitchComponentAttributes {
    space?: number;
    defaultCurrent?: number;
    animation?: boolean;
    animationDuration?: number;
    animationEasing?: EasingType;
}
export type LegendPagerAttributes = Omit<PagerAttributes, 'total'> & LegendSwitchComponentAttributes & {
    position?: 'start' | 'middle' | 'end';
};
export type LegendScrollbarAttributes = Omit<ScrollBarAttributes, 'range' | 'limitRange'> & LegendSwitchComponentAttributes & {
    type: 'scrollbar';
    scrollByPosition?: boolean;
    roamScroll?: boolean;
    visible?: boolean;
    scrollMask?: {
        visible?: boolean;
        gradientLength?: number;
        gradientStops: ILinearGradient['stops'];
    };
};
export type LegendItemDatum = {
    id?: string;
    label: string;
    value?: string | number;
    shape: {
        symbolType?: string;
        fill?: string;
        stroke?: string;
    };
    [key: string]: any;
};
export type StyleCallback<T> = (item: LegendItemDatum, isSelected: boolean, index: number, allItems: LegendItemDatum[]) => T;
export type formatterCallback = (text: string | number, item: LegendItemDatum, index: number) => any;
export type LegendItem = {
    visible?: boolean;
    spaceCol?: number;
    spaceRow?: number;
    maxWidth?: number;
    width?: number;
    height?: number;
    padding?: Padding;
    background?: {
        visible?: boolean;
    } & BaseGraphicAttributes<Partial<IGroupGraphicAttribute> | StyleCallback<Partial<IGroupGraphicAttribute>>>;
    shape?: {
        visible?: boolean;
        space?: number;
    } & BaseGraphicAttributes<Partial<ISymbolGraphicAttribute> | StyleCallback<Partial<ISymbolGraphicAttribute>>>;
    autoEllipsisStrategy?: 'labelFirst' | 'valueFirst' | 'none';
    label?: {
        widthRatio?: number;
        space?: number;
        formatMethod?: formatterCallback;
    } & BaseGraphicAttributes<Partial<ITextGraphicAttribute> | StyleCallback<Partial<ITextGraphicAttribute>>>;
    value?: {
        widthRatio?: number;
        space?: number;
        alignRight?: boolean;
        formatMethod?: formatterCallback;
    } & BaseGraphicAttributes<Partial<ITextGraphicAttribute> | StyleCallback<Partial<ITextGraphicAttribute>>>;
    focus?: boolean;
    focusIconStyle?: Partial<ISymbolGraphicAttribute>;
    align?: 'left' | 'right';
    verticalAlign?: 'top' | 'middle' | 'bottom';
};
export type DiscreteLegendAttrs = {
    select?: boolean | {
        trigger?: GraphicEventType;
    };
    hover?: boolean | {
        trigger?: GraphicEventType;
        triggerOff?: GraphicEventType;
    };
    items: LegendItemDatum[];
    defaultSelected?: (string | number)[];
    selectMode?: 'single' | 'multiple' | 'focus';
    allowAllCanceled?: boolean;
    reversed?: boolean;
    item?: LegendItem;
    maxWidth?: number;
    maxHeight?: number;
    maxRow?: number;
    maxCol?: number;
    lazyload?: boolean;
    autoPage?: boolean;
    pager?: LegendPagerAttributes | LegendScrollbarAttributes;
} & LegendBaseAttributes;
