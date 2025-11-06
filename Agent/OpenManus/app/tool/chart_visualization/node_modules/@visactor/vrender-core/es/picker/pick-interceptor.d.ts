import type { IMatrix, IPointLike } from '@visactor/vutils';
import type { IContext2d, IGraphic, IPickItemInterceptorContribution, IPickParams, IPickServiceInterceptorContribution, IPickerService, PickResult } from '../interface';
export declare class ShadowPickServiceInterceptorContribution implements IPickServiceInterceptorContribution {
    order: number;
    afterPickItem(result: PickResult, pickerService: IPickerService, point: IPointLike, pickParams: IPickParams, params?: {
        parentMatrix: IMatrix;
    }): null | PickResult;
}
export declare class ShadowRootPickItemInterceptorContribution implements IPickItemInterceptorContribution {
    order: number;
    afterPickItem(graphic: IGraphic, pickerService: IPickerService, point: IPointLike, pickParams: IPickParams, params?: {
        parentMatrix: IMatrix;
    }): null | PickResult;
    beforePickItem(graphic: IGraphic, pickerService: IPickerService, point: IPointLike, pickParams: IPickParams, params?: {
        parentMatrix: IMatrix;
    }): null | PickResult;
    protected _pickItem(graphic: IGraphic, pickerService: IPickerService, point: IPointLike, pickParams: IPickParams, params?: {
        parentMatrix: IMatrix;
    }): PickResult | null;
}
export declare class InteractivePickItemInterceptorContribution implements IPickItemInterceptorContribution {
    order: number;
    beforePickItem(graphic: IGraphic, pickerService: IPickerService, point: IPointLike, pickParams: IPickParams, params?: {
        parentMatrix: IMatrix;
    }): null | PickResult;
}
export declare class Canvas3DPickItemInterceptor implements IPickItemInterceptorContribution {
    order: number;
    beforePickItem(graphic: IGraphic, pickerService: IPickerService, point: IPointLike, pickParams: IPickParams, params?: {
        parentMatrix: IMatrix;
    }): any;
    initCanvasCtx(context: IContext2d): void;
}
