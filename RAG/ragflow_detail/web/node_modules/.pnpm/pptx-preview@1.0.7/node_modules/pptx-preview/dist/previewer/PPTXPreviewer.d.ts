import { PreviewerOptionsType } from "./type";
import PPTX from '../reader/index';
import HtmlRender from "../html-render/HtmlRender";
export declare class PPTXPreviewer {
    pptx: PPTX;
    htmlRender: HtmlRender;
    dom: HTMLElement;
    wrapper: HTMLElement;
    options: PreviewerOptionsType;
    currentIndex: number;
    get slideCount(): number;
    constructor(dom: HTMLElement, options: PreviewerOptionsType);
    private _renderWrapper;
    renderNextButton(): HTMLDivElement;
    renderPreButton(): HTMLDivElement;
    updatePagination(): void;
    renderPagination(wrapper: HTMLElement): void;
    removeCurrentSlide(): void;
    renderNextSlide(): void;
    renderPreSlide(): void;
    private _addPre;
    preview(file: ArrayBuffer): Promise<unknown>;
    load(file: ArrayBuffer): Promise<PPTX>;
    renderSingleSlide(slideIndex: number): void;
    destroy(): void;
}
