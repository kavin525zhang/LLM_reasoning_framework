import type { IGraphic, IGroup } from '@visactor/vrender-core';
import { AbstractComponent } from '../../core/base';
import type { Point } from '../../core/type';
import type { GridBaseAttributes } from './type';
import type { TransformedAxisItem } from '../type';
export declare abstract class BaseGrid<T extends GridBaseAttributes> extends AbstractComponent<Required<T>> {
    name: string;
    static defaultAttributes: Partial<GridBaseAttributes>;
    protected _innerView: IGroup;
    getInnerView(): IGroup;
    protected _prevInnerView: {
        [key: string]: IGraphic;
    };
    getPrevInnerView(): {
        [key: string]: IGraphic<Partial<import("@visactor/vrender-core").IGraphicAttribute>>;
    };
    protected data: TransformedAxisItem[];
    abstract getTickCoord(value: number): Point;
    abstract isInValidValue(value: number): boolean;
    abstract getVerticalVector(offset: number, inside: boolean, point: Point): [number, number];
    protected abstract getGridAttribute(isSubGrid: boolean): T;
    protected abstract getGridPointsByValue(value: number): Point[];
    protected render(): void;
    protected getVerticalCoord(point: Point, offset: number, inside: boolean): Point;
    private _transformItems;
    private _renderGrid;
    private _renderGridByType;
    protected _getNodeId(id: string): string;
    protected _parseTickSegment(): number;
    protected _getPointsOfSubGrid(tickSegment: number, alignWithLabel: boolean): {
        value: number;
    }[];
    release(): void;
}
