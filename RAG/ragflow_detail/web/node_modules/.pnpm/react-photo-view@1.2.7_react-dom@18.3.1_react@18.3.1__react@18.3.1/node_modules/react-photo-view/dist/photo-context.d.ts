/// <reference types="react" />
import type { DataType } from './types';
export type UpdateItemType = (dataType: DataType) => void;
export interface PhotoContextType {
    show: (key: number) => void;
    update: UpdateItemType;
    remove: (key: number) => void;
    nextId: () => number;
}
declare const _default: import("react").Context<PhotoContextType>;
export default _default;
