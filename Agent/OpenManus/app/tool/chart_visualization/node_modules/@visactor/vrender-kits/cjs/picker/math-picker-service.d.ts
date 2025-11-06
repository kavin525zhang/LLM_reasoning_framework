import type { IMatrix, IPointLike } from '@visactor/vutils';
import { DefaultPickService } from '@visactor/vrender-core';
import type { ICanvas, IContext2d, IGraphic, EnvType, IGlobal, IGraphicPicker, IPickerService, IContributionProvider, IPickItemInterceptorContribution, IPickParams, PickResult, IPickServiceInterceptorContribution } from '@visactor/vrender-core';
export declare class DefaultMathPickerService extends DefaultPickService implements IPickerService {
    protected readonly contributions: IContributionProvider<IGraphicPicker>;
    protected readonly pickItemInterceptorContributions: IContributionProvider<IPickItemInterceptorContribution>;
    protected readonly pickServiceInterceptorContributions: IContributionProvider<IPickServiceInterceptorContribution>;
    type: 'default';
    pickCanvas: ICanvas;
    pickContext: IContext2d;
    pickerMap: Map<number, IGraphicPicker>;
    constructor(contributions: IContributionProvider<IGraphicPicker>, pickItemInterceptorContributions: IContributionProvider<IPickItemInterceptorContribution>, pickServiceInterceptorContributions: IContributionProvider<IPickServiceInterceptorContribution>);
    init(): void;
    configure(global: IGlobal, env: EnvType): void;
    pickItem(graphic: IGraphic, point: IPointLike, parentMatrix: IMatrix | null, params?: IPickParams): PickResult | null;
}
