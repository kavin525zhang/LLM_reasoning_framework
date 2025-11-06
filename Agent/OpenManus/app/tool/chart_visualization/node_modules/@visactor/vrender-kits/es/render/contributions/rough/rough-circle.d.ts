import type { IGraphicRender, IRenderService, ICircle, IDrawContext, IGraphicRenderDrawParams } from '@visactor/vrender-core';
import { RoughBaseRender } from './base-render';
export declare class RoughCanvasCircleRender extends RoughBaseRender implements IGraphicRender {
    readonly canvasRenderer: IGraphicRender;
    type: 'circle';
    numberType: number;
    style: 'rough';
    constructor(canvasRenderer: IGraphicRender);
    draw(circle: ICircle, renderService: IRenderService, drawContext: IDrawContext, params?: IGraphicRenderDrawParams): void;
}
