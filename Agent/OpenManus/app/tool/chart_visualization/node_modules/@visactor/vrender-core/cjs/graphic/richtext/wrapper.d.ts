import type Frame from './frame';
import type Paragraph from './paragraph';
import { RichTextIcon } from './icon';
export default class Wrapper {
    frame: Frame;
    lineWidth: number;
    width: number;
    height: number;
    y: number;
    maxAscent: number;
    maxDescent: number;
    maxAscentForBlank: number;
    maxDescentForBlank: number;
    lineBuffer: (Paragraph | RichTextIcon)[];
    direction: 'horizontal' | 'vertical';
    directionKey: {
        width: string;
        height: string;
    };
    newLine: boolean;
    constructor(frame: Frame);
    store(paragraph: Paragraph | RichTextIcon): void;
    send(): void;
    deal(paragraph: Paragraph | RichTextIcon, singleLine?: boolean): void;
    cut(paragraph: Paragraph, singleLine?: boolean): void;
}
