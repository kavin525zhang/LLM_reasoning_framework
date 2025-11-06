import type { IGraphicRender, IRenderService, IRect, IDrawContext, IGraphicRenderDrawParams } from '@visactor/vrender-core';
import { RoughBaseRender } from './base-render';
export declare class RoughCanvasRectRender extends RoughBaseRender implements IGraphicRender {
    readonly canvasRenderer: IGraphicRender;
    type: 'rect';
    numberType: number;
    style: 'rough';
    constructor(canvasRenderer: IGraphicRender);
    draw(rect: IRect, renderService: IRenderService, drawContext: IDrawContext, params?: IGraphicRenderDrawParams): void;
}
