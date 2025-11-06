import type { InteractionEvent } from '../types';
import { ElementSelect } from './element-select';
export declare class ElementSelectByGraphicName extends ElementSelect {
    static type: string;
    type: string;
    start(element: InteractionEvent['element']): void;
}
