"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.shiftY = void 0;

const vutils_1 = require("@visactor/vutils"), isIntersect = (top, bottom) => Math.ceil(top) > Math.floor(bottom), isXIntersect = ([a, b], [c, d]) => d > a && b > c;

function getIntersectionLength(range1, range2) {
    const [start1, end1] = range1, [start2, end2] = range2, start = Math.max(start1, start2), end = Math.min(end1, end2);
    return Math.max(0, end - start);
}

function shiftY(texts, option) {
    const {maxY: maxY = Number.MAX_VALUE, labelling: labelling, globalShiftY: globalShiftY = {
        enable: !0,
        maxIterations: 10,
        maxError: .1,
        padding: 1
    }} = option, n = texts.length;
    if (n <= 1) return texts;
    const xMap = new Map, textInformation = new Map, getY1Initial = text => textInformation.get(text).y1Initial, getHeight = text => textInformation.get(text).height, getY1 = text => textInformation.get(text).y1, getX = text => textInformation.get(text).x, getX1 = text => textInformation.get(text).x1, getX2 = text => textInformation.get(text).x2, getAdjustAttempts = text => textInformation.get(text).attempts, setY1 = (text, y) => {
        textInformation.get(text).y1 = y;
    }, setAdjustAttempts = (text, attempts) => {
        textInformation.get(text).attempts = attempts;
    };
    function adjustPositionInOneGroup(texts) {
        for (let i = texts.length - 1; i >= 0; i--) {
            const curText = texts[i], upperText = texts[i - 1], lowerText = texts[i + 1];
            if (upperText && isIntersect(getY1(upperText) + getHeight(upperText), getY1(curText)) || 0 === getY1(curText) && curText._isClamped) {
                const {y: y} = labelling(curText);
                lowerText && isIntersect(y + getHeight(curText) / 2, getY1(lowerText)) || y + getHeight(curText) / 2 <= maxY && setY1(curText, getY1(curText) + y - (text = curText, 
                textInformation.get(text).y));
            }
        }
        var text;
    }
    texts.sort(((a, b) => a.attribute.x - b.attribute.x));
    for (const text of texts) {
        const {y1: y1, y2: y2, x1: x1, x2: x2} = text.AABBBounds, {x: x, y: y} = text.attribute;
        textInformation.set(text, {
            y1Initial: y1,
            y1: y1,
            y2: y2,
            y: y,
            height: y2 - y1,
            x1: x1,
            x2: x2,
            x: x,
            attempts: 0
        });
        let hasRange = !1;
        for (const [range, xGroupTexts] of xMap) {
            const {start: start, end: end} = range;
            if (x1 >= start && x2 <= end) xGroupTexts.push(text), hasRange = !0; else if ((0, 
            vutils_1.isNumberClose)(x, getX(xGroupTexts[0]), void 0, 5)) {
                const newRange = {
                    start: Math.min(start, x1),
                    end: Math.max(end, x2)
                };
                xGroupTexts.push(text), xMap.set(newRange, xGroupTexts), xMap.delete(range), hasRange = !0;
            } else if (getIntersectionLength([ start, end ], [ x1, x2 ]) / (end - start) > .5) {
                const newRange = {
                    start: Math.min(start, x1),
                    end: Math.max(end, x2)
                };
                xGroupTexts.push(text), xMap.set(newRange, xGroupTexts), xMap.delete(range), hasRange = !0;
            }
            if (hasRange) break;
        }
        hasRange || xMap.set({
            start: x1,
            end: x2
        }, [ text ]);
    }
    for (const xTexts of xMap.values()) xTexts.sort(((a, b) => getY1Initial(a) - getY1Initial(b))), 
    adjustPositionInOneGroup(xTexts);
    if (!1 !== globalShiftY.enable) {
        const {maxIterations: maxIterations = 10, maxError: maxError = .1, padding: padding = 1, maxAttempts: maxAttempts = 1e3, deltaYTolerance: deltaYTolerance = Number.MAX_VALUE} = globalShiftY;
        for (let iter = 0; iter < maxIterations; iter++) {
            texts.sort(((a, b) => getY1Initial(a) - getY1Initial(b)));
            let error = 0;
            for (let i = 0; i < n - 1; i++) {
                const curText = texts[i];
                if (getAdjustAttempts(curText) >= maxAttempts) continue;
                let nextText, j = i + 1;
                for (;(nextText = texts[j]) && !isXIntersect([ getX1(curText), getX2(curText) ], [ getX1(nextText), getX2(nextText) ]); ) j += 1;
                if (nextText) {
                    const y1 = getY1(curText), h0 = getHeight(curText), nextY1 = getY1(nextText), delta = nextY1 - (y1 + h0);
                    if (delta < padding) {
                        const newDelta = (padding - delta) / 2;
                        if (error = Math.max(error, newDelta), y1 + newDelta + getHeight(nextText) > maxY) {
                            const newY1 = y1 - (padding - delta), curTextDelta = getY1Initial(curText) - newY1;
                            Math.abs(curTextDelta) <= deltaYTolerance && (setY1(curText, newY1), setAdjustAttempts(curText, getAdjustAttempts(curText) + 1));
                        } else if (y1 - newDelta < 0) {
                            const newY1 = nextY1 + (padding - delta), nextTextDelta = getY1Initial(nextText) - newY1;
                            Math.abs(nextTextDelta) <= deltaYTolerance && (setY1(nextText, newY1), setAdjustAttempts(nextText, getAdjustAttempts(nextText) + 1));
                        } else {
                            const newCurY1 = y1 - newDelta, curTextDelta = getY1Initial(curText) - newCurY1, newNextY1 = nextY1 + newDelta, nextTextDelta = getY1Initial(nextText) - newNextY1;
                            Math.abs(curTextDelta) <= deltaYTolerance && Math.abs(nextTextDelta) <= deltaYTolerance && (setY1(curText, newCurY1), 
                            setY1(nextText, newNextY1), setAdjustAttempts(curText, getAdjustAttempts(curText) + 1), 
                            setAdjustAttempts(nextText, getAdjustAttempts(nextText) + 1));
                        }
                    }
                }
            }
            if (error < maxError) break;
        }
    }
    for (const text of texts) {
        const finalY = text.attribute.y + getY1(text) - getY1Initial(text);
        text.setAttribute("y", finalY);
    }
    const result = [];
    texts.sort(((a, b) => a.attribute.x - b.attribute.x));
    let start = 0, end = texts.length - 1;
    for (;start <= end; ) start === end ? result.push(texts[start]) : (result.push(texts[start]), 
    result.push(texts[end])), start++, end--;
    return result;
}

exports.shiftY = shiftY;
//# sourceMappingURL=shiftY.js.map
