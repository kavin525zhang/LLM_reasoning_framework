import { RichTextIcon } from "./icon";

import Paragraph from "./paragraph";

import { applyFillStyle, applyStrokeStyle, DIRECTION_KEY, measureTextCanvas, regFirstSpace } from "./utils";

export default class Line {
    constructor(left, width, baseline, ascent, descent, lineBuffer, direction, isWidthMax) {
        this.left = left, this.width = width, this.baseline = baseline, this.ascent = ascent, 
        this.descent = descent, this.top = baseline - ascent, this.paragraphs = lineBuffer.map((p => p)), 
        this.textAlign = (this.paragraphs[0] instanceof RichTextIcon ? this.paragraphs[0].attribute.textAlign : this.paragraphs[0].character.textAlign) || "left", 
        this.direction = direction, this.directionKey = DIRECTION_KEY[this.direction], this.actualWidth = 0;
        let maxHeight = 0;
        this.paragraphs.forEach(((word, index) => {
            if (0 === index && word instanceof Paragraph) {
                const result = regFirstSpace.exec(word.text);
                0 !== (null == result ? void 0 : result.index) && (word.text = word.text.slice(null == result ? void 0 : result.index), 
                word.updateWidth());
            }
            this.actualWidth += word[this.directionKey.width], maxHeight = Math.max(word[this.directionKey.height], maxHeight);
        })), this.height = maxHeight, this.blankWidth = isWidthMax ? 0 : this.width - this.actualWidth, 
        this.calcOffset(width, isWidthMax);
    }
    calcOffset(width, isWidthMax) {
        const directionKey = this.directionKey, maxHeight = this.height;
        let x = this.left, spacing = 0;
        this.actualWidth < width && !isWidthMax && ("right" === this.textAlign || "end" === this.textAlign ? x = width - this.actualWidth : "center" === this.textAlign ? x = (width - this.actualWidth) / 2 : "justify" === this.textAlign && (this.paragraphs.length < 2 ? x = (width - this.actualWidth) / 2 : spacing = (width - this.actualWidth) / (this.paragraphs.length - 1))), 
        this.paragraphs.map((function(paragraph) {
            paragraph instanceof RichTextIcon ? (paragraph["_" + directionKey.x] = x, x += paragraph[directionKey.width] + spacing, 
            paragraph["_" + directionKey.y] = "top" === paragraph.attribute.textBaseline ? 0 : "bottom" === paragraph.attribute.textBaseline ? maxHeight - paragraph.height : (maxHeight - paragraph.height) / 2) : (paragraph[directionKey.left] = x, 
            x += paragraph[directionKey.width] + spacing);
        }));
    }
    draw(ctx, lastLine, x, y, drawEllipsis, drawIcon) {
        if (drawEllipsis && (lastLine || this.paragraphs.some((p => p.overflow)))) {
            let emptyOverflow = !0, skipEllipsis = !1;
            for (let i = this.paragraphs.length - 1; i >= 0; i--) {
                const paragraph = this.paragraphs[i];
                if (paragraph.overflow) emptyOverflow = emptyOverflow && "" === paragraph.text; else if (emptyOverflow) {
                    skipEllipsis = !0;
                    break;
                }
            }
            let otherParagraphWidth = 0;
            if (!skipEllipsis) for (let i = this.paragraphs.length - 1; i >= 0; i--) {
                const paragraph = this.paragraphs[i];
                if (paragraph.overflow) {
                    if ("" === paragraph.text) break;
                    continue;
                }
                if (paragraph instanceof RichTextIcon) break;
                if ("vertical" === this.direction && "vertical" !== paragraph.direction) {
                    paragraph.verticalEllipsis = !0;
                    break;
                }
                const ellipsis = !0 === drawEllipsis ? "..." : drawEllipsis || "";
                paragraph.ellipsisStr = ellipsis;
                const {width: width} = measureTextCanvas(ellipsis, paragraph.character, paragraph.ascentDescentMode), ellipsisWidth = width || 0;
                if (ellipsisWidth <= this.blankWidth + otherParagraphWidth) {
                    lastLine && (paragraph.ellipsis = "add");
                    break;
                }
                if (ellipsisWidth <= this.blankWidth + otherParagraphWidth + paragraph.width) {
                    paragraph.ellipsis = "replace", paragraph.ellipsisWidth = ellipsisWidth, paragraph.ellipsisOtherParagraphWidth = this.blankWidth + otherParagraphWidth;
                    break;
                }
                paragraph.ellipsis = "hide", otherParagraphWidth += paragraph.width;
            }
        }
        let fillStyle = "", globalAlpha = -1, currBgList = [];
        const bgList = [ currBgList ];
        this.paragraphs.forEach(((paragraph, index) => {
            if (paragraph instanceof RichTextIcon) return;
            const data = paragraph.drawBackground(ctx, y, this.ascent, x, 0 === index, this.textAlign, this.height);
            data && (fillStyle === data.fillStyle && globalAlpha === data.globalAlpha || (currBgList = [], 
            bgList.push(currBgList), fillStyle = data.fillStyle, globalAlpha = data.globalAlpha), 
            currBgList.push(data));
        })), bgList.forEach((bg => {
            if (0 === bg.length) return;
            const data = bg[0], end = bg[bg.length - 1];
            ctx.fillStyle = data.fillStyle, ctx.globalAlpha = data.globalAlpha, ctx.fillRect(data.left, data.top, end.right - data.left, end.bottom - data.top);
        })), this.paragraphs.forEach(((paragraph, index) => {
            if (paragraph instanceof RichTextIcon) return paragraph.setAttributes({
                x: x + paragraph._x,
                y: y + paragraph._y
            }), void drawIcon(paragraph, ctx, x + paragraph._x, y + paragraph._y, this.ascent);
            const b = {
                x1: this.left,
                y1: this.top,
                x2: this.left + this.actualWidth,
                y2: this.top + this.height
            };
            applyStrokeStyle(ctx, paragraph.character), applyFillStyle(ctx, paragraph.character, b), 
            paragraph.draw(ctx, y, this.ascent, x, 0 === index, this.textAlign, this.height);
        }));
    }
    getWidthWithEllips(ellipsis) {
        let otherParagraphWidth = 0;
        for (let i = this.paragraphs.length - 1; i >= 0; i--) {
            const paragraph = this.paragraphs[i];
            if (paragraph instanceof RichTextIcon) break;
            const {width: width} = measureTextCanvas(ellipsis, paragraph.character, paragraph.ascentDescentMode), ellipsisWidth = width || 0;
            if (ellipsisWidth <= this.blankWidth + otherParagraphWidth) {
                paragraph.ellipsis = "add", paragraph.ellipsisWidth = ellipsisWidth;
                break;
            }
            if (ellipsisWidth <= this.blankWidth + otherParagraphWidth + paragraph.width) {
                paragraph.ellipsis = "replace", paragraph.ellipsisWidth = ellipsisWidth, paragraph.ellipsisOtherParagraphWidth = this.blankWidth + otherParagraphWidth;
                break;
            }
            paragraph.ellipsis = "hide", otherParagraphWidth += paragraph.width;
        }
        let width = 0;
        return this.paragraphs.forEach(((paragraph, index) => {
            width += paragraph instanceof RichTextIcon ? paragraph.width : paragraph.getWidthWithEllips(this.direction);
        })), width;
    }
}
//# sourceMappingURL=line.js.map
