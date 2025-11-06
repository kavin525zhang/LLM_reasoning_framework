import { degreeToRadian, isFunction, isString, maxInArray, toNumber } from "@visactor/vutils";

import { removeBorder, scaleAndMiddleShape, segmentation } from "./segmentation";

import { WORDCLOUD_SHAPE_HOOK_EVENT, calTextLength, colorListEqual, fakeRandom, functor, loadImage } from "./util";

import { LinearScale, OrdinalScale, SqrtScale } from "@visactor/vscale";

import cloud from "./cloud-shape-layout";

import { vglobal } from "@visactor/vrender-core";

import { generateIsEmptyPixel, generateMaskCanvas } from "@visactor/vgrammar-util";

const OUTPUT = {
    x: "x",
    y: "y",
    fontFamily: "fontFamily",
    fontSize: "fontSize",
    fontStyle: "fontStyle",
    fontWeight: "fontWeight",
    angle: "angle",
    opacity: "opacity",
    visible: "visible",
    isFillingWord: "isFillingWord",
    color: "color"
};

export class Layout {
    constructor(options, view) {
        this.progressiveResult = [], this.options = options, this.view = view;
    }
    layout(data) {
        this.data = data;
        const options = this.options, segmentationInput = {
            shapeUrl: options.shape,
            size: options.size,
            ratio: options.ratio || .8,
            tempCanvas: void 0,
            boardSize: [ 0, 0 ],
            random: !1,
            randomGenerator: void 0
        }, tempCanvas = vglobal.createCanvas({
            width: options.size[0],
            height: options.size[1]
        }), tempCtx = tempCanvas.getContext("2d", {
            willReadFrequently: !0
        });
        tempCtx.textAlign = "center", tempCtx.textBaseline = "middle", segmentationInput.tempCanvas = tempCanvas;
        const boardW = options.size[0] + 31 >> 5 << 5;
        if (segmentationInput.boardSize = [ boardW, options.size[1] ], segmentationInput.random ? segmentationInput.randomGenerator = Math.random : segmentationInput.randomGenerator = fakeRandom(), 
        this.segmentationInput = segmentationInput, isString(segmentationInput.shapeUrl)) {
            segmentationInput.isEmptyPixel = generateIsEmptyPixel();
            const imagePromise = loadImage(segmentationInput.shapeUrl);
            imagePromise ? (this.isImageFinished = !1, this.isLayoutFinished = !1, imagePromise.then((shapeImage => {
                this.isImageFinished = !0;
                const maskCanvas = vglobal.createCanvas({
                    width: options.size[0],
                    height: options.size[1],
                    dpr: 1
                });
                segmentationInput.maskCanvas = maskCanvas;
                const ctx = maskCanvas.getContext("2d");
                options.removeWhiteBorder && removeBorder(shapeImage, maskCanvas, segmentationInput.isEmptyPixel);
                const shapeConfig = scaleAndMiddleShape(shapeImage, options.size);
                ctx.clearRect(0, 0, options.size[0], options.size[1]), ctx.drawImage(shapeImage, shapeConfig.x, shapeConfig.y, shapeConfig.width, shapeConfig.height), 
                this.options.onUpdateMaskCanvas && this.options.onUpdateMaskCanvas(segmentationInput.maskCanvas);
            })).catch((error => {
                this.isImageFinished = !0;
            }))) : (this.isImageFinished = !0, this.isLayoutFinished = !0);
        } else if (segmentationInput.shapeUrl && ("text" === segmentationInput.shapeUrl.type || "geometric" === segmentationInput.shapeUrl.type)) {
            segmentationInput.isEmptyPixel = generateIsEmptyPixel(segmentationInput.shapeUrl.backgroundColor);
            const maskCanvas = generateMaskCanvas(segmentationInput.shapeUrl, options.size[0], options.size[1]);
            segmentationInput.maskCanvas = maskCanvas, this.options.onUpdateMaskCanvas && this.options.onUpdateMaskCanvas(maskCanvas), 
            this.doLayout(), this.isImageFinished = !0, this.isLayoutFinished = !0;
        }
    }
    canAnimate() {
        return !0;
    }
    unfinished() {
        return !this.isLayoutFinished;
    }
    output() {
        return this.progressiveResult;
    }
    progressiveRun() {
        this.isImageFinished && !this.isLayoutFinished && (this.segmentationInput.maskCanvas && this.doLayout(), 
        this.isLayoutFinished = !0);
    }
    progressiveOutput() {
        return this.progressiveResult;
    }
    doLayout() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        const segmentationInput = this.segmentationInput, segmentationOutput = segmentation(segmentationInput);
        if (!segmentationOutput.segmentation.regions.length) return;
        const options = this.options, data = this.data, colorMode = options.colorMode || "ordinal", wordsConfig = {
            getText: field(options.text),
            getFontSize: field(options.fontSize),
            fontSizeRange: options.fontSizeRange,
            colorMode: colorMode,
            getColor: options.colorField ? field(options.colorField) : field(options.text),
            getFillingColor: field(options.fillingColorField),
            colorList: options.colorList || ("ordinal" === colorMode ? [ "#2E62F1" ] : [ "#537EF5", "#2E62F1", "#2358D8", "#184FBF", "#0C45A6", "#013B8E" ]),
            getColorHex: field(options.colorHexField),
            getFontFamily: field(options.fontFamily || "sans-serif"),
            rotateList: options.rotateList || [ 0 ],
            getPadding: field(options.padding || 1),
            getFontStyle: field(options.fontStyle || "normal"),
            getFontWeight: field(options.fontWeight || "normal"),
            getFontOpacity: options.fontOpacity ? field(options.fontOpacity) : () => 1
        };
        initFontSizeScale(data, wordsConfig, segmentationOutput);
        const layoutConfig = {
            size: options.size,
            ratio: options.ratio || .8,
            shapeUrl: options.shape,
            random: void 0 === options.random || options.random,
            textLayoutTimes: null !== (_a = options.textLayoutTimes) && void 0 !== _a ? _a : 3,
            removeWhiteBorder: options.removeWhiteBorder,
            layoutMode: null !== (_b = options.layoutMode) && void 0 !== _b ? _b : "default",
            fontSizeShrinkFactor: null !== (_c = options.fontSizeShrinkFactor) && void 0 !== _c ? _c : .8,
            stepFactor: null !== (_d = options.stepFactor) && void 0 !== _d ? _d : 1,
            importantWordCount: null !== (_e = options.importantWordCount) && void 0 !== _e ? _e : 10,
            globalShinkLimit: options.globalShinkLimit || .2,
            fontSizeEnlargeFactor: null !== (_f = options.fontSizeEnlargeFactor) && void 0 !== _f ? _f : 1.5,
            fillingRatio: null !== (_g = options.fillingRatio) && void 0 !== _g ? _g : .7,
            fillingTimes: null !== (_h = options.fillingTimes) && void 0 !== _h ? _h : 4,
            fillingXStep: options.fillingXRatioStep ? Math.max(Math.floor(options.size[0] * options.fillingXRatioStep), 1) : null !== (_j = options.fillingXStep) && void 0 !== _j ? _j : 4,
            fillingYStep: options.fillingYRatioStep ? Math.max(Math.floor(options.size[1] * options.fillingYRatioStep), 1) : null !== (_k = options.fillingYStep) && void 0 !== _k ? _k : 4,
            fillingInitialFontSize: options.fillingInitialFontSize,
            fillingDeltaFontSize: options.fillingDeltaFontSize,
            fillingInitialOpacity: null !== (_l = options.fillingInitialOpacity) && void 0 !== _l ? _l : .8,
            fillingDeltaOpacity: null !== (_m = options.fillingDeltaOpacity) && void 0 !== _m ? _m : .05,
            getFillingFontFamily: field(options.fillingFontFamily || "sans-serif"),
            getFillingFontStyle: field(options.fillingFontStyle || "normal"),
            getFillingFontWeight: field(options.fillingFontWeight || "normal"),
            getFillingPadding: field(null !== (_o = options.fillingPadding) && void 0 !== _o ? _o : .4),
            fillingRotateList: null !== (_p = options.fillingRotateList) && void 0 !== _p ? _p : [ 0, 90 ],
            fillingDeltaFontSizeFactor: null !== (_q = options.fillingDeltaFontSizeFactor) && void 0 !== _q ? _q : .2,
            fillingColorList: options.fillingColorList || [ "#537EF5" ],
            sameColorList: !1,
            minInitFontSize: null !== (_r = options.minInitFontSize) && void 0 !== _r ? _r : 10,
            minFontSize: null !== (_s = options.minFontSize) && void 0 !== _s ? _s : 4,
            minFillFontSize: null !== (_t = options.minFillFontSize) && void 0 !== _t ? _t : 2
        }, sameColorList = colorListEqual(wordsConfig.colorList, layoutConfig.fillingColorList);
        layoutConfig.sameColorList = sameColorList, initColorScale(data, wordsConfig, layoutConfig, options), 
        initFillingWordsFontSize(data, wordsConfig, layoutConfig, segmentationOutput);
        const {getText: getText, getFontFamily: getFontFamily, getFontStyle: getFontStyle, getFontWeight: getFontWeight, getPadding: getPadding, getColor: getColor, getFillingColor: getFillingColor, getColorHex: getColorHex, fontSizeScale: fontSizeScale, colorScale: colorScale, fillingColorScale: fillingColorScale, getFontOpacity: getFontOpacity, rotateList: rotateList} = wordsConfig, words = data.map((datum => {
            var _a, _b;
            return {
                x: 0,
                y: 0,
                weight: 0,
                text: getText(datum),
                fontFamily: getFontFamily(datum),
                fontWeight: getFontWeight(datum),
                fontStyle: getFontStyle(datum),
                rotate: rotateList[~~(segmentationInput.randomGenerator() * rotateList.length)],
                fontSize: Math.max(layoutConfig.minInitFontSize, ~~fontSizeScale(datum)),
                opacity: getFontOpacity(datum),
                padding: getPadding(datum),
                color: getColorHex && getColorHex(datum) || colorScale && colorScale(getColor(datum)) || "black",
                fillingColor: !getFillingColor || (null === (_a = options.colorField) || void 0 === _a ? void 0 : _a.field) === (null === (_b = options.fillingColorField) || void 0 === _b ? void 0 : _b.field) && sameColorList ? void 0 : getColorHex && getColorHex(datum) || fillingColorScale && fillingColorScale(getFillingColor(datum)) || "black",
                datum: datum,
                visible: !0,
                hasPlaced: !1
            };
        })), wordsMaxFontSize = maxInArray(words.map((word => word.fontSize)));
        words.forEach((word => word.weight = word.fontSize / wordsMaxFontSize)), words.sort(((a, b) => b.weight - a.weight));
        const {fillingWords: fillingWords, successedWords: successedWords, failedWords: failedWords} = cloud(words, layoutConfig, segmentationOutput), textKey = null !== (_v = null === (_u = options.text) || void 0 === _u ? void 0 : _u.field) && void 0 !== _v ? _v : "textKey", dataIndexKey = null !== (_w = options.dataIndexKey) && void 0 !== _w ? _w : "defaultDataIndexKey", as = options.as ? Object.assign(Object.assign({}, OUTPUT), options.as) : OUTPUT;
        let w, t;
        const modKeywords = [];
        for (let i = 0; i < words.length; ++i) w = words[i], t = w.datum, t[as.x] = w.x, 
        t[as.y] = w.y, t[as.fontFamily] = w.fontFamily, t[as.fontSize] = w.fontSize, t[as.fontStyle] = w.fontStyle, 
        t[as.fontWeight] = w.fontWeight, t[as.angle] = degreeToRadian(w.rotate), t[as.opacity] = w.opacity, 
        t[as.visible] = w.visible, t[as.isFillingWord] = !1, t[as.color] = w.color, t[dataIndexKey] = `${w.text}_${i}_keyword`, 
        modKeywords.push(t);
        const fillingWordsData = [];
        if (fillingWords.forEach(((word, index) => {
            var _a, _b;
            const t = Object.assign({}, word.datum);
            t[as.x] = word.x, t[as.y] = word.y, t[as.fontFamily] = word.fontFamily, t[as.fontSize] = word.fontSize, 
            t[as.fontStyle] = word.fontStyle, t[as.fontWeight] = word.fontWeight, t[as.angle] = degreeToRadian(word.rotate), 
            t[as.opacity] = word.opacity, t[as.visible] = word.visible, t[as.isFillingWord] = !0, 
            t[as.color] = getFillingColor ? (null === (_a = options.colorField) || void 0 === _a ? void 0 : _a.field) === (null === (_b = options.fillingColorField) || void 0 === _b ? void 0 : _b.field) && sameColorList ? word.color : word.fillingColor : layoutConfig.fillingColorList[~~(segmentationInput.randomGenerator() * layoutConfig.fillingColorList.length)], 
            t[textKey] = word.text, t[dataIndexKey] = `${word.text}_${index}_fillingWords`, 
            fillingWordsData.push(t);
        })), this.view && this.view.emit) {
            this.view.emit(WORDCLOUD_SHAPE_HOOK_EVENT.AFTER_WORDCLOUD_SHAPE_LAYOUT, {
                successedWords: successedWords,
                failedWords: failedWords
            });
            const stage = null === (_x = this.view.renderer) || void 0 === _x ? void 0 : _x.stage();
            stage && stage.hooks.afterRender.tap(WORDCLOUD_SHAPE_HOOK_EVENT.AFTER_WORDCLOUD_SHAPE_DRAW, (() => {
                this.view.emit(WORDCLOUD_SHAPE_HOOK_EVENT.AFTER_WORDCLOUD_SHAPE_DRAW, {
                    successedWords: successedWords,
                    failedWords: failedWords
                }), stage.hooks.afterRender.unTap(WORDCLOUD_SHAPE_HOOK_EVENT.AFTER_WORDCLOUD_SHAPE_DRAW);
            }));
        }
        this.progressiveResult = modKeywords.concat(fillingWordsData);
    }
    release() {
        this.segmentationInput = null, this.data = null, this.progressiveResult = null, 
        this.options = null;
    }
}

const initColorScale = (data, wordsConfig, layoutConfig, options) => {
    var _a, _b, _c, _d;
    const {colorMode: colorMode, getColor: getColor, getFillingColor: getFillingColor} = wordsConfig, {sameColorList: sameColorList} = layoutConfig;
    let colorScale, fillingColorScale, colorList = wordsConfig.colorList, fillingColorList = layoutConfig.fillingColorList;
    if ("ordinal" === colorMode) {
        const uniqueColorField = data.map((word => getColor(word)));
        if (colorScale = datum => (new OrdinalScale).domain(uniqueColorField).range(colorList).scale(datum), 
        getFillingColor && ((null === (_a = options.colorField) || void 0 === _a ? void 0 : _a.field) !== (null === (_b = options.fillingColorField) || void 0 === _b ? void 0 : _b.field) || !sameColorList)) {
            const uniquefillingColorField = data.map((datum => getFillingColor(datum)));
            fillingColorScale = datum => (new OrdinalScale).domain(uniquefillingColorField).range(fillingColorList).scale(datum);
        }
    } else {
        1 === colorList.length && (colorList = [ colorList[0], colorList[0] ]);
        const valueScale = (new LinearScale).domain(extent(getColor, data)).range(colorList);
        if (colorScale = i => valueScale.scale(i), getFillingColor && ((null === (_c = options.colorField) || void 0 === _c ? void 0 : _c.field) !== (null === (_d = options.fillingColorField) || void 0 === _d ? void 0 : _d.field) || !sameColorList)) {
            1 === fillingColorList.length && (fillingColorList = [ fillingColorList[0], fillingColorList[0] ]);
            const fillingValueScale = (new LinearScale).domain(extent(getFillingColor, data)).range(fillingColorList);
            fillingColorScale = i => fillingValueScale.scale(i);
        }
    }
    Object.assign(wordsConfig, {
        colorScale: colorScale,
        fillingColorScale: fillingColorScale
    });
}, initFontSizeScale = (data, wordsConfig, segmentationOutput) => {
    let {fontSizeRange: range} = wordsConfig;
    const {getFontSize: getFontSize, getText: getText} = wordsConfig;
    let fontSizeScale;
    if (getFontSize) {
        if (getFontSize && range) {
            const sizeScale = (new SqrtScale).domain(extent(getFontSize, data)).range(range);
            fontSizeScale = datum => sizeScale.scale(getFontSize(datum));
        } else if (getFontSize && isFunction(getFontSize) && !range) {
            const a = .5, [min, max] = extent(getFontSize, data), words = data.map((datum => ({
                text: getText(datum),
                value: getFontSize(datum),
                weight: max === min ? 1 : (getFontSize(datum) - min) / (max - min)
            }))), x = getInitialFontSize(words, segmentationOutput, !0);
            range = [ ~~(a * x), ~~x ];
            const sizeScale = (new SqrtScale).domain(extent(getFontSize, data)).range(range);
            fontSizeScale = datum => sizeScale.scale(getFontSize(datum));
        }
    } else {
        const words = data.map((word => ({
            text: getText(word)
        }))), x = getInitialFontSize(words, segmentationOutput, !1);
        fontSizeScale = functor(x);
    }
    Object.assign(wordsConfig, {
        getFontSize: getFontSize,
        fontSizeRange: range,
        fontSizeScale: fontSizeScale
    });
}, getInitialFontSize = (words, segmentationOutput, weight) => {
    const shapeArea = segmentationOutput.shapeArea, ratio = segmentationOutput.ratio, regions = segmentationOutput.segmentation.regions, shapeSizeLimitTextLength = Math.ceil(Math.sqrt(shapeArea) / 12), wordArea = words.reduce(((acc, word) => {
        const textLength = calTextLength(word.text);
        return textLength < shapeSizeLimitTextLength ? acc + textLength * (weight ? (.5 + .5 * word.weight) ** 2 : 1) : acc;
    }), 0);
    if (0 === wordArea) return 12;
    let x = 20;
    if (1 === regions.length) x = Math.sqrt(ratio * (shapeArea / (1.7 * wordArea))); else {
        const xArr = [];
        for (let i = 0; i < regions.length; i++) {
            const regionArea = regions[i].area, regionAspect = regions[i].ratio, regionRatio = regionArea / shapeArea;
            if (regionRatio < .1) continue;
            const regionWordArea = regionRatio * (wordArea * (regionAspect < 1 ? 2.7 - regionAspect : 1.7)), x = Math.sqrt(ratio * (regionArea / regionWordArea));
            xArr.push(x);
        }
        x = xArr.length ? Math.min(...xArr) : Math.sqrt(ratio * (shapeArea / (1.7 * wordArea)));
    }
    return x;
};

function initFillingWordsFontSize(data, wordsConfig, layoutConfig, segmentationOutput) {
    const {getText: getText} = wordsConfig;
    let {fillingInitialFontSize: fillingInitialFontSize, fillingDeltaFontSize: fillingDeltaFontSize} = layoutConfig;
    const {fillingRatio: fillingRatio} = layoutConfig, shapeSizeLimitTextLength = Math.ceil(Math.sqrt(segmentationOutput.shapeArea) / 4);
    if (!fillingInitialFontSize || !fillingDeltaFontSize) {
        const a = fillingRatio / 100, averageLength = data.reduce(((acc, word) => {
            const length = calTextLength(getText(word));
            return length > shapeSizeLimitTextLength ? acc : acc + length;
        }), 0) / data.length;
        let fontSize;
        if (0 === averageLength) fontSize = 8; else {
            const area = .2 * segmentationOutput.shapeArea;
            fontSize = Math.sqrt(a * (area / averageLength));
        }
        fillingInitialFontSize = ~~fontSize, fillingDeltaFontSize = fontSize * layoutConfig.fillingDeltaFontSizeFactor, 
        Object.assign(layoutConfig, {
            fillingInitialFontSize: fillingInitialFontSize,
            fillingDeltaFontSize: fillingDeltaFontSize
        });
    }
}

const extent = (field, data) => {
    let min = 1 / 0, max = -1 / 0;
    const n = data.length;
    let v;
    for (let i = 0; i < n; ++i) v = toNumber(field(data[i])), v < min && (min = v), 
    v > max && (max = v);
    return 1 === data.length && min === max && (min -= 1e4), [ min, max ];
}, field = option => option ? "string" == typeof option || "number" == typeof option ? () => option : isFunction(option) ? option : datum => datum[option.field] : null;
//# sourceMappingURL=layout.js.map