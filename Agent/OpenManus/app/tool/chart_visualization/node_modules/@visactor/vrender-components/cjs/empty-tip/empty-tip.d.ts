import { AbstractComponent } from '../core/base';
import type { EmptyTipAttributes } from './type';
import { Image, Text } from '@visactor/vrender-core';
import type { ComponentOptions } from '../interface';
export declare class EmptyTip extends AbstractComponent<Required<EmptyTipAttributes>> {
    static defaultAttributes: Partial<EmptyTipAttributes>;
    _text: Text;
    _emptyTipIcon: Image;
    constructor(attributes: EmptyTipAttributes, options?: ComponentOptions);
    render(): void;
    renderIcon(): void;
    renderText(): void;
    layout(): void;
}
