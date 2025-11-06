import type { IContext2d, IContributionProvider, IDrawContext, IGraphicAttribute, IGraphicRender, IGraphicRenderDrawParams, IImageRenderContribution, IMarkAttribute, IRenderService, IThemeAttribute } from '@visactor/vrender-core';
import { BaseRenderContributionTime, DefaultCanvasImageRender, DefaultRectRenderContribution } from '@visactor/vrender-core';
import type { IGifImage } from '../../../interface/gif-image';
export declare class DefaultCanvasGifImageRender extends DefaultCanvasImageRender implements IGraphicRender {
    protected readonly imageRenderContribitions: IContributionProvider<IImageRenderContribution>;
    type: 'image';
    numberType: number;
    constructor(imageRenderContribitions: IContributionProvider<IImageRenderContribution>);
    drawShape(image: IGifImage, context: IContext2d, x: number, y: number, drawContext: IDrawContext, params?: IGraphicRenderDrawParams, fillCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean): void;
    draw(image: IGifImage, renderService: IRenderService, drawContext: IDrawContext): void;
}
export declare class DefaultGifImageRenderContribution extends DefaultRectRenderContribution implements IImageRenderContribution {
    time: BaseRenderContributionTime;
    useStyle: boolean;
    order: number;
    drawShape(image: any, context: IContext2d, x: number, y: number, doFill: boolean, doStroke: boolean, fVisible: boolean, sVisible: boolean, rectAttribute: any, drawContext: IDrawContext, fillCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean): void;
}
export declare const defaultGifImageRenderContribution: DefaultGifImageRenderContribution;
