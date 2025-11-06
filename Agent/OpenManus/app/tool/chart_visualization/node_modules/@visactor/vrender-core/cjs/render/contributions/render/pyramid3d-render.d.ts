import type { IGraphicAttribute, IContext2d, IMarkAttribute, IPyramid3d, IThemeAttribute, IGraphicRender, IDrawContext, IGraphicRenderDrawParams, IRenderService } from '../../../interface';
import { Base3dRender } from './base-3d-render';
export declare class DefaultCanvasPyramid3dRender extends Base3dRender<IPyramid3d> implements IGraphicRender {
    type: string;
    numberType: number;
    z: number;
    drawShape(pyramid3d: IPyramid3d, context: IContext2d, x: number, y: number, drawContext: IDrawContext, params?: IGraphicRenderDrawParams, fillCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean): void;
    draw(pyramid3d: IPyramid3d, renderService: IRenderService, drawContext: IDrawContext): void;
}
