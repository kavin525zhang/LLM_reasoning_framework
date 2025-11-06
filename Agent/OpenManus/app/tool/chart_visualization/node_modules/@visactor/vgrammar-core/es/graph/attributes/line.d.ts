import type { IPointLike } from '@visactor/vutils';
import type { IElement } from '../../types';
export declare function getLineSegmentConfigs(items: any[], points: any[], element?: IElement): any[];
export declare function getConnectLineSegmentConfigs(items: any[], points: IPointLike[], element?: IElement): any[];
export declare function getLinePointsFromSegments(segments: any[]): any;
export declare function parseCollectionMarkAttributes(itemNextAttrs: any): {};
export declare function removeSegmentAttrs(itemNextAttrs: any, element?: IElement): any;
