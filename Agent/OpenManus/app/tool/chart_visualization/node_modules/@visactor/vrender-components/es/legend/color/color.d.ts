import { LegendBase } from '../base';
import type { ColorLegendAttributes } from './type';
import type { ComponentOptions } from '../../interface';
export declare class ColorContinuousLegend extends LegendBase<ColorLegendAttributes> {
    name: string;
    static defaultAttributes: {
        layout: string;
        title: {
            align: string;
            space: number;
            textStyle: {
                fontSize: number;
                fontWeight: string;
                fill: string;
            };
        };
        handlerSize: number;
        handlerStyle: {
            fill: any;
            lineWidth: number;
            stroke: string;
            outerBorder: {
                distance: number;
                lineWidth: number;
                stroke: string;
            };
        };
        tooltip: {
            shapeStyle: {
                lineWidth: number;
                stroke: string;
            };
        };
    };
    private _slider;
    private _colorScale;
    private _color;
    constructor(attributes: ColorLegendAttributes, options?: ComponentOptions);
    setSelected(value: number[]): void;
    protected _renderContent(): void;
    protected _bindEvents(): void;
    private _getTrackColor;
    private _onSliderToolipChange;
    private _onSliderChange;
    private _updateColor;
}
