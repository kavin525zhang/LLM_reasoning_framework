var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import { injectable } from "../../../common/inversify-lite";

import { MeasureModeEnum } from "../../../interface";

import { DefaultTextAttribute, DefaultTextStyle } from "../../../graphic/config";

import { testLetter } from "../../../graphic/richtext/utils";

import { Logger } from "@visactor/vutils";

let ATextMeasure = class {
    configure(service, env) {
        this.canvas = service.canvas, this.context = service.context, service.bindTextMeasure(this);
    }
    _measureTextWithoutAlignBaseline(text, options, compatible) {
        this.context.setTextStyleWithoutAlignBaseline(options);
        const metrics = this.context.measureText(text);
        return compatible ? this.compatibleMetrics(metrics, options) : metrics;
    }
    _measureTextWithAlignBaseline(text, options, compatible) {
        this.context.setTextStyle(options);
        const metrics = this.context.measureText(text);
        return compatible ? this.compatibleMetrics(metrics, options) : metrics;
    }
    compatibleMetrics(metrics, options) {
        if (null == metrics.actualBoundingBoxAscent || null == metrics.actualBoundingBoxDescent || null == metrics.fontBoundingBoxAscent || null == metrics.fontBoundingBoxDescent) {
            metrics = {
                width: metrics.width
            };
            const {ascent: ascent, descent: descent} = this.measureTextBoundADscentEstimate(options);
            metrics.actualBoundingBoxAscent = ascent, metrics.actualBoundingBoxDescent = descent, 
            metrics.fontBoundingBoxAscent = ascent, metrics.fontBoundingBoxDescent = descent;
        }
        if (null == metrics.actualBoundingBoxLeft || null == metrics.actualBoundingBoxRight) {
            metrics = {
                width: metrics.width,
                actualBoundingBoxAscent: metrics.actualBoundingBoxAscent,
                actualBoundingBoxDescent: metrics.actualBoundingBoxDescent,
                fontBoundingBoxAscent: metrics.fontBoundingBoxAscent,
                fontBoundingBoxDescent: metrics.fontBoundingBoxDescent
            };
            const {left: left, right: right} = this.measureTextBoundLeftRightEstimate(options);
            metrics.actualBoundingBoxLeft = left, metrics.actualBoundingBoxRight = right;
        }
        return metrics;
    }
    estimate(text, {fontSize: fontSize = DefaultTextAttribute.fontSize}) {
        let eCharLen = 0, cCharLen = 0;
        for (let i = 0; i < text.length; i++) text.charCodeAt(i) < 128 ? eCharLen++ : cCharLen++;
        return {
            width: ~~(.8 * eCharLen * fontSize + cCharLen * fontSize),
            height: fontSize
        };
    }
    measureTextWidth(text, options, textMeasure) {
        return this.context ? (textMeasure = null != textMeasure ? textMeasure : this._measureTextWithoutAlignBaseline(text, options)).width : this.estimate(text, options).width;
    }
    measureTextBoundsWidth(text, options, textMeasure) {
        return this.context ? (textMeasure = null != textMeasure ? textMeasure : this._measureTextWithoutAlignBaseline(text, options)).width : this.estimate(text, options).width;
    }
    measureTextBoundsLeftRight(text, options, textMeasure) {
        return this.context ? {
            left: (textMeasure = null != textMeasure ? textMeasure : this._measureTextWithAlignBaseline(text, options, !0)).actualBoundingBoxLeft,
            right: textMeasure.actualBoundingBoxRight
        } : this.measureTextBoundLeftRightEstimate(options);
    }
    measureTextPixelHeight(text, options, textMeasure) {
        var _a;
        return this.context ? (textMeasure = null != textMeasure ? textMeasure : this._measureTextWithoutAlignBaseline(text, options, !0), 
        Math.abs(textMeasure.actualBoundingBoxAscent - textMeasure.actualBoundingBoxDescent)) : null !== (_a = options.fontSize) && void 0 !== _a ? _a : DefaultTextStyle.fontSize;
    }
    measureTextPixelADscent(text, options, textMeasure) {
        return this.context ? {
            ascent: (textMeasure = null != textMeasure ? textMeasure : this._measureTextWithAlignBaseline(text, options, !0)).actualBoundingBoxAscent,
            descent: textMeasure.actualBoundingBoxDescent
        } : this.measureTextBoundADscentEstimate(options);
    }
    measureTextBoundHieght(text, options, textMeasure) {
        var _a;
        return this.context ? (textMeasure = null != textMeasure ? textMeasure : this._measureTextWithoutAlignBaseline(text, options, !0), 
        Math.abs(textMeasure.fontBoundingBoxAscent - textMeasure.fontBoundingBoxDescent)) : null !== (_a = options.fontSize) && void 0 !== _a ? _a : DefaultTextStyle.fontSize;
    }
    measureTextBoundADscent(text, options, textMeasure) {
        return this.context ? {
            ascent: (textMeasure = null != textMeasure ? textMeasure : this._measureTextWithAlignBaseline(text, options, !0)).fontBoundingBoxAscent,
            descent: textMeasure.fontBoundingBoxDescent
        } : this.measureTextBoundADscentEstimate(options);
    }
    measureTextBoundADscentEstimate(options) {
        var _a;
        const fontSize = null !== (_a = options.fontSize) && void 0 !== _a ? _a : DefaultTextStyle.fontSize;
        return {
            ascent: .79 * fontSize,
            descent: .21 * fontSize
        };
    }
    measureTextBoundLeftRightEstimate(options) {
        var _a;
        const fontSize = null !== (_a = options.fontSize) && void 0 !== _a ? _a : DefaultTextStyle.fontSize, {textAlign: textAlign} = options;
        return "center" === textAlign ? {
            left: fontSize / 2,
            right: fontSize / 2
        } : "right" === textAlign || "end" === textAlign ? {
            left: fontSize,
            right: 0
        } : {
            left: 0,
            right: fontSize
        };
    }
    measureTextPixelADscentAndWidth(text, options, mode) {
        if (!this.context) return Object.assign(Object.assign({}, this.measureTextBoundADscentEstimate(options)), {
            width: this.estimate(text, options).width
        });
        const out = this._measureTextWithoutAlignBaseline(text, options, !0);
        if (mode === MeasureModeEnum.actualBounding) return {
            ascent: out.actualBoundingBoxAscent,
            descent: out.actualBoundingBoxDescent,
            width: out.width
        };
        if (mode === MeasureModeEnum.estimate) return Object.assign(Object.assign({}, this.measureTextBoundADscentEstimate(options)), {
            width: out.width
        });
        if (mode === MeasureModeEnum.fontBounding) {
            let ascent = out.fontBoundingBoxAscent, descent = out.fontBoundingBoxDescent;
            if (out.actualBoundingBoxDescent && descent < out.actualBoundingBoxDescent) {
                const delta = out.actualBoundingBoxDescent - descent;
                descent += delta, ascent -= delta;
            } else if (out.actualBoundingBoxAscent && ascent < out.actualBoundingBoxAscent) {
                const delta = out.actualBoundingBoxAscent - ascent;
                ascent += delta, descent -= delta;
            }
            return {
                ascent: ascent,
                descent: descent,
                width: out.width
            };
        }
        return {
            ascent: out.actualBoundingBoxAscent,
            descent: out.actualBoundingBoxDescent,
            width: out.width
        };
    }
    measureText(text, options) {
        return this.context ? (this.context.setTextStyleWithoutAlignBaseline(options), this.context.measureText(text)) : this.estimate(text, options);
    }
    clipTextVertical(verticalList, options, width, wordBreak) {
        if (0 === verticalList.length) return {
            verticalList: verticalList,
            width: 0
        };
        const {fontSize: fontSize = 12} = options;
        verticalList.forEach((item => {
            item.width = 0 === item.direction ? fontSize : this.measureTextWidth(item.text, options);
        }));
        const out = [];
        let length = 0, i = 0;
        for (;i < verticalList.length && length + verticalList[i].width < width; i++) length += verticalList[i].width, 
        out.push(verticalList[i]);
        if (verticalList[i] && verticalList[i].text.length > 1) {
            const clipedData = this._clipText(verticalList[i].text, options, width - length, 0, verticalList[i].text.length - 1, "end", !1);
            if (wordBreak && clipedData.str !== verticalList[i].text) {
                let text = "", length = 0;
                for (let j = 0; j < i; j++) {
                    const item = verticalList[j];
                    text += item.text, length += item.text.length;
                }
                text += verticalList[i].text;
                const totalLength = length + clipedData.str.length;
                let index = testLetter(text, totalLength);
                index -= length, index !== clipedData.str.length - 1 && (clipedData.str = clipedData.str.substring(0, index), 
                clipedData.width = this.measureTextWidth(clipedData.str, options));
            }
            out.push(Object.assign(Object.assign({}, verticalList[i]), {
                text: clipedData.str,
                width: clipedData.width
            })), length += clipedData.width;
        }
        return {
            verticalList: out,
            width: length
        };
    }
    clipText(text, options, width, wordBreak, keepAllBreak) {
        if (0 === text.length) return {
            str: "",
            width: 0
        };
        let length = this.measureTextWidth(text, options);
        if (length <= width) return {
            str: text,
            width: length
        };
        if (length = this.measureTextWidth(text[0], options), length > width) return {
            str: "",
            width: 0
        };
        const data = this._clipText(text, options, width, 0, text.length - 1, "end", !1);
        if (wordBreak && data.str !== text) {
            let index = testLetter(text, data.str.length, keepAllBreak);
            index !== data.str.length && (index > data.str.length && (data.wordBreaked = index, 
            index = data.str.length), data.str = text.substring(0, index), data.width = this.measureTextWidth(data.str, options));
        }
        return data;
    }
    _clipText(text, options, width, leftIdx, rightIdx, position, suffix) {
        let data;
        if ("start" === position) data = this._clipTextStart(text, options, width, leftIdx, rightIdx), 
        suffix && (data.result = suffix + data.str); else if ("middle" === position) {
            const d = this._clipTextMiddle(text, options, width, "", "", 0, 0, 1);
            data = {
                str: "none",
                width: d.width,
                result: d.left + suffix + d.right
            };
        } else data = this._clipTextEnd(text, options, width, leftIdx, rightIdx), suffix && (data.result = data.str + suffix);
        return data;
    }
    _clipTextEnd(text, options, width, leftIdx, rightIdx) {
        if (leftIdx === rightIdx) {
            Logger.getInstance().warn(`【_clipTextEnd】不应该走到这里${text}, ${leftIdx}, ${rightIdx}`);
            const subText = text.substring(0, rightIdx + 1);
            return {
                str: subText,
                width: this.measureTextWidth(subText, options)
            };
        }
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2), subText = text.substring(0, middleIdx + 1), strWidth = this.measureTextWidth(subText, options);
        let length;
        if (strWidth > width) {
            if (subText.length <= 1) return {
                str: "",
                width: 0
            };
            const str = text.substring(0, middleIdx);
            return length = this.measureTextWidth(str, options), length <= width ? {
                str: str,
                width: length
            } : this._clipTextEnd(text, options, width, leftIdx, middleIdx);
        }
        if (strWidth < width) {
            if (middleIdx >= text.length - 1) return {
                str: text,
                width: this.measureTextWidth(text, options)
            };
            const str = text.substring(0, middleIdx + 2);
            return length = this.measureTextWidth(str, options), length >= width ? {
                str: subText,
                width: strWidth
            } : this._clipTextEnd(text, options, width, middleIdx, rightIdx);
        }
        return {
            str: subText,
            width: strWidth
        };
    }
    _clipTextStart(text, options, width, leftIdx, rightIdx) {
        const middleIdx = Math.ceil((leftIdx + rightIdx) / 2), subText = text.substring(middleIdx - 1, text.length), strWidth = this.measureTextWidth(subText, options);
        let length;
        if (strWidth > width) {
            if (subText.length <= 1) return {
                str: "",
                width: 0
            };
            const str = text.substring(middleIdx, text.length);
            return length = this.measureTextWidth(str, options), length <= width ? {
                str: str,
                width: length
            } : this._clipTextStart(text, options, width, middleIdx, text.length);
        }
        if (strWidth < width) {
            if (middleIdx <= 0) return {
                str: text,
                width: this.measureTextWidth(text, options)
            };
            const str = text.substring(middleIdx - 2, text.length);
            return length = this.measureTextWidth(str, options), length >= width ? {
                str: subText,
                width: strWidth
            } : this._clipTextStart(text, options, width, leftIdx, middleIdx);
        }
        return {
            str: subText,
            width: strWidth
        };
    }
    _clipTextMiddle(text, options, width, left, right, leftW, rightW, buffer) {
        const subLeftText = text.substring(0, buffer), strLeftWidth = this.measureTextWidth(subLeftText, options);
        if (strLeftWidth + rightW > width) return {
            left: left,
            right: right,
            width: leftW + rightW
        };
        const subRightText = text.substring(text.length - buffer, text.length), strRightWidth = this.measureTextWidth(subRightText, options);
        return strLeftWidth + strRightWidth > width ? {
            left: subLeftText,
            right: right,
            width: strLeftWidth + rightW
        } : this._clipTextMiddle(text, options, width, subLeftText, subRightText, strLeftWidth, strRightWidth, buffer + 1);
    }
    clipTextWithSuffixVertical(verticalList, options, width, suffix, wordBreak, suffixPosition) {
        if ("" === suffix) return this.clipTextVertical(verticalList, options, width, wordBreak);
        if (0 === verticalList.length) return {
            verticalList: verticalList,
            width: 0
        };
        const output = this.clipTextVertical(verticalList, options, width, wordBreak);
        if (output.verticalList.length === verticalList.length && output.verticalList[output.verticalList.length - 1].width === verticalList[verticalList.length - 1].width) return output;
        const suffixWidth = this.measureTextWidth(suffix, options);
        if (suffixWidth > width) return output;
        let out;
        if (width -= suffixWidth, "start" === suffixPosition) {
            const nextVerticalList = this.revertVerticalList(verticalList);
            out = this.clipTextVertical(nextVerticalList, options, width, wordBreak);
            const v = this.revertVerticalList(out.verticalList);
            v.unshift({
                text: suffix,
                direction: 1,
                width: suffixWidth
            }), out.verticalList = v;
        } else if ("middle" === suffixPosition) {
            const leftOut = this.clipTextVertical(verticalList, options, width / 2, wordBreak), nextVerticalList = this.revertVerticalList(verticalList), rightOut = this.clipTextVertical(nextVerticalList, options, width / 2, wordBreak);
            leftOut.verticalList.push({
                text: suffix,
                direction: 1,
                width: suffixWidth
            }), this.revertVerticalList(rightOut.verticalList).forEach((v => leftOut.verticalList.push(v))), 
            out = {
                verticalList: leftOut.verticalList,
                width: leftOut.width + rightOut.width
            };
        } else out = this.clipTextVertical(verticalList, options, width, wordBreak), out.verticalList.push({
            text: suffix,
            direction: 1,
            width: suffixWidth
        });
        return out.width += suffixWidth, out;
    }
    revertVerticalList(verticalList) {
        return verticalList.reverse().map((l => {
            const t = l.text.split("").reverse().join("");
            return Object.assign(Object.assign({}, l), {
                text: t
            });
        }));
    }
    clipTextWithSuffix(text, options, width, suffix, wordBreak, position, forceSuffix = !1) {
        if ("" === suffix) return this.clipText(text, options, width, wordBreak);
        if (0 === text.length) return {
            str: "",
            width: 0
        };
        const length = this.measureTextWidth(text, options);
        if (!forceSuffix && length <= width) return {
            str: text,
            width: length
        };
        const suffixWidth = this.measureTextWidth(suffix, options);
        if (suffixWidth > width) return {
            str: "",
            width: 0
        };
        if (forceSuffix && length + suffixWidth <= width) return {
            str: text + suffix,
            width: length + suffixWidth
        };
        width -= suffixWidth;
        const data = this._clipText(text, options, width, 0, text.length - 1, position, suffix);
        if (wordBreak && data.str !== text) {
            const index = testLetter(text, data.str.length);
            index !== data.str.length && (data.result = text.substring(0, index), data.width = this.measureTextWidth(data.str, options));
        } else forceSuffix && data.str === text && (data.result = text + suffix);
        return data.str = data.result, data.width += suffixWidth, data;
    }
};

ATextMeasure = __decorate([ injectable() ], ATextMeasure);

export { ATextMeasure };
//# sourceMappingURL=AtextMeasure.js.map
