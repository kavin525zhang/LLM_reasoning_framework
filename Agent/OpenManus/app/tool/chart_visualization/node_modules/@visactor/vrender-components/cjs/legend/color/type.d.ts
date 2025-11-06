import type { SliderAttributes } from '../../slider/type';
import type { LegendBaseAttributes } from '../type';
export type ColorLegendAttributes = {
    colors: string[];
} & Omit<SliderAttributes, 'step' | 'range'> & LegendBaseAttributes;
