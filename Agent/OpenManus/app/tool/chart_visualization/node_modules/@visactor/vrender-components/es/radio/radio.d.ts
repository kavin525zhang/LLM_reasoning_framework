import { AbstractComponent } from '../core/base';
import type { RadioAttributes } from './type';
import { Arc, Text } from '@visactor/vrender-core';
import type { ComponentOptions } from '../interface';
export declare class Radio extends AbstractComponent<Required<RadioAttributes>> {
    static defaultAttributes: Partial<RadioAttributes>;
    _circle: Arc;
    _text: Text;
    name: 'radio';
    constructor(attributes: RadioAttributes, options?: ComponentOptions);
    render(): void;
    renderCircle(): void;
    renderText(): void;
    renderGroup(): void;
    layout(): void;
    private _handlePointerUp;
    initAttributes(params: RadioAttributes, options?: ComponentOptions): void;
}
