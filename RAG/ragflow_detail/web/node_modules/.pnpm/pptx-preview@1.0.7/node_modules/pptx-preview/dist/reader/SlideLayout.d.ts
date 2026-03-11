import PPTX from "./PPTX";
import SlideMaster from "./SlideMaster";
import { ColorType, BackgroundImageType, GradFillType } from "../type/color";
import { relsType } from "../type/slide";
export default class SlideLayout {
    slideType: string;
    name: string;
    source: any;
    pptx: PPTX;
    slideMaster: SlideMaster;
    rels: relsType;
    background: ColorType | GradFillType | BackgroundImageType;
    nodes: Array<any>;
    get _relsPath(): string;
    get theme(): import("./Theme").default;
    constructor(name: any, source: any, pptx: any);
    load(): Promise<void>;
    _loadRels(): Promise<void>;
    _loadBackground(): Promise<void>;
    _loadNodes(): Promise<void>;
    getColorThemeName(aliseName: any): any;
    getNodeByType(type: any): any;
    getNodeByIdx(idx: any): any;
    getNodeInheritAttrsByType(type: any, propertyPath: Array<string>): any;
    getNodeInheritAttrsByIdx(idx: any, propertyPath: Array<string>): any;
}
