import type { IMatrix, IPoint, IPointLike } from '@visactor/vutils';
import type { IContext2d, IGraphic, IGroup, EnvType, IGlobal, IPickerService, IGraphicPicker, IPickParams, PickResult, IPickItemInterceptorContribution, IContributionProvider, IPickServiceInterceptorContribution } from '../interface';
export declare abstract class DefaultPickService implements IPickerService {
    protected readonly pickItemInterceptorContributions: IContributionProvider<IPickItemInterceptorContribution>;
    protected readonly pickServiceInterceptorContributions: IContributionProvider<IPickServiceInterceptorContribution>;
    type: string;
    pickerMap: Map<number, IGraphicPicker>;
    pickContext?: IContext2d;
    InterceptorContributions: IPickItemInterceptorContribution[];
    pickerServiceInterceptorContributions: IPickServiceInterceptorContribution[];
    global: IGlobal;
    constructor(pickItemInterceptorContributions: IContributionProvider<IPickItemInterceptorContribution>, pickServiceInterceptorContributions: IContributionProvider<IPickServiceInterceptorContribution>);
    protected _init(): void;
    abstract configure(global: IGlobal, env: EnvType): void;
    pick(graphics: IGraphic[], point: IPoint, params: IPickParams): PickResult;
    containsPoint(graphic: IGraphic, point: IPointLike, params: IPickParams): boolean;
    pickGroup(group: IGroup, point: IPointLike, parentMatrix: IMatrix, params: IPickParams): PickResult;
    abstract pickItem(graphic: IGraphic, point: IPointLike, parentMatrix: IMatrix | null, params: IPickParams): PickResult | null;
    protected selectPicker(graphic: IGraphic): IGraphicPicker | null;
}
