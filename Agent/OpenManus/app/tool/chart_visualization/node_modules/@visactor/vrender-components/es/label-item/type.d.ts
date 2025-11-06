import type { IGroupGraphicAttribute, ILineGraphicAttribute, IRectGraphicAttribute, ISymbolGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
export interface IStoryLabelItemAttrs extends IGroupGraphicAttribute {
    contentOffsetX: number;
    contentOffsetY: number;
    lineStyle?: ILineGraphicAttribute;
    symbolStartStyle?: ISymbolGraphicAttribute;
    symbolEndStyle?: ISymbolGraphicAttribute;
    symbolStartOuterStyle?: ISymbolGraphicAttribute;
    theme?: 'default' | 'simple';
    titleTop?: string | string[];
    titleBottom?: string | string[];
    titleTopStyle?: ITextGraphicAttribute;
    titleBottomStyle?: ITextGraphicAttribute;
    titleSpace?: [number, number];
    titleTopPanelStyle?: IRectGraphicAttribute & {
        padding: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
    };
    titleBottomPanelStyle?: IRectGraphicAttribute & {
        padding: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
    };
}
