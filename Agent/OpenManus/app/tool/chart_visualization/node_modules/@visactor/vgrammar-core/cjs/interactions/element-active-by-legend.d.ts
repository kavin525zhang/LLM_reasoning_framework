import type { ElementActiveByLegendOptions, IElement, IGlyphElement, IMark, IView, InteractionEvent } from '../types';
import { BaseInteraction } from './base';
import { LegendEvent } from '@visactor/vrender-components';
export declare class ElementActiveByLegend extends BaseInteraction<ElementActiveByLegendOptions> {
    static type: string;
    type: string;
    static defaultOptions: ElementActiveByLegendOptions;
    options: ElementActiveByLegendOptions;
    protected _marks?: IMark[];
    constructor(view: IView, options?: ElementActiveByLegendOptions);
    protected getEvents(): {
        type: LegendEvent;
        handler: (e: InteractionEvent) => void;
    }[];
    getStartState(): string;
    start(element: IElement | IGlyphElement | string): void;
    resetAll(): void;
    reset(element?: InteractionEvent['element']): void;
    handleStart: (e: InteractionEvent) => void;
    handleReset: (e: InteractionEvent) => void;
}
