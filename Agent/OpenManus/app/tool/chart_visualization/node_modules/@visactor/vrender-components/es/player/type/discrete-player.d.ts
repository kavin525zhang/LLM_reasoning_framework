import type { BasePlayerAttributes } from './base';
import type { DirectionType } from './direction';
import type { BasePlayerLayoutAttributes } from './layout';
export type DiscretePlayerAttributes = {
    type: 'discrete';
    direction?: DirectionType;
    alternate?: boolean;
    interval?: number;
} & BasePlayerAttributes & BasePlayerLayoutAttributes;
