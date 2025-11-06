import type { ElementActiveOptions, IElement, IMark, IView, InteractionEvent } from '../types';
import { BaseInteraction } from './base';
export declare class ElementActive extends BaseInteraction<ElementActiveOptions> {
    static type: string;
    type: string;
    static defaultOptions: ElementActiveOptions;
    options: ElementActiveOptions;
    protected _marks?: IMark[];
    protected _prevActiveElement?: IElement;
    constructor(view: IView, options?: ElementActiveOptions);
    protected getEvents(): {
        type: "none" | import("../types").EventType | import("../types").EventType[];
        handler: (e: InteractionEvent) => void;
    }[];
    getStartState(): string;
    start(element: InteractionEvent['element']): void;
    reset(element?: InteractionEvent['element']): void;
    handleStart: (e: InteractionEvent) => void;
    handleReset: (e: InteractionEvent) => void;
}
