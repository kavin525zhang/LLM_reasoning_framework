import type { IGroupGraphicAttribute, ISetAttributeContext } from '@visactor/vrender-core';
import { Group } from '@visactor/vrender-core';
import type { Dict } from '@visactor/vutils';
import type { ComponentOptions } from '../interface';
export declare abstract class AbstractComponent<T extends IGroupGraphicAttribute = IGroupGraphicAttribute> extends Group {
    attribute: Partial<T>;
    protected mode?: '2d' | '3d';
    protected skipDefault?: boolean;
    protected _skipRenderAttributes: string[];
    constructor(attributes: T, options?: ComponentOptions);
    setAttribute(key: string, value: any, forceUpdateTag?: boolean | undefined, context?: ISetAttributeContext): void;
    setAttributes(params: Partial<T>, forceUpdateTag?: boolean | undefined, context?: ISetAttributeContext): void;
    _setAttributes(params: Partial<T>, forceUpdateTag?: boolean | undefined): void;
    protected _mergeAttributes(params: Partial<T>, keys?: (keyof T)[]): void;
    protected bindEvents(): void;
    protected abstract render(): void;
    protected _getNodeId(id: string): string;
    protected _dispatchEvent(eventName: string, details?: Dict<any>): void;
}
