import type { IElement, IGlyphElement, IMark, IToggleStateMixin } from '../types';
export declare class ToggleStateMixin implements IToggleStateMixin {
    protected _statedElements?: (IElement | IGlyphElement)[];
    protected _marks?: IMark[];
    protected _stateMarks: Record<string, IMark[]>;
    updateStates(newStatedElements: (IElement | IGlyphElement)[], prevStatedElements?: (IElement | IGlyphElement)[], state?: string, reverseState?: string): (IGlyphElement<any> | IElement)[];
    protected toggleReverseStateOfElements(newStatedElements: (IElement | IGlyphElement)[], prevStatedElements: (IElement | IGlyphElement)[], reverseState: string): void;
    protected toggleStateOfElements(newStatedElements: (IElement | IGlyphElement)[], prevStatedElements: (IElement | IGlyphElement)[], state: string): void;
    protected addBothStateOfElements(statedElements: (IElement | IGlyphElement)[], state: string, reverseState: string): void;
    protected addStateOfElements(statedElements: (IElement | IGlyphElement)[], state: string): void;
    clearAllStates(state?: string, reverseState?: string): void;
}
