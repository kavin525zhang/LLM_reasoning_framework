import type { DataZoomAttributes } from '@visactor/vrender-components';
import type { ChannelEncodeType, IData, IGrammarBase, IGroupMark, ITheme, IView, Nil, RecursivePartial, ScaleEncodeType } from '../types';
import type { DatazoomSpec, IDatazoom } from '../types/component';
import { Component } from '../view/component';
export declare const generateDatazoomAttributes: (data: any[], theme?: ITheme, addition?: RecursivePartial<DataZoomAttributes>) => DataZoomAttributes;
export declare class Datazoom extends Component implements IDatazoom {
    static readonly componentType: string;
    protected spec: DatazoomSpec;
    constructor(view: IView, group?: IGroupMark);
    protected parseAddition(spec: DatazoomSpec): this;
    preview(data: IData | string | Nil, x: ScaleEncodeType | Nil, y: ScaleEncodeType | Nil, x1?: ChannelEncodeType | Nil, y1?: ChannelEncodeType | Nil): this;
    setStartEndValue(start?: number, end?: number): this;
    getStartEndValue(): {
        start: number;
        end: number;
    };
    addGraphicItem(attrs: any, groupKey?: string): any;
    reuse(grammar: IGrammarBase): this;
    protected _updateComponentEncoders(): void;
    invertDatazoomRatio(ratio: number): any;
    getDatazoomMainScale(): import("@visactor/vscale").IBaseScale;
    private setDatazoomHandlers;
}
export declare const registerDataZoom: () => void;
