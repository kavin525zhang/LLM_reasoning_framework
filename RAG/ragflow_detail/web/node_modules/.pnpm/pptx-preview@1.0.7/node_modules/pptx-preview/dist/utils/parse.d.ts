import { ParagraphPropsType, RowPropsType } from "../type/text";
import Group from "../reader/Group";
import PPTX from "../reader/PPTX";
import Slide from "../reader/Slide";
import SlideLayout from "../reader/SlideLayout";
import SlideMaster from "../reader/SlideMaster";
export declare function parseParagraphPr(pPr: any): ParagraphPropsType;
export declare function parseRowPr(rPr: any, theme: any, node?: {
    getColorThemeName(string: any): string;
}): RowPropsType;
export declare function parseAndCreateNode(nodes: Array<any>, nodesConfig: any, pptx: PPTX, ctx: Slide | SlideLayout | SlideMaster, group?: Group): Promise<void>;
