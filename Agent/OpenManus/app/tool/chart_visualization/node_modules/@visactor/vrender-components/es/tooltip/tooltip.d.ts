import type { IGroup, IText, IRichText, ISymbol } from '@visactor/vrender-core';
import { AbstractComponent } from '../core/base';
import type { TooltipAttributes, TooltipRowAttrs, TooltipRowStyleAttrs } from './type';
import type { ComponentOptions } from '../interface';
export declare class Tooltip extends AbstractComponent<Required<TooltipAttributes>> {
    name: string;
    private _tooltipPanel;
    private _tooltipTitleContainer;
    private _tooltipTitleSymbol;
    private _tooltipTitle;
    private _tooltipContent;
    static defaultAttributes: Partial<TooltipAttributes>;
    constructor(attributes: TooltipAttributes, options?: ComponentOptions);
    protected render(): void;
    protected _createShape(x: number, itemAttr: TooltipRowAttrs & TooltipRowStyleAttrs, itemGroup: IGroup, itemGroupName: string): ISymbol;
    protected _createKey(itemAttr: TooltipRowAttrs & TooltipRowStyleAttrs, itemGroup: IGroup, itemGroupName: string): IRichText | IText;
    protected _createValue(itemAttr: TooltipRowAttrs & TooltipRowStyleAttrs, itemGroup: IGroup, itemGroupName: string): IRichText | IText;
    setAttributes(params: Partial<Required<TooltipAttributes>>, forceUpdateTag?: boolean | undefined): void;
    static calculateTooltipPosition(attribute: Partial<TooltipAttributes>): Partial<TooltipAttributes>;
    static measureTooltip(attribute: Partial<TooltipAttributes>): Partial<TooltipAttributes>;
    static getTitleAttr(attribute: Partial<TooltipAttributes>): TooltipRowAttrs & TooltipRowStyleAttrs;
    static getContentAttr(attribute: Partial<TooltipAttributes>, index: number): TooltipRowAttrs & TooltipRowStyleAttrs;
}
