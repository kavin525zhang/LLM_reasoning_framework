import type { IElement, IGlyphMark, IGroupMark, IMark, IView } from '../types';
import { Mark } from './mark';
export declare class GroupMark extends Mark implements IGroupMark {
    children: (IMark | IGroupMark | IGlyphMark)[];
    layoutChildren?: (IMark | IGroupMark | IGlyphMark)[];
    constructor(view: IView, group?: IGroupMark);
    parseRenderContext(): {
        large: boolean;
    };
    appendChild(mark: IMark): this;
    removeChild(mark: IMark): this;
    includesChild(mark: IMark, descendant?: boolean): boolean;
    updateLayoutChildren(): this;
    getAttributeTransforms(): import("../types").AttributeTransform[];
    protected evaluateJoin(data: any[]): void;
    protected getChannelsFromConfig(element?: IElement): any;
    protected evaluateGroupEncode(elements: IElement[], groupEncode: any, parameters: any): {};
    protected evaluateEncode(elements: IElement[], encoders: any, parameters: any, noGroupEncode?: boolean): void;
    addGraphicItem(attrs: any, groupKey?: string, newGraphicItem?: any): any;
}
