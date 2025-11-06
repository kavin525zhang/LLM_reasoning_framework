import type { ElementHighlightOptions, IMark, IView, InteractionEvent } from '../types';
import { BaseInteraction } from './base';
export declare class ElementHighlightByGroup extends BaseInteraction<ElementHighlightOptions> {
    static type: string;
    type: string;
    static defaultOptions: ElementHighlightOptions;
    options: ElementHighlightOptions;
    protected _marks?: IMark[];
    constructor(view: IView, options?: ElementHighlightOptions);
    getStartState(): string;
    protected getEvents(): {
        type: "none" | import("../types").EventType;
        handler: (e: InteractionEvent) => void;
    }[];
    resetAll(): void;
    start(element: InteractionEvent['element']): void;
    reset(element?: InteractionEvent['element']): void;
    handleStart: (e: InteractionEvent) => void;
    handleReset: (e: InteractionEvent) => void;
}
