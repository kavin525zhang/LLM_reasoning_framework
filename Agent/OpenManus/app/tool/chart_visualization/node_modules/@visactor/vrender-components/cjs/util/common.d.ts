import type { IGraphicAttribute, IGraphic, IGroup } from '@visactor/vrender-core';
import type { Point } from '../core/type';
import type { IMarkLineLabelPosition, IMarkPointItemPosition } from '../marker';
export declare function traverseGroup(group: IGraphic, cb: (node: IGraphic) => boolean | void): void;
export declare const isVisible: (obj?: Partial<IGraphicAttribute>) => boolean;
export declare function getMarksByName(root: IGroup, name: string): IGraphic<Partial<IGraphicAttribute>>[];
export declare function getNoneGroupMarksByName(root: IGroup, name: string): IGraphic<Partial<IGraphicAttribute>>[];
export declare function removeRepeatPoint(points: Point[]): Point[];
export declare function isPostiveXAxis(angle: number): boolean;
export declare function fuzzyEqualNumber(a: number, b: number, delta: number): boolean;
export declare function getTextAlignAttrOfVerticalDir(autoRotate: boolean, lineEndAngle: number, itemPosition: IMarkLineLabelPosition | keyof typeof IMarkPointItemPosition): {
    textAlign: string;
    textBaseline: string;
};
