import TextBody from "../../reader/node/TextBody";
export interface textArea {
    left: number;
    top: number;
    right: number;
    bottom: number;
    w: number;
    h: number;
}
export declare function _renderParagraph(paragraph: any, levelIndex?: number, options?: {
    isFirst?: boolean;
    isLast?: boolean;
    bodyProps?: any;
}): HTMLElement;
export declare function renderTextBody(textBody: TextBody, textArea: textArea, isTextBox?: boolean): HTMLElement;
