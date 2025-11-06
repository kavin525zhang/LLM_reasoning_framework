"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BaseWordCloudSeries = void 0;

const vutils_1 = require("@visactor/vutils"), vutils_2 = require("@visactor/vutils"), data_1 = require("../../constant/data"), attribute_1 = require("../../constant/attribute"), env_1 = require("../../util/env"), config_1 = require("./config"), utils_1 = require("../../animation/utils"), word_cloud_1 = require("../../constant/word-cloud"), base_series_1 = require("../base/base-series"), color_ordinal_scale_1 = require("../../scale/color-ordinal-scale"), constant_1 = require("./constant"), factory_1 = require("../../core/factory"), vscale_1 = require("@visactor/vscale");

class BaseWordCloudSeries extends base_series_1.BaseSeries {
    constructor() {
        super(...arguments), this._fontSizeRange = [ config_1.DEFAULT_MIN_FONT_SIZE, config_1.DEFAULT_MIN_FONT_SIZE ], 
        this._isWordCloudShape = !1, this._dataChange = !0, this.handleMaskCanvasUpdate = (canvas, imageUrl) => {
            this._maskCanvas = canvas;
        }, this.getWordColor = datum => datum.isFillingWord ? (this._fillingColorCallback && !this._dataChange || (this._fillingColorCallback = this._wordCloudShapeConfig.fillingColorHexField ? datum => datum[this._wordCloudShapeConfig.fillingColorHexField] : this.initColorCallback(this._wordCloudShapeConfig.fillingSeriesField, !0)), 
        this._fillingColorCallback(datum)) : (this._keyWordColorCallback && !this._dataChange || (this._keyWordColorCallback = this._spec.colorHexField ? datum => datum[this._spec.colorHexField] : this.initColorCallback(this._seriesField, !1)), 
        this._keyWordColorCallback(datum)), this._calculateFontWeight = datum => {
            const stats = this.getRawDataStatisticsByField(this._valueField, !0);
            return stats.min === stats.max ? this._fontWeightRange[0] : this._fontWeightRange[0] + (this._fontWeightRange[this._fontWeightRange.length - 1] - this._fontWeightRange[0]) * (datum[this._valueField] - stats.min) / (stats.max - stats.min);
        };
    }
    setValueField(field) {
        (0, vutils_2.isValid)(field) && (this._valueField = field);
    }
    setFontSizeRange(fontSizeRange) {
        (0, vutils_2.isValid)(fontSizeRange) ? this._fontSizeRange = fontSizeRange : this._fontSizeRange = config_1.DEFAULT_FONTSIZE_RANGE;
    }
    setAttrFromSpec() {
        var _a, _b, _c, _d, _e;
        super.setAttrFromSpec(), this._padding = this._option.getChart().padding, this._nameField = this._spec.nameField, 
        this._colorMode = null !== (_a = this._spec.colorMode) && void 0 !== _a ? _a : "ordinal", 
        this._colorList = this._spec.colorList, this.setValueField(this._spec.valueField), 
        this._fontWeightRange = null !== (_b = this._spec.fontWeightRange) && void 0 !== _b ? _b : config_1.DEFAULT_FONT_WEIGHT_RANGE, 
        this._rotateAngles = null !== (_c = this._spec.rotateAngles) && void 0 !== _c ? _c : config_1.DEFAULT_ROTATE_ANGLES, 
        this.setFontSizeRange(this._spec.fontSizeRange), this._maskShape = null !== (_d = this._spec.maskShape) && void 0 !== _d ? _d : config_1.DEFAULT_MASK_SHAPE, 
        this._textField = (null === (_e = this._spec.word) || void 0 === _e ? void 0 : _e.formatMethod) ? word_cloud_1.WORD_CLOUD_TEXT : this._nameField;
        const wordCloudConfig = this._spec.wordCloudConfig;
        this._wordCloudConfig = Object.assign({
            drawOutOfBound: config_1.DEFAULT_DRAW_OUT_OF_BOUND,
            layoutMode: "default",
            zoomToFit: config_1.DEFAULT_ZOOM_TO_FIT
        }, this._spec.wordCloudConfig), wordCloudConfig && !(0, vutils_1.isNil)(wordCloudConfig.layoutMode) || (0, 
        env_1.isTrueBrowser)(this._option.mode) || (this._wordCloudConfig.layoutMode = "fast"), 
        this._wordCloudShapeConfig = Object.assign({
            fillingSeriesField: this.getSeriesField(),
            fillingRotateAngles: config_1.DEFAULT_ROTATE_ANGLES,
            layoutMode: "default"
        }, this._spec.wordCloudShapeConfig), this._isWordCloudShape = !config_1.SHAPE_TYPE.includes(this._maskShape) && ![ "fast", "grid", "cloud" ].includes(this._wordCloudConfig.layoutMode), 
        this._defaultFontFamily = this._option.getTheme().fontFamily;
    }
    initData() {
        var _a, _b;
        super.initData(), null === (_b = null === (_a = this.getViewData()) || void 0 === _a ? void 0 : _a.target) || void 0 === _b || _b.addListener("change", (() => {
            this._dataChange = !0, this.compile();
        }));
    }
    initMark() {
        var _a;
        (null === (_a = this._spec.wordMask) || void 0 === _a ? void 0 : _a.visible) && (this._maskMark = this._createMark(BaseWordCloudSeries.mark.wordMask, {
            dataView: !1
        })), this._wordMark = this._createMark(BaseWordCloudSeries.mark.word, {
            key: data_1.DEFAULT_DATA_KEY,
            groupKey: this._seriesField,
            isSeriesMark: !0
        }, {
            morphElementKey: this._seriesField
        });
    }
    initMarkStyle() {
        this.initMarkStyleOfWord(this._wordMark, this._spec.word, this._spec.colorHexField, this._seriesField), 
        this._maskMark && this.setMarkStyle(this._maskMark, {
            width: () => this._region.getLayoutRect().width,
            height: () => this._region.getLayoutRect().height,
            background: () => this._maskCanvas
        }, "normal", attribute_1.AttributeLevel.Series);
    }
    initMarkStyleOfWord(wordMark, wordSpec, colorHexField, seriesField, isFillingWord) {
        var _a, _b;
        wordMark && (this.setMarkStyle(wordMark, {
            text: (null == wordSpec ? void 0 : wordSpec.formatMethod) ? datum => wordSpec.formatMethod(datum) : datum => datum[this._textField],
            x: datum => datum.x,
            y: datum => datum.y,
            fontSize: datum => datum.fontSize,
            fontStyle: datum => datum.fontStyle,
            angle: datum => datum.angle,
            visible: datum => datum.visible
        }, "normal", attribute_1.AttributeLevel.Series), this.setMarkStyle(wordMark, {
            fill: null !== (_b = null === (_a = null == wordSpec ? void 0 : wordSpec.style) || void 0 === _a ? void 0 : _a.fill) && void 0 !== _b ? _b : this.getWordColor,
            fontWeight: datum => datum.fontWeight,
            fontFamily: datum => datum.fontFamily
        }, "normal", attribute_1.AttributeLevel.User_Mark));
    }
    initTooltip() {
        super.initTooltip(), this._wordMark && this._tooltipHelper.activeTriggerSet.mark.add(this._wordMark);
    }
    initAnimation() {
        [ this._wordMark ].forEach((mark => {
            var _a, _b;
            if (mark) {
                const appearPreset = null === (_b = null === (_a = this._spec) || void 0 === _a ? void 0 : _a.animationAppear) || void 0 === _b ? void 0 : _b.preset, params = {
                    animationConfig: () => {
                        var _a, _b;
                        return null === (_b = null === (_a = mark.getAnimationConfig()) || void 0 === _a ? void 0 : _a.appear) || void 0 === _b ? void 0 : _b[0];
                    }
                };
                mark.setAnimationConfig((0, utils_1.animationConfig)(factory_1.Factory.getAnimationInKey("wordCloud")(params, appearPreset), (0, 
                utils_1.userAnimationConfig)("word", this._spec, this._markAttributeContext)));
            }
        }));
    }
    getWordOrdinalColorScale(field, isFillingWord) {
        var _a, _b, _c, _d, _e;
        const colorList = isFillingWord ? this._wordCloudShapeConfig.fillingColorList : this._colorList, colorDomain = field ? null === (_a = this.getViewData()) || void 0 === _a ? void 0 : _a.latestData.map((datum => datum[field])) : [], colorRange = null !== (_c = null != colorList ? colorList : null === (_b = this._option.globalScale.getScale("color")) || void 0 === _b ? void 0 : _b.range()) && void 0 !== _c ? _c : this._getDataScheme();
        return null === (_e = (_d = (new color_ordinal_scale_1.ColorOrdinalScale).domain(colorDomain)).range) || void 0 === _e ? void 0 : _e.call(_d, colorRange);
    }
    initColorCallback(field, isFillingWord) {
        var _a, _b, _c, _d;
        if ("ordinal" === this._colorMode) {
            const scale = this.getWordOrdinalColorScale(field, isFillingWord);
            return datum => scale.scale(datum[null != field ? field : data_1.DEFAULT_DATA_SERIES_FIELD]);
        }
        const colorList = null !== (_a = isFillingWord ? this._colorList : this._wordCloudShapeConfig.fillingColorList) && void 0 !== _a ? _a : this._option.globalScale.getScale("color").range();
        if (1 === colorList.length) return datum => colorList[0];
        if (this._valueField) {
            const stats = this.getRawDataStatisticsByField(this._valueField, !0);
            if (stats.min === stats.max) return colorList[0];
            const scale = (new vscale_1.LinearScale).domain([ stats.min, stats.max ]).range(colorList);
            return datum => scale.scale(datum[this._valueField]);
        }
        const scale = (new vscale_1.LinearScale).domain([ 0, null !== (_d = null === (_c = null === (_b = this.getViewData()) || void 0 === _b ? void 0 : _b.latestData) || void 0 === _c ? void 0 : _c.length) && void 0 !== _d ? _d : 1 ]).range(colorList);
        return datum => scale.scale(datum[data_1.DEFAULT_DATA_INDEX]);
    }
    compile() {
        super.compile();
        const {width: width, height: height} = this._region.getLayoutRect();
        if (!(0, vutils_1.isValidNumber)(width) || !(0, vutils_1.isValidNumber)(height) || !(height > 0 && width > 0)) return;
        const product = this._wordMark.getProduct();
        if (product) {
            const wordCloudTransforms = [];
            this._isWordCloudShape ? wordCloudTransforms.push(Object.assign({
                type: "wordcloudShape"
            }, this._wordCloudShapeTransformOption())) : wordCloudTransforms.push(Object.assign({
                type: "wordcloud"
            }, this._wordCloudTransformOption())), product.transform(wordCloudTransforms);
        }
    }
    _getCommonTransformOptions() {
        var _a, _b, _c, _d, _e, _f;
        const {width: width, height: height} = this._region.getLayoutRect(), wordSpec = null !== (_a = this._spec.word) && void 0 !== _a ? _a : {}, wordStyleSpec = null !== (_b = wordSpec.style) && void 0 !== _b ? _b : {};
        return {
            size: [ width, height ],
            shape: (0, vutils_1.isObject)(this._maskShape) && "text" === this._maskShape.type && (0, 
            vutils_1.isNil)(this._maskShape.fontFamily) ? Object.assign({
                fontFamily: null === (_c = this._option.getTheme()) || void 0 === _c ? void 0 : _c.fontFamily
            }, this._maskShape) : this._maskShape,
            onUpdateMaskCanvas: this.handleMaskCanvasUpdate,
            dataIndexKey: data_1.DEFAULT_DATA_KEY,
            text: wordSpec.formatMethod ? datum => wordSpec.formatMethod(datum) : {
                field: this._textField
            },
            fontSize: this._valueField ? {
                field: this._valueField
            } : this._fontSizeRange[0],
            fontSizeRange: "auto" === this._fontSizeRange ? null : this._fontSizeRange,
            padding: null !== (_e = null === (_d = this._spec.word) || void 0 === _d ? void 0 : _d.padding) && void 0 !== _e ? _e : config_1.DEFAULT_FONT_PADDING,
            fontFamily: (0, vutils_2.isValid)(this._spec.fontFamilyField) ? {
                field: this._spec.fontFamilyField
            } : null !== (_f = wordStyleSpec.fontFamily) && void 0 !== _f ? _f : this._defaultFontFamily,
            fontWeight: (0, vutils_2.isValid)(this._spec.fontWeightField) ? {
                field: this._spec.fontWeightField
            } : (0, vutils_2.isValid)(wordStyleSpec.fontWeight) ? wordStyleSpec.fontWeight : (0, 
            vutils_2.isValid)(this._valueField) ? this._calculateFontWeight : "normal",
            fontStyle: (0, vutils_2.isValid)(this._spec.fontStyleField) ? {
                field: this._spec.fontStyleField
            } : wordStyleSpec.fontStyle
        };
    }
    _wordCloudTransformOption() {
        var _a, _b;
        const wordCloudConfig = null !== (_a = this._wordCloudConfig) && void 0 !== _a ? _a : {};
        return Object.assign(Object.assign(Object.assign({}, wordCloudConfig), this._getCommonTransformOptions()), {
            layoutType: this._wordCloudConfig.layoutMode,
            rotate: this._rotateAngles,
            randomVisible: null !== (_b = this._spec.random) && void 0 !== _b ? _b : config_1.DEFAULT_RANDOM,
            clip: "clip" === this._wordCloudConfig.drawOutOfBound,
            shrink: this._wordCloudConfig.zoomToFit.shrink,
            enlarge: this._wordCloudConfig.zoomToFit.enlarge,
            minFontSize: this._wordCloudConfig.zoomToFit.fontSizeLimitMin,
            progressiveTime: this._wordCloudConfig.progressiveTime,
            progressiveStep: this._wordCloudConfig.progressiveStep,
            repeatFill: this._wordCloudConfig.zoomToFit.repeat
        });
    }
    _wordCloudShapeTransformOption() {
        var _a, _b, _c, _d, _e, _f;
        const fillingWordStyleSpec = null !== (_b = null === (_a = this._spec.fillingWord) || void 0 === _a ? void 0 : _a.style) && void 0 !== _b ? _b : {}, wordCloudShapeConfig = null !== (_c = this._wordCloudShapeConfig) && void 0 !== _c ? _c : {};
        return Object.assign(Object.assign(Object.assign({}, wordCloudShapeConfig), this._getCommonTransformOptions()), {
            rotateList: this._rotateAngles,
            fillingRotateList: wordCloudShapeConfig.fillingRotateAngles,
            fillingFontFamily: (0, vutils_2.isValid)(wordCloudShapeConfig.fillingFontFamilyField) ? {
                field: wordCloudShapeConfig.fillingFontFamilyField
            } : null !== (_d = fillingWordStyleSpec.fontFamily) && void 0 !== _d ? _d : this._defaultFontFamily,
            fillingPadding: null !== (_f = null === (_e = this._spec.fillingWord) || void 0 === _e ? void 0 : _e.padding) && void 0 !== _f ? _f : config_1.DEFAULT_FONT_PADDING,
            fillingFontStyle: (0, vutils_2.isValid)(wordCloudShapeConfig.fillingFontStyleField) ? {
                field: wordCloudShapeConfig.fillingFontStyleField
            } : fillingWordStyleSpec.fontStyle,
            fillingFontWeight: (0, vutils_2.isValid)(wordCloudShapeConfig.fillingFontWeightField) ? {
                field: wordCloudShapeConfig.fillingFontWeightField
            } : fillingWordStyleSpec.fontWeight
        });
    }
    getStatisticFields() {
        const fields = [];
        return fields.push({
            key: this._nameField,
            operations: [ "values" ]
        }), fields.push({
            key: this._valueField,
            operations: [ "max", "min" ]
        }), fields;
    }
    dataToPosition(data) {
        return null;
    }
    dataToPositionX(data) {
        return null;
    }
    dataToPositionY(data) {
        return null;
    }
    dataToPositionZ(data) {
        return null;
    }
    valueToPosition(value1, value2) {
        return null;
    }
    getGroupFields() {
        return [];
    }
    getStackGroupFields() {
        return [];
    }
    getStackValueField() {
        return "";
    }
    onLayoutEnd(ctx) {
        super.onLayoutEnd(ctx), this.compile(), this._dataChange = !1;
    }
    getActiveMarks() {
        return [ this._wordMark ];
    }
    reInit() {
        super.reInit(), this._keyWordColorCallback && (this._keyWordColorCallback = null), 
        this._fillingColorCallback && (this._fillingColorCallback = null);
    }
}

exports.BaseWordCloudSeries = BaseWordCloudSeries, BaseWordCloudSeries.mark = constant_1.wordCloudSeriesMark;
//# sourceMappingURL=base.js.map
