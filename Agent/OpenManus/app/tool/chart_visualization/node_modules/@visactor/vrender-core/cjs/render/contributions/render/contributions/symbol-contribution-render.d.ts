import type { IGraphicAttribute, IContext2d, IMarkAttribute, ISymbol, ISymbolGraphicAttribute, IThemeAttribute, ISymbolRenderContribution, IDrawContext, IBaseRenderContribution } from '../../../../interface';
import { BaseRenderContributionTime } from '../../../../common/enums';
export declare class DefaultSymbolRenderContribution implements ISymbolRenderContribution {
    time: BaseRenderContributionTime;
    useStyle: boolean;
    order: number;
    drawShape(symbol: ISymbol, context: IContext2d, x: number, y: number, doFill: boolean, doStroke: boolean, fVisible: boolean, sVisible: boolean, symbolAttribute: Required<ISymbolGraphicAttribute>, drawContext: IDrawContext, fillCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean): void;
}
export declare class DefaultSymbolClipRangeStrokeRenderContribution implements IBaseRenderContribution<ISymbol, ISymbolGraphicAttribute> {
    time: BaseRenderContributionTime;
    useStyle: boolean;
    order: number;
    drawShape(graphic: ISymbol, context: IContext2d, x: number, y: number, doFill: boolean, doStroke: boolean, fVisible: boolean, sVisible: boolean, graphicAttribute: Required<ISymbolGraphicAttribute>, drawContext: IDrawContext, fillCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, strokeCb?: (ctx: IContext2d, markAttribute: Partial<IGraphicAttribute>, themeAttribute: IThemeAttribute) => boolean, options?: any): void;
}
export declare const defaultSymbolRenderContribution: DefaultSymbolRenderContribution;
export declare const defaultSymbolClipRangeStrokeRenderContribution: DefaultSymbolClipRangeStrokeRenderContribution;
export declare const defaultSymbolTextureRenderContribution: import("./base-texture-contribution-render").DefaultBaseTextureRenderContribution;
export declare const defaultSymbolBackgroundRenderContribution: import("./base-contribution-render").DefaultBaseBackgroundRenderContribution;
