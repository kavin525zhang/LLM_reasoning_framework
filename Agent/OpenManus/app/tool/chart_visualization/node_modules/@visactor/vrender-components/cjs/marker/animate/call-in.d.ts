import type { EasingType, IImage, ILine, IRichText, ISymbol } from '@visactor/vrender-core';
import type { Segment } from '../../segment';
import type { Tag } from '../../tag';
export declare function pointCallIn(itemLine: Segment, decorativeLine: ILine, item: Tag | IRichText | ISymbol | IImage, duration: number, delay: number, easing: EasingType): void;
