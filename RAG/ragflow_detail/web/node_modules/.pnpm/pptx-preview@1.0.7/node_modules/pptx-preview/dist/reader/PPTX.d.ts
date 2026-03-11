import JSZip from 'jszip';
import Slide from "./Slide";
import SlideLayout from "./SlideLayout";
import SlideMaster from "./SlideMaster";
import Theme from "./Theme";
export default class PPTX {
    thumbnail: String;
    width: number;
    height: number;
    _zipContents: JSZip;
    slides: Array<Slide>;
    slideLayouts: Array<SlideLayout>;
    slideMaster: Array<SlideMaster>;
    themes: Array<Theme>;
    medias: {
        [key: string]: string;
    };
    defaultTextStyleSource: any;
    tableStyles: any;
    wps: boolean;
    constructor();
    load(file: ArrayBuffer | Blob): Promise<void>;
    _loadThumbnail(): Promise<void>;
    _loadPresentation(): Promise<void>;
    _loadContentTypes(): Promise<void>;
    _loadMedia(): Promise<void>;
    getXmlByPath(path: string): Promise<string>;
    getSlideLayout(name: any): SlideLayout;
    getSlideMaster(name: any): SlideMaster;
    getTheme(name: any): Theme;
    getMedia(name: any): string;
}
