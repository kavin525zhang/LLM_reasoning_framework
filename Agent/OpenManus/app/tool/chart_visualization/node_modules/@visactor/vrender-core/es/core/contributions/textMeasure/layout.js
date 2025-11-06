import { MeasureModeEnum } from "../../../interface";

export class CanvasTextLayout {
    constructor(fontFamily, options, textMeasure) {
        this.fontFamily = fontFamily, this.textOptions = options, this.textMeasure = textMeasure;
    }
    LayoutBBox(bbox, textAlign, textBaseline, linesLayout) {
        if (bbox.xOffset = "left" === textAlign || "start" === textAlign ? 0 : "center" === textAlign ? bbox.width / -2 : "right" === textAlign || "end" === textAlign ? -bbox.width : 0, 
        "top" === textBaseline) bbox.yOffset = 0; else if ("middle" === textBaseline) bbox.yOffset = bbox.height / -2; else if ("alphabetic" === textBaseline) {
            let percent = .79;
            if (1 === linesLayout.length) {
                const lineInfo = linesLayout[0];
                percent = lineInfo.ascent / (lineInfo.ascent + lineInfo.descent);
            }
            bbox.yOffset = bbox.height * -percent;
        } else bbox.yOffset = -bbox.height;
        return bbox;
    }
    GetLayoutByLines(lines, textAlign, textBaseline, lineHeight, suffix = "", wordBreak, params) {
        const {lineWidth: lineWidth, suffixPosition: suffixPosition = "end", measureMode: measureMode = MeasureModeEnum.actualBounding, keepCenterInLine: keepCenterInLine = !1} = null != params ? params : {};
        lines = lines.map((l => l.toString()));
        const linesLayout = [], bboxWH = [ 0, 0 ];
        if ("number" == typeof lineWidth && lineWidth !== 1 / 0) {
            let width;
            for (let i = 0, len = lines.length; i < len; i++) {
                const metrics = this.textMeasure.measureTextPixelADscentAndWidth(lines[i], this.textOptions, measureMode);
                let str = lines[i].toString();
                if (metrics.width > lineWidth) {
                    const data = this.textMeasure.clipTextWithSuffix(lines[i], this.textOptions, lineWidth, suffix, wordBreak, suffixPosition);
                    str = data.str, width = data.width;
                } else width = metrics.width;
                linesLayout.push({
                    str: str,
                    width: width,
                    ascent: metrics.ascent,
                    descent: metrics.descent,
                    keepCenterInLine: keepCenterInLine
                });
            }
            bboxWH[0] = lineWidth;
        } else {
            let width, text, _lineWidth = 0;
            for (let i = 0, len = lines.length; i < len; i++) {
                text = lines[i];
                const metrics = this.textMeasure.measureTextPixelADscentAndWidth(lines[i], this.textOptions, measureMode);
                width = metrics.width, _lineWidth = Math.max(_lineWidth, width), linesLayout.push({
                    str: text,
                    width: width,
                    ascent: metrics.ascent,
                    descent: metrics.descent,
                    keepCenterInLine: keepCenterInLine
                });
            }
            bboxWH[0] = _lineWidth;
        }
        bboxWH[1] = linesLayout.length * lineHeight, bboxWH[0] = linesLayout.reduce(((a, b) => Math.max(a, b.width)), 0);
        const bbox = {
            xOffset: 0,
            yOffset: 0,
            width: bboxWH[0],
            height: bboxWH[1]
        };
        return this.LayoutBBox(bbox, textAlign, textBaseline, linesLayout), this.layoutWithBBox(bbox, linesLayout, textAlign, textBaseline, lineHeight);
    }
    layoutWithBBox(bbox, lines, textAlign, textBaseline, lineHeight) {
        const origin = [ 0, 0 ], totalLineHeight = lines.length * lineHeight;
        "top" === textBaseline || ("middle" === textBaseline ? origin[1] = (bbox.height - totalLineHeight) / 2 : "bottom" === textBaseline && (origin[1] = bbox.height - totalLineHeight));
        for (let i = 0; i < lines.length; i++) this.lineOffset(bbox, lines[i], textAlign, textBaseline, lineHeight, origin);
        return {
            bbox: bbox,
            lines: lines,
            fontFamily: this.fontFamily,
            fontSize: this.textOptions.fontSize,
            fontWeight: this.textOptions.fontWeight,
            lineHeight: lineHeight,
            textAlign: textAlign,
            textBaseline: textBaseline
        };
    }
    lineOffset(bbox, line, textAlign, textBaseline, lineHeight, origin) {
        if ("left" === textAlign || "start" === textAlign ? line.leftOffset = 0 : "center" === textAlign ? line.leftOffset = (bbox.width - line.width) / 2 : "right" !== textAlign && "end" !== textAlign || (line.leftOffset = bbox.width - line.width), 
        line.topOffset = lineHeight / 2 + (line.ascent - line.descent) / 2 + origin[1], 
        !line.keepCenterInLine) {
            const buf = 0, actualHeightWithBuf = line.ascent + line.descent + buf;
            if (actualHeightWithBuf < lineHeight - buf && ("bottom" === textBaseline ? line.topOffset += (lineHeight - actualHeightWithBuf) / 2 : "top" === textBaseline && (line.topOffset -= (lineHeight - actualHeightWithBuf) / 2)), 
            "alphabetic" === textBaseline) {
                const ratio = lineHeight / (line.ascent + line.descent);
                line.topOffset = lineHeight / 2 + (line.ascent - line.descent) / 2 * ratio + origin[1];
            }
        }
        return origin[1] += lineHeight, line;
    }
}
//# sourceMappingURL=layout.js.map
