import { AbstractComponent } from '../core/base';
import type { IStoryLabelItemAttrs } from './type';
import type { ComponentOptions } from '../interface';
export declare class StoryLabelItem extends AbstractComponent<Required<IStoryLabelItemAttrs>> {
    name: 'labelItem';
    private _line?;
    private _symbolStart;
    private _symbolEnd;
    private _symbolStartOuter;
    private _titleTop;
    private _titleBottom;
    private _titleTopPanel;
    private _titleBottomPanel;
    static defaultAttributes: Partial<IStoryLabelItemAttrs>;
    constructor(attributes: IStoryLabelItemAttrs, options?: ComponentOptions);
    protected render(): void;
    appearAnimate(animateConfig: {
        duration?: number;
        easing?: string;
        symbolStartOuterType?: 'scale' | 'clipRange';
        titleType?: 'typewriter' | 'move';
        titlePanelType?: 'scale' | 'stroke';
    }): void;
    disappearAnimate(animateConfig: {
        duration?: number;
        easing?: string;
        mode?: 'scale' | 'default';
    }): void;
}
