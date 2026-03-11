import PPTX from "../reader";
interface RenderOptionsType {
    viewPort?: {
        width?: number;
        height?: number;
    };
    mode?: 'list' | 'slide';
}
export default class HtmlRender {
    scale: number;
    pptx: PPTX;
    options: RenderOptionsType;
    renderPort: {
        width: number;
        height: number;
        left: number;
        top: number;
    };
    wrapper: HTMLElement;
    constructor(wrapper: HTMLElement, pptx: PPTX, options: RenderOptionsType);
    private _calcScaleAndRenderPort;
    renderSlide(slideNumber: any): void;
    private _renderSlideMaster;
    private _renderSlideLayout;
    private _renderSlide;
    private _renderNode;
    private _renderBackground;
}
export {};
