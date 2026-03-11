import PPTX from "./PPTX";
import Theme from "./Theme";
import { ParagraphPropsType, RowPropsType } from "../type/text";
import { ColorType, BackgroundImageType, GradFillType } from "../type/color";
import { relsType } from "../type/slide";
import { TableStylesType } from "../type/table";
export default class SlideMaster {
    slideType: string;
    name: string;
    source: any;
    pptx: PPTX;
    rels: relsType;
    background: ColorType | GradFillType | BackgroundImageType;
    colorMap: {
        [key: string]: string;
    };
    textStyles: {
        titleStyle: {
            [key: string]: {
                props: ParagraphPropsType;
                defRPr: RowPropsType;
            };
        };
        bodyStyle: {
            [key: string]: {
                props: ParagraphPropsType;
                defRPr: RowPropsType;
            };
        };
        otherStyle: {
            [key: string]: {
                props: ParagraphPropsType;
                defRPr: RowPropsType;
            };
        };
    };
    defaultTextStyle: {
        [key: string]: {
            props: ParagraphPropsType;
            defRPr: RowPropsType;
        };
    };
    nodes: Array<any>;
    theme: Theme;
    tableStyles: TableStylesType;
    get _relsPath(): string;
    constructor(name: any, source: any, pptx: any);
    load(): Promise<void>;
    private _parseRels;
    _parseColorMap(): void;
    getColorThemeName(aliseName: any): any;
    _parseBackground(): void;
    _parseDefaultTextStyle(): void;
    _parseTextStyles(): void;
    _parseTableStyles(): void;
    _loadNodes(): Promise<void>;
    getNodeByType(type: any): any;
    getNodeByIdx(idx: any): any;
    getNodeInheritAttrsByType(type: any, propertyPath: Array<string>): void;
    getNodeInheritAttrsByIdx(idx: any, propertyPath: Array<string>): void;
}
