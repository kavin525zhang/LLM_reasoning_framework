import type { IText, ITextGraphicAttribute, EasingType } from '@visactor/vrender-core';
import type { ILabelAnimation, ILabelUpdateAnimation, ILabelUpdateChannelAnimation, LabelContent } from '../type';
export declare function getAnimationAttributes(textAttribute: ITextGraphicAttribute, type: 'fadeIn' | 'fadeOut'): {
    from: any;
    to: any;
};
export declare function updateAnimation(prev: LabelContent['text'], next: LabelContent['text'], animationConfig: ILabelUpdateAnimation | ILabelUpdateChannelAnimation[]): void;
export declare const update: (prev: LabelContent['text'], next: LabelContent['text'], channel?: string[], options?: ILabelUpdateChannelAnimation['options']) => {
    from: Partial<ITextGraphicAttribute> | Partial<import("@visactor/vrender-core").IRichTextGraphicAttribute>;
    to: Partial<ITextGraphicAttribute> | Partial<import("@visactor/vrender-core").IRichTextGraphicAttribute>;
};
export declare function playIncreaseCount(prev: IText, next: IText, duration: number, easing: EasingType): void;
export declare const DefaultLabelAnimation: ILabelAnimation;
