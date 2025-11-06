import type { IAABBBounds, Matrix } from '@visactor/vutils';
import type { GraphicType, IGraphic, IGroup } from '../interface';
import { Group } from './group';
export declare class ShadowRoot extends Group {
    type: GraphicType;
    shadowHost: IGraphic;
    constructor(graphic?: IGraphic);
    protected clearUpdateBoundTag(): void;
    addUpdateBoundTag(): void;
    addUpdateShapeAndBoundsTag(): void;
    protected tryUpdateGlobalTransMatrix(clearTag?: boolean): Matrix;
    protected doUpdateGlobalMatrix(): void;
    protected tryUpdateGlobalAABBBounds(): IAABBBounds;
}
export declare function createShadowRoot(graphic?: IGraphic): IGroup;
