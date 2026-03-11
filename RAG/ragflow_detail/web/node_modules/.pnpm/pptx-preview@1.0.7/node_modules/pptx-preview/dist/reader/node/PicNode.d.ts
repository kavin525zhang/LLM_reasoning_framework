import PPTX from "../PPTX";
import Slide from "../Slide";
import Node from "./Node";
import SlideLayout from "../SlideLayout";
import SlideMaster from "../SlideMaster";
import Group from "../Group";
export default class PicNode extends Node {
    pptx: PPTX;
    path: string;
    userDrawn: boolean;
    audioFile: string;
    videoFile: string;
    get base64(): string;
    clip: {
        b?: number;
        t?: number;
        l?: number;
        r?: number;
    };
    constructor(path: any, source: any, pptx: PPTX, ctx: Slide | SlideLayout | SlideMaster, group?: Group);
}
