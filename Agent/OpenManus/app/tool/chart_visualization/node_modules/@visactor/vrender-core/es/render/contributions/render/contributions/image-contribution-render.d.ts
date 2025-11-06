import type { IGraphicAttribute, IContext2d, IThemeAttribute, IImageRenderContribution, IDrawContext, IMarkAttribute } from '../../../../interface';
import { DefaultBaseBackgroundRenderContribution } from './base-contribution-render';
import { BaseRenderContributionTime } from '../../../../common/enums';
import { DefaultRectRenderContribution } from './rect-contribution-render';
export declare class DefaultImageRenderContribution extends DefaultRectRenderContribution implements IImageRenderContribution {
    time: BaseRenderContributionTime;
    useStyle: boolean;
    order: number;
    drawShape(image: any, context: IContext2d, x: number, y: number, doFill: boolean, doStroke: boolean, fVisible: boolean, sVisible: boolean, rectAttribute: any, drawContext: IDrawContext, fillCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean): void;
}
export declare const defaultImageRenderContribution: DefaultImageRenderContribution;
export declare const defaultImageBackgroundRenderContribution: DefaultBaseBackgroundRenderContribution;
