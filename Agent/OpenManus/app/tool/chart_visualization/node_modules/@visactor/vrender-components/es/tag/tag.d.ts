import { type IRect, type IText, type IRichText } from '@visactor/vrender-core';
import { AbstractComponent } from '../core/base';
import type { ComponentOptions } from '../interface';
import type { TagAttributes } from './type';
export declare class Tag extends AbstractComponent<Required<TagAttributes>> {
    name: string;
    private _bgRect;
    private _textShape;
    private _symbol;
    private _tagStates;
    private _rectStates;
    private _symbolStates;
    private _textStates;
    getBgRect(): IRect;
    getTextShape(): IRichText | IText;
    static defaultAttributes: Partial<TagAttributes>;
    constructor(attributes: TagAttributes, options?: ComponentOptions);
    protected render(): void;
    initAttributes(params: TagAttributes, options?: ComponentOptions): void;
    addState(stateName: string, keepCurrentStates?: boolean, hasAnimation?: boolean): void;
    removeState(stateName: string, hasAnimation?: boolean): void;
    cacheStates(): void;
    resetStates(): void;
}
