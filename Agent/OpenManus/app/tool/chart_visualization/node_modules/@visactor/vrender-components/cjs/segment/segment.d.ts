import type { ILine, ISymbol } from '@visactor/vrender-core';
import { AbstractComponent } from '../core/base';
import type { SegmentAttributes, SymbolAttributes } from './type';
import type { Point } from '../core/type';
import type { ComponentOptions } from '../interface';
export declare class Segment extends AbstractComponent<Required<SegmentAttributes>> {
    name: string;
    key: string;
    startSymbol?: ISymbol;
    endSymbol?: ISymbol;
    lines?: ILine[];
    protected _startAngle: number;
    getStartAngle(): number;
    protected _endAngle: number;
    getEndAngle(): number;
    protected _mainSegmentPoints: Point[];
    getMainSegmentPoints(): Point[];
    static defaultAttributes: Partial<SegmentAttributes>;
    constructor(attributes: SegmentAttributes, options?: ComponentOptions);
    protected render(): void;
    protected _computeStartRotate(angle: number): number;
    protected _computeEndRotate(angle: number): number;
    protected _renderSymbol(attribute: SymbolAttributes, points: Point[], dim: string): ISymbol | undefined;
    private _getMainSegmentPoints;
    private _clipPoints;
    private _computeLineAngle;
    protected _reset(): void;
}
