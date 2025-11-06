import type { IBaseInteractionOptions, IElement, IGlyphElement, IGrammarBase, IView, InteractionEventHandler } from '../types';
export declare abstract class BaseInteraction<T extends IBaseInteractionOptions> {
    readonly view: IView;
    options: T;
    type: string;
    constructor(view: IView, options: T);
    references: Map<IGrammarBase, number>;
    protected abstract getEvents(): Array<{
        type: string | string[];
        handler: InteractionEventHandler;
    }>;
    getStartState(): string;
    depend(grammar: IGrammarBase[] | IGrammarBase | string[] | string): void;
    parameters(): any;
    bind(): void;
    unbind(): void;
    start(element: IElement | IGlyphElement): void;
    reset(element?: IElement | IGlyphElement): void;
    protected dispatchEvent(type: 'start' | 'reset' | 'update' | 'end', params: any): void;
}
