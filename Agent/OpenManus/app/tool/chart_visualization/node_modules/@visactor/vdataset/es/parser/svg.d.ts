import type { IMatrix } from '@visactor/vutils';
import type { Parser } from './index';
export interface ISVGSourceOption {
    type?: 'svg';
    customDOMParser?: (svg: string) => Document;
}
export interface SVGParserResult {
    root: SVGParsedElement;
    width: number;
    height: number;
    elements: SVGParsedElement[];
    viewBoxRect?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
export interface SVGParsedElement {
    id: string;
    tagName: string;
    graphicType: string;
    attributes: Record<string, any>;
    name?: string;
    transform?: IMatrix;
    parent?: SVGParsedElement;
    value?: string;
    _inheritStyle?: Record<string, any>;
    _textGroupStyle?: Record<string, any>;
    _nameFromParent?: string;
    [key: string]: any;
}
export declare const svgParser: Parser;
