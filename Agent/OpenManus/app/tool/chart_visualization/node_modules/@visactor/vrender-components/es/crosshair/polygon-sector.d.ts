import type { IGroup } from '@visactor/vrender-core';
import type { PointLocationCfg } from '../core/type';
import { CrosshairBase } from './base';
import type { PolygonSectorCrosshairAttrs } from './type';
import type { ComponentOptions } from '../interface';
export declare class PolygonSectorCrosshair extends CrosshairBase<PolygonSectorCrosshairAttrs> {
    static defaultAttributes: {
        polygonSectorStyle: {
            fill: string;
            opacity: number;
        };
    };
    constructor(attributes: PolygonSectorCrosshairAttrs, options?: ComponentOptions);
    protected renderCrosshair(container: IGroup): import("@visactor/vrender-core").INode;
    setLocation(point: PointLocationCfg): void;
}
