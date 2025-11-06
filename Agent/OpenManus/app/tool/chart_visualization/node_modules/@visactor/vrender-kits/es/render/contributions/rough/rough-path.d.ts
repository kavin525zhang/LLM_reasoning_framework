import type { IGraphicRender, IRenderService, IPath, IDrawContext, IGraphicRenderDrawParams } from '@visactor/vrender-core';
import { RoughBaseRender } from './base-render';
export declare class RoughCanvasPathRender extends RoughBaseRender implements IGraphicRender {
    readonly canvasRenderer: IGraphicRender;
    type: 'path';
    numberType: number;
    style: 'rough';
    constructor(canvasRenderer: IGraphicRender);
    draw(path: IPath, renderService: IRenderService, drawContext: IDrawContext, params?: IGraphicRenderDrawParams): void;
}
