import type { ElementHighlightByNameOptions, IElement, IGlyphElement, IMark, IView, InteractionEvent } from '../types';
import { BaseInteraction } from './base';
export declare class ElementHighlightByName extends BaseInteraction<ElementHighlightByNameOptions> {
    static type: string;
    type: string;
    static defaultOptions: ElementHighlightByNameOptions;
    options: ElementHighlightByNameOptions;
    protected _marks?: IMark[];
    constructor(view: IView, options?: ElementHighlightByNameOptions);
    getStartState(): string;
    protected getEvents(): ({
        type: import("../types").EventType;
        handler: (e: InteractionEvent, element: IGlyphElement<any> | IElement) => void;
    } | {
        type: "none" | import("../types").EventType;
        handler: (e: InteractionEvent) => void;
    })[];
    protected _filterByName(e: InteractionEvent): boolean;
    protected _parseTargetKey(e: InteractionEvent, element: IElement | IGlyphElement): any;
    start(itemKey: IElement | IGlyphElement | string): void;
    resetAll(): void;
    reset(element?: InteractionEvent['element']): void;
    handleStart: (e: InteractionEvent, element: IElement | IGlyphElement) => void;
    handleReset: (e: InteractionEvent) => void;
}
