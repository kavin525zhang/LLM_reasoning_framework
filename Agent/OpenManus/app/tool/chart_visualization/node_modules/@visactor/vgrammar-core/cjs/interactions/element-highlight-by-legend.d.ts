import type { ElementHighlightByLegendOptions, IElement, IGlyphElement, IMark, IView, InteractionEvent } from '../types';
import { BaseInteraction } from './base';
import { LegendEvent } from '@visactor/vrender-components';
export declare class ElementHighlightByLegend extends BaseInteraction<ElementHighlightByLegendOptions> {
    static type: string;
    type: string;
    static defaultOptions: ElementHighlightByLegendOptions;
    options: ElementHighlightByLegendOptions;
    protected _marks?: IMark[];
    constructor(view: IView, options?: ElementHighlightByLegendOptions);
    getStartState(): string;
    protected getEvents(): {
        type: LegendEvent;
        handler: (e: InteractionEvent, element: IGlyphElement<any> | IElement) => void;
    }[];
    start(itemKey: IElement | IGlyphElement | string): void;
    resetAll(): void;
    reset(element?: InteractionEvent['element']): void;
    handleStart: (e: InteractionEvent, element: IElement | IGlyphElement) => void;
    handleReset: (e: InteractionEvent) => void;
}
