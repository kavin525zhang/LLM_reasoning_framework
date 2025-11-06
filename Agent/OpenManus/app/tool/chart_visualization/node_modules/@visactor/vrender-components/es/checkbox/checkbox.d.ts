import { AbstractComponent } from '../core/base';
import type { CheckboxAttributes } from './type';
import { Image, Rect, Text } from '@visactor/vrender-core';
import type { ComponentOptions } from '../interface';
export declare class CheckBox extends AbstractComponent<Required<CheckboxAttributes>> {
    static defaultAttributes: Partial<CheckboxAttributes>;
    _box: Rect;
    _checkIcon: Image;
    _indeterminateIcon: Image;
    _text: Text;
    name: 'checkbox';
    constructor(attributes: CheckboxAttributes, options?: ComponentOptions);
    render(): void;
    renderBox(): void;
    renderIcon(): void;
    renderText(): void;
    renderGroup(): void;
    layout(): void;
    private _handlePointerUp;
    initAttributes(params: CheckboxAttributes, options?: ComponentOptions): void;
}
