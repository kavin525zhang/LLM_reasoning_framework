import Node from "./Node";
import PPTX from "../PPTX";
import Slide from "../Slide";
import SlideLayout from "../SlideLayout";
import SlideMaster from "../SlideMaster";
import Group from "../Group";
export default class DiagramNode extends Node {
    pptx: PPTX;
    nodes: any[];
    constructor(source: any, pptx: PPTX, ctx: Slide | SlideLayout | SlideMaster, group?: Group);
    parseNode(): Promise<void>;
}
