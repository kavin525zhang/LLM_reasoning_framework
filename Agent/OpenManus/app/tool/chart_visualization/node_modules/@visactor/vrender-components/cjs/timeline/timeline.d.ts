import { AbstractComponent } from '../core/base';
import type { TimelineAttrs } from './type';
import type { ComponentOptions } from '../interface';
export declare class Timeline extends AbstractComponent<Required<TimelineAttrs>> {
    name: string;
    private _line?;
    private _activeLine?;
    private _symbolGroup?;
    private _labelGroup?;
    private _timesPercent?;
    static defaultAttributes: Partial<TimelineAttrs>;
    constructor(attributes: TimelineAttrs, options?: ComponentOptions);
    protected render(): void;
    appearAnimate(animateConfig: {
        duration?: number;
        easing?: string;
    }): void;
    goto(flag: 1 | -1, animateConfig: {
        duration?: number;
        easing?: string;
    }): void;
    forward(animateConfig: {
        duration?: number;
        easing?: string;
    }): void;
    backward(animateConfig: {
        duration?: number;
        easing?: string;
    }): void;
}
