import type { Cursor, IColor, IGroupGraphicAttribute, IImageGraphicAttribute, IRectGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
export type CheckboxText = {
    disableFill?: IColor;
} & ITextGraphicAttribute;
export type CheckboxIcon = {
    checkIconImage?: string | HTMLImageElement | HTMLCanvasElement;
    indeterminateIconImage?: string | HTMLImageElement | HTMLCanvasElement;
} & Omit<IImageGraphicAttribute, 'image'>;
export type CheckboxRect = {
    disableFill?: IColor;
    checkedFill?: IColor;
    checkedStroke?: IColor;
    disableCheckedFill?: IColor;
    disableCheckedStroke?: IColor;
} & IRectGraphicAttribute;
export type CheckboxAttributes = IGroupGraphicAttribute & {
    interactive?: boolean;
    disabled?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    text?: CheckboxText;
    icon?: CheckboxIcon;
    box?: CheckboxRect;
    disableCursor?: Cursor;
    spaceBetweenTextAndIcon?: number;
};
