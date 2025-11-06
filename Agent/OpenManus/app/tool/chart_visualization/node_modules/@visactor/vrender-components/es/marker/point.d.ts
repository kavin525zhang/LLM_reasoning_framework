import type { IGroup, IImage, ISymbol, IImageGraphicAttribute, IRichText, IRichTextGraphicAttribute } from '@visactor/vrender-core';
import type { IPointLike } from '@visactor/vutils';
import { Tag } from '../tag';
import { Marker } from './base';
import type { IItemContent, IItemLine, MarkPointAnimationType, MarkPointAttrs, MarkerAnimationState } from './type';
import { IMarkPointItemPosition } from './type';
import type { Point } from '../core/type';
import type { ComponentOptions } from '../interface';
export declare function registerMarkPointAnimate(): void;
export declare class MarkPoint extends Marker<MarkPointAttrs, MarkPointAnimationType> {
    name: string;
    static defaultAttributes: {
        interactive: boolean;
        targetSymbol: {
            visible: boolean;
            offset: number;
            style: {
                symbolType: string;
                size: number;
                fill: boolean;
                stroke: string;
            };
        };
        itemLine: {
            visible: boolean;
            decorativeLine: {
                visible: boolean;
                length: number;
            };
            startSymbol: {
                visible: boolean;
                clip: boolean;
                symbolType: string;
                size: number;
                style: {
                    fill: boolean;
                    stroke: string;
                };
            };
            endSymbol: {
                visible: boolean;
                clip: boolean;
                symbolType: string;
                size: number;
                style: {
                    fill: boolean;
                    stroke: string;
                };
            };
            lineStyle: {
                stroke: string;
                lineWidth: number;
            };
        };
        itemContent: {
            type: string;
            position: string;
            refX: number;
            symbolStyle: {
                symbolType: string;
                fill: string;
                fillOpacity: number;
                size: number;
            };
            textStyle: {
                dx: number;
                dy: number;
            };
            imageStyle: {
                width: number;
                height: number;
            };
            richTextStyle: {
                width: number;
                height: number;
            };
        };
    };
    defaultUpdateAnimation: never;
    defaultExitAnimation: import("./type").MarkerExitAnimation;
    protected markerAnimate(state: MarkerAnimationState): void;
    private _item;
    private _targetItem;
    private _line?;
    private _decorativeLine;
    private _isArcLine;
    private _isStraightLine;
    constructor(attributes: MarkPointAttrs, options?: ComponentOptions);
    protected setLabelPos(): void;
    protected getTextAlignAttr(autoRotate: boolean, offsetX: number, offsetY: number, lineEndAngle: number, itemPosition: keyof typeof IMarkPointItemPosition): {
        textAlign: string;
        textBaseline: string;
    };
    protected setItemAttributes(item: ISymbol | Tag | IImage | IRichText, itemContent: IItemContent, newPosition: Point, newItemPosition: Point, itemType: 'symbol' | 'text' | 'image' | 'richText' | 'custom'): void;
    protected getItemDx(item: ISymbol | Tag | IImage | IRichText, position: keyof typeof IMarkPointItemPosition, style?: IImageGraphicAttribute | IRichTextGraphicAttribute): number;
    protected getItemDy(item: ISymbol | Tag | IImage | IRichText, position: keyof typeof IMarkPointItemPosition, style?: IImageGraphicAttribute | IRichTextGraphicAttribute): number;
    protected initItem(itemContent: IItemContent, newPosition: Point, newItemPosition: Point): IGroup | ISymbol | Tag | IRichText | IImage;
    protected getItemLineAttr(itemLine: IItemLine, newPosition: Point, newItemPosition: Point): {
        points: Point[];
        center: {
            x: number;
            y: number;
        };
        radius: number;
        startAngle: number;
        endAngle: number;
    };
    protected reDrawLine(itemLine: IItemLine, pointsAttr: any): void;
    protected setItemLineAttr(itemLine: IItemLine, newPosition: Point, newItemPosition: Point): void;
    protected getDecorativeLineAttr(itemLine: IItemLine): {
        startPointOffsetX: number;
        startPointOffsetY: number;
        endPointOffsetX: number;
        endPointOffsetY: number;
    };
    protected setDecorativeLineAttr(itemLine: IItemLine, newItemPosition: Point, visible: boolean): void;
    protected setTargetItemAttributes(targetItem: any, position: IPointLike): void;
    protected setAllOfItemsAttr(newPosition: Point, newItemPosition: Point): void;
    protected computeNewPositionAfterTargetItem(position: Point): {
        newPosition: Point;
        newItemPosition: Point;
    };
    protected initMarker(container: IGroup): void;
    protected updateMarker(): void;
    protected isValidPoints(): boolean;
}
