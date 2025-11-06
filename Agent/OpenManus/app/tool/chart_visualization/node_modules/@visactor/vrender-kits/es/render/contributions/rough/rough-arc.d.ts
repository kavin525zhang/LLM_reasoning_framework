import type { IGraphicRender, IRenderService, IArc, IDrawContext, IGraphicRenderDrawParams } from '@visactor/vrender-core';
import { RoughBaseRender } from './base-render';
export declare class RoughCanvasArcRender extends RoughBaseRender implements IGraphicRender {
    readonly canvasRenderer: IGraphicRender;
    type: 'arc';
    numberType: number;
    style: 'rough';
    constructor(canvasRenderer: IGraphicRender);
    draw(arc: IArc, renderService: IRenderService, drawContext: IDrawContext, params?: IGraphicRenderDrawParams): void;
}
