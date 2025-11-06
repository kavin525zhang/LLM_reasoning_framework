import { AbstractComponent } from '../core/base';
import type { IWeatherBoxAttrs } from './type';
import type { ComponentOptions } from '../interface';
import { type IGroup, type ITimeline } from '@visactor/vrender-core';
export declare class WeatherBox extends AbstractComponent<Required<IWeatherBoxAttrs>> {
    name: string;
    static defaultAttributes: Partial<IWeatherBoxAttrs>;
    timeline: ITimeline;
    constructor(attributes: IWeatherBoxAttrs, options?: ComponentOptions);
    protected render(): void;
    protected generateWind(windRatio: number, windIconPath: string, group: IGroup, size: number, speed: number): void;
    protected generateRainOrSnow(type: string, ratio: number, threshold: number, windRatio: number, group: IGroup, path: string, windAngle: number, sizeRange: [number, number], speed: number): void;
}
