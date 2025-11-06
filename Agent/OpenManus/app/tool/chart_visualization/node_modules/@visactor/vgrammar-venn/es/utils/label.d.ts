import type { IPointLike } from '@visactor/vutils';
import type { VennCircleName, IVennArea, IVennCircle, VennAreaName } from './interface';
export declare function computeTextCenters(circles: Record<VennCircleName, IVennCircle>, areas: IVennArea[]): Record<VennAreaName, IPointLike>;
export declare function computeTextCenter(interior: IVennCircle[], exterior: IVennCircle[]): {
    x: number;
    y: number;
    disjoint?: boolean;
};
