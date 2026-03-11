import { BorderType } from "../type/line";
import PPTX from "./PPTX";
export default class Theme {
    name: string;
    source: any;
    defaultColor: '#000';
    clrScheme: {
        [themeName: string]: string;
    };
    borderScheme: Array<BorderType>;
    pptx: PPTX;
    constructor(name: any, source: any, pptx: PPTX);
    _parseClrScheme(): void;
    _parseLineStyleLst(): void;
    getColor(themeName: string): string;
    getLineStyle(index: number): BorderType;
}
