import type { IGraphicAttribute, IContext2d, IGraphic, IThemeAttribute, IBaseRenderContribution, IContributionProvider, IDrawContext } from '../../../../interface';
import type { IBounds } from '@visactor/vutils';
import { BaseRenderContributionTime } from '../../../../common/enums';
export declare class DefaultBaseBackgroundRenderContribution implements IBaseRenderContribution<IGraphic, IGraphicAttribute> {
    time: BaseRenderContributionTime;
    useStyle: boolean;
    order: number;
    drawShape(graphic: IGraphic, context: IContext2d, x: number, y: number, doFill: boolean, doStroke: boolean, fVisible: boolean, sVisible: boolean, graphicAttribute: Required<IGraphicAttribute>, drawContext: IDrawContext, fillCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, options?: any): void;
    protected doDrawImage(context: IContext2d, data: any, b: IBounds, params: {
        backgroundMode: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
        backgroundFit: boolean;
        backgroundKeepAspectRatio: boolean;
        backgroundScale?: number;
        backgroundOffsetX?: number;
        backgroundOffsetY?: number;
    }): void;
}
export declare const defaultBaseBackgroundRenderContribution: DefaultBaseBackgroundRenderContribution;
export interface IInteractiveSubRenderContribution {
    render: (graphic: IGraphic, context: IContext2d, x: number, y: number, doFill: boolean, doStroke: boolean, fVisible: boolean, sVisible: boolean, graphicAttribute: Required<IGraphicAttribute>, drawContext: IDrawContext, fillCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, options?: any) => void;
}
export declare class DefaultBaseInteractiveRenderContribution implements IBaseRenderContribution<IGraphic, IGraphicAttribute> {
    protected readonly subRenderContribitions: IContributionProvider<IInteractiveSubRenderContribution>;
    time: BaseRenderContributionTime;
    useStyle: boolean;
    order: number;
    _subRenderContribitions?: IInteractiveSubRenderContribution[];
    constructor(subRenderContribitions: IContributionProvider<IInteractiveSubRenderContribution>);
    drawShape(graphic: IGraphic, context: IContext2d, x: number, y: number, doFill: boolean, doStroke: boolean, fVisible: boolean, sVisible: boolean, graphicAttribute: Required<IGraphicAttribute>, drawContext: IDrawContext, fillCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, options?: any): void;
}
export declare class DefaultBaseClipRenderBeforeContribution implements IBaseRenderContribution<IGraphic, IGraphicAttribute> {
    time: BaseRenderContributionTime;
    useStyle: boolean;
    order: number;
    drawShape(graphic: IGraphic, context: IContext2d, x: number, y: number, doFill: boolean, doStroke: boolean, fVisible: boolean, sVisible: boolean, graphicAttribute: Required<IGraphicAttribute>, drawContext: IDrawContext, fillCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute, final?: boolean) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute, final?: boolean) => boolean, options?: any): void;
}
export declare const defaultBaseClipRenderBeforeContribution: DefaultBaseClipRenderBeforeContribution;
export declare class DefaultBaseClipRenderAfterContribution implements IBaseRenderContribution<IGraphic, IGraphicAttribute> {
    time: BaseRenderContributionTime;
    useStyle: boolean;
    order: number;
    drawShape(graphic: IGraphic, context: IContext2d, x: number, y: number, doFill: boolean, doStroke: boolean, fVisible: boolean, sVisible: boolean, graphicAttribute: Required<IGraphicAttribute>, drawContext: IDrawContext, fillCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, options?: any): void;
}
export declare const defaultBaseClipRenderAfterContribution: DefaultBaseClipRenderAfterContribution;
