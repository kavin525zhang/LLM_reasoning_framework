import type { ElementHighlightByGraphicNameOptions, IElement, IGlyphElement, IView, InteractionEvent } from '../types';
import { ElementHighlight } from './element-highlight';
export declare class ElementHighlightByGraphicName extends ElementHighlight {
    static type: string;
    type: string;
    options: ElementHighlightByGraphicNameOptions;
    constructor(view: IView, options?: ElementHighlightByGraphicNameOptions);
    protected _filterByName(e: InteractionEvent): boolean;
    protected _parseTargetKey(e: InteractionEvent, element: IElement | IGlyphElement): string;
    start(itemKey: IElement | IGlyphElement | string): void;
    reset(): void;
    handleStart: (e: InteractionEvent) => void;
    handleReset: (e: InteractionEvent) => void;
}
