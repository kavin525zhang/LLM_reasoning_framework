import Node from './Node';
import PPTX from "../PPTX";
import Slide from "../Slide";
import SlideLayout from "../SlideLayout";
import SlideMaster from "../SlideMaster";
import { ColorType, GradFillType, BackgroundImageType } from "../../type/color";
import { BorderType } from "../../type/line";
import TextBody from "./TextBody";
import Group from "../Group";
export default class ShapeNode extends Node {
    pptx: PPTX;
    shape: string;
    background: ColorType | GradFillType | BackgroundImageType;
    border: BorderType;
    static defaultBorderWidth: number;
    textBody: TextBody;
    prstGeom: {
        gd?: {
            name: string;
            fmla: number;
        };
        pathList?: Array<{
            type: string;
            points?: Array<number>;
        }>;
        w?: number;
        h?: number;
    };
    isTextBox: boolean;
    constructor(source: any, pptx: PPTX, ctx: Slide | SlideLayout | SlideMaster, group?: Group);
    private _parseShape;
    private _parIsTextBox;
    private _parsePrstGeom;
    private _parseBackground;
    private _parseBorder;
    private _parseTxt;
}
