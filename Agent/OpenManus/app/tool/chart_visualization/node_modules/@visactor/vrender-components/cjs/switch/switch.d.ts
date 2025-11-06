import { AbstractComponent } from '../core/base';
import type { SwitchAttributes } from './type';
import type { ICircle } from '@visactor/vrender-core';
import { Rect, Text } from '@visactor/vrender-core';
import type { ComponentOptions } from '../interface';
export declare class Switch extends AbstractComponent<Required<SwitchAttributes>> {
    static defaultAttributes: Partial<SwitchAttributes>;
    _box: Rect;
    _circle: ICircle;
    _text: Text;
    name: 'switch';
    constructor(attributes: SwitchAttributes, options?: ComponentOptions);
    render(): void;
    renderBox(): void;
    renderCircle(): void;
    renderText(): void;
    renderGroup(): void;
    layout(): void;
    private _handlePointerUp;
    initAttributes(params: SwitchAttributes, options?: ComponentOptions): void;
}
