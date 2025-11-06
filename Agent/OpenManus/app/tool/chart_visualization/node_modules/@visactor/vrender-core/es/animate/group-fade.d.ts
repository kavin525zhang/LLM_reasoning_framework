import type { IGroup } from '../interface/graphic/group';
import { ACustomAnimate } from './animate';
export declare class GroupFadeIn extends ACustomAnimate<any> {
    target: IGroup;
    getEndProps(): Record<string, any>;
    onBind(): void;
    onEnd(): void;
    onUpdate(end: boolean, ratio: number, out: Record<string, any>): void;
}
export declare class GroupFadeOut extends ACustomAnimate<any> {
    target: IGroup;
    getEndProps(): Record<string, any>;
    onBind(): void;
    onEnd(): void;
    onUpdate(end: boolean, ratio: number, out: Record<string, any>): void;
}
