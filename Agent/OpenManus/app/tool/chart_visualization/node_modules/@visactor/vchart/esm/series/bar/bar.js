import { isContinuous } from "@visactor/vscale";

import { CartesianSeries } from "../cartesian/cartesian";

import { DEFAULT_DATA_KEY, STACK_FIELD_END, STACK_FIELD_END_PERCENT, STACK_FIELD_START, STACK_FIELD_START_PERCENT } from "../../constant/data";

import { AttributeLevel } from "../../constant/attribute";

import { valueInScaleRange } from "../../util/scale";

import { getRegionStackGroup } from "../../util/data";

import { getActualNumValue } from "../../util/space";

import { registerBarAnimation } from "./animation";

import { animationConfig, shouldMarkDoMorph, userAnimationConfig } from "../../animation/utils";

import { SeriesTypeEnum } from "../interface/type";

import { registerRectMark } from "../../mark/rect";

import { array, isFunction, isNil, isValid, last } from "@visactor/vutils";

import { barSeriesMark } from "./constant";

import { stackWithMinHeight } from "../util/stack";

import { Factory } from "../../core/factory";

import { registerDataSetInstanceTransform } from "../../data/register";

import { SeriesData } from "../base/series-data";

import { DataView } from "@visactor/vdataset";

import { addVChartProperty } from "../../data/transforms/add-property";

import { addDataKey, initKeyMap } from "../../data/transforms/data-key";

import { registerSampleTransform } from "@visactor/vgrammar-core";

import { getGroupAnimationParams } from "../util/utils";

import { BarSeriesSpecTransformer } from "./bar-transformer";

import { ComponentTypeEnum } from "../../component/interface";

import { RECT_X, RECT_X1, RECT_Y, RECT_Y1 } from "../base/constant";

import { createRect } from "@visactor/vrender-core";

import { registerCartesianLinearAxis, registerCartesianBandAxis } from "../../component/axis/cartesian";

import { maxInArr, minInArr } from "../../util/array";

export const DefaultBandWidth = 6;

export class BarSeries extends CartesianSeries {
    constructor() {
        super(...arguments), this.type = SeriesTypeEnum.bar, this._barMarkName = "bar", 
        this._barMarkType = "rect", this.transformerConstructor = BarSeriesSpecTransformer, 
        this._bandPosition = 0, this._getBarXStart = (datum, scale, useWholeRange) => this._shouldDoPreCalculate() ? (this._calculateStackRectPosition(!1), 
        datum[RECT_X]) : this._spec.barMinHeight ? this._calculateRectPosition(datum, !1, useWholeRange) : valueInScaleRange(this._dataToPosX(datum), scale, useWholeRange), 
        this._getBarXEnd = (datum, scale, useWholeRange) => this._shouldDoPreCalculate() ? (this._calculateStackRectPosition(!1), 
        datum[RECT_X1]) : valueInScaleRange(this._dataToPosX1(datum), scale, useWholeRange), 
        this._getBarYStart = (datum, scale) => this._shouldDoPreCalculate() ? (this._calculateStackRectPosition(!0), 
        datum[RECT_Y]) : this._spec.barMinHeight ? this._calculateRectPosition(datum, !0) : valueInScaleRange(this._dataToPosY(datum), scale), 
        this._getBarYEnd = (datum, scale) => this._shouldDoPreCalculate() ? (this._calculateStackRectPosition(!0), 
        datum[RECT_Y1]) : valueInScaleRange(this._dataToPosY1(datum), scale), this._getBarBackgroundXStart = scale => {
            const range = scale.range();
            return Math.min(range[0], range[range.length - 1]);
        }, this._getBarBackgroundXEnd = scale => {
            const range = scale.range();
            return Math.max(range[0], range[range.length - 1]);
        }, this._getBarBackgroundYStart = scale => {
            const range = scale.range();
            return Math.min(range[0], range[range.length - 1]);
        }, this._getBarBackgroundYEnd = scale => {
            const range = scale.range();
            return Math.max(range[0], range[range.length - 1]);
        }, this._getBarBackgroundPositionXEncoder = () => {
            var _a;
            return null === (_a = this._barBackgroundPositionXEncoder) || void 0 === _a ? void 0 : _a.bind(this);
        }, this._setBarBackgroundPositionXEncoder = encoder => {
            this._barBackgroundPositionXEncoder = encoder.bind(this);
        }, this._getBarBackgroundPositionYEncoder = () => {
            var _a;
            return null === (_a = this._barBackgroundPositionYEncoder) || void 0 === _a ? void 0 : _a.bind(this);
        }, this._setBarBackgroundPositionYEncoder = encoder => {
            this._barBackgroundPositionYEncoder = encoder.bind(this);
        };
    }
    initMark() {
        var _a, _b;
        this._initBarBackgroundMark(), this._barMark = this._createMark(Object.assign(Object.assign({}, BarSeries.mark.bar), {
            name: this._barMarkName,
            type: this._barMarkType
        }), {
            groupKey: this._seriesField,
            isSeriesMark: !0,
            stateSort: null === (_a = this._spec.bar) || void 0 === _a ? void 0 : _a.stateSort
        }, {
            progressiveStep: this._spec.progressiveStep,
            progressiveThreshold: this._spec.progressiveThreshold,
            large: this._spec.large,
            largeThreshold: this._spec.largeThreshold,
            morphElementKey: this.getDimensionField()[0],
            morph: shouldMarkDoMorph(this._spec, this._barMarkName),
            setCustomizedShape: null === (_b = this._spec.bar) || void 0 === _b ? void 0 : _b.customShape
        });
    }
    _initBarBackgroundMark() {
        this._spec.barBackground && this._spec.barBackground.visible && (this._barBackgroundMark = this._createMark(BarSeries.mark.barBackground, {
            dataView: this._barBackgroundViewData.getDataView(),
            dataProductId: this._barBackgroundViewData.getProductId(),
            stateSort: this._spec.barBackground.stateSort
        }, {
            setCustomizedShape: this._spec.barBackground.customShape,
            progressiveStep: this._spec.progressiveStep,
            progressiveThreshold: this._spec.progressiveThreshold,
            large: this._spec.large,
            largeThreshold: this._spec.largeThreshold
        }));
    }
    initMarkStyle() {
        this._barMark && this.setMarkStyle(this._barMark, {
            fill: this.getColorAttribute()
        }, "normal", AttributeLevel.Series);
    }
    initLabelMarkStyle(textMark) {
        textMark && this.setMarkStyle(textMark, {
            fill: this.getColorAttribute(),
            text: datum => datum[this.getStackValueField()],
            z: this._fieldZ ? this.dataToPositionZ.bind(this) : null
        });
    }
    initTooltip() {
        super.initTooltip();
        const {mark: mark, group: group} = this._tooltipHelper.activeTriggerSet;
        this._barMark && (mark.add(this._barMark), group.add(this._barMark));
    }
    _statisticViewData() {
        var _a, _b;
        super._statisticViewData();
        const spec = null !== (_a = this._spec.barBackground) && void 0 !== _a ? _a : {};
        if (!spec.visible) return;
        const hasBandAxis = this._getRelatedComponentSpecInfo("axes").some((axisInfo => axisInfo.type === ComponentTypeEnum.cartesianBandAxis));
        let barBackgroundData;
        if (registerDataSetInstanceTransform(this._option.dataSet, "addVChartProperty", addVChartProperty), 
        hasBandAxis) {
            const dimensionItems = ([data], {scaleDepth: scaleDepth}) => {
                var _a, _b;
                let dataCollect = [ {} ];
                const fields = this.getDimensionField(), depth = isNil(scaleDepth) ? fields.length : Math.min(fields.length, scaleDepth);
                for (let i = 0; i < depth; i++) {
                    const field = fields[i], values = null === (_a = data.latestData[field]) || void 0 === _a ? void 0 : _a.values;
                    if (!(null == values ? void 0 : values.length)) continue;
                    const newDataCollect = [], dataKey = null !== (_b = this._spec.dataKey) && void 0 !== _b ? _b : DEFAULT_DATA_KEY;
                    for (let j = 0; j < values.length; j++) for (let k = 0; k < dataCollect.length; k++) newDataCollect.push(Object.assign(Object.assign({}, dataCollect[k]), {
                        [field]: values[j],
                        [dataKey]: values[j]
                    }));
                    dataCollect = newDataCollect;
                }
                return dataCollect;
            };
            registerDataSetInstanceTransform(this._option.dataSet, "dimensionItems", dimensionItems), 
            barBackgroundData = new DataView(this._option.dataSet).parse([ this._viewDataStatistics ], {
                type: "dataview"
            }).transform({
                type: "dimensionItems",
                options: {
                    scaleDepth: isNil(spec.fieldLevel) ? void 0 : spec.fieldLevel + 1
                }
            }, !1).transform({
                type: "addVChartProperty",
                options: {
                    beforeCall: initKeyMap.bind(this),
                    call: addDataKey
                }
            }, !1), null === (_b = this._viewDataStatistics) || void 0 === _b || _b.target.addListener("change", barBackgroundData.reRunAllTransform);
        } else {
            const dimensionItems = ([data]) => {
                const dataCollect = [], [field0, field1] = this.getDimensionContinuousField(), map = {};
                return viewData.latestData.forEach((datum => {
                    const key = `${datum[field0]}-${datum[field1]}`;
                    map[key] || (map[key] = {
                        [field0]: datum[field0],
                        [field1]: datum[field1]
                    }, dataCollect.push(map[key]));
                })), dataCollect;
            };
            registerDataSetInstanceTransform(this._option.dataSet, "dimensionItems", dimensionItems);
            const viewData = this.getViewData();
            barBackgroundData = new DataView(this._option.dataSet).parse([ viewData ], {
                type: "dataview"
            }).transform({
                type: "dimensionItems"
            }, !1).transform({
                type: "addVChartProperty",
                options: {
                    beforeCall: initKeyMap.bind(this),
                    call: addDataKey
                }
            }, !1), null == viewData || viewData.target.addListener("change", barBackgroundData.reRunAllTransform);
        }
        this._barBackgroundViewData = new SeriesData(this._option, barBackgroundData);
    }
    init(option) {
        var _a, _b;
        super.init(option), "vertical" === this.direction ? "band" === (null === (_a = this._xAxisHelper) || void 0 === _a ? void 0 : _a.getScale(0).type) ? this.initBandRectMarkStyle() : this.initLinearRectMarkStyle() : "band" === (null === (_b = this._yAxisHelper) || void 0 === _b ? void 0 : _b.getScale(0).type) ? this.initBandRectMarkStyle() : this.initLinearRectMarkStyle();
    }
    _shouldDoPreCalculate() {
        const region = this.getRegion();
        return this.getStack() && region.getSeries().filter((s => s.type === this.type && s.getSpec().barMinHeight)).length;
    }
    _calculateStackRectPosition(isVertical) {
        const region = this.getRegion();
        if (region._bar_series_position_calculated) return;
        let start, end, startMethod, endMethod, axisHelper;
        region._bar_series_position_calculated = !0, isVertical ? (start = RECT_Y1, end = RECT_Y, 
        startMethod = "_dataToPosY1", endMethod = "_dataToPosY", axisHelper = "_yAxisHelper") : (start = RECT_X1, 
        end = RECT_X, startMethod = "_dataToPosX1", endMethod = "_dataToPosX", axisHelper = "_xAxisHelper");
        const stackValueGroup = getRegionStackGroup(region, !1, (s => s.type === this.type));
        for (const stackValue in stackValueGroup) for (const key in stackValueGroup[stackValue].nodes) stackWithMinHeight(stackValueGroup[stackValue].nodes[key], region.getStackInverse(), {
            isVertical: isVertical,
            start: start,
            end: end,
            startMethod: startMethod,
            endMethod: endMethod,
            axisHelper: axisHelper
        });
    }
    _calculateRectPosition(datum, isVertical, useWholeRange) {
        var _a, _b;
        let startMethod, endMethod, axisHelper;
        isVertical ? (startMethod = "_dataToPosY1", endMethod = "_dataToPosY", axisHelper = "_yAxisHelper") : (startMethod = "_dataToPosX1", 
        endMethod = "_dataToPosX", axisHelper = "_xAxisHelper");
        const seriesScale = null === (_b = (_a = this[axisHelper]).getScale) || void 0 === _b ? void 0 : _b.call(_a, 0), inverse = this[axisHelper].isInverse(), barMinHeight = this._spec.barMinHeight, y1 = valueInScaleRange(this[startMethod](datum), seriesScale, useWholeRange), y = valueInScaleRange(this[endMethod](datum), seriesScale, useWholeRange);
        let height = Math.abs(y1 - y);
        height < barMinHeight && (height = barMinHeight);
        let flag = 1;
        return y < y1 ? flag = -1 : y === y1 && (flag = isVertical ? inverse ? 1 : -1 : inverse ? -1 : 1), 
        y1 + flag * height;
    }
    _dataToPosX(datum) {
        return this.dataToPositionX(datum);
    }
    _dataToPosX1(datum) {
        return this.dataToPositionX1(datum);
    }
    _dataToPosY(datum) {
        return this.dataToPositionY(datum);
    }
    _dataToPosY1(datum) {
        return this.dataToPositionY1(datum);
    }
    initBandRectMarkStyle() {
        var _a, _b, _c, _d;
        const xScale = null === (_b = null === (_a = this._xAxisHelper) || void 0 === _a ? void 0 : _a.getScale) || void 0 === _b ? void 0 : _b.call(_a, 0), yScale = null === (_d = null === (_c = this._yAxisHelper) || void 0 === _c ? void 0 : _c.getScale) || void 0 === _d ? void 0 : _d.call(_c, 0);
        "horizontal" === this.direction ? this.setMarkStyle(this._barMark, {
            x: datum => this._getBarXStart(datum, xScale),
            x1: datum => this._getBarXEnd(datum, xScale),
            y: datum => this._getPosition(this.direction, datum),
            height: () => this._getBarWidth(this._yAxisHelper),
            width: () => {},
            y1: () => {}
        }, "normal", AttributeLevel.Series) : this.setMarkStyle(this._barMark, {
            y: datum => this._getBarYStart(datum, yScale),
            y1: datum => this._getBarYEnd(datum, yScale),
            x: datum => this._getPosition(this.direction, datum),
            width: () => this._getBarWidth(this._xAxisHelper),
            x1: () => {},
            height: () => {}
        }, "normal", AttributeLevel.Series), this._initStackBarMarkStyle(), this._initBandBarBackgroundMarkStyle();
    }
    _initStackBarMarkStyle() {
        var _a, _b, _c, _d;
        if (!this._spec.stackCornerRadius) return;
        const xScale = null === (_b = null === (_a = this._xAxisHelper) || void 0 === _a ? void 0 : _a.getScale) || void 0 === _b ? void 0 : _b.call(_a, 0), yScale = null === (_d = null === (_c = this._yAxisHelper) || void 0 === _c ? void 0 : _c.getScale) || void 0 === _d ? void 0 : _d.call(_c, 0);
        this._barMark.setMarkConfig({
            clip: !0,
            clipPath: () => {
                const rectPaths = [];
                return this._forEachStackGroup((node => {
                    let min = 1 / 0, max = -1 / 0, hasPercent = !1, minPercent = 1 / 0, maxPercent = -1 / 0;
                    node.values.forEach((datum => {
                        const start = datum[STACK_FIELD_START], end = datum[STACK_FIELD_END], startPercent = datum[STACK_FIELD_START_PERCENT], endPercent = datum[STACK_FIELD_END_PERCENT];
                        min = Math.min(min, start, end), max = Math.max(max, start, end), isValid(startPercent) && isValid(endPercent) && (hasPercent = !0, 
                        minPercent = Math.min(minPercent, startPercent, endPercent), maxPercent = Math.max(maxPercent, startPercent, endPercent));
                    }));
                    const mockDatum = Object.assign(Object.assign(Object.assign({}, node.values[0]), {
                        [STACK_FIELD_START]: min,
                        [STACK_FIELD_END]: max
                    }), hasPercent ? {
                        [STACK_FIELD_START_PERCENT]: minPercent,
                        [STACK_FIELD_END_PERCENT]: maxPercent
                    } : void 0), rectAttr = "horizontal" === this.direction ? {
                        x: this._getBarXStart(mockDatum, xScale),
                        x1: this._getBarXEnd(mockDatum, xScale),
                        y: this._getPosition(this.direction, mockDatum),
                        height: this._getBarWidth(this._yAxisHelper)
                    } : {
                        y: this._getBarYStart(mockDatum, yScale),
                        y1: this._getBarYEnd(mockDatum, yScale),
                        x: this._getPosition(this.direction, mockDatum),
                        width: this._getBarWidth(this._xAxisHelper)
                    };
                    rectPaths.push(createRect(Object.assign(Object.assign({}, rectAttr), {
                        cornerRadius: isFunction(this._spec.stackCornerRadius) ? this._spec.stackCornerRadius(rectAttr, mockDatum, this._markAttributeContext) : this._spec.stackCornerRadius,
                        fill: !0
                    })));
                })), rectPaths;
            }
        });
    }
    initLinearRectMarkStyle() {
        var _a, _b, _c, _d;
        const xScale = null === (_b = null === (_a = this._xAxisHelper) || void 0 === _a ? void 0 : _a.getScale) || void 0 === _b ? void 0 : _b.call(_a, 0), yScale = null === (_d = null === (_c = this._yAxisHelper) || void 0 === _c ? void 0 : _c.getScale) || void 0 === _d ? void 0 : _d.call(_c, 0);
        if ("horizontal" === this.direction) {
            const yChannels = isValid(this._fieldY2) ? {
                y: datum => valueInScaleRange(this._dataToPosY(datum), yScale, !0),
                y1: datum => valueInScaleRange(this._dataToPosY1(datum), yScale, !0)
            } : {
                y: datum => valueInScaleRange(this._dataToPosY(datum) - this._getBarWidth(this._yAxisHelper) / 2, yScale, !0),
                height: datum => this._getBarWidth(this._yAxisHelper)
            };
            this.setMarkStyle(this._barMark, Object.assign({
                x: datum => this._getBarXStart(datum, xScale, !0),
                x1: datum => this._getBarXEnd(datum, xScale, !0)
            }, yChannels), "normal", AttributeLevel.Series), this.setMarkStyle(this._barBackgroundMark, Object.assign({
                x: () => this._getBarBackgroundXStart(xScale),
                x1: () => this._getBarBackgroundXEnd(xScale)
            }, yChannels), "normal", AttributeLevel.Series);
        } else {
            const xChannels = isValid(this._fieldX2) ? {
                x: datum => valueInScaleRange(this._dataToPosX(datum), xScale, !0),
                x1: datum => valueInScaleRange(this._dataToPosX1(datum), xScale, !0)
            } : {
                x: datum => valueInScaleRange(this._dataToPosX(datum) - this._getBarWidth(this._xAxisHelper) / 2, xScale, !0),
                width: datum => this._getBarWidth(this._xAxisHelper)
            };
            this.setMarkStyle(this._barMark, Object.assign(Object.assign({}, xChannels), {
                y: datum => this._getBarYStart(datum, yScale),
                y1: datum => this._getBarYEnd(datum, yScale)
            }), "normal", AttributeLevel.Series), this.setMarkStyle(this._barBackgroundMark, Object.assign(Object.assign({}, xChannels), {
                y: () => this._getBarBackgroundYStart(yScale),
                y1: () => this._getBarBackgroundYEnd(yScale)
            }), "normal", AttributeLevel.Series);
        }
    }
    _initBandBarBackgroundMarkStyle() {
        var _a, _b, _c, _d, _e;
        if (!this._barBackgroundMark) return;
        const xScale = null === (_b = null === (_a = this._xAxisHelper) || void 0 === _a ? void 0 : _a.getScale) || void 0 === _b ? void 0 : _b.call(_a, 0), yScale = null === (_d = null === (_c = this._yAxisHelper) || void 0 === _c ? void 0 : _c.getScale) || void 0 === _d ? void 0 : _d.call(_c, 0), spec = null !== (_e = this._spec.barBackground) && void 0 !== _e ? _e : {}, scaleDepth = isNil(spec.fieldLevel) ? void 0 : spec.fieldLevel + 1;
        "horizontal" === this.direction ? this.setMarkStyle(this._barBackgroundMark, {
            x: () => this._getBarBackgroundXStart(xScale),
            x1: () => this._getBarBackgroundXEnd(xScale),
            y: datum => this._getPosition(this.direction, datum, scaleDepth, "barBackground"),
            height: () => this._getBarWidth(this._yAxisHelper, scaleDepth),
            width: () => {},
            y1: () => {}
        }, "normal", AttributeLevel.Series) : this.setMarkStyle(this._barBackgroundMark, {
            x: datum => this._getPosition(this.direction, datum, scaleDepth, "barBackground"),
            y: () => this._getBarBackgroundYStart(yScale),
            y1: () => this._getBarBackgroundYEnd(yScale),
            width: () => this._getBarWidth(this._xAxisHelper, scaleDepth),
            x1: () => {},
            height: () => {}
        }, "normal", AttributeLevel.Series);
    }
    initAnimation() {
        var _a, _b;
        const barAnimationParams = {
            yField: this._fieldY[0],
            xField: this._fieldX[0],
            direction: this.direction,
            growFrom: () => {
                var _a;
                const scale = "horizontal" === this.direction ? null === (_a = this._xAxisHelper) || void 0 === _a ? void 0 : _a.getScale(0) : this._yAxisHelper.getScale(0);
                if (scale) {
                    const domain = scale.domain(), domainMin = minInArr(domain), domainMax = maxInArr(domain);
                    return domainMax < 0 ? scale.scale(domainMax) : domainMin > 0 ? scale.scale(domainMin) : scale.scale(0);
                }
            }
        }, appearPreset = null === (_a = this._spec.animationAppear) || void 0 === _a ? void 0 : _a.preset, animationParams = getGroupAnimationParams(this);
        this._barMark.setAnimationConfig(animationConfig(null === (_b = Factory.getAnimationInKey("bar")) || void 0 === _b ? void 0 : _b(barAnimationParams, appearPreset), userAnimationConfig(this._barMarkName, this._spec, this._markAttributeContext), animationParams));
    }
    _getBarWidth(axisHelper, scaleDepth) {
        var _a, _b;
        const depthFromSpec = this._groups ? this._groups.fields.length : 1, depth = isNil(scaleDepth) ? depthFromSpec : Math.min(depthFromSpec, scaleDepth), bandWidth = null !== (_b = null === (_a = axisHelper.getBandwidth) || void 0 === _a ? void 0 : _a.call(axisHelper, depth - 1)) && void 0 !== _b ? _b : 6, hasBarWidth = isValid(this._spec.barWidth) && depth === depthFromSpec, hasBarMinWidth = isValid(this._spec.barMinWidth), hasBarMaxWidth = isValid(this._spec.barMaxWidth);
        let width = bandWidth;
        return hasBarWidth && (width = getActualNumValue(this._spec.barWidth, bandWidth)), 
        hasBarMinWidth && (width = Math.max(width, getActualNumValue(this._spec.barMinWidth, bandWidth))), 
        hasBarMaxWidth && (width = Math.min(width, getActualNumValue(this._spec.barMaxWidth, bandWidth))), 
        width;
    }
    _getPosition(direction, datum, scaleDepth, mark) {
        var _a, _b, _c, _d, _e;
        let axisHelper, sizeAttribute, dataToPosition;
        "horizontal" === direction ? (axisHelper = this.getYAxisHelper(), sizeAttribute = "height", 
        dataToPosition = "barBackground" === mark ? this.dataToBarBackgroundPositionY.bind(this) : this.dataToPositionY.bind(this)) : (axisHelper = this.getXAxisHelper(), 
        sizeAttribute = "width", dataToPosition = "barBackground" === mark ? this.dataToBarBackgroundPositionX.bind(this) : this.dataToPositionX.bind(this));
        const scale = axisHelper.getScale(0), depthFromSpec = this._groups ? this._groups.fields.length : 1, depth = isNil(scaleDepth) ? depthFromSpec : Math.min(depthFromSpec, scaleDepth), bandWidth = null !== (_b = null === (_a = axisHelper.getBandwidth) || void 0 === _a ? void 0 : _a.call(axisHelper, depth - 1)) && void 0 !== _b ? _b : 6, size = depth === depthFromSpec ? this._barMark.getAttribute(sizeAttribute, datum) : bandWidth;
        if (depth > 1 && isValid(this._spec.barGapInGroup)) {
            const groupFields = this._groups.fields, barInGroup = array(this._spec.barGapInGroup);
            let totalWidth = 0, offSet = 0;
            for (let index = groupFields.length - 1; index >= 1; index--) {
                const groupField = groupFields[index], groupValues = null !== (_d = null === (_c = axisHelper.getScale(index)) || void 0 === _c ? void 0 : _c.domain()) && void 0 !== _d ? _d : [], groupCount = groupValues.length, gap = getActualNumValue(null !== (_e = barInGroup[index - 1]) && void 0 !== _e ? _e : last(barInGroup), bandWidth), i = groupValues.indexOf(datum[groupField]);
                index === groupFields.length - 1 ? (totalWidth += groupCount * size + (groupCount - 1) * gap, 
                offSet += i * (size + gap)) : (offSet += i * (totalWidth + gap), totalWidth += totalWidth + (groupCount - 1) * gap);
            }
            return scale.scale(datum[groupFields[0]]) + axisHelper.getBandwidth(0) / 2 - totalWidth / 2 + offSet;
        }
        const continuous = isContinuous(scale.type || "band");
        return dataToPosition(datum, depth) + .5 * (bandWidth - size) + (continuous ? -bandWidth / 2 : 0);
    }
    dataToBarBackgroundPositionX(datum, scaleDepth) {
        return this._dataToPosition(datum, this._xAxisHelper, this.fieldX, scaleDepth, this._getBarBackgroundPositionXEncoder, this._setBarBackgroundPositionXEncoder);
    }
    dataToBarBackgroundPositionY(datum, scaleDepth) {
        return this._dataToPosition(datum, this._yAxisHelper, this.fieldY, scaleDepth, this._getBarBackgroundPositionYEncoder, this._setBarBackgroundPositionYEncoder);
    }
    onLayoutEnd(ctx) {
        super.onLayoutEnd(ctx);
        this.getRegion()._bar_series_position_calculated = !1, this._spec.sampling && this.compile();
    }
    compile() {
        if (super.compile(), this._spec.sampling) {
            const {width: width, height: height} = this._region.getLayoutRect(), samplingTrans = [], fieldsY = this._fieldY, fieldsX = this._fieldX;
            samplingTrans.push({
                type: "sampling",
                size: "horizontal" === this._direction ? height : width,
                factor: this._spec.samplingFactor,
                yfield: "horizontal" === this._direction ? fieldsX[0] : fieldsY[0],
                groupBy: this._seriesField,
                mode: this._spec.sampling
            }), this._data.getProduct().transform(samplingTrans);
        }
    }
    getDefaultShapeType() {
        return "square";
    }
    getActiveMarks() {
        return [ this._barMark ];
    }
    compileData() {
        var _a;
        super.compileData(), null === (_a = this._barBackgroundViewData) || void 0 === _a || _a.compile();
    }
    fillData() {
        var _a, _b;
        super.fillData(), null === (_b = null === (_a = this._barBackgroundViewData) || void 0 === _a ? void 0 : _a.getDataView()) || void 0 === _b || _b.reRunAllTransform();
    }
    viewDataUpdate(d) {
        var _a, _b, _c;
        super.viewDataUpdate(d), null === (_b = null === (_a = this._barBackgroundViewData) || void 0 === _a ? void 0 : _a.getDataView()) || void 0 === _b || _b.reRunAllTransform(), 
        null === (_c = this._barBackgroundViewData) || void 0 === _c || _c.updateData();
    }
    release() {
        var _a;
        super.release(), null === (_a = this._barBackgroundViewData) || void 0 === _a || _a.release(), 
        this._barBackgroundViewData = null;
    }
}

BarSeries.type = SeriesTypeEnum.bar, BarSeries.mark = barSeriesMark, BarSeries.transformerConstructor = BarSeriesSpecTransformer;

export const registerBarSeries = () => {
    registerSampleTransform(), registerRectMark(), registerBarAnimation(), registerCartesianBandAxis(), 
    registerCartesianLinearAxis(), Factory.registerSeries(BarSeries.type, BarSeries);
};
//# sourceMappingURL=bar.js.map
