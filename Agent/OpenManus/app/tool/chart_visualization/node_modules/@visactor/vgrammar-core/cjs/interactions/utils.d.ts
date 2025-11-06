import type { ElementFilterOptions, ElementSelectTriggerOff, EventType, IElement, IMark } from '../types';
export declare const generateFilterValue: (options: ElementFilterOptions) => (el: IElement) => any;
export declare const groupMarksByState: (marks: IMark[], states: string[]) => Record<string, IMark[]>;
export declare const parseTriggerOffOfSelect: (triggerOff: ElementSelectTriggerOff | ElementSelectTriggerOff[]) => {
    eventNames: EventType[];
    resetType: ("view" | "self" | "timeout")[];
};
