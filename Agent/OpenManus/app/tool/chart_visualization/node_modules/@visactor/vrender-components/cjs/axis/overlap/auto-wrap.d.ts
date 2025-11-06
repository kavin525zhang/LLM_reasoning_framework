import type { IText } from '@visactor/vrender-core';
type WrapConfig = {
    orient: string;
    limitLength: number;
    axisLength: number;
    ellipsis?: string;
};
export declare function autoWrap(labels: IText[], config: WrapConfig): void;
export {};
