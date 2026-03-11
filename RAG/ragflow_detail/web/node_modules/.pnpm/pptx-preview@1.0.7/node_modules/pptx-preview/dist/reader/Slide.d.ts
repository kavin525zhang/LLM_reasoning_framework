import PPTX from "./PPTX";
import SlideLayout from "./SlideLayout";
import { ColorType, BackgroundImageType, GradFillType } from "../type/color";
import { relsType } from "../type/slide";
export default class Slide {
    slideType: string;
    name: string;
    source: any;
    pptx: PPTX;
    slideLayout: SlideLayout;
    rels: relsType;
    background: ColorType | GradFillType | BackgroundImageType;
    nodes: Array<any>;
    get index(): number;
    get slideMaster(): import("./SlideMaster").default;
    get theme(): import("./Theme").default;
    get _relsPath(): string;
    constructor(name: any, source: any, pptx: any);
    load(): Promise<void>;
    _loadRels(): Promise<void>;
    _loadBackground(): void;
    _loadNodes(): Promise<void>;
    getColorThemeName(aliseName: any): any;
    getNodeInheritAttrsByType(type: any, propertyPath: Array<string>): any;
    getNodeInheritAttrsByIdx(idx: any, propertyPath: Array<string>): any;
}
