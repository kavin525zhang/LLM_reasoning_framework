import type { EasingType, IGraphic } from '@visactor/vrender-core';
import type { ArcSegment, Segment } from '../../segment';
import type { Tag } from '../../tag';
export declare function graphicFadeIn(graphic: IGraphic, delay: number, duration: number, easing: EasingType): void;
export declare function segmentFadeIn(segment: Segment, delay: number, duration: number, easing: EasingType): void;
export declare function tagFadeIn(tag: Tag, delay: number, duration: number, easing: EasingType): void;
export declare function graphicFadeOut(graphic: IGraphic, delay: number, duration: number, easing: EasingType): void;
export declare function segmentFadeOut(segment: Segment | ArcSegment, delay: number, duration: number, easing: EasingType): void;
export declare function tagFadeOut(tag: Tag, delay: number, duration: number, easing: EasingType): void;
