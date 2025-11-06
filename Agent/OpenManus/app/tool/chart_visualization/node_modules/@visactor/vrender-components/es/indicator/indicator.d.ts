import type { IGroup, IRichText, IText } from '@visactor/vrender-core';
import { AbstractComponent } from '../core/base';
import type { IndicatorAttributes, IndicatorItemSpec } from './type';
export declare class Indicator extends AbstractComponent<Required<IndicatorAttributes>> {
    name: string;
    private _title?;
    private _content?;
    protected _renderText(group: IGroup, title: IndicatorItemSpec, limit: number, limitRatio: number, themePath: string, graphicName: string): IRichText | IText;
    protected render(): void;
    private _setLocalAutoFit;
    private _setGlobalAutoFit;
    private _setYPosition;
}
