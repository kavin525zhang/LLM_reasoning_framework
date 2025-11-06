import type { IAABBBounds } from '@visactor/vutils';
import { AABBBounds } from '@visactor/vutils';
import type { mat4, IGraphicAttribute, IGraphic, IGroup, IStage, IText, ITextGraphicAttribute, ITransform, IGraphicService, IGraphicCreator, ISyncHook } from '../../interface';
export declare function getExtraModelMatrix(dx: number, dy: number, graphic: IGraphic): mat4 | null;
export declare function getModelMatrix(out: mat4, graphic: IGraphic, theme: ITransform): void;
export declare function shouldUseMat4(graphic: IGraphic): number;
export declare class DefaultGraphicService implements IGraphicService {
    readonly creator: IGraphicCreator;
    hooks: {
        onAttributeUpdate: ISyncHook<[IGraphic]>;
        onSetStage: ISyncHook<[IGraphic, IStage]>;
        onRemove: ISyncHook<[IGraphic]>;
        onRelease: ISyncHook<[IGraphic]>;
        onAddIncremental: ISyncHook<[IGraphic, IGroup, IStage]>;
        onClearIncremental: ISyncHook<[IGroup, IStage]>;
        beforeUpdateAABBBounds: ISyncHook<[IGraphic, IStage, boolean, IAABBBounds]>;
        afterUpdateAABBBounds: ISyncHook<[IGraphic, IStage, IAABBBounds, {
            globalAABBBounds: IAABBBounds;
        }, boolean]>;
        clearAABBBounds: ISyncHook<[IGraphic, IStage, IAABBBounds]>;
    };
    protected tempAABBBounds1: AABBBounds;
    protected tempAABBBounds2: AABBBounds;
    constructor(creator: IGraphicCreator);
    onAttributeUpdate(graphic: IGraphic): void;
    onSetStage(graphic: IGraphic, stage: IStage): void;
    onRemove(graphic: IGraphic<Partial<IGraphicAttribute>>): void;
    onRelease(graphic: IGraphic<Partial<IGraphicAttribute>>): void;
    onAddIncremental(graphic: IGraphic, group: IGroup, stage: IStage): void;
    onClearIncremental(group: IGroup, stage: IStage): void;
    beforeUpdateAABBBounds(graphic: IGraphic, stage: IStage, willUpdate: boolean, bounds: IAABBBounds): void;
    afterUpdateAABBBounds(graphic: IGraphic, stage: IStage, bounds: IAABBBounds, params: {
        globalAABBBounds: IAABBBounds;
    }, selfChange: boolean): void;
    clearAABBBounds(graphic: IGraphic, stage: IStage, b: IAABBBounds): void;
    updatePathProxyAABBBounds(aabbBounds: IAABBBounds, graphic?: IGraphic): boolean;
    updateHTMLTextAABBBounds(attribute: ITextGraphicAttribute, textTheme: Required<ITextGraphicAttribute>, aabbBounds: IAABBBounds, graphic?: IText): void;
    combindShadowAABBBounds(bounds: IAABBBounds, graphic?: IGraphic): void;
    transformAABBBounds(attribute: Partial<IGraphicAttribute>, aabbBounds: IAABBBounds, theme: Required<IGraphicAttribute>, miter: boolean, graphic?: IGraphic): void;
    validCheck(attribute: Partial<IGraphicAttribute>, theme: Required<IGraphicAttribute>, aabbBounds: IAABBBounds, graphic?: IGraphic): boolean;
    updateTempAABBBounds(aabbBounds: IAABBBounds): {
        tb1: AABBBounds;
        tb2: AABBBounds;
    };
}
