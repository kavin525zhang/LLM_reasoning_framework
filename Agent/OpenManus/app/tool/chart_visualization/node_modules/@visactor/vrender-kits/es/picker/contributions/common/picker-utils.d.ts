import { type IContext2d, type IGraphicAttribute, type IMarkAttribute, type IThemeAttribute } from '@visactor/vrender-core';
import type { IPointLike } from '@visactor/vutils';
export declare const commonStrokeCb: (context: IContext2d, pickContext: IContext2d, symbolAttribute: Partial<IMarkAttribute & IGraphicAttribute>, themeAttribute: IThemeAttribute, pickPoint: IPointLike) => boolean;
