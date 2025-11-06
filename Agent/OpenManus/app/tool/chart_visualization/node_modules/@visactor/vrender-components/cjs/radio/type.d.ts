import type { Cursor, IArcGraphicAttribute, IColor, IGroupGraphicAttribute, IWrapTextGraphicAttribute } from '@visactor/vrender-core';
export type RadioText = {
    disableFill?: IColor;
} & IWrapTextGraphicAttribute;
export type CircleStyle = {
    disableFill?: IColor;
    checkedFill?: IColor;
    checkedStroke?: IColor;
    disableCheckedFill?: IColor;
    disableCheckedStroke?: IColor;
} & IArcGraphicAttribute;
export type RadioAttributes = IGroupGraphicAttribute & {
    id?: string;
    interactive?: boolean;
    disabled?: boolean;
    checked?: boolean;
    text?: RadioText;
    circle?: CircleStyle;
    disableCursor?: Cursor;
    spaceBetweenTextAndIcon?: number;
};
