import type { IPoint } from '@visactor/vutils';
import type { ISymbol, IGraphicPicker, IGraphicRender, IPickParams } from '@visactor/vrender-core';
import { Base3dPicker } from '../common/base-3d-picker';
export declare class DefaultCanvasSymbolPicker extends Base3dPicker<ISymbol> implements IGraphicPicker {
    readonly canvasRenderer: IGraphicRender;
    type: string;
    numberType: number;
    constructor(canvasRenderer: IGraphicRender);
    contains(symbol: ISymbol, point: IPoint, params?: IPickParams): boolean;
}
