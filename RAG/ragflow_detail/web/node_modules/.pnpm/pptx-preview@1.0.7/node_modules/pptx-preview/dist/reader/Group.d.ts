import PPTX from "./PPTX";
import { BackgroundImageType, ColorType, GradFillType } from "../type/color";
export default class Group {
    source: any;
    order: number;
    pptx: PPTX;
    ctx: any;
    offset: {
        x: number;
        y: number;
    };
    chOffset: {
        x: number;
        y: number;
    };
    extend: {
        w: number;
        h: number;
    };
    chExtend: {
        w: number;
        h: number;
    };
    rotate: number;
    nodes: any[];
    flipV: boolean;
    flipH: boolean;
    background: ColorType | GradFillType | BackgroundImageType;
    group: Group;
    userDrawn: boolean;
    constructor(source: any, pptx: PPTX, ctx: any, group?: Group);
    getBackground(): any;
    private _parseBackground;
    private _parseNodes;
}
