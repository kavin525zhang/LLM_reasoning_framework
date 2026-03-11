import { NodeType } from "../../type/node";
import { TextPropsType, ParagraphType } from "../../type/text";
export default class TextBody {
    source: any;
    node: NodeType;
    props: TextPropsType;
    inheritProps: TextPropsType;
    lstStyle: any;
    paragraphs: ParagraphType[];
    constructor(source: any, node: NodeType);
    private _getInheritBodyProps;
    private _parseBodyProps;
    private _parseLstStyle;
    private _parseText;
    private _parseParagraph;
    private _getInheritPProps;
    private _getInheritRProps;
    private _formatPPr;
    private _parseRow;
    private _formatRPr;
}
