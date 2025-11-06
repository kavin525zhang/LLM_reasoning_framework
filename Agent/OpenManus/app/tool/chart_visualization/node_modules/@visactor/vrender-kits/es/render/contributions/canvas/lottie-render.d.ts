import type { IContext2d, IDrawContext, IGraphicAttribute, IGraphicRender, IGraphicRenderDrawParams, IMarkAttribute, IThemeAttribute } from '@visactor/vrender-core';
import { DefaultCanvasRectRender } from '@visactor/vrender-core';
import type { ILottie } from '../../../graphic/interface/lottie';
export declare class DefaultCanvasLottieRender extends DefaultCanvasRectRender implements IGraphicRender {
    type: 'glyph';
    numberType: number;
    drawShape(lottie: ILottie, context: IContext2d, x: number, y: number, drawContext: IDrawContext, params?: IGraphicRenderDrawParams, fillCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean): void;
    _drawShape(lottie: ILottie, context: IContext2d, x: number, y: number, drawContext: IDrawContext, params?: IGraphicRenderDrawParams): void;
}
