import type { ElementHighlightOptions, EventType, IElement, IGlyphElement, IMark, IToggleStateMixin, IView, InteractionEvent } from '../types';
import { BaseInteraction } from './base';
export interface ElementHighlight extends IToggleStateMixin, BaseInteraction<ElementHighlightOptions> {
}
export declare class ElementHighlight extends BaseInteraction<ElementHighlightOptions> {
    static type: string;
    type: string;
    static defaultOptions: ElementHighlightOptions;
    options: ElementHighlightOptions;
    protected _marks?: IMark[];
    protected _stateMarks: Record<string, IMark[]>;
    protected _lastElement?: IElement;
    protected _statedElements?: (IElement | IGlyphElement)[];
    protected _resetType?: 'view' | 'self';
    constructor(view: IView, options?: ElementHighlightOptions);
    getStartState(): string;
    protected getEvents(): {
        type: EventType;
        handler: (e: InteractionEvent) => void;
    }[];
    resetAll(): void;
    start(element: InteractionEvent['element']): void;
    reset(element: InteractionEvent['element']): void;
    handleStart: (e: InteractionEvent) => void;
    handleReset: (e: InteractionEvent) => void;
}
