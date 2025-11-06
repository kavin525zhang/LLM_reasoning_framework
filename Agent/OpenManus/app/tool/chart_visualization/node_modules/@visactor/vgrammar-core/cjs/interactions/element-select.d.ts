import type { ElementSelectOptions, EventType, IElement, IGlyphElement, IMark, IToggleStateMixin, IView, InteractionEvent } from '../types';
import { BaseInteraction } from './base';
export interface ElementSelect extends IToggleStateMixin, BaseInteraction<ElementSelectOptions> {
}
export declare class ElementSelect extends BaseInteraction<ElementSelectOptions> {
    static type: string;
    type: string;
    static defaultOptions: ElementSelectOptions;
    protected _resetType: ('view' | 'self' | 'timeout')[];
    protected _marks?: IMark[];
    protected _stateMarks: Record<string, IMark[]>;
    private _timer?;
    protected _statedElements?: (IElement | IGlyphElement)[];
    constructor(view: IView, options?: ElementSelectOptions);
    getStartState(): string;
    protected getEvents(): {
        type: EventType | EventType[];
        handler: (e: InteractionEvent) => void;
    }[];
    resetAll: () => void;
    handleStart: (e: InteractionEvent) => void;
    handleReset: (e: InteractionEvent) => void;
    start(element: InteractionEvent['element']): void;
    reset(element: InteractionEvent['element']): void;
}
