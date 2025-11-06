import type { VennCircleName, IVennArea, IVennCircle, IVennParams } from '../interface';
export declare function venn(areas: IVennArea[], parameters?: IVennParams): Record<string, IVennCircle>;
export declare function bestInitialLayout(areas: IVennArea[], params: IVennParams): Record<VennCircleName, IVennCircle>;
